@echo off
REM Configura JAVA_HOME para JDK 11
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-11.0.27.6-hotspot"

REM Adiciona o bin do JAVA_HOME no PATH temporariamente
set "PATH=%JAVA_HOME%\bin;%PATH%"

REM Caminho do Maven (altere para o seu caminho real)
set "MAVEN_HOME=C:\apath\apache-maven-3.9.10"
set "PATH=%MAVEN_HOME%\bin;%PATH%"

REM Mostra as versões do Java e Maven para conferência
java -version
mvn -v

REM Roda o build do Maven
mvn clean package

pause