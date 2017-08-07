import React, { PropTypes } from 'react';
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback, Alert, Button } from 'react-native';
import ResizeHeightImage from './ResizeHeightImage';


export default class VoteItem1 extends React.Component {



    static propTypes = {
        data: PropTypes.object,
        onPressVote: PropTypes.func,
        maxVoteNum: PropTypes.number,
        avatorMap: PropTypes.any,
    }

    constructor(props) {
        super(props)
        this.state = {
            showDesc: false,
        }
        this.config = {
            maxVoteNumProgressWidth: 280,
            minRange: 100,
            maxAvatorNum: 12,
        }
    }

    static defaultProps = {
        maxVoteNum: 1,
    }

    voteNumProgressWidth = () => {
        const range = Math.max(this.props.maxVoteNum, this.config.minRange);
        return Math.min(this.config.maxVoteNumProgressWidth, this.config.maxVoteNumProgressWidth * this.props.data.vote_num / range);
    }

    renderContent = () => (
        <View style={styles.content}>
            <Text style={styles.order}>{this.props.data.order + ""}</Text>
            <View style={styles.title}>
                <Text style={StyleSheet.flatten([styles.name, { color: this.props.data.description.length > 0 ? 'blue' : 'black' }])}>
                    {this.props.data.name}
                    {!this.state.showDesc && this.props.data.description.length > 0 ?
                        <Text
                            onPress={() => this.setState({ showDesc: true })} >
                            <Image source={require('../../img/more.png')}
                            />
                            {' '}
                        </Text>
                        : null}

                </Text>
                {this.state.showDesc && <Text>{this.props.data.description}</Text>}
                {this.props.data.url.length > 0 && <ResizeHeightImage source={{ uri: this.props.data.url }} style={styles.img} />}
            </View>
            <Text
                onPress={this.props.onPressVote && this.props.onPressVote.bind(null, this.props.data)}
                style={StyleSheet.flatten([styles.btn, { backgroundColor: this.props.data.is_voted ? 'gray' : 'red' }])}
            >
                投票
                </Text>
        </View>
    )

    renderVoteNum = () => (
        <View style={styles.voteNum}>
            <View style={StyleSheet.flatten([styles.voteNumProgress, { width: this.voteNumProgressWidth() }])} />
            <Text style={styles.voteNumText}>{`${this.props.data.vote_num} 票`}</Text>
        </View>
    );

    renderVoteAvatorList = () => (
        <View style={styles.voteAvatorList}>
            {this.props.data.vote_list
                && this.props.data.vote_list.map(
                    (voteId, index) => {
                        let source = require('../../img/default_avtar.png');
                        if (this.props.avatorMap) {
                            const avator = this.props.avatorMap.get(voteId);
                            if (avator && avator.length > 0) source = { uri: avator };
                        }
                        return <Image
                            key={index}
                            style={styles.voteAvator}
                            source={source} />
                    }

                )}
            {this.props.data.vote_num > this.config.maxAvatorNum && <Text >...</Text>}
        </View>
    );

    render() {

        return <View style={styles.container}>
            {this.renderContent()}
            {this.renderVoteNum()}
            {this.renderVoteAvatorList()}
        </View >
    }

}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,

    },
    content: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 2,
    },
    btn: {
        fontSize: 12,
        color: 'white',
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 2,
    },
    order: {
        width: 20,
        height: 20,
        textAlign: 'center',
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 0.5,
        color: 'black',
        fontSize: 16,
    },
    name: {

    },
    title: {
        flex: 1,
        flexGrow: 1,
        marginHorizontal: 5,
    },
    img: {
        marginTop: 5,
    },
    voteNum: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    voteNumProgress: {
        height: 5,
        backgroundColor: 'red',
    },
    voteNumText: {
        marginLeft: 5,
        color: 'grey',
        fontSize: 12,
    },
    voteAvatorList: {
        flexDirection: 'row',
        marginTop: 5,
    },
    voteAvator: {
        marginHorizontal: 2,
        width: 20,
        height: 20,
        borderRadius: 10,
    },
});