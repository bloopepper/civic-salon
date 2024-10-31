# **Civic Salon README**

# For Back-end

**for Development Server**

Update the /.env file

run the code in terminal 
cd civic-salon
"uvicorn app:app --reload"

Now, follow the url in browser "http://127.0.0.1:8000/"

**for Docker**

This project uses Docker to containerize the Civic Salon Python application. Follow these steps to build and run the Docker container.

Prerequisites

Install Docker

Ensure you have git on your system

Building the Docker Image

Clone the project:

"git clone https://github.com/bloopepper/civic-salon.git"

cd civic-salon

Update the /app/.env file to make sure the fastapi can run successfully.

Build the Docker image from the project root directory:

docker build -t civic-salon .

This will create a Docker image named civic-salon.

Running the Docker Container

After building, run the container using:

docker run -p 8000:8000 civic-salon

This starts the container and maps port 8000 inside the container to port 8000 on your host machine.

Accessing the Application
The Civic Salon application should now be running at http://localhost:8000/docs.

Stopping the Container
To stop the running container:

Find the container ID:

docker ps
Stop the container:

docker stop [container ID]

Notes:

Ensure you're in the civic-salon directory when running Docker commands.

If port 8000 is already in use, you can change the port mapping in the docker run command, e.g., -p 8080:8000.

Troubleshooting:

If you encounter issues, check that:

Docker is correctly installed and running

All necessary files (Dockerfile, pyproject.toml, poetry.lock) are present in the project root

There are no permission issues preventing Docker from accessing necessary files

If problems persist, check the Docker logs for more information:

docker logs [container ID]

For any other issues or questions about the Civic Salon project, please refer to the GitHub repository or contact the project maintainers.



# For Front-end

This is a Next.js project bootstrapped with create-next-app.

**Getting Started**

First, make sure node module is installed.

First, run the development server:

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Geist, a new font family for Vercel.

# Learn More
To learn more about Next.js, take a look at the following resources:

Next.js Documentation - learn about Next.js features and API.

Learn Next.js - an interactive Next.js tutorial.

You can check out the Next.js GitHub repository - your feedback and contributions are welcome!
