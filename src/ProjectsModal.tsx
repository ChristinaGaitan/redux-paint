import { useDispatch } from "react-redux";
import { hide } from "./modules/modals/slice";
import { useSelector } from "react-redux";
import {
  getProjectsList,
  projectListSelector,
} from "./modules/projectsList/slice";
import { useEffect } from "react";
import { AppDispatch } from "./store";
import { loadProject } from "./modules/strokes/slice";

export const ProjectsModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const projectList = useSelector(projectListSelector);

  useEffect(() => {
    dispatch(getProjectsList());
  }, [dispatch]);

  const onLoadProject = (projectId: string) => {
    dispatch(loadProject(projectId));
    dispatch(hide());
  };

  return (
    <div className="window modal-panel">
      <div className="title-bar">
        <div className="title-bar-text">Load Project</div>
        <div className="title-bar-controls">
          <button aria-label="Close" onClick={() => dispatch(hide())}>
            Cancel
          </button>
        </div>
      </div>
      <div className="projects-container">
        {(projectList || []).map((project) => {
          return (
            <div
              key={project.id}
              onClick={() => onLoadProject(project.id)}
              className="project-card"
            >
              <img src={project.image} alt="thumbnail" />
              <div>{project.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
