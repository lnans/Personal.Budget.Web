# Life.App

## Description

This repository contains the source code for a personal life application. It helps users manage their finances or other things by tracking income and expenses, generating reports, and providing insights.

## Run locally

1. **Build and Run:**

```sh
# Only if you have .NET 9 and a PostgreSQL database installed
yarn install
yarn dev
```

Or:

```sh
# Only Docker installed
docker compose build --no-cache
docker-compose up

# To stop and remove all containers, images, and volumes
docker compose down --rmi all --volumes
```

2. **Open your browser and navigate to:**

```
http://localhost:6001
```
