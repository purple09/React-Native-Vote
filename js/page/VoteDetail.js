import React from 'react';
import { Text, View, Alert, StyleSheet, FlatList } from 'react-native';
import TitleBar from '../common/TitleBar';
import VoteCenter from '../net/VoteCenter';
import VoteDetailHeader from '../common/VoteDetailHeader';

export default class VoteDetail extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.getVoteDetail();
    }

    getVoteDetail() {
        VoteCenter.getDetail(this.props.navigation.state.params.voteid)
            .then((result) => {
                if (result.code == 0 && result.data) {
                    this.setState({
                        data: result.data
                    });
                } else {
                    Alert.alert(result.msg);
                }
            })
            .catch((error) => {
                Alert.alert('请求失败');
            });
    }

    renderContent = () => (
        <FlatList
            style={styles.list}
            keyExtractor={(item, index) => item.id}
            data={this.state.data.options}
            renderItem={this.renderItem}
            ItemSeparatorComponent={() => <View style={{ height: 10, backgroundColor: 'white' }} />}
            ListHeaderComponent={this.renderHeader()}
            ListFooterComponent={() => <View style={{ height: 50, backgroundColor: 'blue' }} />}
        />

    )

    renderItem = ({ item }) => (
        <Text>{JSON.stringify(item)}</Text>
    )

    renderHeader = () => (
        <View>
            <View style={{ height: 10, backgroundColor: 'white' }} />
            <VoteDetailHeader
                data={this.state.data}
                showMore={this.showMore}
                showGift={this.showGift}
            />
        </View>
    )

    showMore = () => {
        Alert.alert('showMore');
    }

    showGift = () => {
        Alert.alert('showGift');
    }

    render() {
        return (

            <View style={styles.container}>
                <TitleBar
                    title={this.state.data && this.state.data.name}
                    navRight={[
                        { source: require('../../img/share_menu.png'), onPress: () => { Alert.alert('第二个 menu') } }
                    ]}
                    onBackClick={() => this.props.navigation.goBack()}
                />
                {this.state.data ? this.renderContent() : null}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        backgroundColor: 'white'
    }
});