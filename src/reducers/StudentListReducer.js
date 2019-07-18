import {
    STUDENT_CHANGED
} from '../actions/types';

const INITAL_STATE = {
    isim: '',
    soyisim: '',
    ogrencinumara: '',
    sube: ''
};
export default (state = INITAL_STATE, action) => {
    switch (action.type) {
        case STUDENT_CHANGED:
            return {...state, [action.payload.props]: action.payload.value}; //virgülden sonraki olay, mesela şubeyi, kullanıcının girmiş olduğu şubeye eşitle demek.İsimi, kullanıcının girmiş olduğu input isim değerine eşitle.
            default:
                return state;
    }
};