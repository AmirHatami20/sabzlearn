import {createRoot} from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

import {ThemeProvider} from "./context/ThemeContext.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </AuthProvider>
)
