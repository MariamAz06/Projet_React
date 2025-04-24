import { Card, Button, Badge } from 'react-bootstrap'; // Importation des composants Bootstrap nécessaires
import { Link } from 'react-router-dom'; // Importation du composant Link pour la navigation avec React Router
import styles from './ProjectCard.module.css'; // Importation des styles CSS modules

const ProjectCard = ({ project, onDelete }) => { // Destructuration des props : projet et fonction de suppression
  const completedTasks = project.tasks?.filter(task => task.completed).length || 0; // Nombre de tâches complétées
  const totalTasks = project.tasks?.length || 0; // Nombre total de tâches

  return (
    <Card className={`mb-3 ${styles.card}`}> {/* Carte de projet avec un espacement en bas */}
      <Card.Body> {/* Contenu de la carte */}
        <Card.Title className={styles.title}>{project.title}</Card.Title> {/* Titre du projet */}
        <Card.Text className={styles.description}>{project.description}</Card.Text> {/* Description du projet */}
        <div className={styles.footer}> {/* Conteneur pour la section footer de la carte */}
          <Badge className={styles.badge}> {/* Badge indiquant le nombre de tâches complétées sur total */}
            {completedTasks}/{totalTasks} tâches
          </Badge>
          <div>
            <Link to={`/projects/${project.id}`} className={`btn btn-sm btn-outline-primary me-2 ${styles.button}`}> {/* Lien pour voir les détails du projet */}
              Voir
            </Link>
            <Button 
              variant="outline-danger" 
              size="sm"
              onClick={() => onDelete(project.id)} // Fonction de suppression du projet
              className={styles.button}
            >
              Supprimer
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard; // Export du composant ProjectCard
