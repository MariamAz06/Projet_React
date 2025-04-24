import { Container, Row, Col, Button } from 'react-bootstrap'; // Import des composants Bootstrap pour la mise en page
import { Link } from 'react-router-dom'; // Import du composant Link pour la navigation sans rechargement

// Composant fonctionnel Home
const Home = () => {
  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-4"
      // Conteneur fluide prenant toute la hauteur de la vue, centré verticalement et horizontalement
    >
      <Row className="w-100 justify-content-center">
        {/* Ligne Bootstrap centrée horizontalement avec une largeur de 100% */}
        <Col xs={12} md={10} lg={8} xl={6}>
          {/* Colonne responsive s'adaptant aux tailles d'écran */}
          <div
            className="p-5 rounded-5 shadow-lg bg-white text-center animate__animated animate__fadeIn"
            // Bloc avec padding, coins arrondis, ombre portée, fond blanc, centré et animé
            style={{
              background: 'linear-gradient(145deg, #f8f9fa, #ffffff)', // Dégradé clair en fond
              border: '1px solid #e9ecef', // Bordure légère
            }}
          >
            <h1 className="fw-bold display-4 mb-2 text-gradient">
              {/* Titre principal avec effet de texte gradient */}
              Bienvenue sur <span className="text-primary">Project Manager</span>
            </h1>
            <p className="fs-5 text-muted mb-4">
              {/* Paragraphe de présentation avec style atténué */}
              Votre hub personnel pour organiser, prioriser et suivre l’évolution de tous vos projets.
            </p>

            <Link to="/projects">
              {/* Lien vers la page des projets */}
              <Button
                size="lg"
                variant="primary"
                className="rounded-pill px-5 py-2 shadow"
                // Bouton large avec coins arrondis, padding et ombre
              >
                Explorer mes projets 🚀
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home; // Export du composant Home
