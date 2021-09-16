import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArchiveIcon from '@material-ui/icons/Archive';

import ArchivedProjects from './ArchivedProjects';
import ArchivedCards from './ArchivedCards';
import useStyles from '../../utils/drawerStyles';

const BoardDrawer = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [viewingArchivedProjects, setViewingArchivedProjects] = useState(false);
  const [viewingArchivedCards, setViewingArchivedCards] = useState(false);
  const [activityChunks, setActivityChunks] = useState(1);
  const activity = useSelector((state) => state.board.board.activity);

  const handleClose = () => {
    setOpen(false);
    setActivityChunks(1);
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        variant='contained'
        className={open ? classes.hide : classes.showMenuButton}
      >
        <MoreHorizIcon fontSize='small' /> Show Menu
      </Button>
      <Drawer
        className={open ? classes.drawer : classes.hide}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {!viewingArchivedProjects && !viewingArchivedCards ? (
          <div>
            <div className={classes.drawerHeader}>
              <h3>View Logs</h3>
              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>
            <Divider />
            <List>
              <ListItem button onClick={() => setViewingArchivedProjects(true)}>
                <ListItemIcon>
                  <ArchiveIcon />
                </ListItemIcon>
                <ListItemText primary={'Archived Projects'} />
              </ListItem>
              <ListItem button onClick={() => setViewingArchivedCards(true)}>
                <ListItemIcon>
                  <ArchiveIcon />
                </ListItemIcon>
                <ArchivedProjects primary={'Archived Cards'} />
              </ListItem>
            </List>
            <Divider />
            <div className={classes.activityTitle}>
              <h3>Activity</h3>
            </div>
            <List>
              {activity.slice(0, activityChunks * 10).map((activity) => (
                <ListItem key={activity._id}>
                  <ListItemText
                    primary={activity.text}
                    secondary={<Moment fromNow>{activity.date}</Moment>}
                  />
                </ListItem>
              ))}
            </List>
            <div className={classes.viewMoreActivityButton}>
              <Button
                disabled={activityChunks * 10 > activity.length}
                onClick={() => setActivityChunks(activityChunks + 1)}
              >
                View More Activity
              </Button>
            </div>
          </div>
        ) : viewingArchivedProjects ? (
          <div>
            <div className={classes.drawerHeader}>
              <Button onClick={() => setViewingArchivedProjects(false)}>
                <ChevronLeftIcon />
              </Button>
              <h3>Archived Projects</h3>
              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>
            <Divider />
            <ArchivedProjects />
          </div>
        ) : (
          <div>
            <div className={classes.drawerHeader}>
              <Button onClick={() => setViewingArchivedCards(false)}>
                <ChevronLeftIcon />
              </Button>
              <h3>Archived Cards</h3>
              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>
            <Divider />
            <ArchivedCards />
          </div>
        )}
        <Divider />
      </Drawer>
    </div>
  );
};

export default BoardDrawer;