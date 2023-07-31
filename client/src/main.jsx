import React from 'react';
import { createRoot } from 'react-dom/client';
import AuthProvider from './providers/AuthProvider';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DarkModeProvider } from './providers/DarkModeProvider';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <DarkModeProvider>
          <Toaster />
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </DarkModeProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
