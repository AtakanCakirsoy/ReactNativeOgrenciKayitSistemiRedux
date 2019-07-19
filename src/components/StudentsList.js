import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, ListView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { studentsListData } from '../actions';
import ListItem from './ListItem';
class StudentsList extends Component {
    UNSAFE_componentWillMount() { //uygulama açılır açılmaz bilgileri olan öğrencilerin ekrana gelmesi için
        this.props.studentsListData();
        // this.createDataSource(this.props);
    }
    /*componentWillReceiveProps(nextProps) { //nextProps=this.props demek //WillMount ile farkı, WillMount uygulama ilk açıldığında direk çalışır, bu ise özellikler getirildikten sonra çalışır.
        this.createDataSource(nextProps);
    }
    createDataSource({ studentsArray }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2 //r1 r2ye eşit değilse, her bir satıra değişikliği atamış oluyoruz.
        });
        this.dataSource = ds.cloneWithRows(studentsArray);
    }*/

    renderRow(ogrenci) {
        return <ListItem ogrenci={ogrenci} />;
    }
    render() {
        return ( //FlatList çalışmayınca kendi yöntemimizle veriyi bastırdık.id, gelen kişilerin
            //bir idsi olmalıki eğer o kişiye tıklaman gerektiğinde hangi kişi olduğunu id ile çözücek
            //data ise çektiğin veriler.
            <View>
                {this.props.studentsArray.map((data,id) => 
                    <View key={id}>
                        {this.renderRow(data)}
                    </View>
                    )}
            </View>
        );
    }
}
const mapStateToProps = ({ studentDataResponse }) => {
    const studentsArray = _.map(studentDataResponse, (val, uid) => { //_ lodash demek.
        return { ...val, uid }; //{isim: 'Ayşe', soyisim: 'Uzun', sube: 'asube', uid:'....'} arrayın içerisine her bir data içerisine bunlar gibi almış oluyoruz.
    });
    return { studentsArray };
};
export default connect(mapStateToProps, { studentsListData })(StudentsList);

//Dönen dataları bir arrayın içerisine atabilmek için framework kurduk. Arrayı listview'in içerisine basabiliyoruz.
//npm install --save lodash