import React from 'react';
import { Text, View, Alert, StyleSheet, FlatList } from 'react-native';
import TitleBar from '../common/TitleBar';
import VoteCenter from '../net/VoteCenter';
import UserCenter from '../net/UserCenter';
import VoteDetailHeader from '../common/VoteDetailHeader';
import VoteItem1 from '../common/VoteItem1';

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
        let data = {};
        VoteCenter.getDetail(this.props.navigation.state.params.voteid)
            .then((result) => {
                if (result.code == 0 && result.data) {
                    data = result.data;
                    let userIds = new Set();
                    data.options.forEach((d) => {
                        if (d.vote_list)
                            d.vote_list.forEach((v) => userIds.add(v));
                    });
                    return UserCenter.getPublicUserinfoList(Array.from(userIds));

                } else {
                    Alert.alert(result.msg);
                }
            })
            .then((result) => {
                let avatorMap = new Map();
                if (result.code == 0 && result.data && result.data.infos) {
                    result.data.infos.forEach((info) => avatorMap.set(info.id, info.avatar));
                }
                this.setState({
                    data,
                    avatorMap
                });
            })
            .catch((error) => {
                Alert.alert('请求失败===' + error);
                console.log('error===' + error);
            });
    }

    renderContent = () => (
        <FlatList
            style={styles.list}
            keyExtractor={(item, index) => item.id}
            extraData={this.state.avatorMap}
            data={this.state.data.options}
            renderItem={this.renderItem}
            ItemSeparatorComponent={() => <View style={{ height: 20, backgroundColor: 'white' }} />}
            ListHeaderComponent={this.renderHeader()}
            ListFooterComponent={this.renderFooter()}
        />

    )

    renderItem = ({ item }) => (
        <VoteItem1
            data={item}
            onPressVote={() => Alert.alert('onPressVote')}
            maxVoteNum={100}
            avatorMap={this.state.avatorMap}
        />
    );


    renderHeader = () => (
        <View>
            <View style={{ height: 10, backgroundColor: 'white' }} />
            <VoteDetailHeader
                data={this.state.data}
                showMore={this.showMore}
                showGift={this.showGift}
            />
            <View style={{ height: 30, backgroundColor: 'white' }} />
        </View>
    )

    renderFooter = () => (
        <View style={styles.footer}>
            <Text style={styles.footerText}>主办单位：上海有色网</Text>
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
    },
    footer: {
        marginHorizontal: 12,
        marginTop: 50,
        marginBottom: 100,
        backgroundColor: 'gainsboro',
        paddingVertical: 10,
    },
    footerText: {
        textAlign: 'center',
        fontSize: 12,
        color: 'black',
    },
});