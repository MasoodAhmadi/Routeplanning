package com.planner.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.planner.model.RoutePlan;
import com.planner.repository.RoutePlanRepository;

@Service
public class RoutePlanService {

    @Autowired
    private RoutePlanRepository routePlanRepository;

    public RoutePlan saveRoutePlan(RoutePlan routePlan) {
        return routePlanRepository.save(routePlan);
    } // saveRoutePlan

    public List<RoutePlan> getAllRoutePlans() {
        return routePlanRepository.findAll();
    } // getAllRoutePlans
} // class
