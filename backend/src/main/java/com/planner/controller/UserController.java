package com.planner.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.planner.dto.LoginRequest;
import com.planner.model.User;
import com.planner.service.UserService;
import com.planner.utils.JwtUtil;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Register a new user.
     */
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        String message = userService.registerUser(user);
        return ResponseEntity.ok(message);
    }

    /**
     * Login and return JWT token.
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        User user = userService.loginUser(loginRequest);
        String token = jwtUtil.generateToken(user.getUsername()); // Generate JWT

        // Return a map containing both the token and the user
        return ResponseEntity.ok(Map.of(
                "token", token,
                "user", user));
    }

    /**
     * Get user details by ID (requires JWT token).
     */
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUser(@PathVariable Long userId,
            @RequestHeader("Authorization") String token) {
        // Validate JWT token
        validateJwtToken(token);

        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    /**
     * Update user details (requires JWT token).
     */
    @PutMapping("/{userId}")
    public ResponseEntity<String> updateUser(@RequestBody User user,
            @PathVariable Long userId,
            @RequestHeader("Authorization") String token) {
        // Validate JWT token
        validateJwtToken(token);

        String message = userService.modifyUserDetails(user, userId);
        return ResponseEntity.ok(message);
    }

    /**
     * Change user password (requires JWT token).
     */
    @PutMapping("/password")
    public ResponseEntity<String> changePassword(@RequestParam Long userId,
            @RequestParam String currentPassword,
            @RequestParam String newPassword,
            @RequestHeader("Authorization") String token) {
        // Validate JWT token
        validateJwtToken(token);

        String message = userService.changePassword(userId, currentPassword, newPassword);
        return ResponseEntity.ok(message);
    }

    /**
     * Delete a user (requires JWT token).
     */
    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId,
            @RequestHeader("Authorization") String token) {
        // Validate JWT token
        validateJwtToken(token);

        String message = userService.deleteUser(userId);
        return ResponseEntity.ok(message);
    }

    /**
     * Utility method to validate JWT token.
     */
    private void validateJwtToken(String token) {
        // Remove "Bearer " prefix if present
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // Extract and validate the username from the token
        String username = jwtUtil.extractUsername(token);
        if (username == null || !jwtUtil.validateToken(token, username)) {
            throw new RuntimeException("Invalid or expired JWT token");
        }
    }
}
