import React from 'react';
import { Text, View, StyleSheet, ScrollView, } from 'react-native';
import TitleBar from '../common/TitleBar';

export default class VoteDetail extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={styles.container}>
                <TitleBar
                    title={'活动简介'}
                    onBackClick={() => this.props.navigation.goBack()}
                />
                <ScrollView>
                    <Text style={styles.brief}>{this.props.navigation.state.params.brief}</Text>
                </ScrollView>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    brief: {
        marginVertical: 20,
        marginHorizontal: 10,
    }
});
