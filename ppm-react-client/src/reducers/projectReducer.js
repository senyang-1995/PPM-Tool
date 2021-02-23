import {
  GET_PROJECTS,
  GET_PROJECT,
  GET_SAVEDPROJECT,
  SHOW_PROJECTS_EXCLUDE_IDENTIFIER,
  EMPTY_OUT_PROJECTS,
} from "../actions/types";

const initialState = {
  projects: [],
  project: {},
  savedProject: {},
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case EMPTY_OUT_PROJECTS:
      return {
        ...state,
        projects: [],
      };
    case GET_PROJECTS:
      const { projects } = action.payload;
      const { isDeleted } = action.payload;
      return {
        ...state,
        projects: projects.filter((project) => project.deleted === isDeleted),
      };
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
      };

    case SHOW_PROJECTS_EXCLUDE_IDENTIFIER:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.projectIdentifier !== action.payload
        ),
      };
    case GET_SAVEDPROJECT:
      return {
        ...state,
        savedProject: action.payload,
      };
    default:
      return state;
  }
}
