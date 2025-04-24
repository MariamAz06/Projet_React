import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/ProjectForm';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';

const Projects = () => {
  // Déclare les états pour les projets, l'affichage du formulaire, le chargement et les erreurs
  const [projects, setProjects] = useState([]); 
  const [showForm, setShowForm] = useState(false); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  // Récupère les projets à partir de Firestore lors du montage du composant
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Récupère tous les documents dans la collection 'projects'
        const querySnapshot = await getDocs(collection(db, 'projects'));
        
        // Mappe les documents récupérés en un tableau d'objets
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Met à jour l'état avec les projets récupérés
        setProjects(projectsData);
        setLoading(false);
      } catch (err) {
        // En cas d'erreur, définit un message d'erreur et arrête le chargement
        setError("Erreur lors du chargement des projets");
        setLoading(false);
        console.error(err);
      }
    };

    fetchProjects();
  }, []); // L'effet ne se déclenche qu'une fois, lors du montage du composant

  // Fonction pour ajouter un projet à Firestore
  const handleAddProject = async (projectData) => {
    try {
      // Ajoute un nouveau projet à Firestore et récupère la référence du document
      const docRef = await addDoc(collection(db, 'projects'), {
        ...projectData,
        createdAt: new Date().toISOString(), // Ajoute la date de création
        tasks: [] // Initialise le projet avec un tableau de tâches vide
      });
      
      // Met à jour l'état local avec le nouveau projet ajouté
      setProjects([...projects, { id: docRef.id, ...projectData, tasks: [] }]);
    } catch (err) {
      // En cas d'erreur, définit un message d'erreur
      setError("Erreur lors de l'ajout du projet");
      console.error(err);
    }
  };

  // Fonction pour supprimer un projet de Firestore
  const handleDeleteProject = async (projectId) => {
    try {
      // Supprime le projet de Firestore
      await deleteDoc(doc(db, 'projects', projectId));
      
      // Met à jour l'état local en filtrant le projet supprimé
      setProjects(projects.filter(project => project.id !== projectId));
    } catch (err) {
      // En cas d'erreur, définit un message d'erreur
      setError("Erreur lors de la suppression du projet");
      console.error(err);
    }
  };

  // Affiche un message de chargement pendant le processus de récupération des projets
  if (loading) return <Container className="text-center mt-5"><p>Chargement...</p></Container>;
  
  // Affiche un message d'erreur s'il y en a
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Mes Projets</h1>
        
        {/* Affiche un bouton pour ajouter un nouveau projet */}
        <Button onClick={() => setShowForm(true)} variant="primary">
          + Nouveau Projet
        </Button>
      </div>
      
      {/* Affiche un message si aucun projet n'existe */}
      {projects.length === 0 ? (
        <Alert variant="info">
          Vous n'avez aucun projet. Créez-en un pour commencer!
        </Alert>
      ) : (
        // Affiche la liste des projets sous forme de cartes
        <Row xs={1} md={2} lg={3} className="g-4">
          {projects.map(project => (
            <Col key={project.id}>
              <ProjectCard 
                project={project} 
                onDelete={handleDeleteProject} 
              />
            </Col>
          ))}
        </Row>
      )}
      
      {/* Affiche le formulaire de création de projet */}
      <ProjectForm 
        show={showForm} 
        onHide={() => setShowForm(false)} 
        onSubmit={handleAddProject}
      />
    </Container>
  );
};

export default Projects;
