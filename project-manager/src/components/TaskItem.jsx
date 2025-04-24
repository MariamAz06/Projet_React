import { Card, Form, Button, Badge } from 'react-bootstrap'; // Importation des composants de Bootstrap
import styles from './TaskItem.module.css'; // Importation des styles CSS modules

const TaskItem = ({ task, onToggle, onDelete }) => { // Destructuration des props : tâche, fonction de bascule (toggle) et fonction de suppression
  return (
    <Card className={`mb-3 ${styles.card}`}> {/* Carte pour afficher la tâche */}
      <Card.Body className={styles.body}> {/* Corps de la carte */}
        <div className={styles.taskContent}> {/* Contenu de la tâche */}
          <Form.Check
            type="checkbox" // Case à cocher pour marquer la tâche comme terminée
            checked={task.completed} // Marque la case en fonction de l'état de la tâche (complétée ou non)
            onChange={() => onToggle(task.id)} // Appelle la fonction onToggle pour basculer l'état de complétion
            className={styles.checkbox} // Classe CSS pour personnaliser la case à cocher
          />
          <div>
            <span className={task.completed ? styles.completed : styles.title}> {/* Affiche le titre de la tâche avec une classe dynamique */}
              {task.title} {/* Titre de la tâche */}
            </span>
            {task.description && ( // Si une description existe, l'afficher
              <div className={styles.description}>
                {task.description} {/* Description de la tâche */}
              </div>
            )}
          </div>
        </div>
        <div className={styles.actions}> {/* Conteneur pour les actions (priorité et suppression) */}
          <Badge className={`${styles.badge} me-2 ${task.priority === 'haute' ? styles.highPriority : task.priority === 'moyenne' ? styles.mediumPriority : styles.lowPriority}`}>
            {task.priority || 'basse'} {/* Affichage de la priorité avec une classe dynamique */}
          </Badge>
          <Button
            variant="outline-danger" // Bouton de suppression avec variante 'outline-danger'
            size="sm" // Taille du bouton
            onClick={() => onDelete(task.id)} // Appelle la fonction onDelete pour supprimer la tâche
            className={styles.deleteButton} // Classe CSS pour le bouton de suppression
          >
            Supprimer {/* Texte du bouton */}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskItem; // Export du composant TaskItem
