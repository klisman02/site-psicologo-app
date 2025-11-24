import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// Importação de estilos (deve incluir o Tailwind se você estiver usando)
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <App />
    </React.StrictMode>
);