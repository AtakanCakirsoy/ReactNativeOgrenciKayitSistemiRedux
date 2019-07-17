export const emailChanged = (email) => {
    return (dispatch) => {
        dispatch({
            type: 'email_changed', //reduces yapısının switch case'de yakalaması için girilen değer
            payload: email //valuesi.Kullanıcının vermiş olduğu text'i tekrar gönderiyoruz.
        });
    };
};

export const passwordChanged = (password) => {
    return (dispatch) => {
        dispatch({
            type: 'password_changed', //reduces yapısının switch case'de yakalaması için girilen değer
            payload: password //valuesi.Kullanıcının vermiş olduğu text'i tekrar gönderiyoruz.
        });
    };
};