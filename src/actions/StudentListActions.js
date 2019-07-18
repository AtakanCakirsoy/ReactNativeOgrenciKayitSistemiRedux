import {
    STUDENT_CHANGED
} from './types';

export const studentChange = ({ props, value }) => {
    return (dispatch) => {
        dispatch({
            type: STUDENT_CHANGED, //reduces yapısının switch case'de yakalaması için girilen değer
            payload: { props, value } //kullanıcının gönderdiği props ve valueyi reduces'a göndericez.
        });
    };
};