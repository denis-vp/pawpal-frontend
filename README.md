# Development Guide

Please 🥺 read this guide before starting development.

## Useful Guides

- React: <https://react.dev/reference/react>
- Material-UI: <https://mui.com/material-ui/all-components/>
- Zustand: <https://zustand.docs.pmnd.rs/getting-started/introduction>
- Axios: <https://axios-http.com/docs/intro>

## Table of Contents

- [Development Guide](#development-guide)
  - [Useful Guides](#useful-guides)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
  - [Development Workflow](#development-workflow)
    - [Branch Naming](#branch-naming)
    - [Commit Message](#commit-message)
    - [Pull Request](#pull-request)
  - [Code Style](#code-style)

## Prerequisites

The project requires the following tools to be installed on your system: Node.js, NPM, Git, and an IDE.

## Getting Started

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/denis-vp/pawpal-frontend.git
   cd pawpal-frontend
    ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```bash
    NOTHING_JUST_YET
    ```

### Running the Application

1. Start the development server

   ```bash
    npm run dev
    ```
  
2. Open the browser and navigate to <http://localhost:5173/> (port may vary)

## Project Structure

Please 🥺 maintain a project structure similar to the one below:

```md
└── src/
    ├── assets/
    ├── api/
    ├── configs/
    ├── components/
    │   ├── auth/
    │   │   └── SignUpForm.tsx
    │   ├── payment/
    │   │   └── PaymentForm.tsx
    │   ├── common/
    │   │   └── Button.tsx
    │   └── employees/
    │       ├── EmployeeList.tsx
    │       └── EmployeeSummary.tsx
    ├── hooks/
    │   ├── auth/
    │   │   └── useAuth.ts
    │   ├── payment/
    │   │   └── usePayment.ts
    │   └── employees/
    │       ├── useEmployees.ts
    │       └── useUpdateEmployee.ts
    ├── lib/
    ├── services/
    ├── states/
    └── utils/
```

## Development Workflow

### Branch Naming

Please 🥺 follow the naming convention below when creating branches:

- `feature/feature-name`
- `bugfix/bug-name`
- `refactor/refactor-name`
- `chore/chore-name`
- `docs/docs-name`

### Commit Message

Please 🥺 make your commit messages imperative, i.e not past tense.  
Example: `Add health record filtering` instead of `Added health record filtering`.

### Pull Request

Pushing directly to the `main` branch is not allowed.  
Please pull and merge the latest changes from the `main` branch before creating a pull request.

## Code Style

Please 🥺 follow the code style guide below:

- Use camelCase for variable names.
- Use PascalCase for component names.
- Use TypeScript for type-checking.
- Use Material-UI components for UI elements.
- Use Zustand for state management.
- Use Axios for HTTP requests.
