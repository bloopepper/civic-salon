# Civic Salon Docker Project README

This project uses Docker to containerize the Civic Salon Python application. Follow these steps to build and run the Docker container.

## Prerequisites

- Install [Docker](https://www.docker.com/get-started)
- Ensure you have `git` on your system

## Building the Docker Image

1. Clone the project:
   ```
   git clone https://github.com/bloopepper/civic-salon.git
   cd civic-salon
   ```

2. Build the Docker image from the project root directory:
   ```
   docker build -t civic-salon .
   ```
   This will create a Docker image named `civic-salon`.

## Running the Docker Container

After building, run the container using:

```
docker run -p 8000:8000 civic-salon
```

This starts the container and maps port 8000 inside the container to port 8000 on your host machine.

## Accessing the Application

The Civic Salon application should now be running at `http://localhost:8000`.

## Stopping the Container

To stop the running container:

1. Find the container ID:
   ```
   docker ps
   ```

2. Stop the container:
   ```
   docker stop [container ID]
   ```

## Notes

- Ensure you're in the `civic-salon` directory when running Docker commands.
- If port 8000 is already in use, you can change the port mapping in the `docker run` command, e.g., `-p 8080:8000`.

## Troubleshooting

If you encounter issues, check that:
- Docker is correctly installed and running
- All necessary files (Dockerfile, pyproject.toml, poetry.lock) are present in the project root
- There are no permission issues preventing Docker from accessing necessary files

If problems persist, check the Docker logs for more information:
```
docker logs [container ID]
```

For any other issues or questions about the Civic Salon project, please refer to the [