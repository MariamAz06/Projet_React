import { Navbar, Container, Nav } from 'react-bootstrap'; 
import { Link } from 'react-router-dom'; 
import styles from './Navigation.module.css'; 

const Navigation = () => {
  return (
    <Navbar expand="lg" fixed="top" className={styles.navbar}> {/* Barre de navigation fixe en haut, responsive */}
      <Container> {/* Conteneur pour centrer et organiser le contenu */}
        <Navbar.Brand className={styles.brand}>Project Manager</Navbar.Brand> {/* Nom/logo de l'application */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" /> {/* Bouton pour afficher/cacher la navigation en petit écran */}
        <Navbar.Collapse id="basic-navbar-nav"> {/* Conteneur des liens de navigation */}
          <Nav className="ms-auto"> {/* Aligne les liens à droite */}

            <Nav.Link as={Link} to="/" className={styles.link}>Accueil</Nav.Link> {/* Lien vers la page d'accueil */}
            <Nav.Link as={Link} to="/projects" className={styles.link}>Projets</Nav.Link> {/* Lien vers la page des projets */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;