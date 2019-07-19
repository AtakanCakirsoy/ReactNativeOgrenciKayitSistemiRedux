import {
    STUDENT_LIST_DATA_SUCCESS
} from '../actions/types';

const INITAL_STATE = {
};
export default (state = INITAL_STATE, action) => {
    switch (action.type) {
        case STUDENT_LIST_DATA_SUCCESS:
            console.log(action);
            return state;
            default:
            return state;
    }
};