package com.skillmentor.backend.security;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.jwk.source.RemoteJWKSet;
import com.nimbusds.jose.proc.JWSKeySelector;
import com.nimbusds.jose.proc.JWSVerificationKeySelector;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import com.nimbusds.jwt.proc.DefaultJWTProcessor;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Date;
import java.util.Map;

@Service
public class ClerkTokenVerifier {

    private final ConfigurableJWTProcessor<SecurityContext> jwtProcessor;

    @Value("${clerk.issuer}")
    private String expectedIssuer;

    public ClerkTokenVerifier(@Value("${clerk.jwks.url}") String jwksUrl) throws MalformedURLException {
        URL url = new URL(jwksUrl);

        JWKSource<SecurityContext> keySource = new RemoteJWKSet<>(url);
        JWSKeySelector<SecurityContext> keySelector =
                new JWSVerificationKeySelector<>(JWSAlgorithm.RS256, keySource);

        DefaultJWTProcessor<SecurityContext> processor = new DefaultJWTProcessor<>();
        processor.setJWSKeySelector(keySelector);

        this.jwtProcessor = processor;
    }

    public ClerkUserPrincipal verify(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWTClaimsSet claims = jwtProcessor.process(signedJWT, null);

            validateClaims(claims);

            String clerkUserId = claims.getSubject();
            String email = claims.getStringClaim("email");
            String role = extractRole(claims);

            return new ClerkUserPrincipal(
                    clerkUserId,
                    email,
                    role == null ? "STUDENT" : role.toUpperCase()
            );

        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid Clerk token", e);
        }
    }

    private void validateClaims(JWTClaimsSet claims) {
        Date expiration = claims.getExpirationTime();
        if (expiration == null || expiration.before(new Date())) {
            throw new IllegalArgumentException("Token is expired");
        }

        String issuer = claims.getIssuer();
        if (issuer == null || !issuer.startsWith(expectedIssuer)) {
            throw new IllegalArgumentException("Invalid token issuer");
        }

        if (claims.getSubject() == null || claims.getSubject().isBlank()) {
            throw new IllegalArgumentException("Missing Clerk user id");
        }
    }

    private String extractRole(JWTClaimsSet claims) {
        try {
            String directRole = claims.getStringClaim("role");
            if (directRole != null && !directRole.isBlank()) {
                return directRole;
            }

            Object metadataObj = claims.getClaim("metadata");
            if (metadataObj instanceof Map<?, ?> metadataMap) {
                Object roleObj = metadataMap.get("role");
                if (roleObj != null) {
                    return roleObj.toString();
                }
            }

            return null;
        } catch (Exception e) {
            return null;
        }
    }

    @Getter
    public static class ClerkUserPrincipal {
        private final String clerkUserId;
        private final String email;
        private final String role;

        public ClerkUserPrincipal(String clerkUserId, String email, String role) {
            this.clerkUserId = clerkUserId;
            this.email = email;
            this.role = role;
        }
    }
}