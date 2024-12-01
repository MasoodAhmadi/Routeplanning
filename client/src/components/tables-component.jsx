import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

const TableComponent = ({
  sourceCity,
  source,
  destinationCity,
  destination,
  userId, // routePlanId passed to identify the specific plan to save
}) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update the date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Function to calculate the distance between two coordinates
  const calculateDistance = (source, destination) => {
    if (!source || !destination) return "Calculating...";

    const toRadians = (degrees) => (degrees * Math.PI) / 180;

    const [lat1, lon1] = source;
    const [lat2, lon2] = destination;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c).toFixed(2) + " km"; // Distance in kilometers
  };

  const handleSave = () => {
    // Retrieve the userId from localStorage (or a relevant storage mechanism)
    const userId = localStorage.getItem("userId");

    // Prepare the data structure for the backend request
    const data = {
      createdAt: new Date().toISOString(), // This sets the current time in ISO format
      distance: calculateDistance(source, destination), // Calculate distance (you can modify as needed)
      duration: "2 hours", // Modify if you want dynamic duration
      endLocation: destinationCity,
      startLocation: sourceCity,
      status: "Planned", // You can dynamically set the status if needed
    };

    // Send the POST request to the backend
    axios
      .post(`http://localhost:8080/api/route-plans/1`, data)
      .then((response) => {
        console.log("Route plan saved successfully:", response.data);
        alert("Route plan saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving route plan:", error);
        alert("Failed to save route plan.");
      });
  };

  return (
    <div>
      {/* Dynamic h3 displaying current date and time */}
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        {currentDateTime.toLocaleDateString()} -{" "}
        {currentDateTime.toLocaleTimeString()}
      </h3>

      {/* Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Source City</th>
            <th>Source Coordinates</th>
            <th>Destination City</th>
            <th>Destination Coordinates</th>
            <th>Distance</th>
            <th>Action</th> {/* New column for Save button */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{sourceCity}</td>
            <td>{source ? source.join(", ") : "Loading..."}</td>
            <td>{destinationCity}</td>
            <td>{destination ? destination.join(", ") : "Loading..."}</td>
            <td>{calculateDistance(source, destination)}</td>
            <td>
              {/* Add Save button */}
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
