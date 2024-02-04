import Project from "./components/Project";
import ListSection from "./components/listSection";
import Adding from "./components/Adding";

import {useState} from "react";
import NoProjectSelected from "./components/NoProjectSelected";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleAddTask = (text) => {
    setProjectsState((prevProject) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevProject.selectedProjectId,
        id: taskId,
      };
      return {
        ...prevProject,
        tasks: [...prevProject.tasks, newTask],
      };
    });
  };
  const handleDeleteTask = (id) => {
    setProjectsState((prevState) => {
        return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => {
          return task.id !== id;
        }),
      };
    });
  };

  const handleDeleteProject = () => {
    setProjectsState((prevState) => {
      console.log(projectsState.selectedProjectId);
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => {
          return project.id !== prevState.selectedProjectId;
        }),
      };
    });
  };

  const handleStartAddProject = () => {
    setProjectsState((prevProject) => {
      return {
        ...prevProject,
        selectedProjectId: null,
      };
    });
  };

  const handleAddProject = (projectData) => {
    setProjectsState((prevProject) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prevProject,
        selectedProjectId: undefined,
        projects: [...prevProject.projects, newProject],
      };
    });
  };

  const cancelAdding = () => {
    setProjectsState((prevProject) => {
      return {
        ...prevProject,
        selectedProjectId: undefined,
      };
    });
  };

  const handleAccessProject = (id) => {
    setProjectsState((prevProject) => {
      return {
        ...prevProject,
        selectedProjectId: id,
      };
    });
  };
  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <Project
      project={selectedProject}
      onDeleteProject={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = <Adding onAdd={handleAddProject} cancelAdding={cancelAdding} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <ListSection
          projects={projectsState.projects}
          onStartAddProject={handleStartAddProject}
          onSelectProject={handleAccessProject}
          selectedProjectId={projectsState.selectedProjectId}
        />
        {content}
      </main>
    </>
  );
}

export default App;
