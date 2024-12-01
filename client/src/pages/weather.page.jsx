import React, { useState, useEffect } from "react";
import {
  BrightnessHighFill,
  Snow2,
  Cloud,
  SunFill,
  CloudDrizzleFill,
} from "react-bootstrap-icons";
import { Row, Col, Card, Form } from "react-bootstrap";

const API_KEY = "ef92cd611ae451d1b7efb9cf50002de5";

export const WeatherPage = () => {
  const [location, setLocation] = useState("Tampere");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      console.log("data", data);

      const rainAmount = data.rain?.["1h"];
      let rainPercentage = "No rain";

      if (rainAmount > 0 && rainAmount <= 2) {
        rainPercentage = "Light rain (up to 20%)";
      } else if (rainAmount > 2 && rainAmount <= 10) {
        rainPercentage = "Moderate rain (20% - 50%)";
      } else if (rainAmount > 10) {
        rainPercentage = "Heavy rain (50%+)";
      }

      setWeatherData({
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        day: new Date(data.dt * 1000).toLocaleDateString("en-US", {
          weekday: "long",
        }),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        humidity: `${data.main.humidity}%`,
        city: data.name,
        visibility:
          data.visibility !== undefined
            ? `${(data.visibility / 1000).toFixed(1)} km`
            : "N/A",
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        description: data.weather[0].description,
        main: data.weather[0].main,
        cloudIcon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        rainOrSnow: {
          name: data.weather[0].main,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        },
        rainPercentage: rainPercentage,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData(location);
  }, [location]);

  const handleCityChange = (e) => setLocation(e.target.value);

  const formattedDate = new Date().toLocaleDateString();
  const formattedTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const options = { weekday: "long" };
  const formattedDate2 = new Date().toLocaleDateString(undefined, options);
  const formattedTime2 = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDateTime = `${formattedDate2}, ${formattedTime2}`;

  const Temperature = Math.round(weatherData?.temp);

  return (
    <div
      className=""
      style={{
        height: "100vh",
        width: "auto",
        backgroundColor: "#CDC1FF",
      }}
    >
      <Row
        xs={1}
        md={2}
        style={{
          height: "100%",
          width: "auto",
          margin: 0,
        }}
      >
        <Col
          className="text-dark"
          style={{
            height: "",
            display: "",
            justifyContent: "",
            alignItems: "",
          }}
        >
          <div className="p-3">
            <Row className="mb-0">
              <Col>
                <Card
                  style={{
                    margin: "auto",
                    width: "100%",
                    maxWidth: "22rem",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                    borderRadius: "12px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #f1f1f1",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  className="card-hover"
                >
                  <Card.Body>
                    <Card.Subtitle
                      style={{
                        fontSize: "1rem",
                        color: "#6c757d",
                        textAlign: "center",
                        fontWeight: "400",
                        marginBottom: "10px",
                      }}
                    >
                      Forecast: <strong>updated</strong> {formattedDate}{" "}
                      {formattedTime}
                    </Card.Subtitle>

                    <Card.Title
                      style={{
                        fontSize: "1.5rem",
                        color: "#343a40",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      <strong>{location ? location : "NA"}</strong>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <br />

            <div
              className="d-flex justify-content-center align-items-center"
              style={{ flexDirection: "column" }}
            >
              <Row className="mb-3">
                <Col className="mb-3">
                  <Card
                    style={{
                      margin: "auto",
                      width: "18rem",
                      height: "12rem",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      borderRadius: "10px",
                      overflow: "hidden",
                      backgroundColor: "#f8f9fa",
                      fontFamily:
                        "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                      transition: "transform 0.2s ease-in-out",
                    }}
                    className="card-hover"
                  >
                    <Card.Body>
                      <Card.Title
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "600",
                          color: "#343a40",
                          textAlign: "center",
                        }}
                      >
                        Humidity
                      </Card.Title>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Card.Text
                          style={{
                            fontSize: "1.5rem",
                            color: "#007bff",
                            fontWeight: "500",
                          }}
                        >
                          {weatherData?.humidity}
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="mb-3">
                  <Card
                    style={{
                      margin: "auto",
                      width: "18rem",
                      height: "12rem",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      borderRadius: "10px",
                      overflow: "hidden",
                      backgroundColor: "#f8f9fa",
                      fontFamily:
                        "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                      transition: "transform 0.2s ease-in-out",
                    }}
                    className="card-hover"
                  >
                    <Card.Body>
                      <Card.Title
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "600",
                          color: "#343a40",
                          textAlign: "center",
                        }}
                      >
                        Visibility
                      </Card.Title>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Card.Text
                          style={{
                            fontSize: "1.5rem",
                            color: "#007bff",
                            fontWeight: "500",
                          }}
                        >
                          {weatherData?.visibility}
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row className="">
                <Col className="mb-3">
                  <Card
                    style={{
                      margin: "auto",
                      width: "18rem",
                      height: "12rem",
                    }}
                  >
                    <Card.Body>
                      <Card.Title
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "600",
                          color: "#343a40",
                          textAlign: "center",
                        }}
                      >
                        Sunrise & Sunset
                      </Card.Title>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                          flexDirection: "column",
                        }}
                      >
                        <Card.Text
                          style={{
                            textAlign: "center",
                            fontSize: "1.5rem",
                            color: "#007bff",
                            fontWeight: "500",
                          }}
                        >
                          <span style={{ display: "block" }}>
                            <BrightnessHighFill
                              size={30}
                              style={{
                                color: "yellow",
                              }}
                            />
                            {"   "}
                            {weatherData?.sunrise}
                          </span>
                          <span style={{ display: "block" }}>
                            <BrightnessHighFill
                              size={30}
                              style={{
                                color: "#000",
                              }}
                            />
                            {"   "}
                            {weatherData?.sunset}
                          </span>
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="mb-3">
                  <Card
                    style={{
                      margin: "auto",
                      width: "18rem",
                      height: "12rem",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      borderRadius: "10px",
                      overflow: "hidden",
                      backgroundColor: "#f8f9fa",
                      fontFamily:
                        "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                      transition: "transform 0.2s ease-in-out",
                    }}
                    className="card-hover"
                  >
                    <Card.Body>
                      <Card.Title
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "600",
                          color: "#343a40",
                          textAlign: "center",
                        }}
                      >
                        Day
                      </Card.Title>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Card.Text
                          style={{
                            fontSize: "1.5rem",
                            color: "#007bff",
                            fontWeight: "500",
                          }}
                        >
                          {weatherData?.day}
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        {/* left column */}
        <Col
          className="text-white"
          style={{
            height: "100vh",
            overflowY: "auto",
            paddingBottom: "20px",
          }}
        >
          <div className="p-3">
            <Row className="mb-0">
              <Col className="mx-auto">
                <Card
                  style={{
                    margin: "auto",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                    borderRadius: "12px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #f1f1f1",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  className="card-hover"
                >
                  <Card.Body>
                    <Form.Control
                      type="text"
                      placeholder="Enter city"
                      onChange={handleCityChange}
                      style={{
                        marginBottom: "10px",
                        padding: "10px",
                        fontSize: "1rem",
                        textAlign: "center",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>

          <Row className="mt-3 mb-3 justify-content-center">
            <Col className="mb-3">
              <Card
                style={{
                  height: "auto",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: "#f8f9fa",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  transition: "transform 0.2s ease-in-out",
                }}
                className="card-hover"
              >
                <Card.Body>
                  <Card.Title
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      color: "#343a40",
                      textAlign: "left",
                    }}
                  >
                    <span>
                      <img
                        style={{
                          width: "100px",
                          marginBottom: "10px",
                          padding: "10px",
                          backgroundColor: "#f1f8ff",
                          borderRadius: "24%",
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                          border: "2px solid #e3e8ef",
                        }}
                        src={weatherData?.icon}
                        alt={weatherData?.description}
                      />
                    </span>
                    <h1>{Temperature}°C</h1>
                    <p>{formattedDateTime}</p>
                    <hr />
                  </Card.Title>

                  <Card.Text>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <span>Feels like:</span>
                        <h2 style={{ margin: 0 }}>
                          {weatherData?.feels_like}°C
                        </h2>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <span>Rain percentage:</span>
                        <h2 style={{ margin: 0 }}>
                          {weatherData?.rainPercentage || "No rain"}
                        </h2>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <span>
                          {weatherData?.main === "Clouds" ? (
                            <Cloud size={30} />
                          ) : weatherData?.main === "Rain" ? (
                            <CloudDrizzleFill size={30} />
                          ) : weatherData?.main === "Snow" ? (
                            <Snow2 size={30} />
                          ) : (
                            <SunFill size={30} />
                          )}
                        </span>
                        <h2 style={{ margin: 1 }}>
                          {weatherData?.description}
                        </h2>
                      </div>
                    </div>
                  </Card.Text>

                  <Card.Text
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end",
                      marginTop: "auto",
                    }}
                  >
                    <h3>Weather Live Updates</h3>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default WeatherPage;
