import { Alert } from 'react-native';
import firebase from '@firebase/app';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL
} from './types';
export const emailChanged = (email) => {
    return (dispatch) => {
        dispatch({
            type: EMAIL_CHANGED, //reduces yapısının switch case'de yakalaması için girilen değer
            payload: email //valuesi.Kullanıcının vermiş olduğu text'i tekrar gönderiyoruz.
        });
    };
};
//dispatch redux yapısı içerisindeki global state'lerimiz olan reducer'ları tetiklememize yardımcı oluyor. 
//ihtiyaç duyduğumuzda actions içerisinde dispatch'i çağırarak type ve payload değerleri ile reducer dosyalarını tetikliyoruz.
export const passwordChanged = (password) => {
    return (dispatch) => {
        dispatch({
            type: PASSWORD_CHANGED, //reduces yapısının switch case'de yakalaması için girilen değer
            payload: password //valuesi.Kullanıcının vermiş olduğu text'i tekrar gönderiyoruz.
        });
    };
};

export const LoginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        if (email === '' || password === '') { //boş ise hata verdirtiyoruz.
            Alert.alert(
                'Mesaj',
                'Boş Alan Bırakılamaz!',
                [
                    { text: 'Tamam', onPress: () => null }
                ]
            );
        }
        else {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user => loginSuccess(dispatch, user)) //then'den sonrası giriş başarılı demek gibi birşey.
                .catch(() => {
                    firebase.auth().createUserWithEmailAndPassword(email, password) //eğer giriş yapan kullanıcı kayıtlı değil ise kaydetmesi için.
                        .then(user => loginSuccess(dispatch, user))
                        .catch(() => loginFail());//eğer bu kullanıcı zaten var ise hataya düşürmek için
                });
        }
    };
};
//dispatch göndericez çünkü reducesu hareket ettiricez.
const loginSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
};
const loginFail = (dispatch) => {
    Alert.alert(
        'Mesaj',
        'Boş Alan Bırakılamaz!',
        [
            { text: 'Tamam', onPress: () => null }
        ]
    );
    dispatch({
        type: LOGIN_USER_FAIL
    });
};