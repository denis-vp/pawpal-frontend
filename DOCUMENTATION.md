# PawPal Documentation

## Libraries and Frameworks
PawPal utilizes a variety of modern libraries and frameworks to ensure a robust, responsive, and maintainable application. The core dependencies are as follows:

### Production Dependencies
- **React (v18.3.1):** Core library for building the UI.
- **React DOM (v18.3.1):** Provides DOM-specific methods for React components.
- **React Router DOM (v6.27.0):** Handles routing and navigation.
- **Material-UI (v6.1.10):** Provides a set of ready-to-use UI components.
- **Zustand (v5.0.0):** Lightweight state management library.
- **Axios (v1.7.7):** Used for HTTP requests to interact with backend APIs.
- **Day.js (v1.11.13):** Handles date and time formatting.
- **Date-fns (v2.28.0):** Provides utility functions for date manipulation.
- **@emotion/react & styled:** Allows for styling components using CSS-in-JS.
- **React Icons (v5.3.0):** Provides icon sets for consistent UI design.

### Development Dependencies
- **Vite (v5.4.8):** Modern, fast development server and build tool.
- **TypeScript (v5.5.3):** Enables type checking and improved code maintainability.

---

## Technical Details

### Routing and Navigation
- Implemented using `React Router DOM` to manage navigation across pages.
- The routes are defined in `App.tsx` and structured as:
  - `/`: Redirects to the login page.
  - `/login`: User login page.
  - `/signup`: User registration page.
  - `/pets`: Displays a list of pets.
  - `/appointments`: Displays veterinary appointments.
  - `/profile`: User profile page.
  - `/notifications`: Placeholder for notifications.
  - `/:id`: Displays a detailed profile for a specific pet.

### State Management
- **Zustand** is used for managing global application state. The key state files include:
  - `apiStore.ts`: Centralizes API call logic.
  - `snackBarStore.ts`: Manages alert notifications and snackbar states.

### UI Design
- **Material-UI** provides pre-styled components to ensure a professional and consistent look.
- The custom theme is defined in `theme.tsx` to standardize colors, typography, and component styles.

---

#### Layers
1. **Presentation Layer:**
   - Consists of React components responsible for UI rendering.
   - Utilizes Material-UI for consistent design and theming.
2. **Business Logic Layer:**
   - Handles data manipulation and interactions through custom hooks and utility functions.
   - Manages state through `apiStore.ts` and `snackBarStore.ts`.
3. **Data Access Layer:**
   - Centralized API calls are managed in `apiStore.ts`.
   - Encapsulates logic for interacting with backend endpoints.

---

## Project Structure
The directory structure of the application is as follows:
└── src/
    ├── assets/
    ├── components/
    │   ├── cards/
    |   │   ├── AppointmentCard.tsx
    |   │   ├── DocumentCard.tsx
    |   │   ├── MedicalLogCard.tsx
    |   │   ├── PetCard.tsx
    │   │   └── VaccineLogCard.tsx
    │   ├── dialogs/
    |   │   ├── AddAppointmentDialog.tsx
    |   │   ├── AddMedicalLogDialog.tsx
    |   │   ├── AddPetDIalog.tsx
    |   │   ├── AddVaccineLogDialog.tsx
    |   │   ├── DeleteConfirmationDialog.tsx
    |   │   ├── EditMedicalLogDialog.tsx
    |   │   ├── EditPetDialog.tsx
    │   │   └── EditVaccineLogDialog.tsx
    │   ├── AlertSnackBar.tsx
    │   ├── Layout.tsx
    │   ├── ProfileDetails.tsx
    │   └── SideDrawer.tsx
    ├── models/
    │   ├── AnimalType.tsx
    │   ├── AppointmentStatus.tsx
    │   ├── MedicalLog.tsx
    │   ├── Pet.tsx
    │   ├── Role.tsx
    │   ├── User.tsx
    │   ├── VaccineLog.tsx
    │   └── VeterinaryAppointments.tsx
    ├── pages/
    │   ├── AppointmentsPage.tsx
    │   ├── LogInPage.tsx
    │   ├── PetProfilePage.tsx
    │   ├── PetsPage.tsx
    │   ├── ProfilePage.tsx
    │   └── SignUpPage.tsx
    ├── state/
    │    ├── apiStore.tsx
    │    └── snackBarStore.tsx
    ├── utils/
    │    ├── imageUtils.tsx
    │    └── theme.tsx
    ├── App.tsx
    ├── index.css
    └── main.tsx

### Root Level
- **App.tsx:** The main entry point for the application, initializing routing and theming.
- **main.tsx:** Bootstraps the React app.
- **index.css:** Contains global CSS styles.

### `src/assets`
Contains static assets like images and logos used across the application.

### `src/components`
Reusable components are divided into the following subdirectories:
1. **Cards**
   - **AppointmentCard.tsx:** Displays a single veterinary appointment.
   - **MedicalLogCard.tsx:** Displays a list of medical logs for a pet.
   - **VaccineLogCard.tsx:** Displays vaccination records for a pet.
   - **PetCard.tsx:** Displays basic pet details for the Pets page.
   - **DocumentCard.tsx:** Displays uploaded documents for a pet.

