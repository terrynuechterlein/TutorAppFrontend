const initialState = {
  theme: 'light', // Default theme
};

const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
};

export default ThemeReducer;
