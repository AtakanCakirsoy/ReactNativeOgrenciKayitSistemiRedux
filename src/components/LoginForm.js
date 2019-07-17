import React, { Component } from 'react';
//state yapısında email ve passwordleri tutucağımız için class base component
//oluşturmamız gerekiyor

import firebase from '@firebase/app';
import '@firebase/auth';
import { connect } from 'react-redux'; //import ettiğimiz actionsları kullanabilmemiz için gerekli
import { TextInput, Alert } from 'react-native';
import { Button, Card, CardSection, Spinner } from '../components'; //components klasörü altındaki index.js sayesinde bu tarzda çağırabildik.
import { emailChanged, passwordChanged } from '../actions/kimlikdogrulamaactions'; //import ediyoruz ancak kullanabilmek için connect yapısı gerekli
class LoginForm extends Component {
    state = { email: '', password: '', loading: false };
    clickLogin() {
        this.setState({ loading: true });
        const { email, password } = this.state; //this.state'nin içindeki email ve passworda ulaşmak için

        if (email === '' || password === '') { //boş ise hata verdirtiyoruz.
            this.setState({ loading: false })
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
                .then(this.loginSuccess.bind(this)) //then'den sonrası giriş başarılı demek gibi birşey.
                .catch(() => {
                    firebase.auth().createUserWithEmailAndPassword(email, password) //eğer giriş yapan kullanıcı kayıtlı değil ise kaydetmesi için.
                        .then(this.loginSuccess.bind(this))
                        .catch(this.loginFail.bind(this));//eğer bu kullanıcı zaten var ise hataya düşürmek için
                });
        }

    }
    loginSuccess() {
        console.log('başarılı');
        this.setState({ loading: false })
    }
    loginFail() {
        console.log('hatalı');
        this.setState({ loading: false })
        Alert.alert(
            'Mesaj',
            'Kullanıcı adı veya şifreniz hatalı',
            [
                { text: 'Tamam', onPress: () => null }
            ]
        );

    }
    //renderButton yapmamızın sebebi eğer loading oluyorsa loading simgesi çıkması için
    renderButton() {
        if (!this.state.loading) {
            return <Button onPress={this.clickLogin.bind(this)}>Giriş</Button>
            // state'nin içindeki email ve password'a ulaşabilmek için bind(this) dememiz gerekiyor. */
        }
        return <Spinner size="small" />
    }
    render() {
        const { inputStyle } = styles;
        return (
            <Card>
                <CardSection>
                    <TextInput
                        placeholder="E-mail"
                        style={inputStyle}
                        value={this.state.email}
                        onChangeText={email => this.props.emailChanged(email)} //kimlikdogrulamaactionsa yollayıp actionu tetikliyoruz.
                    // email => this.setState({ email }),emaili, setState'nin içindeki emaile eşitle anlamına geliyor. Bu eski yazılan
                    />
                </CardSection>
                <CardSection>
                    <TextInput
                        secureTextEntry //password şeklinde noktalı olarak gösterir
                        placeholder="Şifre"
                        style={inputStyle}
                        value={this.state.password}
                        onChangeText={password => this.props.passwordChanged(password)} //kimlikdogrulamaactionsa yollayıp actionu tetikliyoruz.
                    //password => this.setState({ password }),passwordu, setState'nin içindeki passworde eşitle anlamına geliyor. Bu eski yazılan
                    />
                </CardSection>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}
const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 1
    }
};
export default connect(null, { emailChanged, passwordChanged })(LoginForm); //Login yapısı connect yapısı
//connect içerisindeki ilk değer, reducesten dönücek olan değerlerin bu component içerisinde düşücek olan methodun adını veriyoruz
//süslü ile yazılan ikinci değer ise hangi metodun içerisine çıkacaksan onları yazıyorsun.