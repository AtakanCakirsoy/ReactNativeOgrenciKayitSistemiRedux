//reducers dosyasındakiler index içerisinden çağırılacak

import { combineReducers } from 'redux';
import kimlikdogrulamaReducers from './KimlikdogrulamaReducers';

export default combineReducers({
    kimlikdogrulamaResponse: kimlikdogrulamaReducers //kimlikdogrulamaReducersdan döner değerleri tutuyor response
});