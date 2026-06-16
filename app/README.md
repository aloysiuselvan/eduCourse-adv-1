# VideoBelajar-Full

A premium, high-performance video learning platform built with **React**, **Vite**, and **Tailwind CSS**. This project features a modern feature-based architecture, full mobile responsiveness, and clean, human-written code.

## Key Features

- **Fully Responsive**: Optimized for all devices, from mobile phones to high-resolution desktops.
- **Premium UI/UX**: Modern design with consistent branding, smooth transitions, and intuitive navigation.
- **Scalable Architecture**: Organized using a feature-based structure for easy maintenance and expansion.
- **Redux Toolkit State Management**: Implements centralized state management using `@reduxjs/toolkit` and `react-redux` for predictable state transitions and easy scaling.
- **Asynchronous CRUD API**: Fully integrated with a REST API backend (MockAPI) via `axios` with interceptors for logging and global request management.
- **Client-Side Image Upload**: Uses `FileReader` (Base64) to allow robust local image uploads and updates that sync with the API and Redux store.
- **Complete Flow**: Includes course browsing, product details, payment checkout, student dashboards, and course management dashboard.

##  Tech Stack

- **Frontend**: React 18+
- **Build Tool**: Vite
- **State Management**: Redux Toolkit & React Redux
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios (with custom interceptors)
- **Routing**: React Router DOM

## Project Structure

```bash
video-belajar-full/
├── app/                  
│   ├── src/
│   │   ├── assets/       
│   │   ├── components/   
│   │   ├── features/     
│   │   ├── layouts/      
│   │   ├── pages/        
│   │   ├── services/      # Axios API integration
│   │   │   └── api.js
│   │   ├── store/         # Redux Toolkit State Management
│   │   │   └── redux/     
│   │   │       ├── courseSlice.js
│   │   │       └── store.js
│   │   ├── App.jsx       
│   │   └── main.jsx      
│   ├── .env              # Local Environment Variables
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md             
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Environment Setup

Create a `.env` file in the `app` directory and specify your MockAPI endpoint URL:

```env
VITE_API_URL=https://6a0bbc2d5aa893e1015a6c02.mockapi.io/api/v1
```

### Installation

1. Navigate to the application directory:
   ```bash
   cd app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Application Usage Guide

Once the server is running, you can access the application through your browser:

1. **Homepage (`/`)**: 
   - View the landing page and browse all available courses. The latest courses added by the admin will appear at the top-left of the course grid automatically.

2. **Course Management (`/manage-courses`)**:
   - Access the dedicated **CRUD Dashboard**.
   - Browse the tabular list of all courses currently in the system state.
   - Click **"Tambah Course"** to add a new course via the `/manage-courses/add` route.
   - You can upload custom thumbnail images from your local computer. The app uses the `FileReader API (Base64)` to simulate image uploading directly on the client-side without needing a backend server!
   - Real-time updates: Any additions, edits, or deletions made here will immediately sync to the global state and reflect on the Homepage.
