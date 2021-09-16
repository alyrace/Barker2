import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { getBoard, moveCard, moveList } from '../actions/board';
import { CircularProgress, Box } from '@material-ui/core';
import BoardTitle from '../components/board/BoardTitle';
import BoardDrawer from '../components/board/BoardDrawer';
import Project from '../components/project/Project';
import CreateProject from '../components/board/CreateProject';
import Members from '../components/board/Member';
import Navbar from '../components/other/Navbar';
import BackgroundNavToggle from '../components/board/BackgroundNavToggle.js';

const Board = ({ match }) => {
  const board = useSelector((state) => state.board.board);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();


  const [backgroundimage, setBackgroundImage] = useState('green');

  useEffect(() => {
    dispatch(getBoard(match.params.id));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    if (board?.title) document.title = board.title + ' | Barker';
  }, [board?.title]);

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (type === 'card') {
      dispatch(
        moveCard(draggableId, {
          fromId: source.droppableId,
          toId: destination.droppableId,
          toIndex: destination.index,
        })
      );
    } else {
      dispatch(moveList(draggableId, { toIndex: destination.index }));
    }
  };

  return !board ? (
    <Fragment>
      <Navbar />
      <Box className='board-loading'>
        <CircularProgress />
      </Box>
    </Fragment>
  ) : (
    <div
      className='board-and-navbar'
      style={{
        backgroundImage:
          /*'url(' +
          (board.backgroundURL
            ? board.backgroundURL
            :  backgroundimage ) +
          ')'*/backgroundimage,
          backgroundColor: backgroundimage,
      }}
    >
      <Navbar />
      <section className='board'>
        <div className='board-top'>
          <div className='board-top-left'>
            <BoardTitle board={board} />
            <Members />
          </div>
          <BackgroundNavToggle setBackgroundImage={setBackgroundImage}/>
          <BoardDrawer />
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='all-lists' direction='horizontal' type='list'>
            {(provided) => (
              <div className='lists' ref={provided.innerRef} {...provided.droppableProps}>
                {board.projects.map((projectId, index) => (
                  <Project key={projectId} projectId={projectId} index={index} />
                ))}
                {provided.placeholder}
                <CreateProject />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </div>
  );
};

export default Board;