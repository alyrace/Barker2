import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { getList } from '../../actions/board';
import ProjectTitle from './ProjectTitle';
import ProjectMenu from './ProjectMenu';
import Card from '../card/Card';
import CreateCardForm from './CreateCardForm';
import Button from '@material-ui/core/Button';

const Project = ({ projectId, index }) => {
  const [addingCard, setAddingCard] = useState(false);
  const project = useSelector((state) =>
    state.board.board.projectObjects.find((object) => object._id === projectId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList(projectId));
  }, [dispatch, projectId]);

  const createCardFormRef = useRef(null);
  useEffect(() => {
    addingCard && createCardFormRef.current.scrollIntoView();
  }, [addingCard]);

  return !project || (project && project.archived) ? (
    ''
  ) : (
    <Draggable draggableId={projectId} index={index}>
      {(provided) => (
        <div
          className='list-wrapper'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className='list-top'>
            <ProjectTitle project={project} />
            <ProjectMenu projectId={projectId} />
          </div>
          <Droppable droppableId={projectId} type='card'>
            {(provided) => (
              <div
                className={`list ${addingCard ? 'adding-card' : 'not-adding-card'}`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className='cards'>
                  {project.cards.map((cardId, index) => (
                    <Card key={cardId} cardId={cardId} project={project} index={index} />
                  ))}
                </div>
                {provided.placeholder}
                {addingCard && (
                  <div ref={createCardFormRef}>
                    <CreateCardForm projectId={projectId} setAdding={setAddingCard} />
                  </div>
                )}
              </div>
            )}
          </Droppable>
          {!addingCard && (
            <div className='create-card-button'>
              <Button variant='contained' onClick={() => setAddingCard(true)}>
                + Add a card
              </Button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

Project.propTypes = {
  projectId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Project;