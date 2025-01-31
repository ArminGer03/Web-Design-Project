# Use an official Java runtime as a parent image
FROM amazoncorretto:17-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy maven/gradle wrapper & project files (so we can build)
COPY . .

RUN chmod +x mvnw
# For Maven:
RUN ./mvnw clean package -DskipTests

# Expose port 8080 (Spring Boot default)
EXPOSE 8080

CMD ["java", "-jar", "target/SoalPich-0.0.1-SNAPSHOT.jar"]
