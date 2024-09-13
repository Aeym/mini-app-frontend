# Mini App Frontend - Technical Test

This is a frontend application built using Vue 3, Vite, TypeScript, and Pinia for state management. The app also integrates TailwindCSS for styling.

## Application Overview

This web application provides a user-friendly responsive interface for managing nurseries and children within those nurseries. The key functionalities include:

### 1. User Authentication
- Users are prompted to log in with a username.
- If the username does not exist, users are prompted to register with an email.
- The authenticated user’s session is maintained and displayed in the page header.

### 2. Nursery Management
- A list of nurseries is displayed, allowing users to view, create, and delete nurseries.
- Users can navigate to a detailed page for each nursery.

### 3. Child Management
- On each nursery's detail page, users can view the list of children assigned to the nursery.
- Users can add new children to the nursery or remove their assignments.

### 4. Child Data Export
- Users can export child data to a CSV file.
- The export can include all children across all nurseries or only those associated with a specific nursery.
- Data is streamed to avoid performance issues with large datasets.

This application is designed to handle user authentication, nursery and child management, and data export efficiently through a streamlined and intuitive interface.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

```bash
git clone https://github.com/aeym/mini-app-frontend.git
cd mini-app-frontend
```

2. **Install dependencies**: Make sure you have Node.js installed, then run:

```bash
npm install
```

3. **Serve the application**:

```bash
npm run dev
```

4. **Access the application**:

Once the application is running, open your browser and go to:

```bash
http://localhost:5173/
```

## Testing

No tests have been implemented yet, but they will be added soon to ensure the application is robust and performs as expected.

## Future Improvements

Future improvements include adding tests, enhancing error handling, strengthening form validation, protecting sensitive fields, and optimizing performance.

Additionally, more effort can be made to follow the principles of Clean Code, KISS, YAGNI, and DRY.

## Contact

If you have any questions regarding this implementation, feel free to contact me at alrick.eymauzy@gmail.com or via GitHub.
