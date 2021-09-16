import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useOvermind } from "../../store";
import CardContainer from "./CardContainer";
import NewProjectButton from "./NewProjectButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const ProjectsContainerStyled = styled.div`
  overflow: hidden;
  min-height: 200px;
  max-height: 100%;
  padding: 24px;
  .projects-container {
    width: 100%;
    background: var(--bgGrey);
    border-radius: 12px;
    padding: 24px;
    min-height: 150px;
    max-height: 100%;
    display: flex;
    overflow: auto;
  }
`;

export default function ProjectContainer() {
  const {
    state: { projects: projectsState },
    actions: { projects: projectsActions },
  } = useOvermind();

  const { id } = useParams();

  useEffect(() => {
    projectsActions.getProjects({ id });
  }, []);

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    projectsActions.reorderCards({ destination, source, draggableId });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ProjectsContainerStyled>
        <div className="projects-container">
          {projectsState.projects.map((project) => (
            <Droppable droppableId={project._id} key={project._id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <CardContainer project={project} key={project._id} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
          <NewProjectButton boardId={id} />
        </div>
      </ProjectsContainerStyled>
    </DragDropContext>
  );
}