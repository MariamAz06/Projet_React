import { useState, useEffect } from 'react'; // Importation des hooks React pour gérer l'état et les effets
import { Form, Button, Modal, FloatingLabel } from 'react-bootstrap'; // Importation des composants Bootstrap pour les formulaires et les modales
import styles from './ProjectForm.module.css'; // Importation des styles CSS modules

const ProjectForm = ({ show, onHide, onSubmit, initialData }) => { // Destructuration des props : état de la modal, fonction pour la fermer, fonction pour soumettre le formulaire et données initiales
  const [title, setTitle] = useState(''); // État pour le titre du projet
  const [description, setDescription] = useState(''); // État pour la description du projet

  // useEffect pour mettre à jour les champs du formulaire si des données initiales sont fournies
  useEffect(() => {
    if (initialData) { 
      setTitle(initialData.title); // Remplir le titre avec les données initiales si disponibles
      setDescription(initialData.description); // Remplir la description avec les données initiales si disponibles
    } else {
      setTitle(''); // Sinon, réinitialiser le titre
      setDescription(''); // Et réinitialiser la description
    }
  }, [initialData, show]); // Déclenche le useEffect à chaque changement de initialData ou de show

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)
    onSubmit({ title, description }); // Soumettre les données du formulaire
    onHide(); // Fermer la modal après soumission
  };

  return (
    <Modal show={show} onHide={onHide} centered className={styles.modal}> {/* Modal qui s'affiche selon la prop show */}
      <Modal.Header closeButton className={styles.header}> {/* Entête de la modal avec bouton de fermeture */}
        <Modal.Title className={styles.title}>{initialData ? 'Modifier' : 'Nouveau'} Projet</Modal.Title> {/* Titre qui change selon la présence de données initiales */}
      </Modal.Header>
      <Modal.Body className={styles.body}> {/* Contenu principal de la modal */}
        <Form onSubmit={handleSubmit}> {/* Formulaire avec soumission gérée par handleSubmit */}
          <FloatingLabel controlId="title" label="Titre" className={`mb-3 ${styles.label}`}> {/* Label flottant pour le titre */}
            <Form.Control
              type="text"
              placeholder="Titre du projet"
              value={title} // Valeur liée à l'état du titre
              onChange={(e) => setTitle(e.target.value)} // Mise à jour de l'état lors de la saisie
              required
              className={styles.input} // Classe CSS pour le champ
            />
          </FloatingLabel>
          
          <FloatingLabel controlId="description" label="Description" className={styles.label}> {/* Label flottant pour la description */}
            <Form.Control
              as="textarea" // Champ de texte pour la description
              placeholder="Description du projet"
              className={styles.textarea}
              value={description} // Valeur liée à l'état de la description
              onChange={(e) => setDescription(e.target.value)} // Mise à jour de l'état lors de la saisie
            />
          </FloatingLabel>
          
          <div className={styles.buttonContainer}> {/* Conteneur pour le bouton de soumission */}
            <Button 
              type="submit" 
              className={styles.submitButton}
            >
              {initialData ? 'Modifier' : 'Créer'} le Projet {/* Texte du bouton qui varie selon l'existence des données initiales */}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProjectForm; // Export du composant ProjectForm
