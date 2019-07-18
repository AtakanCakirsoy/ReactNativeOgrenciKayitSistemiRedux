//reducers dosyasındakiler index içerisinden çağırılacak

import { combineReducers } from 'redux';
import kimlikdogrulamaReducers from './KimlikdogrulamaReducers';
import StudentListReducers from './StudentListReducer';

export default combineReducers({
    kimlikdogrulamaResponse: kimlikdogrulamaReducers, //kimlikdogrulamaReducersdan döner değerleri tutuyor response
    studentsListResponse: StudentListReducers,
});