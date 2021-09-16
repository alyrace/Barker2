import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

//import {useForm} from 'react-hook-form';

import { addBoard } from '../../actions/board';
import { Modal, TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from '../../utils/modalStyles';
import BoardSVG from '../../assets/images/boardicon.svg';



const CreateBoard = ({ history }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addBoard({ title }, history));
  };
  

  const body = (
    <div>
      <div className={`${classes.paper} ${classes.createBoardModal}`}>
        <div className={classes.modalTop}>
          <img src={BoardSVG} alt="board svg" />
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Add board title'
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Create Board
          </Button>
          <Button onClick={() => setOpen(false)}>
            <CloseIcon />
          </Button>
        </form>
      </div>
    </div>
  );

  return (
    <div>
      <button className='board-card create-board-card' onClick={() => setOpen(true)}>
        Create new board
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        {body}
      </Modal>
    </div>
  );
};

export default withRouter(CreateBoard);