// // src/utils/jwtUtils.ts

// interface JwtPayload {
//   tenantId?: string | number; // tenantId might be string or number in JWT payload
//   userId?: string | number;   // userId might be string or number in JWT payload
//   exp: number; // Expiration time (timestamp)
//   iss: string; // Issuer
//   aud: string; // Audience
//   [key: string]: unknown; // Allow other properties, but force type checking
// }

// /**
//  * Decodes a JWT token and returns its payload.
//  * Note: This only decodes the token; it does not validate its signature or expiration.
//  * @param token The JWT string.
//  * @returns The decoded payload object, or null if decoding fails.
//  */
// export const decodeJwt = (token: string): JwtPayload | null => {
//   try {
//     const parts = token.split('.');
//     if (parts.length !== 3) {
//       console.warn("Invalid JWT format: expected 3 parts.");
//       return null;
//     }
//     const payloadBase64 = parts[1];
//     // Replace non-URL-safe characters if present (though `atob` usually handles standard base64)
//     const sanitizedPayloadBase64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
//     const decodedPayload = atob(sanitizedPayloadBase64); // `atob` is for base64 decoding in browser
//     return JSON.parse(decodedPayload);
//   } catch (error) {
//     console.error("Error decoding JWT:", error);
//     return null;
//   }
// };