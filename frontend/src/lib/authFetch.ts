// import { useAuth } from '@clerk/clerk-react'

// type RequestOptions = RequestInit & {
//   headers?: HeadersInit
// }

// export function useAuthFetch() {
//   const { getToken } = useAuth()

//   return async function authFetch(url: string, options: RequestOptions = {}) {
//     const token = await getToken()

//     const headers = new Headers(options.headers)

//     if (!headers.has('Content-Type')) {
//       headers.set('Content-Type', 'application/json')
//     }

//     if (token) {
//       headers.set('Authorization', `Bearer ${token}`)
//     }

//     const response = await fetch(url, {
//       ...options,
//       headers,
//     })

//     if (!response.ok) {
//       const text = await response.text()
//       throw new Error(text || `Request failed with status ${response.status}`)
//     }

//     const contentType = response.headers.get('content-type') || ''

//     if (contentType.includes('application/json')) {
//       return response.json()
//     }

//     return response.text()
//   }
// }