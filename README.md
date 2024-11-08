
# Food Order App

This is a food-ordering app built with React, Tailwind CSS, Auth0 for authentication, and Stripe for payment processing. The app allows users to browse meals, add them to their cart, and make payments.

## Features

- **Authentication**: Users can log in using Auth0.
- **Payment Processing**: Payment integration with Stripe (currently being updated to PhonePe).
- **Frontend**: Built with React, Tailwind CSS, and Vite for a responsive and performant UI.
- **Backend**: Node.js and Express for API and backend services.
- **Other Tools**: Framer Motion for animations, React Cursorify for custom cursors, and `@tsparticles` for particle animations.

---

## Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- Node.js and npm installed on your system.
- MongoDB for backend data (if using database features).
- A Stripe and Auth0 account for payment and authentication setup.

### Installation

1. **Clone the repository**:
   ```bash
   git clone http://manaspros.github.io/shop_project
   cd shop_project
   ```

2. **Install Frontend Dependencies**:
   In the root directory, run:
   ```bash
   npm install
   ```

3. **Run Frontend**:
   ```bash
   npm run dev
   ```

4. **Backend Setup**:
   Go to the backend folder:
   ```bash
   cd backend
   npm install
   npm start
   ```

### Usage

- **Frontend**: Runs on `http://localhost:3000` by default.
- **Backend**: Configured to handle API requests (ensure it matches the frontend's expectations for any API endpoints).

### Deployment

To deploy on GitHub Pages, you can run:
```bash
npm run deploy
```

### Scripts

- `npm run dev`: Start the frontend in development mode.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs the linter.
- `npm run preview`: Previews the production build locally.

### Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion
- **Authentication**: Auth0
- **Payment Processing**: Stripe
- **Backend**: Node.js, Express

---

## License

This project is licensed under the MIT License.
