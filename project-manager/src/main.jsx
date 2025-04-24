import React from 'react'; 
// Importation de React, nécessaire pour définir les composants React

import ReactDOM from 'react-dom/client'; 
// Importation de ReactDOM pour manipuler le DOM et rendre l'application React

import App from './App'; 
// Importation du composant principal de l'application (App)

import 'bootstrap/dist/css/bootstrap.min.css'; 
// Importation des styles Bootstrap pour appliquer les styles par défaut de Bootstrap à l'application

ReactDOM.createRoot(document.getElementById('root')).render(
  // Crée un "root" (racine) pour rendre l'application dans l'élément HTML avec l'ID 'root'
  
  <React.StrictMode>
    {/* React.StrictMode aide à détecter des problèmes potentiels dans l'application */}
    
    <App /> 
    {/* Rend le composant principal de l'application (App) */}
    
  </React.StrictMode>,
);
