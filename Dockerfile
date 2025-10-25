# -----------------------------
# 🧱 Build stage
# -----------------------------
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Copia o código-fonte
COPY . .

# Compila e empacota o projeto, ignorando os testes
RUN ./mvnw clean package -DskipTests

# -----------------------------
# 🚀 Runtime stage
# -----------------------------
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copia apenas o jar gerado do build
COPY --from=build /app/target/hotspot-backend-0.0.1-SNAPSHOT.jar app.jar

# Render usa a variável de ambiente $PORT
ENV PORT=8080
EXPOSE 8080

# Define o comando de inicialização
ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=${PORT}"]
