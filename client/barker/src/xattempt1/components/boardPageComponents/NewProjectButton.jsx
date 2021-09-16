import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../styles/Button";
import { useOvermind } from "../../store";

const NewProjectButtonStyled = styled.div`
  min-width: 245px;
  min-height: 32px;
  margin: 0px 10px;
  position: relative;
  .add-card-action {
    width: 100%;
    height: 32px;
    border-radius: 8px;
    padding: 0px 12px;
    background: var(--lightBlue);
    color: var(--blue);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover {
      filter: brightness(90%);
    }
  }
  .new-button-form {
    border-radius: 8px;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 64px;
    background: var(--white);
    display: flex;
    flex-direction: column;
    padding: 15px;
    input {
      border: none;
      font-size: 0.9rem;
      width: 100%;
      height: 32px;
      outline: none;
      color: var(--textDark);
      margin-bottom: 5px;
    }
    .new-button-form--actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .material-icons {
        cursor: pointer;
      }
    }
  }
`;

export default function NewProjectButton({ boardId }) {
  const [showForm, setShowForm] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const {
    state: { projects: projectsState },
    actions: { projects: projectsActions },
  } = useOvermind();

  function addNewProjectHandler() {
    //ajax to add new list
    if (newProjectName.trim() === "") {
      return;
    }

    let newPosition = 0;

    if (projectsState.projects.length > 0) {
      newPosition = Math.max(...projectsState.projects.map((p) => p.position)) + 1;
    }

    console.log(newProjectName, newPosition);
    projectsActions.createNewProject({
      title: newProjectName,
      boardId,
      position: newPosition,
    });
    closeForm();
  }

  function closeForm() {
    setShowForm(false);
    setNewProjectName("");
  }

  return (
    <NewProjectButtonStyled>
      <div className="add-card-action" onClick={() => setShowForm(true)}>
        <span>Add another project</span>
        <span className="material-icons">add</span>
      </div>
      {showForm && (
        <div className="new-button-form">
          <input
            type="text"
            placeholder="Enter a title for this project..."
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <div className="new-button-form--actions">
            <Button
              disabled={newProjectName.trim() === ""}
              bg="var(--green)"
              color="#fff"
              onClick={addNewProjectHandler}
            >
              Add Project
            </Button>
            <span className="material-icons" onClick={closeForm}>
              close
            </span>
          </div>
        </div>
      )}
    </NewProjectButtonStyled>
  );
}