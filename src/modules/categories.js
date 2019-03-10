import appConstants from '../utils/appConstants';

export const TOGGLE_CATEGORIES = 'TOGGLE_CATEGORIES';
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';

const categories = appConstants.categories;

const initialState = {
	list: categories,
	currentCategory: categories[0],
	active: false
};

export default (state = initialState, action) => {
  const toggle = state.active === true ? false : true;

	switch (action.type) {
    case TOGGLE_CATEGORIES:
      return {
        ...state,
        active: toggle
      };
    case SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.category,
      };
    default:
      return state;
  }
};

export function toggleCategories() {
	return {
    type: TOGGLE_CATEGORIES
  };
};

export function setCategory(category) {
	return {
    type: SET_CURRENT_CATEGORY,
    category
  };
};
