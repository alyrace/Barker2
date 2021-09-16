import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { moveList } from '../../actions/board';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useStyles from '../../utils/dialogStyles';

const MoveProject = ({ projectId, closeMenu }) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [position, setPosition] = useState(0);
  const [positions, setPositions] = useState([0]);
  const projects = useSelector((state) => state.board.board.projects);
  const projectObjects = useSelector((state) => state.board.board.projectObjects);
  const dispatch = useDispatch();

  useEffect(() => {
    const mappedListObjects = projectObjects
      .sort(
        (a, b) =>
          projects.findIndex((id) => id === a._id) - projects.findIndex((id) => id === b._id)
      )
      .map((project, index) => ({ project, index }));
    setPositions(
      mappedListObjects.filter((project) => !project.project.archived).map((project) => project.index)
    );
    setPosition(mappedListObjects.findIndex((project) => project.project._id === projectId));
  }, [projects, projectId, projectObjects]);

  const onSubmit = async () => {
    dispatch(moveList(projectId, { toIndex: position }));
    setOpenDialog(false);
    closeMenu();
  };

  return (
    <Fragment>
      <div onClick={() => setOpenDialog(true)}>Move This Project</div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <div className={classes.moveListTop}>
          <DialogTitle>{'Move Project'}</DialogTitle>
          <Button onClick={() => setOpenDialog(false)}>
            <CloseIcon />
          </Button>
        </div>
        <DialogActions className={classes.moveListBottom}>
          <FormControl>
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
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.moveListButton}
              onClick={onSubmit}
            >
              Move Project
            </Button>
          </FormControl>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

MoveProject.propTypes = {
  projectId: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default MoveProject;