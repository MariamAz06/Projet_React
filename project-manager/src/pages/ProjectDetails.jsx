import { useState, useEffect } from 'react'; // Importation de useState et useEffect pour gérer l'état et les effets secondaires
import { useParams, Link, useNavigate } from 'react-router-dom'; // Importation des hooks pour la gestion des paramètres et de la navigation
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Importation des fonctions Firebase pour manipuler les documents
import { db } from '../services/firebase'; // Importation de la configuration Firebase
import { Button, Card, ListGroup, Badge, Alert, Container, Stack } from 'react-bootstrap'; // Importation des composants Bootstrap
import TaskForm from '../components/TaskForm'; // Importation du formulaire de tâche
import TaskItem from '../components/TaskItem'; // Importation de l'élément de tâche

const ProjectDetails = () => {
  const { id } = useParams(); // Récupère l'ID du projet depuis l'URL
  const navigate = useNavigate(); // Hook pour la navigation programmée
  const [project, setProject] = useState(null); // État pour stocker les informations du projet
  const [showTaskForm, setShowTaskForm] = useState(false); // État pour afficher ou masquer le formulaire de tâche
  const [loading, setLoading] = useState(true); // État pour gérer le chargement des données
  const [error, setError] = useState(null); // État pour gérer les erreurs
  const [editingTask, setEditingTask] = useState(null); // État pour stocker la tâche en cours d'édition

  useEffect(() => { // Utilisation de useEffect pour charger le projet lorsque le composant est monté
    const fetchProject = async () => {
      try {
        const docRef = doc(db, 'projects', id); // Référence au document du projet dans Firestore
        const docSnap = await getDoc(docRef); // Récupère les données du projet
        
        if (docSnap.exists()) { // Si le projet existe, on met à jour l'état
          setProject({ id: docSnap.id, ...docSnap.data() });
        } else { // Si le projet n'est pas trouvé, on affiche une erreur et on redirige
          setError("Projet non trouvé");
          navigate('/projects');
        }
        setLoading(false); // On arrête le chargement
      } catch (err) {
        setError("Erreur lors du chargement du projet"); // Gestion d'erreur en cas de problème avec Firebase
        setLoading(false);
        console.error(err);
      }
    };

    fetchProject(); // Appel de la fonction pour charger le projet
  }, [id, navigate]); // Le hook dépend de l'ID et de la fonction de navigation

  const handleAddTask = async (taskData) => { // Fonction pour ajouter une tâche au projet
    try {
      const updatedTasks = editingTask
        ? project.tasks.map(task => task.id === editingTask.id ? { ...taskData, id: editingTask.id } : task) // Modification si édition
        : [...project.tasks, { ...taskData, id: Date.now().toString(), completed: false }]; // Ajout si nouvelle tâche
      
      await updateDoc(doc(db, 'projects', id), {
        tasks: updatedTasks // Mise à jour des tâches du projet dans Firestore
      });
      
      setProject({ ...project, tasks: updatedTasks }); // Mise à jour de l'état avec les nouvelles tâches
      setShowTaskForm(false); // Masquer le formulaire
      setEditingTask(null); // Réinitialiser l'édition de tâche
    } catch (err) {
      setError("Erreur lors de l'ajout de la tâche"); // Gestion d'erreur pour l'ajout de tâche
      console.error(err);
    }
  };

  const handleToggleTask = async (taskId) => { // Fonction pour changer le statut d'une tâche (complétée ou non)
    try {
      const updatedTasks = project.tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task // Bascule de l'état "complété"
      );
      
      await updateDoc(doc(db, 'projects', id), {
        tasks: updatedTasks // Mise à jour des tâches dans Firestore
      });
      
      setProject({ ...project, tasks: updatedTasks }); // Mise à jour de l'état des tâches
    } catch (err) {
      setError("Erreur lors de la modification de la tâche"); // Gestion d'erreur pour la modification de tâche
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => { // Fonction pour supprimer une tâche du projet
    try {
      const updatedTasks = project.tasks.filter(task => task.id !== taskId); // Filtrer les tâches pour supprimer celle sélectionnée
      
      await updateDoc(doc(db, 'projects', id), {
        tasks: updatedTasks // Mise à jour des tâches dans Firestore
      });
      
      setProject({ ...project, tasks: updatedTasks }); // Mise à jour de l'état des tâches
    } catch (err) {
      setError("Erreur lors de la suppression de la tâche"); // Gestion d'erreur pour la suppression de tâche
      console.error(err);
    }
  };

  const handleEditTask = (task) => { // Fonction pour activer le mode édition pour une tâche
    setEditingTask(task); // Définir la tâche à éditer
    setShowTaskForm(true); // Afficher le formulaire de tâche
  };

  if (loading) return <Container className="text-center mt-5"><p>Chargement...</p></Container>; // Afficher le message de chargement si les données ne sont pas encore disponibles
  if (error) return <Alert variant="danger">{error}</Alert>; // Afficher une alerte d'erreur si un problème survient
  if (!project) return null; // Si le projet n'est pas trouvé, ne rien afficher

  const completedTasks = project.tasks?.filter(task => task.completed).length || 0; // Compter les tâches complétées
  const totalTasks = project.tasks?.length || 0; // Compter le nombre total de tâches

  return (
    <Container className="mt-4">
      <Button as={Link} to="/projects" variant="outline-secondary" className="mb-3">
        ← Retour aux projets
      </Button>
      
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>{project.title}</Card.Title> {/* Afficher le titre du projet */}
          <Card.Text>{project.description}</Card.Text> {/* Afficher la description du projet */}
          <Card.Text className="text-muted small">
            Créé le: {new Date(project.createdAt).toLocaleDateString()} {/* Afficher la date de création du projet */}
          </Card.Text>
          <Badge bg={totalTasks === completedTasks && totalTasks > 0 ? "success" : "primary"}>
            {completedTasks}/{totalTasks} tâches complétées
          </Badge>
        </Card.Body>
      </Card>
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Tâches</h2> {/* Titre de la section tâches */}
        <Button onClick={() => {
        setEditingTask(null);
          setShowTaskForm(true);}}> {/* Bouton pour ajouter une nouvelle tâche */}
          + Ajouter une tâche
        </Button>
      </div>
      
      {project.tasks?.length === 0 ? (
        <Alert variant="info">Aucune tâche pour ce projet. Ajoutez-en une!</Alert> // Alerte si aucune tâche n'est présente
      ) : (
        <ListGroup>
          {project.tasks?.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onEdit={() => handleEditTask(task)}
            />
          ))}
        </ListGroup>
      )}
      
      <TaskForm
        show={showTaskForm} // Afficher ou masquer le formulaire de tâche
        onHide={() => {
          setShowTaskForm(false); // Masquer le formulaire
          setEditingTask(null); // Réinitialiser la tâche en cours d'édition
        }}
        onSubmit={handleAddTask} // Soumettre une tâche
        initialData={editingTask} // Passer la tâche initiale si c'est une édition
      />
    </Container>
  );
};

export default ProjectDetails;
