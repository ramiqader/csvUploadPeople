# CSV Uploader Project

This project is a web application that allows users to upload CSV files containing people information (e.g., first name, last name, email, and age). The app displays the uploaded people in a paginated table.

## Requirements

- **Docker**: For containerized setup.
- **Docker Compose**: To manage multi-container Docker applications.
- **Git**: To clone the repository.

## Running the Project with Docker

### 1. Clone the Repository

Start by cloning this repository to your local machine:

```bash
git clone https://github.com/yourusername/your-repository-name.git
cd your-repository-name
2. Set up the Docker Containers
Make sure you have Docker and Docker Compose installed. If not, follow the installation guide on the Docker website.

Now, you can set up and run both the frontend and backend using Docker Compose.

Build and start the containers:
docker-compose up --build
This command will:

Build the Docker images for both the frontend (React) and backend (Django).

Start the containers and expose the frontend on http://localhost:3000 and the backend on http://localhost:8000.

3. Database Setup 
If this is the first time you're running the project, you'll need to set up the database. Docker Compose should automatically handle this, but if you need to run migrations manually, you can execute the following:

docker-compose exec backend python manage.py migrate
This will apply any database migrations required by the backend (Django).

4. Running the Project
Once the containers are up and running, you can visit the following URLs:

Frontend: Open your browser and go to http://localhost:3000 to access the React application.

Backend: The Django backend API is available at http://localhost:8000.

5. Uploading a CSV File
Once the project is running:

Go to the frontend at http://localhost:3000.

Upload a CSV file with the following columns: first_name, last_name, email, age.

The uploaded people will be displayed in a paginated table on the frontend.

6. Available API Endpoints
POST /api/upload/: Upload a CSV file containing people data.

GET /api/list/?page=1: Fetch a paginated list of people. (Adjust the page query parameter to navigate through different pages).

Challenges:
After Docker was set up, I encountered migration issues due to missing tables in the SQLite database. This was resolved by running docker-compose exec backend python manage.py migrate.
Initially, the API was not accessible from the frontend due to incorrect Docker networking settings. Ensured that backend:8000 was correctly referenced in the frontend code for Axios requests.
Initially, the upload functionality didn’t handle validation properly. I had to ensure the uploaded CSV file had the correct columns and handle errors gracefully, such as invalid emails or missing required fields.
After Docker was set up, I encountered migration issues due to missing tables in the SQLite database. This was resolved by running docker-compose exec backend python manage.py migrate.
