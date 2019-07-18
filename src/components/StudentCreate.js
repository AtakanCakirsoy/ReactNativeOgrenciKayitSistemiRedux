import React, { Component } from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Button, CardSection } from '../components'; //components klasörü altındaki index.js sayesinde bu tarzda çağırabildik.
import { studentChange } from '../actions';

class StudentCreate extends Component {
    clickSave() {

    }
    render() {
        const { inputStyle } = styles;
        return (
            <View>
                <CardSection>
                    <TextInput
                        placeholder="İsim"
                        style={inputStyle}
                        value={this.props.isim}
                        nChangeText={isim => this.props.studentChange({ props: 'isim', value: isim })} //studentlistactions'a gidicek. Tek bir input gitmeyeceği için yani
                    //isim, soyisim, öğrenci numarası ve şube bilgileri gideceği için props olarak tanımladık ve onlara value verdik.
                    />
                </CardSection>
                <CardSection>
                    <TextInput
                        placeholder="Soyisim"
                        style={inputStyle}
                        value={this.props.soyisim}
                        onChangeText={soyisim => this.props.studentChange({ props: 'soyisim', value: soyisim })}
                    />
                </CardSection>
                <CardSection>
                    <TextInput
                        placeholder="Öğrenci Numarası"
                        style={inputStyle}
                        value={this.props.ogrencinumara}
                        onChangeText={ogrencinumara => this.props.studentChange({ props: 'ogrencinumara', value: ogrencinumara })}
                    />
                </CardSection>
                <CardSection>
                    <Text>Şube</Text>
                    <Picker
                        style={{ flex: 1 }}
                        selectedValue={this.props.sube}
                        onValueChange={sube => this.props.studentChange({ props: 'sube', value: sube })}>
                        <Picker.Item label="A şubesi" value="asube" />
                        <Picker.Item label="B şubesi" value="bsube" />
                        <Picker.Item label="C şubesi" value="csube" />
                        <Picker.Item label="D şubesi" value="dsube" />
                    </Picker>
                </CardSection>
                <CardSection>
                    <Button onPress={this.clickSave.bind(this)}>Kaydet</Button>
                </CardSection>
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

const mapToStateProps = ({ studentsListResponse }) => {
    const { isim,
        soyisim,
        ogrencinumara,
        sube } = studentsListResponse;
    return {
        isim,
        soyisim,
        ogrencinumara,
        sube //burdan dönen şube mesela yukardaki this.props.sube değerimiz oluyor.
    };
};

export default connect(mapToStateProps, { studentChange })(StudentCreate);
 /* onValueChange={sube => this.props.studentChange(sube)}, Picker datasını değiştirdiğimiz zaman. */