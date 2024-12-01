package com.planner.repository; // Adjust the package as needed

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.planner.model.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    // Custom query methods can be added here
} // interface
