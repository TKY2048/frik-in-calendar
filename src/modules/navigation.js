export const TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION';
export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';
export const TOGGLE_LOGIN_PROMPT = 'TOGGLE_LOGIN_PROMPT';
export const TOGGLE_SEARCH = 'TOGGLE_SEARCH';

const initialState = {
	active: false,
	tab: 'menu',
  loginPrompt: false,
  search: false
};

export default (state = initialState, action) => {
	switch (action.type) {
    case TOGGLE_NAVIGATION:
      return {
        ...state,
        active: action.toggle,
        loginPrompt: false
      };
    case SET_CURRENT_TAB:
      return {
        ...state,
        tab: action.tab
      };
    case TOGGLE_LOGIN_PROMPT:
      return {
        ...state,
        loginPrompt: action.toggle
      };
    case TOGGLE_SEARCH:
      return {
        ...state,
        search: action.toggle
      };
    default:
      return state;
  }
};


export function toggleNavigation(toggle = false) {
	return {
    type: TOGGLE_NAVIGATION,
    toggle
  }; 
};

export function setTab(tab) {
	return {
    type: SET_CURRENT_TAB,
    tab
  }; 
};

export function toggleLoginPrompt(toggle = false) {
  const tab = toggle ? 'profile' : 'menu';

  return {
    type: TOGGLE_LOGIN_PROMPT,
    toggle,
    tab: tab
  }; 
};


export function toggleSearch(toggle = false) {
  return {
    type: TOGGLE_SEARCH,
    toggle
  }; 
};