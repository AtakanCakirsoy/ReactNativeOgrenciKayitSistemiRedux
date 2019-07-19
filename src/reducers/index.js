//reducers dosyasındakiler index içerisinden çağırılacak

import { combineReducers } from 'redux';
import kimlikdogrulamaReducers from './KimlikdogrulamaReducers';
import StudentListReducers from './StudentCreateReducer';
import StudentDataReducers from './StudentDataReducers';
import StudenUpdateReducers from './StudentUpdateReducers';

export default combineReducers({
    kimlikdogrulamaResponse: kimlikdogrulamaReducers, //kimlikdogrulamaReducersdan döner değerleri tutuyor response
    studentsListResponse: StudentListReducers,
    studentDataResponse: StudentDataReducers,
    studentUpdateResponse: StudenUpdateReducers,
});