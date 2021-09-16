import {
  CLEAR_BOARD,
  GET_BOARDS,
  GET_BOARD,
  ADD_BOARD,
  BOARD_ERROR,
  RENAME_BOARD,
  GET_PROJECT,
  ADD_PROJECT,
  RENAME_PROJECT,
  ARCHIVE_PROJECT,
  GET_CARD,
  ADD_CARD,
  EDIT_CARD,
  MOVE_CARD,
  ARCHIVE_CARD,
  DELETE_CARD,
  GET_ACTIVITY,
  ADD_MEMBER,
  MOVE_PROJECT,
  ADD_CARD_MEMBER,
  ADD_CHECKLIST_ITEM,
  EDIT_CHECKLIST_ITEM,
  COMPLETE_CHECKLIST_ITEM,
  DELETE_CHECKLIST_ITEM,
} from '../actions/types';

const initialState = {
  boards: [],
  board: null,
  dashboardLoading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_BOARD:
      return {
        ...state,
        board: null,
      };
    case GET_BOARDS:
      return {
        ...state,
        boards: payload,
        dashboardLoading: false,
      };
    case RENAME_BOARD:
    case GET_BOARD:
      return {
        ...state,
        board: { ...state.board, ...payload },
      };
    case ADD_BOARD:
      return {
        ...state,
        boards: [payload, ...state.boards],
      };
    case BOARD_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_PROJECT:
      return {
        ...state,
        board: {
          ...state.board,
          projectObjects: [...state.board.projectObjects, payload],
        },
      };
    case ADD_PROJECT:
      return {
        ...state,
        board: {
          ...state.board,
          projects: [...state.board.projects, payload._id],
        },
      };
    case ARCHIVE_PROJECT:
    case RENAME_PROJECT:
      return {
        ...state,
        board: {
          ...state.board,
          projectObjects: state.board.projectObjects.map((project) =>
            project._id === payload._id ? payload : project
          ),
        },
      };
    case GET_CARD:
      return {
        ...state,
        board: {
          ...state.board,
          cardObjects: [...state.board.cardObjects, payload],
        },
      };
    case ADD_CARD:
      return {
        ...state,
        board: {
          ...state.board,
          projectObjects: state.board.projectObjects.map((project) =>
            project._id === payload.projectId
              ? { ...project, cards: [...project.cards, payload.cardId] }
              : project
          ),
        },
      };
    case ADD_CHECKLIST_ITEM:
    case EDIT_CHECKLIST_ITEM:
    case COMPLETE_CHECKLIST_ITEM:
    case DELETE_CHECKLIST_ITEM:
    case ARCHIVE_CARD:
    case ADD_CARD_MEMBER:
    case EDIT_CARD:
      return {
        ...state,
        board: {
          ...state.board,
          cardObjects: state.board.cardObjects.map((card) =>
            card._id === payload._id ? payload : card
          ),
        },
      };
    case MOVE_CARD:
      return {
        ...state,
        board: {
          ...state.board,
          projectObjects: state.board.projectObjects.map((project) =>
            project._id === payload.from._id
              ? payload.from
              : project._id === payload.to._id
              ? payload.to
              : project
          ),
          cardObjects: state.board.cardObjects.filter(
            (card) => card._id !== payload.cardId || payload.to._id === payload.from._id
          ),
        },
      };
    case DELETE_CARD:
      return {
        ...state,
        board: {
          ...state.board,
          cardObjects: state.board.cardObjects.filter((card) => card._id !== payload),
          projectObjects: state.board.projectObjects.map((project) =>
            project.cards.includes(payload)
              ? { ...project, cards: project.cards.filter((card) => card !== payload) }
              : project
          ),
        },
      };
    case GET_ACTIVITY:
      return {
        ...state,
        board: {
          ...state.board,
          activity: payload,
        },
      };
    case ADD_MEMBER:
      return {
        ...state,
        board: {
          ...state.board,
          members: payload,
        },
      };
    case MOVE_PROJECT:
      return {
        ...state,
        board: {
          ...state.board,
          projects: payload,
        },
      };
    default:
      return state;
  }
}