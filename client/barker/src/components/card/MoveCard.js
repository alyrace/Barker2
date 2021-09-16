import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { moveCard } from '../../actions/board';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useStyles from '../../utils/modalStyles';

const MoveCard = ({ cardId, setOpen, thisProject }) => {
  const classes = useStyles();
  const [projectObject, setProjectObject] = useState(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [position, setPosition] = useState(0);
  const [positions, setPositions] = useState([0]);
  const projects = useSelector((state) => state.board.board.projects);
  const projectObjects = useSelector((state) =>
    state.board.board.projectObjects
      .sort(
        (a, b) =>
          projects.findIndex((id) => id === a._id) - projects.findIndex((id) => id === b._id)
      )
      .filter((project) => !project.archived)
  );
  const cardObjects = useSelector((state) => state.board.board.cardObjects);
  const dispatch = useDispatch();

  useEffect(() => {
    setProjectObject(thisProject);
    setProjectTitle(thisProject.title);
  }, [thisProject, cardId]);

  useEffect(() => {
    if (projectObject) {
      const unarchivedProjectCards = projectObject.cards
        .map((id, index) => {
          const card = cardObjects.find((object) => object._id === id);
          const position = index;
          return { card, position };
        })
        .filter((card) => !card.card.archived);
      let cardPositions = unarchivedProjectCards.map((card) => card.position);
      if (projectObject !== thisProject) {
        cardPositions = cardPositions.concat(projectObject.cards.length);
      }
      if (projectObject.cards.length > 0) {
        setPositions(cardPositions);
        setPosition(thisProject.cards.findIndex((id) => id === cardId));
      } else {
        setPositions([0]);
        setPosition(0);
      }
    }
  }, [thisProject, cardId, projectObject, cardObjects]);

  const onSubmit = async () => {
    dispatch(
      moveCard(cardId, { fromId: thisProject._id, toId: projectObject._id, toIndex: position })
    );
    setOpen(false);
  };

  return (
    <div className={classes.moveCard}>
      <h3 className={classes.moveCardTitle}>Move this card</h3>
      <div>
        <FormControl className={classes.moveCardSelect}>
          <InputLabel shrink>Project</InputLabel>
          <Select
            value={projectTitle}
            required
            onChange={(e) => {
              setProjectTitle(e.target.value);
              setProjectObject(projectObjects.find((project) => project.title === e.target.value));
            }}
            displayEmpty
          >
            {projectObjects.map((project) => (
              <MenuItem key={project._id} value={project.title}>
                {project.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.moveCardSelect}>
          <InputLabel shrink>Position</InputLabel>
          <Select
            value={position}
            required
            onChange={(e) => setPosition(e.target.value)}
            displayEmpty
          >
            {positions.map((position, index) => (
              <MenuItem key={position} value={position}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Button
        className={classes.button}
        variant='contained'
        color='primary'
        onClick={onSubmit}
      >
        Move Card
      </Button>
    </div>
  );
};

MoveCard.propTypes = {
  cardId: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  thisProject: PropTypes.object.isRequired,
};

export default MoveCard;