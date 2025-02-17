import { useSelector } from "react-redux";
import { modalNameSelector } from "./modules/modals/slice";
import { ProjectsModal } from "./ProjectsModal";
import { ProjectSaveModal } from "./ProjectSaveModal";

export const ModalLayer = () => {
  const modalName = useSelector(modalNameSelector);

  switch (modalName) {
    case "PROJECTS_MODAL": {
      return <ProjectsModal />;
    }
    case "PROJECTS_SAVE_MODAL": {
      return <ProjectSaveModal />;
    }
    default:
      return null;
  }
};
