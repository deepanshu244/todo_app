"# todo_app" 


 Setup & Installation
1️. Backend (Spring Boot) Setup

Clone the repository

bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker-backend
Configure database

Update application.properties with your DB credentials:

properties
spring.datasource.url=jdbcjdbc:postgresql://localhost:5432/expense
spring.datasource.username=your_username
spring.datasource.password=your_password
Run the Spring Boot app

bash
mvn spring-boot:run
The backend will run on http://localhost:8080


2. Frontend (React + Vite)

bash
cd expense-tracker-frontend
npm install  # Install dependencies
npm run dev  # Runs on http://localhost:5173

