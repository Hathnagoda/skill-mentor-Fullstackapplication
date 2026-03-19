package com.skillmentor.backend.config;

import com.skillmentor.backend.security.ClerkJwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final ClerkJwtAuthenticationFilter clerkJwtAuthenticationFilter;

    @Value("${app.cors.allowed-origins}")
    private String allowedOrigins;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .formLogin(form -> form.disable())
                .httpBasic(httpBasic -> httpBasic.disable())
                .logout(logout -> logout.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        .requestMatchers("/api/v1/mentors/**").permitAll()

                        .requestMatchers(HttpMethod.POST, "/api/v1/sessions").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/v1/sessions/student/**").authenticated()

                        .requestMatchers(HttpMethod.POST, "/api/v1/subjects").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/subjects/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/subjects/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/v1/mentors").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/mentors/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/mentors/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/api/v1/sessions").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/v1/sessions/status/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/v1/sessions/payment-status/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/v1/sessions/*/confirm-payment").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/v1/sessions/*/confirm-session").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/v1/sessions/*/complete-session").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/v1/sessions/*/meeting-link").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/v1/sessions/*/cancel").hasRole("ADMIN")

                        .anyRequest().permitAll()
                )
                .addFilterBefore(clerkJwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        List<String> origins = Arrays.stream(allowedOrigins.split(","))
                .map(String::trim)
                .filter(origin -> !origin.isBlank())
                .collect(Collectors.toList());

        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(origins);
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}