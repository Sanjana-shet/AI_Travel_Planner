import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import Hero from './components/custom/Hero.jsx';
import CreateTrip from './create-trip/index.jsx';
import Viewtrip from './view-trip/[tripId]/index.jsx';
import MyTrips from './pages/MyTrips.jsx';
import Header from './components/custom/Header';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Chatbot from './components/custom/Chatbot';

// Shared layout wrapper for all pages
function Layout() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <div className="pt-20">
        <Outlet />
      </div>
      <Chatbot />
    </GoogleOAuthProvider>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Hero /> },
      { path: '/create-trip', element: <CreateTrip /> },
      { path: '/view-trip/:tripId', element: <Viewtrip /> },
      { path: '/my-trips', element: <MyTrips /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

