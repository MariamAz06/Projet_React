import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Navigation from './components/Navigation'; 
import Home from './pages/Home'; 
import Projects from './pages/Projects'; 
import ProjectDetails from './pages/ProjectDetails'; 
import './styles/main.css'; 
import './styles/animations.css'; 

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
