package com.planner.utils;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    // Use a secure key generator for HS256
    private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    /**
     * Generates a JWT token for the given username.
     */
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000)) // 24 hours
                .signWith(secretKey) // Use the generated secure key for signing
                .compact();
    }

    /**
     * Extracts the username from a JWT token.
     */
    public String extractUsername(String token) {
        return Jwts.parserBuilder() // Updated to use parserBuilder() in newer jjwt versions
                .setSigningKey(secretKey) // Use the secure key for verification
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    /**
     * Validates the JWT token against the provided username.
     */
    public boolean validateToken(String token, String username) {
        return username.equals(extractUsername(token)) && !isTokenExpired(token);
    }

    /**
     * Checks if the JWT token has expired.
     */
    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parserBuilder() // Updated to use parserBuilder()
                .setSigningKey(secretKey) // Use the secure key for verification
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }
}
