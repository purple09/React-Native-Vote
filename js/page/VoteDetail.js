import React from 'react';
import { Text, View, Alert } from 'react-native';
import TitleBar from '../common/TitleBar'

export default class VoteDetail extends React.Component {
    static navigationOptions = {
        title: 'Chat with Lucy',
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            title: '有色投票'
        }
    }

    render() {
        return (
            <View>
                <TitleBar
                    title={this.state.title}
                    navRight={[
                        { source: require('../../img/share_menu.png'), onPress: () => { Alert.alert('第二个 menu') } }
                    ]}
                    onBackClick={() => this.props.navigation.goBack()}
                />
                <Text>Chat with Lucy</Text>
            </View>
        );
    }
}