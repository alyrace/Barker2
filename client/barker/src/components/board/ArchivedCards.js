import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { archiveCard, deleteCard } from '../../actions/board';

import { Card, List, ListItem, CardContent, Button } from '@material-ui/core';

const ArchivedCards = () => {
  const cards = useSelector((state) => state.board.board.cardObjects);
  const projects = useSelector((state) => state.board.board.projectObjects);
  const dispatch = useDispatch();

  const onDelete = async (projectId, cardId) => {
    dispatch(deleteCard(projectId, cardId));
  };

  const onSendBack = async (cardId) => {
    dispatch(archiveCard(cardId, false));
  };

  return (
    <div>
      <List>
        {cards
          .filter((card) => card.archived)
          .map((card, index) => (
            <ListItem key={index} className='archived-card'>
              <Card>
                <CardContent>{card.title}</CardContent>
              </Card>
              <div>
                <Button
                  color='secondary'
                  onClick={() =>
                    onDelete(
                        projects.find((project) => project.cards.includes(card._id))._id,
                      card._id
                    )
                  }
                >
                  Delete Card
                </Button>
                <Button onClick={() => onSendBack(card._id)}>Send to List</Button>
              </div>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default ArchivedCards;