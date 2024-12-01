// import React, { useState, useEffect } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Polyline,
//   useMap,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { Card, Row, Col, Form, Container } from "react-bootstrap";
// import {
//   DestinationIcon,
//   IconContainer,
//   StyledButton,
//   StyledSwapButton,
// } from "../styles";
// import { FaExchangeAlt } from "react-icons/fa";
// import { SourceIcon } from "../styles/";

// const GEOCODER_API_KEY = "cafa605590b84473a19c5ecc624fa679";

// const fetchCoordinates = async (cityName) => {
//   const response = await fetch(
//     `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
//       cityName
//     )}&key=${GEOCODER_API_KEY}`
//   );
//   if (response.ok) {
//     const data = await response.json();
//     const { lat, lng } = data.results[0]?.geometry || {};
//     if (lat && lng) return [lat, lng];
//   }
//   throw new Error(`Failed to fetch coordinates for "${cityName}"`);
// };

// const fetchRoute = async (source, destination) => {
//   if (!source || !destination) return [];
//   const response = await fetch(
//     `https://router.project-osrm.org/route/v1/driving/${source[1]},${source[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson`
//   );
//   if (response.ok) {
//     const data = await response.json();
//     return (
//       data.routes[0]?.geometry.coordinates.map(([lon, lat]) => [lat, lon]) || []
//     );
//   } else {
//     throw new Error("Failed to fetch route data");
//   }
// };

// const RouteLayer = ({ source, destination }) => {
//   const map = useMap();
//   const [routeCoordinates, setRouteCoordinates] = useState([]);

//   useEffect(() => {
//     const getRoute = async () => {
//       try {
//         if (!source || !destination) return;
//         const coordinates = await fetchRoute(source, destination);
//         setRouteCoordinates(coordinates);
//         if (coordinates.length > 0) {
//           map.fitBounds(coordinates);
//         }
//       } catch (error) {
//         console.error("Error fetching route:", error);
//       }
//     };

//     getRoute();
//   }, [source, destination, map]);

//   return routeCoordinates.length > 0 ? (
//     <Polyline positions={routeCoordinates} color="blue" />
//   ) : null;
// };

// const OpenStreetMapDirections = () => {
//   const [sourceCity, setSourceCity] = useState("Helsinki");
//   const [destinationCity, setDestinationCity] = useState("Tampere");
//   const [source, setSource] = useState(null);
//   const [destination, setDestination] = useState(null);

//   const handleSwap = () => {
//     setSourceCity(destination);
//     setDestinationCity(source);
//   };

//   useEffect(() => {
//     const getCoordinates = async () => {
//       try {
//         const sourceCoords = await fetchCoordinates(sourceCity);
//         const destinationCoords = await fetchCoordinates(destinationCity);
//         setSource(sourceCoords);
//         setDestination(destinationCoords);
//       } catch (error) {
//         console.error("Error fetching city coordinates:", error);
//       }
//     };

//     getCoordinates();
//   }, [sourceCity, destinationCity]);

//   return (
//     <Container fluid>
//       <Row className="justify-content-center">
//         <Col md={6} className="d-flex">
//           <Card style={{ width: "38rem", margin: "0 auto", flex: 1 }}>
//             <Card.Body>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   marginBottom: "30px",
//                 }}
//               >
//                 <StyledButton className="mt-3" variant="primary">
//                   ROUTE PLANNING
//                 </StyledButton>{" "}
//               </div>
//               <Form>
//                 <Form.Group controlId="sourceCity" className="mb-5">
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       width: "100%",
//                       marginBottom: "10px",
//                     }}
//                   >
//                     <IconContainer>
//                       <SourceIcon />
//                     </IconContainer>
//                     <Form.Control
//                       style={{
//                         width: "100%",
//                         maxWidth: "480px",
//                         fontSize: "1.1rem",
//                         padding: "20px",
//                         borderRadius: "5px",
//                         border: "1px solid #ccc",
//                       }}
//                       type="text"
//                       placeholder="e.g. Helsinki"
//                       value={sourceCity ? "enter city" : sourceCity}
//                       onChange={(e) => setSourceCity(e.target.value)}
//                     />
//                   </div>
//                 </Form.Group>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     marginBottom: "10px",
//                   }}
//                 >
//                   <StyledSwapButton
//                     onClick={handleSwap}
//                     style={{
//                       backgroundColor: "#B2A0F3",
//                       border: "none",
//                       borderRadius: "5px",
//                       color: "black",
//                       cursor: "pointer",
//                       padding: "20px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <FaExchangeAlt style={{ marginRight: "5px" }} />
//                   </StyledSwapButton>
//                 </div>

//                 <Form.Group controlId="destinationCity" className="mt-5">
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       width: "100%",
//                       marginTop: "10px",
//                     }}
//                   >
//                     <IconContainer>
//                       <DestinationIcon />
//                     </IconContainer>
//                     <Form.Control
//                       type="text"
//                       placeholder="e.g. Tampere"
//                       value={destinationCity ? "enter city" : destinationCity}
//                       style={{
//                         width: "100%",
//                         maxWidth: "480px",
//                         fontSize: "1.1rem",
//                         padding: "20px",
//                         borderRadius: "5px",
//                         border: "1px solid #ccc",
//                       }}
//                       onChange={(e) => setDestinationCity(e.target.value)}
//                     />
//                   </div>
//                 </Form.Group>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col md={6} className="d-flex">
//           <Card style={{ width: "38rem", margin: "0 auto", flex: 1 }}>
//             <Card.Body>
//               <Card.Title>Map</Card.Title>
//               <MapContainer
//                 center={[60.1695, 24.9354]}
//                 zoom={7}
//                 scrollWheelZoom={true}
//                 style={{ height: "500px", width: "100%" }}
//               >
//                 <TileLayer
//                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 {source && <Marker position={source} />}
//                 {destination && <Marker position={destination} />}
//                 {source && destination && (
//                   <RouteLayer source={source} destination={destination} />
//                 )}
//               </MapContainer>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default OpenStreetMapDirections;
