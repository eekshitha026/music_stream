# ============ STAGE 1 — Build the JAR ============
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy Maven descriptor first (improves caching)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build the spring boot jar
RUN mvn clean package -DskipTests


# ============ STAGE 2 — Run the JAR ============
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy the jar from previous stage
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
