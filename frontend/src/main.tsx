import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from '@mui/material'
import {BrowserRouter} from "react-router-dom";
import { AuthProvider } from './context/AuthContext.tsx'
import { Toaster } from 'react-hot-toast'

const theme = createTheme({
  typography : { fontFamily: "audiowide", allVariants: {color: "rgb(129, 137, 15"},
},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <ThemeProvider theme={theme}>
      <Toaster position='top-right'/>
      <App />
    </ThemeProvider>
    </AuthProvider>
     </BrowserRouter>
  </React.StrictMode>,
)
