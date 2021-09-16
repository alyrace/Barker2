import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { renameList } from '../../actions/board';
import { TextField } from '@material-ui/core';

const ProjectTitle = ({ project }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(project.title);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(project.title);
  }, [project.title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(renameList(project._id, { title }));
    setEditing(false);
  };

  return !editing ? (
    <h3 className='list-title' onClick={() => setEditing(true)}>
      {project.title}
    </h3>
  ) : (
    <form onSubmit={(e) => onSubmit(e)}>
      <TextField required value={title} onChange={(e) => setTitle(e.target.value)} />
    </form>
  );
};

ProjectTitle.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectTitle;