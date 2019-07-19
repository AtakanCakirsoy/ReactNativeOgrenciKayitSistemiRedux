import React, { Component } from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Button, CardSection, Card, Spinner } from '../components'; //components klasörü altındaki index.js sayesinde bu tarzda çağırabildik.
import { studentChange, studentUpdate, studentDelete } from '../actions';

class StudentUpdate extends Component {
    //studentCreate de props kullandık, burda state yapısı kullanıyoruz.Daha basit olduğu için
    state = { isim: '', soyisim: '', ogrencinumara: '', sube: '' };
    UNSAFE_componentWillMount() {
        const { isim,
            soyisim,
            ogrencinumara,
            sube } = this.props.student; //sayfa açılır açılmaz bilgiler gelmesi için kullandık. this.props.studentten gelicek, ListItem'deki.

        this.setState({
            isim,
            soyisim,
            ogrencinumara,
            sube
        });
    }
    clickUpdate() {
        const { isim,
            soyisim,
            ogrencinumara,
            sube } = this.state;

        this.props.studentUpdate({ isim, soyisim, ogrencinumara, sube, uid: this.props.student.uid });
    }
    clickDelete() {
        this.props.studentDelete({ uid: this.props.student.uid });
    }
    renderButton() {
        if (!this.props.loadingUpdate) {
            <Button onPress={this.clickUpdate.bind(this)}>Güncelle</Button>
        }
        return <Spinner size="small" />
    }
    renderDeleteButton() {
        if (!this.props.loadingDelete) {
            <Button onPress={this.clickDelete.bind(this)}>Sil</Button>
        }
        return <Spinner size="small" />
    }
    render() {
        const { inputStyle } = styles;
        return (
            <Card>
                <CardSection>
                    <TextInput
                        placeholder="İsim"
                        style={inputStyle}
                        value={this.state.isim}
                        onChangeText={isim => this.setState({ isim })} //studentlistactions'a gidicek. Tek bir input gitmeyeceği için yani
                    //isim, soyisim, öğrenci numarası ve şube bilgileri gideceği için props olarak tanımladık ve onlara value verdik.
                    />
                </CardSection>
                <CardSection>
                    <TextInput
                        placeholder="Soyisim"
                        style={inputStyle}
                        value={this.state.soyisim}
                        onChangeText={soyisim => this.setState({ soyisim })}
                    />
                </CardSection>
                <CardSection>
                    <TextInput
                        placeholder="Öğrenci Numarası"
                        style={inputStyle}
                        value={this.state.ogrencinumara}
                        onChangeText={ogrencinumara => this.setState({ ogrencinumara })}
                    />
                </CardSection>
                <CardSection>
                    <Text>Şube</Text>
                    <Picker
                        style={{ flex: 1 }}
                        selectedValue={this.state.sube}
                        onValueChange={sube => this.setState({ sube })}>
                        <Picker.Item label="A şubesi" value="asube" />
                        <Picker.Item label="B şubesi" value="bsube" />
                        <Picker.Item label="C şubesi" value="csube" />
                        <Picker.Item label="D şubesi" value="dsube" />
                    </Picker>
                </CardSection>
                <CardSection>
                    <Button onPress={this.clickUpdate.bind(this)}>Güncelle</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.clickDelete.bind(this)}>Sil</Button>
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

const mapStateToProps = ({ studentUpdateResponse }) => {
    const { loadingUpdate, loadingDelete } = studentUpdateResponse;
    return {
        loadingUpdate,
        loadingDelete
    };
};

export default connect(mapStateToProps, { studentChange, studentUpdate, studentDelete })(StudentUpdate);
//connect'in süslü içindeki 2. parametreleri, actionsta kullanmış olduğumuz fonksiyonlar
/* onValueChange={sube => this.props.studentChange(sube)}, Picker datasını değiştirdiğimiz zaman. */

