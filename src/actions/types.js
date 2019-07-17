export const EMAIL_CHANGED = 'email_changed';
export const PASSWORD_CHANGED = 'password_changed';

export const LOGIN_USER = 'login_user';
export const LOGIN_USER_SUCCESS='login_user_success';
export const LOGIN_USER_FAIL='login_user_fail';

//actionsların içinden typlerı ayırdık çünkü proje karmaşıklaştığında anlaşılması zor.
//typları tek bir yerden çağırmış oluyoruz ve değişiklik yapmak istediğimizde
//tek bir yere gidip değişiklik yapmamız yeterli olacak.