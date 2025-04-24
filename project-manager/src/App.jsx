import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importation des composants de routage
import Navigation from './components/Navigation'; // Importation du composant de navigation
import Home from './pages/Home'; // Importation de la page d'accueil
import Projects from './pages/Projects'; // Importation de la page des projets
import ProjectDetails from './pages/ProjectDetails'; // Importation de la page de détails d'un projet
import './styles/main.css'; // Importation du fichier de styles principaux
import './styles/animations.css'; // Importation du fichier de styles pour les animations

function App() {
  return (
    <BrowserRouter> 
      {/* Le BrowserRouter permet d'utiliser le routage dans l'application */}
      <div className="particles-bg">
        {/* Ajoute un fond d'effets particules */}
        <Navigation />
        {/* Affiche le composant de navigation en haut */}
        
        <div className="main-content fade-in-up">
          {/* Zone principale du contenu avec une animation d'entrée */}
          
          <Routes>
            {/* Définit les différentes routes de l'application */}
            
            <Route path="/" element={<Home />} />
            {/* La route pour la page d'accueil */}
            
            <Route path="/projects" element={<Projects />} />
            {/* La route pour afficher la liste des projets */}
            
            <Route path="/projects/:id" element={<ProjectDetails />} />
            {/* La route pour afficher les détails d'un projet spécifique (id dynamique) */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
