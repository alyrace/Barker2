import { api } from "../../utils/api";

export const updateCardInProject = ({ state }, payload) => {
  const { projectId, updatedCard } = payload;

  state.projects.projects.map((project) => {
    if (project._id === projectId) {
      let cards = project.cards.map((card) => {
        if (card._id === updatedCard._id) {
          card = updatedCard;
        }
        return card;
      });
      project.cards = cards;
    }

    return project;
  });
};

export const getProjects = async ({ state }, payload) => {
  const { id } = payload;
  state.projects.projectsLoading = true;
  try {
    const res = await api.get(`/projects/${id}`);

    if (res.data.success) {
      state.projects.projects = res.data.data;
    } else {
      console.log("Error getting projects");
    }
    state.projects.projectsLoading = false;
  } catch (err) {
    console.log(err);
    state.projects.projectsLoading = false;
  }
};

export const createNewProject = async ({ state }, payload) => {
  try {
    const res = await api.post(`/projects`, payload);

    if (res.data.success) {
      state.projects.projects.push(res.data.data);
    } else {
      console.log("Error creating project");
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteProject = async ({ state }, id) => {
  try {
    const res = await api.delete(`/project/${id}`);

    if (res.data.success) {
      state.projects.projects = state.projects.projects.filter((p) => p._id !== id);
    } else {
      console.log("Error deleting project");
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateProjectTitle = async ({ state }, payload) => {
  const { id, title } = payload;
  try {
    const res = await api.put(`/projects/${id}`, { title });

    if (res.data.success) {
      let projectsCopy = [...state.projects.projects];
      projectsCopy.map((p) => {
        if (p._id === id) {
          p.title = title;
        }
      });
      state.projects.projects = projectsCopy;
    } else {
      console.log("Error deleting project");
    }
  } catch (err) {
    console.log(err);
  }
};

export const addCardToProject = async ({ state }, payload) => {
  state.projects.newCardLoading = true;
  try {
    const res = await api.post(`/cards`, payload);

    if (res.data.success) {
      let projectsCopy = [...state.projects.projects];
      projectsCopy.forEach((project) => {
        if (project._id === payload.projectId) {
          console.log(2222, res.data.data);
          project.cards.push(res.data.data);
        }
      });

      state.projectts.projects = projectsCopy;
    }
    state.projects.newCardLoading = false;
  } catch (err) {
    state.projects.newCardLoading = false;
    console.log(err);
  }
};

export const reorderCards = async ({ state }, payload) => {
  const { destination, source, draggableId } = payload;
  console.log({ destination, source, draggableId });
  let projectsCopy = [...state.projects.projects];
  // let removed;

  let movingCard = {
    ...state.projects.projects
      .filter((project) => project._id === source.droppableId)[0]
      .cards.filter((card) => card._id === draggableId)[0],
  };

  //remove card from its list
  projectsCopy.map((project) => {
    if (project._id === source.droppableId) {
      project.cards = project.cards.filter((card) => card._id !== draggableId);
    }
    return project;
  });

  //give new position numbers to cards inside list where the card is removed
  projectsCopy.map((project) => {
    if (project._id === source.droppableId) {
      project.cards.map((card, index) => {
        card.position = index;
        return card;
      });
    }
    return project;
  });

  //add card to other list at position
  projectsCopy.map((project) => {
    if (project._id === destination.droppableId) {
      movingCard.projectId = destination.droppableId;
      project.cards.splice(destination.index, 0, movingCard);
    }
    return project;
  });

  //give new position numbers to cards inside list where the card is added
  projectsCopy.map((project) => {
    if (project._id === destination.droppableId) {
      let cardsCopy = [...project.cards];
      cardsCopy.map((card, index) => {
        card.position = index;
        return card;
      });
      project.cards = cardsCopy;
    }
    return project;
  });

  //ajax here
  let newCards = [];

  projectsCopy.forEach((project) => {
    project.cards.forEach((card) => {
      newCards.push({
        _id: card._id,
        projectId: card.projectId,
        position: card.position,
      });
    });
  });

  let projectsCopy2 = JSON.parse(JSON.stringify(projectsCopy));
  let newProjects = projectsCopy2.map((project) => {
    let tempCards = [];
    project.cards.forEach((card) => {
      tempCards.push(card._id);
    });
    project.cards = tempCards;
    return project;
  });

  try {
    const res = await api.put(`/cards/reorder`, {
      cards: newCards,
      projects: newProjects,
    });

    if (res.data.success) {
      state.projects.projects = projectsCopy;
    } else {
      console.log("Error reordering cards");
    }
  } catch (err) {
    console.log(err);
  }
  //if successful run code below
  state.projects.projects = projectsCopy;
};