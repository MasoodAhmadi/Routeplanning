package com.planner.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.planner.model.RoutePlan;
import com.planner.model.User;
import com.planner.repository.RoutePlanRepository;
import com.planner.repository.UserRepository;

@RestController
@RequestMapping("/api/route-plans")
public class RoutePlanController {

    @Autowired
    private RoutePlanRepository routePlanRepository;

    @Autowired
    private UserRepository userRepository;

    // Add a new route plan for a user
    @PostMapping("/{userId}")
    public ResponseEntity<RoutePlan> addRoutePlan(@PathVariable Long userId, @RequestBody RoutePlan routePlan) {
        // Check if the user exists
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Set the user in the route plan
        routePlan.setUser(user);

        // Save the route plan
        RoutePlan savedRoutePlan = routePlanRepository.save(routePlan);

        // Return the saved route plan along with status code 201 (Created)
        return ResponseEntity.status(201).body(savedRoutePlan);
    }

    // Get all route plans for a specific user
    @GetMapping("/{userId}")
    public ResponseEntity<List<RoutePlan>> getRoutePlansByUser(@PathVariable Long userId) {
        // Retrieve all route plans by user ID
        List<RoutePlan> routePlans = routePlanRepository.findByUser_UserId(userId);

        // Return the route plans
        return ResponseEntity.ok(routePlans);
    }
}
