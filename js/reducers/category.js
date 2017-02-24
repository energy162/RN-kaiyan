const initialState = {
  categories: {}
};

function category(state = initialState, action) {
  if (action.type === 'LOADED_CATEGORY') {

    // let all = {};
    // action.categories.forEach((category) => {
    //   console.log(category);
    //   all[] = category;
    // });
    return {
      ...state,
      categories: action.itemList
    };
  }

  return state;
}

module.exports = category;
