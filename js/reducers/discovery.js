const initialState = {
  datalist: []
};

function discovery(state = initialState, action) {
  if (action.type === 'LOADED_DISCOVERY') {
    // return {
    //   ...state,
    //   datalist: action.itemList
    // };

    // console.log(action.data)

    let datalist = state.datalist.concat(action.data.itemList);

    return Object.assign({}, state, {
      datalist: datalist,
      nextPageUrl: action.data.nextPageUrl
    })
  }

  return state;
}

module.exports = discovery;
