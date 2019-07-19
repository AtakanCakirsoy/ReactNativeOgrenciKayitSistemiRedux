import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import StudentsList from './components/StudentsList';
import StudentCreate from './components/StudentCreate';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ marginTop: 65 }}>
            <Scene key="kimlik">
                <Scene key="loginScreen" component={LoginForm} title="Giriş Ekranı" />
            </Scene>

            <Scene key="main">
                <Scene
                    onRight={() => Actions.studentCreate()} //Actions metodu ile o sayfa git diyoruz
                    rightTitle="Yeni"
                    key="studentList"
                    component={StudentsList}
                    title="Öğrenci Liste" />
            </Scene>
            <Scene key="studentCreate"
                component={StudentCreate}
                title="Öğrenci Kaydet"
            />
        </Router>
    );
};

export default RouterComponent;
/*Hangi sayfanın ilk gözükmesini istiyorsak initial yazmamız yeterli. mesela
<Scene key="studentList" component={StudentsList} title="Öğrenci Liste" initial/> gibi. Sayfaları denerken işe yarayabilir.*/