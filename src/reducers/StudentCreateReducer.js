import {
    STUDENT_CHANGED,
    CREATE_REQUEST,
    CREATE_REQUEST_SUCCESS
} from '../actions/types';

const INITAL_STATE = {
    isim: '',
    soyisim: '',
    ogrencinumara: '',
    sube: '',
    loading: false
};
export default (state = INITAL_STATE, action) => {
    switch (action.type) {
        case STUDENT_CHANGED:
            return { ...state, [action.payload.props]: action.payload.value }; //virgülden sonraki olay, mesela şubeyi, kullanıcının girmiş olduğu şubeye eşitle demek.İsimi, kullanıcının girmiş olduğu input isim değerine eşitle.
        case CREATE_REQUEST:
            return { ...state, loading: true }; //...state demek, stateyi sabit al demek. Olanı koru demek.
        case CREATE_REQUEST_SUCCESS:
            return INITAL_STATE; // giriş başarılı ise girdiğimiz değerleri korumucaz, 0 lanmasını istiyoruz boxların o yüzden böyle yaptık.
        default:
            return state;
    }
};