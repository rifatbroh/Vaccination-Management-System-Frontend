
# Vaccination-Management-System-Frontend

[![Netlify Status](https://api.netlify.com/api/v1/badges/e56dde49-c337-45e2-8120-970cc2293c4e/deploy-status)](https://app.netlify.com/projects/healthy-horizon/deploys)

## Overview

The Vaccination-Management-System-Frontend is a web application built with React that provides a user-friendly interface for managing and accessing vaccination information. This project aims to streamline the vaccination process for both healthcare providers and individuals.

## Features

- **User Authentication:** Secure login and registration for different user roles (e.g., administrators, healthcare providers, patients).
- **Vaccination Scheduling:** Allows users to schedule vaccination appointments.
- **Vaccination Records:** Stores and displays vaccination records for individuals.
- **Inventory Management:** Manages vaccine stock and availability.
- **Reporting:** Generates reports on vaccination statistics.
- **Email Notifications:** Sends automated email notifications for appointment reminders and updates.

## Technologies Explained

- **React:** A JavaScript library for building user interfaces.
- **React Router DOM:** For handling navigation and routing within the application.
- **Axios:** For making HTTP requests to the backend API.
- **Tailwind CSS:** A utility-first CSS framework for styling the application.
- **Flowbite:** A UI component library built on top of Tailwind CSS.
- **React Icons:** For including icons in the application.
- **React Datepicker:** For date and time selection.
- **JWT Decode:** For decoding JSON Web Tokens.
- **React Spring:** For animations.
- **React Web Vitals:** For measuring performance in real time.

## Technologies Used
  
  <p align="">
  <!-- 🔹 First Row (10 items) -->
  <img src="https://skillicons.dev/icons?i=react,tailwind,js,nodejs,express,mongodb" />
</p>

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js:** Ensure Node.js is installed on your system. It is recommended to use version 18 or higher. You can download it from [nodejs.org](https://nodejs.org/).
- **npm (Node Package Manager):** npm is distributed with Node.js, which means that when you download Node.js, you automatically get npm installed on your computer.

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/rifatbroh/Vaccination-Management-System-Frontend.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd Vaccination-Management-System-Frontend
    ```

3.  Install the dependencies:

    ```bash
    npm install
    ```

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the necessary environment variables. For example:

    ```
    REACT_APP_API_BASE_URL=https://your-backend-api.com
    ```

## Development

To start the development server, run:

```bash
npm run dev
```

This will start the application in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Building for Production

To build the application for production, run:

```bash
npm run build
```

This will create an optimized build of the application in the `dist` directory.

## Usage

1.  **Running the Application:**

    After building the application, deploy the contents of the `dist` folder to a web server.

2.  **Accessing the Application:**

    Open your web browser and navigate to the deployed URL to access the Vaccination Management System.

## Project Structure

```
Vaccination-Management-System-Frontend/
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── index.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx
│   ├── assets/
│   │   ├── vaccine.png
│   │   └── vite.svg
│   ├── components/
│   │   ├── AddVaccine.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AllUsers.jsx
│   │   ├── Appointment.jsx
│   │   ├── BarChart.jsx
│   │   ├── BookAppointment.jsx
│   │   ├── Card.jsx
│   │   ├── DashboardCard.jsx
│   │   ├── DoctorDashboard.jsx
│   │   ├── EditVaccine.jsx
│   │   ├── Footer.jsx
│   │   ├── LineChart.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── PatientDashboard.jsx
│   │   ├── Profile.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SignUp.jsx
│   │   ├── Table.jsx
│   │   └── VaccineCard.jsx
│   ├── email.html
│   ├── index.css
│   ├── main.jsx
│   ├── pages/
│   │   ├── Admin.jsx
│   │   ├── Doctor.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Patient.jsx
│   └── utils/
│
