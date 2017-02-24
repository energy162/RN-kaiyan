const initialState = {
  wifiNetwork: ''
}

function config(state = initialState, action) {
  if (action.type === 'LOADED_CONFIG') {
    return {
      wifiNetwork: 'test',
    };
  }

  return state;
}

module.exports = config;
