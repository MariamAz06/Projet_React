import { useState } from 'react'; 
import { Form, Button, Modal, FloatingLabel } from 'react-bootstrap'; 
import styles from './TaskForm.module.css'; 

const TaskForm = ({ show, onHide, onSubmit, initialData }) => { // Destructuration des props : état de la modal, fonction de fermeture, fonction de soumission et données initiales
  const [title, setTitle] = useState(initialData?.title || ''); // État pour le titre de la tâche, initialisé avec initialData si disponible
  const [description, setDescription] = useState(initialData?.description || ''); // État pour la description de la tâche
  const [priority, setPriority] = useState(initialData?.priority || 'basse'); // État pour la priorité, par défaut 'basse'

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    onSubmit({ title, description, priority }); // Soumettre les données de la tâche
    setTitle('');
    setDescription('');
    setPriority('basse');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} className={styles.modal}> {/* Modal qui s'affiche en fonction de la prop show */}
      <Modal.Header closeButton className={styles.header}> {/* Entête de la modal avec bouton de fermeture */}
        <Modal.Title className={styles.title}>
          {initialData ? 'Modifier' : 'Nouvelle'} Tâche {/* Titre qui change en fonction des données initiales */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.body}> {/* Corps de la modal */}
        <Form onSubmit={handleSubmit}> {/* Formulaire de soumission */}
          <FloatingLabel controlId="taskTitle" label="Titre de la tâche" className={`mb-3 ${styles.label}`}> {/* Label flottant pour le titre */}
            <Form.Control
              type="text"
              placeholder="Titre de la tâche"
              value={title} // Valeur liée à l'état du titre
              onChange={(e) => setTitle(e.target.value)} // Mise à jour de l'état lors de la saisie
              required
              className={styles.input} // Classe CSS pour le champ
            />
          </FloatingLabel>

          <FloatingLabel controlId="taskDescription" label="Description" className={`mb-3 ${styles.label}`}> {/* Label flottant pour la description */}
            <Form.Control
              as="textarea" // Champ de texte pour la description
              placeholder="Description"
              value={description} // Valeur liée à l'état de la description
              onChange={(e) => setDescription(e.target.value)} // Mise à jour de l'état lors de la saisie
              className={styles.input}
              style={{ height: '100px' }} // Style en ligne pour définir la hauteur de la zone de texte
            />
          </FloatingLabel>

          <Form.Group className={`mb-3 ${styles.formGroup}`}> {/* Groupe de champs pour la priorité */}
            <Form.Label className={styles.label}>Priorité</Form.Label> {/* Label pour la priorité */}
            <Form.Select 
              value={priority} // Valeur liée à l'état de la priorité
              onChange={(e) => setPriority(e.target.value)} // Mise à jour de l'état lors de la sélection
              className={styles.select} // Classe CSS pour le champ
            >
              <option value="basse">Basse</option> {/* Options de priorité */}
              <option value="moyenne">Moyenne</option>
              <option value="haute">Haute</option>
            </Form.Select>
          </Form.Group>

          <div className={styles.buttonContainer}> {/* Conteneur pour le bouton de soumission */}
            <Button variant="primary" type="submit" className={styles.submitButton}>
              {initialData ? 'Modifier' : 'Ajouter'} {/* Texte du bouton selon l'existence des données initiales */}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskForm; // Export du composant TaskForm
