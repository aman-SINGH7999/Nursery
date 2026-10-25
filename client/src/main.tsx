import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import { RouterProvider } from 'react-router-dom'
import { store } from "@/redux/store"
import { router } from '@/app/routes'
import './index.css'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { AlertProvider } from './context/AlertContext'
import GlobalAlert from './components/GlobalAlert'
import IsLogin from './pages/auth/IsLogin'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
    <Provider store={store}>
      <AlertProvider>
        <GlobalAlert />
        <RouterProvider router={router} />
        <IsLogin />
      </AlertProvider>
    </Provider>
    </MantineProvider>
  </StrictMode>,
)
