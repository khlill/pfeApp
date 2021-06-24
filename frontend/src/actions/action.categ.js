import axios from 'axios';
import {
    categoryConstansts
} from '../actions/action.types';

export const category = (name) => async (dispatch) => {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
  
    const body = { name };
  
    try {
      console.log(body);
      const res = await axios.post(
        `http://localhost:5000/api/category`,
        body,
        config
      );
      dispatch({
        type: categoryConstansts.ADD_NEW_CATEGORY_SUCCESS,
        payload: res.data,
      });
      console.log('category created! '); 
    } catch (err) {
      dispatch({
        type: categoryConstansts.ADD_NEW_CATEGORY_FAILURE,
      });
    }
  };