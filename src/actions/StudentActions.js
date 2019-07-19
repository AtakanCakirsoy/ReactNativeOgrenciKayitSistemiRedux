import {
    STUDENT_CHANGED,
    CREATE_REQUEST,
    CREATE_REQUEST_SUCCESS,
    STUDENT_LIST_DATA_SUCCESS,
    UPDATE_REQUEST,
    UPDATE_REQUEST_SUCCESS,
    DELETE_REQUEST,
    DELETE_REQUEST_SUCCESS,
} from './types'; //types.js'den ulaşabilmek için import ediyoruz.Ordada export ediyoruz.
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const studentChange = ({ props, value }) => {
    return (dispatch) => {
        dispatch({
            type: STUDENT_CHANGED, //reduces yapısının switch case'de yakalaması için girilen değer
            payload: { props, value } //kullanıcının gönderdiği props ve valueyi reduces'a göndericez.
        });
    };
};

export const studentCreate = ({ isim, soyisim, ogrencinumara, sube }) => {
    const { currentUser } = firebase.auth(); //uygulamada şuan bulunan kullanıcıya ulaşmış olucaz

    return (dispatch) => {
        dispatch({ type: CREATE_REQUEST });
        firebase.database().ref(`/kullanicilar/${currentUser.uid}/ogrenciler`) //currentUser'ın uid'sini yakalamış olduk
            .push({ isim, soyisim, ogrencinumara, sube })
            .then(() => {
                dispatch({ type: CREATE_REQUEST_SUCCESS });
                Actions.pop() //pop metodu ile 1 sayfa geriye gidebiliyoruz. Normalde router'deki keyleri yazıyorduk noktadan sonra.
            });
    };
};

export const studentsListData = () => {
    const { currentUser } = firebase.auth();//uygulamada şuan bulunan kullanıcıya ulaşmış olucaz.Yazma izni için gerekli

    return (dispatch) => {
        firebase.database().ref(`/kullanicilar/${currentUser.uid}/ogrenciler`)
            .on('value', snapshot => { //.on metodu içerisinde value snapshot olarak geliyor.Snapshot bir data. Array şeklinde geliyor datalar
                dispatch({ type: STUDENT_LIST_DATA_SUCCESS, payload: snapshot.val() }); //payload değerlerini, snapshot.value içerisinden almış olucaz.
            });
    };
};

export const studentUpdate = ({ isim, soyisim, ogrencinumara, sube, uid }) => { //createden farklı olarak uid almalıyız çünkü güncellenecek öğrencinin id'si lazım.
    const { currentUser } = firebase.auth(); //uygulamada şuan bulunan kullanıcıya ulaşmış olucaz

    return (dispatch) => {
        dispatch({ type: UPDATE_REQUEST });
        firebase.database().ref(`/kullanicilar/${currentUser.uid}/ogrenciler/${uid}`) //currentUser'ın uid'sini yakalamış olduk
            .set({ isim, soyisim, ogrencinumara, sube })
            .then(() => {
                dispatch({ type: UPDATE_REQUEST_SUCCESS });
                Actions.pop() //pop metodu ile 1 sayfa geriye gidebiliyoruz. Normalde router'deki keyleri yazıyorduk noktadan sonra.
            });
    };
};

export const studentDelete = ({ uid }) => { //Updateden farklı olarak sadece uid almamız yeterli.
    const { currentUser } = firebase.auth(); //uygulamada şuan bulunan kullanıcıya ulaşmış olucaz

    return (dispatch) => {
        dispatch({ type: DELETE_REQUEST });
        firebase.database().ref(`/kullanicilar/${currentUser.uid}/ogrenciler/${uid}`) //currentUser'ın uid'sini yakalamış olduk
            .remove() //bütün dizini sileceğimiz için propslara gerek yok.
            .then(() => {
                dispatch({ type: DELETE_REQUEST_SUCCESS });
                Actions.pop() //pop metodu ile 1 sayfa geriye gidebiliyoruz. Normalde router'deki keyleri yazıyorduk noktadan sonra.
            });
    };
};