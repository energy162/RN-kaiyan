// import {getFetchNeverCached} from '../common/apiHelper'

function loadCategory(){
  return (dispatch)=>{
    // dispatch();
    fetch('http://baobab.kaiyanapp.com/api/v4/categories/all?udid=1d1ac3252abf4280bb6eaa1db0fd3bbdb445eb7f&vc=165&vn=3.2.1&deviceModel=FRD-DL00&first_channel=eyepetizer_wandoujia_market&last_channel=eyepetizer_wandoujia_market&system_version_code=24')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson.movies);
        // return responseJson.movies;
        let itemList = responseJson.itemList;
        dispatch({
          type: 'LOADED_CATEGORY',
          itemList,
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

module.exports = {loadCategory};
