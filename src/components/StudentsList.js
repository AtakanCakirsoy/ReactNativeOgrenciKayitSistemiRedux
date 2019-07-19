import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { studentsListData } from '../actions';

class StudentsList extends Component {
    UNSAFE_componentWillMount() { //uygulama açılır açılmaz bilgileri olan öğrencilerin ekrana gelmesi için
        this.props.studentsListData();
    }
    render() {
        return (
            <View>
                <Text>Öğrenci Listesi</Text>
            </View>
        );
    }
}

export default connect(null, { studentsListData })(StudentsList);