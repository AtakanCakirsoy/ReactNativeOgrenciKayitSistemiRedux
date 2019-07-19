import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './CardSection';

class ListItem extends Component {
    ogrenciClick() {
        Actions.studentUpdate({ student: this.props.ogrenci }); //studentCreate sayfamızda öğrencinin bilgilerini yakalayacağız. Amacımız öğrencini ismine tıkladığımız boxların dolu gelmesi.
    }
    render() {
        const { isim, soyisim } = this.props.ogrenci;
        return (
            //TouchableWithoutFeedback tıklanabilir özellik veriyor.
            <TouchableWithoutFeedback onPress={this.ogrenciClick.bind(this)}>
                <View>
                    <CardSection>
                        <Text>{isim} {soyisim}</Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
export default ListItem;