import React from 'react'; 
import ReactDOM from 'react-dom/client'; 
import App from './App'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  // Crée un "root" (racine) pour rendre l'application dans l'élément HTML avec l'ID 'root'
  
  <React.StrictMode>
    {/* React.StrictMode aide à détecter des problèmes potentiels dans l'application */}
    
    <App /> 
    {/* Rend le composant principal de l'application (App) */}
    
  </React.StrictMode>,
);
