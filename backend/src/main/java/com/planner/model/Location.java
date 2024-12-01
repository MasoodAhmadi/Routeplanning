package com.planner.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationId;
    @NotNull
    private String locationName;
    @NotNull
    private double latitude;
    @NotNull
    private double longitude;

    // Default constructor
    public Location() {}

    // Constructor for easy object creation
    public Location(String name, double latitude, double longitude) {
        this.locationName = name;
        this.latitude = latitude;
        this.longitude = longitude;
    } // Location

    // getters and setters
    public Long getId() {
        return locationId;
    } //getId

    public void setId(Long id) {
        this.locationId = id;
    } // setId

    public String getName() {
        return locationName;
    } // getName

    public void setName(String name) {
        this.locationName = name;
    } // setName

    public double getLatitude() {
        return latitude;
    } //getLatitude

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    } // setLatitude

    public double getLongitude() {
        return longitude;
    } // getLongitude

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    } // setLongitude

    @Override
    public String toString() {
        return "Location{" +
                "locationId=" + locationId +
                ", name='" + locationName + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                '}';
    }
} // class
