import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { archiveList } from '../../actions/board';
import { Button, Menu, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MoveProject from './MoveProject';

const ProjectMenu = ({ projectId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const archive = async () => {
    dispatch(archiveList(projectId, true));
  };

  return (
    <div>
      <Button onClick={handleClick}>
        <MoreHorizIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <MoreHorizIcon />
        </MenuItem>
        <MenuItem
          onClick={() => {
            archive();
            handleClose();
          }}
        >
          Archive This Project
        </MenuItem>
        <MenuItem>
          <MoveProject projectId={projectId} closeMenu={handleClose} />
        </MenuItem>
      </Menu>
    </div>
  );
};

ProjectMenu.propTypes = {
  projectId: PropTypes.string.isRequired,
};

export default ProjectMenu;