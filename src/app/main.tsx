import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { AppRoutes } from '../components/AppRoutes.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const router = createBrowserRouter(createRoutesFromElements(AppRoutes()));
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
