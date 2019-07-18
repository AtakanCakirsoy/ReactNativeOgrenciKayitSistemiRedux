import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
//import firebase from '@firebase/app';
import Firebase from '../../firebase';
import '@firebase/auth';
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

export const loginUser = ({ email, password }) => {
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
            Firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user => loginSuccess(dispatch, user)) //then'den sonrası giriş başarılı demek gibi birşey.
                .catch(() => {
                    Firebase.auth().createUserWithEmailAndPassword(email, password) //eğer giriş yapan kullanıcı kayıtlı değil ise kaydetmesi için.
                        .then(user => loginSuccess(dispatch, user))
                        .catch(() => loginFail(dispatch));//eğer bu kullanıcı zaten var ise hataya düşürmek için
                });
        }
    };
};
//dispatch göndericez çünkü reducesu hareket ettiricez ve loading false olup, spinner kaybolacak
const loginSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    Actions.main(); //Actions sayesinde giriş başarılı ise bu sayfaya yönlendir diyoruz.
};
//login fail user almıyor çünkü yok bir kullanıcı, bu yüzden hata verdirtiyoruz.
const loginFail = (dispatch) => {
    Alert.alert(
        'Mesaj',
        'Kullanıcı adı veya şifreniz hatalı!!!!',
        [
            { text: 'Tamam', onPress: () => null }
        ]
    );
    dispatch({
        type: LOGIN_USER_FAIL //login fail olduğu için payload göndermemize gerek kalmıyor.
    });
};