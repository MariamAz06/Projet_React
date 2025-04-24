import { Container, Card } from 'react-bootstrap'; // Importation des composants Container et Card de Bootstrap
import { Link } from 'react-router-dom'; // Importation du composant Link pour la navigation

const Home = () => { // Définition du composant Home
  return (
    <Container className="text-center mt-5"> {/* Container centré avec un margin-top */}
      <Card className="p-5 shadow"> {/* Carte avec padding et ombre */}
        <h1 className="mb-4">Bienvenue dans le Gestionnaire de Projets</h1> {/* Titre principal */}
        <p className="lead mb-4"> {/* Paragraphe introductif */}
          Une application simple pour gérer vos projets et leurs tâches associées.
        </p>
        <div className="d-grid gap-2 col-md-6 mx-auto"> {/* Conteneur pour le bouton, centré et espacé */}
          <Link to="/projects" className="btn btn-primary btn-lg"> {/* Lien qui redirige vers la page des projets avec un bouton large */}
            Voir mes projets
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default Home;