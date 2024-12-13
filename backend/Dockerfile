# Stage 1: Build the application
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY . .

# Ensure the target directory exists
RUN mkdir -p /app/target

# Build the project
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jdk-alpine

# Install MariaDB client (or MariaDB server if needed)
RUN apk update && \
    apk add --no-cache mariadb-client

WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/route-planner-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose the application port
EXPOSE 8080

# Set the command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
