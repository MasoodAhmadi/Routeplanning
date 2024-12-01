import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { RoutePlanning, MapComponent } from "../components";
import { PlanPage } from "../pages";

const Dashboard = ({ showRoutePlanning }) => {
  return (
    <div className="dashboard-container">
      <Row className="dashboard-row">
        <Col className="dashboard-col">
          {showRoutePlanning ? <RoutePlanning /> : <PlanPage />}
        </Col>
        {/* <Col className="dashboard-col">
          <MapComponent />
        </Col> */}
      </Row>
      {/* 
      <Row className="dashboard-row">
        <Col className="dashboard-col"> <Tables /> </Col>
      </Row> */}
    </div>
  );
};

export default Dashboard;
