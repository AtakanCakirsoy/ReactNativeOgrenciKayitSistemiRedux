import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL } from '../actions/types';
//temelde kullanacağımız stateleri oluşturuyoruz.
const INITIAL_STATE = {
    email: '',
    password: '',
    loading: false
};
//switchcase yapısı kurup, actionslardaki typlerı yakalayacağız.
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload }; //action içerisindeki type göre yakalayıp, o type içerisindeki email değerini dönmüş olduk.
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload }; //...state demek, state değerini koru demek
        case LOGIN_USER:
            return { ...state, loading: true };
        case LOGIN_USER_SUCCESS:
            return { ...state, loading: false };
        case LOGIN_USER_FAIL:
            return { ...state, loading: false };
        default:
            return state;
    }
};

//Örnek olarak, kullanıcı klavyeden passworda a tuşuna bastı, 
//actioncreater tetiklenip password_changed metodunun içine düşüyor
//typena passwordu alıyor, payloadına da a harfini alıyor.
//dispatch reducersı tetikliyor. Bütün reducersların içinde dolaşıp switch casede
//o type ile eşleşeni buluyor ve state'e password değeri olan a yı atıyor.