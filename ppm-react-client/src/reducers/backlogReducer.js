import {
  GET_BACKLOG,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK,
  SAVE_PROJECT_TASK,
  GET_SAVED_PROJECT_TASK,
  EMPTY_OUT_PTS,
  GET_PROJECT_ID,
  GET_PROJECT_NAME,
  SHOW_PT_EXCLUDE_IDENTIFIER,
} from "../actions/types";

const initialState = {
  projectIdentifier: {},
  projectName: {},
  isDeleted: {},
  project_tasks: [],
  project_task: {},
  saved_tasks: [],
  saved_task: {},
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case GET_BACKLOG:
      const { backlog } = action.payload;
      console.log(backlog);
      const { isDeleted } = action.payload;
      console.log(isDeleted);
      return {
        ...state,
        project_tasks: backlog.filter(
          (project_task) => project_task.deleted === isDeleted
        ),
        isDeleted: isDeleted,
      };
    case GET_PROJECT_ID:
      return {
        ...state,
        projectIdentifier: action.payload,
      };
    case GET_PROJECT_NAME:
      return {
        ...state,
        projectName: action.payload,
      };
    case GET_PROJECT_TASK:
      return {
        ...state,
        project_task: action.payload,
      };
    case SHOW_PT_EXCLUDE_IDENTIFIER:
      return {
        ...state,
        project_tasks: state.project_tasks.filter(
          (project_task) => project_task.projectSequence !== action.payload
        ),
      };
    case DELETE_PROJECT_TASK:
      return {
        ...state,
        project_tasks: state.project_tasks.filter(
          (project_task) => project_task.projectSequence !== action.payload
        ),
      };
    case SAVE_PROJECT_TASK:
      const id = action.payload.projectIdentifier;
      const savedTasksArr = [...state.saved_tasks];
      const index = state.saved_tasks.findIndex(
        (saved_task) => saved_task.projectIdentifier === id
      );
      if (index === -1) {
        return {
          ...state,
          saved_tasks: [...state.saved_tasks, action.payload],
        };
      } else {
        savedTasksArr[index] = action.payload;
        return {
          ...state,
          saved_tasks: savedTasksArr,
        };
      }
    case GET_SAVED_PROJECT_TASK:
      const newSaved_task = state.saved_tasks.filter(
        (saved_task) => saved_task.projectIdentifier === action.payload
      )[0];
      console.log(newSaved_task);
      return {
        ...state,
        saved_task: newSaved_task,
      };
    case EMPTY_OUT_PTS:
      return {
        ...state,
        project_tasks: [],
      };
    default:
      return state;
  }
}
