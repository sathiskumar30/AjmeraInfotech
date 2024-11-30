# React Profile Management Application

## Task Overview:
This is a Profile Management Application where users can create, update, and view their profile details. The application provides routing between different pages, form validation, API integration, error handling, and local storage for persistence.

---

## Features:
1. **Profile Form Page**:
   - Collects user details such as:
     - Name (text input)
     - Email (email input)
     - Age (optional number input)
   - Form validation (Name: Required, Email: Valid format, Age: Optional but must be a valid number).
   - API integration for submitting user profile data (POST/PUT).
   - Success and error message handling.

2. **Profile Display Page**:
   - After form submission, users are redirected to the Profile page.
   - Displays saved profile data fetched via an API (GET).
   - If no profile exists, displays a prompt to create one.
   - Handles API errors (404, server errors).

3. **Routing**:
   - Uses React Router for navigation between:
     - `/profile-form` – Form for creating/updating the profile.
     - `/profile` – Displays saved profile data.
     - `/404` – Custom page for non-existent routes.

4. **Data Persistence**:
   - Profile data is stored in local storage to persist across page refreshes.
   - On loading the profile page, checks local storage first for existing data.

5. **Global State Management**:
   - Uses React Context API for managing profile data and API status globally across the app.
   - Displays user’s first and last name in the navigation bar.

6. **Environment Variables**:
   - Configures the API base URL using environment variables (`.env` file).
   - Supports switching between development and production modes based on environment.

7. **Bonus Features**:
   - Delete Profile button with confirmation prompt.
   - Option to edit the profile by pre-filling the form with existing data.
   - Deployed application.

---

## Setup Instructions:

### Prerequisites:
- Node.js and npm installed on your machine.

### Install Dependencies:
1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd <project-folder>
