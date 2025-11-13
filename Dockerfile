# Etapa 1: compila o código Java
FROM eclipse-temurin:17-jdk AS build

WORKDIR /app

# Copia os arquivos fonte
COPY src/main/java/ src/main/java/
COPY src/main/webapp/ src/main/webapp/

# Cria a pasta onde ficarão as classes compiladas
RUN mkdir -p src/main/webapp/WEB-INF/classes

# Baixa as dependências necessárias (jakarta.servlet e gson)
RUN mkdir -p /libs && \
    wget -O /libs/jakarta-servlet-api.jar https://repo1.maven.org/maven2/jakarta/servlet/jakarta.servlet-api/6.0.0/jakarta.servlet-api-6.0.0.jar && \
    wget -O /libs/gson.jar https://repo1.maven.org/maven2/com/google/code/gson/gson/2.10.1/gson-2.10.1.jar

# Compila o código Java
RUN find src/main/java -name "*.java" > sources.txt && \
    javac -cp "/libs/*" -d src/main/webapp/WEB-INF/classes @sources.txt


# Etapa 2: usa o Tomcat para rodar o app
FROM tomcat:10.1.26-jdk17

WORKDIR /usr/local/tomcat/webapps

# Remove a aplicação padrão ROOT
RUN rm -rf ROOT

# Copia a aplicação compilada do estágio anterior
COPY --from=build /app/src/main/webapp/ ROOT/

EXPOSE 8080

CMD ["catalina.sh", "run"]
