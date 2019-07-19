export const EMAIL_CHANGED = 'email_changed';
export const PASSWORD_CHANGED = 'password_changed';

export const LOGIN_USER = 'login_user';
export const LOGIN_USER_SUCCESS='login_user_success';
export const LOGIN_USER_FAIL='login_user_fail';

export const STUDENT_CHANGED = 'student_changed';

export const CREATE_REQUEST = 'create_request';
export const CREATE_REQUEST_SUCCESS = 'create_request_success';

export const STUDENT_LIST_DATA_SUCCESS='student_list_data_success';

//actionsların içinden typlerı ayırdık çünkü proje karmaşıklaştığında anlaşılması zor.
//typları tek bir yerden çağırmış oluyoruz ve değişiklik yapmak istediğimizde
//tek bir yere gidip değişiklik yapmamız yeterli olacak.