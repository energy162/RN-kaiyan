// import {getFetchNeverCached} from '../common/apiHelper'

function loadFollow(param = ''){
  return (dispatch)=>{
    // dispatch();
    var query = 'http://baobab.kaiyanapp.com/api/v4/tabs/follow'
    if(param){
      query = param
    }
    fetch(query)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson.movies);
        // return responseJson.movies;
        let data = responseJson;
        dispatch({
          type: 'LOADED_FOLLOW',
          data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // let categories = {};

  // return {
  //   type: 'LOADED_CATEGORY',
  //   categories,
  // }
}

module.exports = {loadFollow};
