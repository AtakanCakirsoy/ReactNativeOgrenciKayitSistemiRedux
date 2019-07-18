import React, { Component } from 'react';
//state yapısında email ve passwordleri tutucağımız için class base component
//oluşturmamız gerekiyor
import { connect } from 'react-redux'; //import ettiğimiz actionsları kullanabilmemiz için gerekli
import { TextInput, Alert, View } from 'react-native';
import { Button, Card, CardSection, Spinner } from '../components'; //components klasörü altındaki index.js sayesinde bu tarzda çağırabildik.
import { emailChanged, passwordChanged, loginUser } from '../actions/kimlikdogrulamaactions'; //import ediyoruz ancak kullanabilmek için connect yapısı gerekli
class LoginForm extends Component {
    state = { email: '', password: '', loading: false };
    clickLogin() {
        const { email, password } = this.props; //bu propslar mapStateToProps'den geliyor
        this.props.loginUser({ email, password });
        /*this.setState({ loading: true });
        const { email, password } = this.state; this.state'nin içindeki email ve passworda ulaşmak için*/
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
        //this.state.loading idi, this.props.loading yaptık redux yapısı için
        if (!this.props.loading) {
            return <Button onPress={this.clickLogin.bind(this)}>Giriş</Button>
            // state'nin içindeki email ve password'a ulaşabilmek için bind(this) dememiz gerekiyor.
        }
        return <Spinner size="small" />
    }
    render() {
        const { inputStyle } = styles;
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Card>
                    <CardSection>
                        <TextInput
                            placeholder="E-mail"
                            style={inputStyle}
                            value={this.props.email} //state.email idi, props.email yaptık, mapStateToProps methodundakilere erişmek için
                            onChangeText={email => this.props.emailChanged(email)} //kimlikdogrulamaactionsa yollayıp actionu tetikliyoruz.
                        // email => this.setState({ email }),emaili, setState'nin içindeki emaile eşitle anlamına geliyor. Bu eski yazılan
                        />
                    </CardSection>
                    <CardSection>
                        <TextInput
                            secureTextEntry //password şeklinde noktalı olarak gösterir
                            placeholder="Şifre"
                            style={inputStyle}
                            value={this.props.password}
                            onChangeText={password => this.props.passwordChanged(password)} //kimlikdogrulamaactionsa yollayıp actionu tetikliyoruz.
                        //password => this.setState({ password }),passwordu, setState'nin içindeki passworde eşitle anlamına geliyor. Bu eski yazılan
                        />
                    </CardSection>
                    <CardSection>
                        {this.renderButton()}
                    </CardSection>
                </Card>
            </View>
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

const mapStateToProps = ({ kimlikdogrulamaResponse }) => {
    const { email, password, loading } = kimlikdogrulamaResponse; //const sabiti ile oluşturduğumuz email ve passwordu kimlikdogrulamaResponse'den alıcak ve burdaki email ve passworda return edicek.
    return {
        email,
        password,
        loading,
    };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm); //Login yapısı connect yapısı
//connect içerisindeki ilk değer, reducesten dönücek olan değerlerin bu component içerisinde düşücek olan methodun adını veriyoruz
//süslü ile yazılan ikinci değer ise hangi metodun içerisine çıkacaksan onları yazıyorsun.

//İlerleyen derslerde aslında dispatch yapısının tam olarak ne işe yaradığından örnekler ile bahsediyorum. Küçük bir özet geçersek.
//Diyelim ki bir login işlemi yaptırmak istiyorsunuz. Butonunuza bastığınız anda action methodunuz içerisinden payload(data) değeri boş ama bir type'ı olan dispatch eklediğinizde bu dispatch yapıyı tetikleyerek bulunduğunuz class'a props değerlerini dönebiliyor. Örneğin tıkladığınız anda daha servis'iniz ile konuşmadan tetiklediğiniz dispatch değerinizle bir loading props değeri dönerek bu değeride true dönerseniz uygulamanızda bir spiner göstererek gerekli işlemler yapılıp kullanıcıyı login etmek istediğinizde bir dispatch yapısı ile gerekli datalarınızı dönerken bu loading değerinide false dönerek spiner'ı kaldırabilirsiniz. 
//Yukarıda çok basit bir örnek verdim. Genel anlamda dispatch yapısını çalıştırdığınız anda o class'ınızı yeniden set edebiliyor istediğiniz anda istediğiniz değişiklikleri kullanıcıya sunabiliyorsunuz. 