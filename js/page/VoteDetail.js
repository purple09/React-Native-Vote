import React from 'react';
import { Text, View, Alert, StyleSheet, FlatList, Button } from 'react-native';
import TitleBar from '../common/TitleBar';
import VoteCenter from '../net/VoteCenter';
import UserCenter from '../net/UserCenter';
import VoteDetailHeader from '../common/VoteDetailHeader';
import VoteItem1 from '../common/VoteItem1';
import { isLogin, getToken } from '../net/Constant';
import DialogBox from '../common/DialogBox'

export default class VoteDetail extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            showDialog: false,
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
                    if (data.options)
                        data.options.forEach((d) => {
                            if (d.vote_list)
                                d.vote_list.forEach((v) => userIds.add(v));
                        });
                    if (userIds.size > 0)
                        return UserCenter.getPublicUserinfoList(Array.from(userIds));
                    else
                        return new Promise((res, rej) => {
                            res({});
                        });
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


    showMore = () => {
        this.props.navigation.navigate('brief', { brief: this.state.data.brief });
    }

    showGift = () => {
        this.setDialogVisible(true);
    }

    onPressVote = (item) => {
        if (isLogin()) {
            this.doVote(item.id);
        } else {
            Alert.alert('请先登录');
        }

    }

    doVote = (optionId) => {
        VoteCenter.vote(this.state.data.id, optionId)
            .then(result => {
                if (result.code == 0) {
                    let data = this.state.data;
                    for (let option of data.options) {
                        if (option.id == optionId) {
                            option.is_voted = 1;
                            if (!option.vote_list) option.vote_list = [];
                            option.vote_list.unshift('803338');
                            break;
                        }
                    }
                    this.setState({ data });
                    Alert.alert('投票成功');
                } else
                    Alert.alert(result.msg);
            })
            .catch(error => {
                Alert.alert('投票失败');
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
            onPressVote={this.onPressVote}
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

    setDialogVisible = (visible) => {
        this.setState({ showDialog: visible });
    }

    renderLotteryDescDialog = () => (
        <DialogBox
            animationType={"fade"}
            transparent={true}
            visible={this.state.showDialog}
            onRequestClose={this.setDialogVisible.bind(this, false)}
            clickOutside={this.setDialogVisible.bind(this, false)}
        >
            <View style={styles.dialogContainer}>
                <Text style={styles.dialogTitle}>{this.state.data.name}</Text>
                <Text style={styles.dialogDesc}>{this.state.data.lottery_description}</Text>
                <View style={styles.dialogBtn}>
                    <Button
                        title={'参与投票'}
                        onPress={this.setDialogVisible.bind(this, false)}
                        color={'red'}
                    />
                </View>
            </View>
        </DialogBox>
    )

    renderLotteryResultDialog = () => {

    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.data ? (this.state.data.is_publish ? this.renderLotteryResultDialog() : this.renderLotteryDescDialog()) : null}
                {/* {this.state.data ?this.renderLotteryResultDialog()} */}
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
    dialogContainer: {
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#fff', padding: 20,
    },
    dialogTitle: {
        color: 'black',
        fontSize: 16,
    },
    dialogDesc: {
        marginTop: 5,
    },
    dialogBtn: {
        marginTop: 10,
    }
});