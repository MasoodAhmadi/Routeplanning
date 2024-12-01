package com.planner.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.planner.model.RoutePlan;

public interface RoutePlanRepository extends JpaRepository<RoutePlan, Long> {

    // Find all route plans for a specific user by userId
    List<RoutePlan> findByUser_UserId(Long userId);

    // You can add more custom queries if needed
    // For example, to find active route plans for a user:
    List<RoutePlan> findByUser_UserIdAndStatus(Long userId, String status);

}
