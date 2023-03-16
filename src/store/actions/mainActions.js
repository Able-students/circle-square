import types from "./types";
import axios from "axios";

const loadJsonList = () => async(dispatch) => {
    try{
        let res = await axios.get('https://raw.githubusercontent.com/mSnus/test-task/main/data/test.json')
        console.log(res);
        dispatch({
            type: types.SET_LIST,
            payload: res?.data
        })
    }catch(e){
        console.log(e);
    }
}

const mainActions = {
    loadJsonList
}

export default mainActions;