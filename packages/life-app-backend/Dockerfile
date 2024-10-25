# Use the official .NET 9 SDK image as the build environment
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build-env

# Set the working directory
WORKDIR /app

# Copy the source code to the container
COPY ./src ./src

# Publish the application
RUN dotnet publish ./src/Life.App.Backend.csproj -c Release -o out

# Use the official .NET 9 runtime image as the runtime environment
FROM mcr.microsoft.com/dotnet/aspnet:9.0

# Set the working directory
WORKDIR /app

# Copy the published application from the build environment
COPY --from=build-env /app/out .

# Expose the port the app runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["dotnet", "Life.App.Backend.dll"]