2. **Dialogs**
   - **AddAppointmentDialog.tsx:** Dialog for adding a new appointment.
   - **AddMedicalLogDialog.tsx:** Dialog for logging a new medical event.
   - **AddPetDialog.tsx:** Dialog for adding a new pet.
   - **AddVaccineLogDialog.tsx:** Dialog for logging a new vaccination.
   - **DeleteConfirmationDialog.tsx:** Confirmation dialog for delete actions.
   - **EditMedicalLogDialog.tsx:** Dialog for editing medical log entries.
   - **EditPetDialog.tsx:** Dialog for editing pet details.
   - **EditVaccineLogDialog.tsx:** Dialog for editing vaccination logs.

3. **AlertSnackBar.tsx:** Displays alerts and error messages as snackbars.

4. **SideDrawer.tsx:** Provides navigation options for the application.

5. **Layout.tsx:** Overall layout and structure for the application.

6. **ProfileDetails.tsx:** Provides layout and structure for the details section of `PetProfilePage`

### `src/models`
Defines the core data models used throughout the application.
1. **AnimalType.tsx**
   - Defines an enumeration for different animal types, including `DOG`, `CAT`, `REPTILE`, `COW`, `BIRD`, `RABBIT`, and `FISH`.

2. **AppointmentStatus.tsx**
   - Defines an enumeration for appointment statuses: `SCHEDULED`, `COMPLETED`, and `CANCELED`.

3. **MedicalLog.tsx**
   - Interface representing a medical log entry:
     - `id`: Unique identifier.
     - `reason`: Reason for the medical visit.
     - `diagnostic`: Diagnosis made during the visit.
     - `treatment`: Treatment prescribed.
     - `description`: Additional details.
     - `date`: Date of the visit.

4. **Pet.tsx**
   - Interface representing a pet:
     - `id`: Unique identifier.
     - `name`: Name of the pet.
     - `image`: Image URL or base64 data.
     - `isMale`: Gender of the pet.
     - `dateOfBirth`: Date of birth.
     - `breed`: Breed of the pet.
     - `weight`: Weight in kilograms.
     - `type`: Animal type, linked to `AnimalType`.

5. **Role.tsx**
   - Interface representing user roles:
     - `id`: Unique identifier.
     - `name`: Name of the role.

6. **User.tsx**
   - Interface representing a user:
     - `id`: Unique identifier.
     - `firstName`: First name.
     - `lastName`: Last name.
     - `email`: Email address.
     - `password`: Encrypted password.
     - `passwordAttempts`: Number of failed login attempts.
     - `isNew`: Whether the user is new.
     - `roles`: Array of `Role`.
     - `pets`: Array of `Pet`.

7. **VaccineLog.tsx**
   - Interface representing a vaccination log:
     - `id`: Unique identifier.
     - `type`: Type of vaccination.
     - `date`: Date of vaccination.
     - `renewDate`: Renewal date.

8. **VeterinaryAppointment.tsx**
   - Interface representing a veterinary appointment:
     - `id`: Unique identifier.
     - `user`: User associated with the appointment.
     - `petId`: ID of the pet.
     - `localDateTime`: Appointment date and time.
     - `status`: Appointment status, linked to `AppointmentStatus`.
     - `duration`: Duration in minutes.
     - `cost`: Cost of the appointment.


### `src/pages`
Contains top-level pages for the application:
1. **AppointmentsPage.tsx**
   - Displays user-specific veterinary appointments.
   - Allows adding new appointments and deleting existing ones.
   - Integrates `AppointmentCard` and `AddAppointmentDialog` components.
2. **LogInPage.tsx**
   - Handles user authentication.
   - Provides visual feedback on errors like invalid credentials or network issues.
3. **PetProfilePage.tsx**
   - Displays detailed information about a specific pet.
   - Shows medical logs, vaccination records, and uploaded documents.
   - Includes components like `MedicalLogCard`, `VaccineLogCard`, and `DocumentCard`.
4. **PetsPage.tsx**
   - Lists all pets associated with the user.
   - Supports adding new pets and removing existing ones.
   - Integrates `PetCard` and `AddPetDialog` components.
5. **ProfilePage.tsx**
   - Displays and updates user profile details.
   - Allows profile image uploads and password resets.
   - Utilizes `AlertSnackBar` for feedback.
6. **SignUpPage.tsx**
   - Handles user registration.
   - Provides error messages for duplicate registrations or incomplete inputs.

### `src/state`
Handles state management for the application:
1. **apiStore.ts:** Handles API interactions for fetching and modifying user and pet data.
     - Implements functions like `getAllPetsByUserId`, `getPetById`, and `updateUserImage`.
     - Uses `axios` for HTTP requests.
2. **snackBarStore.ts:** Manages state for displaying alerts.
     - Exposes methods like `openAlert` for consistent feedback across the application.

### `src/utils`
Contains utility functions:
1. **imageUtils.tsx**: Utility for handling image transformations:
    - addDataUrlPrefix: Adds a data URL scheme prefix to base64-encoded image strings, ensuring compatibility with HTML image elements.

2. **theme.tsx**: Defines the Material-UI theme for the application:
    - Includes custom palettes for primary and secondary colors.
    - Specifies typography settings (e.g., fonts, sizes).
    - Configures shape, tonal offsets, and button styling.
