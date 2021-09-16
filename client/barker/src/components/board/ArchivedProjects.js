import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { archiveList } from '../../actions/board';

import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const ArchivedProjects = () => {
  const projectObjects = useSelector((state) => state.board.board.projectObjects);
  const dispatch = useDispatch();

  const onSubmit = async (projectId) => {
    dispatch(archiveList(projectId, false));
  };

  return (
    <div>
      <List>
        {projectObjects
          .filter((project) => project.archived)
          .map((project, index) => (
            <ListItem key={index}>
              <ListItemText primary={project.title} />
              <Button onClick={() => onSubmit(project._id)}>Send to Board</Button>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default ArchivedProjects;