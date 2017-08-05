import React, { PropTypes } from 'react';
import CardView from 'react-native-cardview';
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import ResizeHeightImage from './ResizeHeightImage';
import moment from 'moment';

export default class VoteDetailHeader extends React.Component {

    static propTypes = {
        data: PropTypes.object,
        showMore: PropTypes.func,
        showGift: PropTypes.func,
    }

    constructor(props) {
        super(props)
    }

    static defaultProps = {
        data: {

        }
    }

    _deadlineText() {
        return '投票截止日：' + (this.props.data.never_expires ? '永久有效' : moment.unix(this.props.data.deadline).format('YYYY-MM-DD'));
    }

    renderShowGift = () => (
        <TouchableWithoutFeedback
            onPress={this.props.showGift}
        >
            <Image
                style={styles.gift}
                source={require('../../img/vote.png')}
            />
        </TouchableWithoutFeedback>
    )

    render() {
        return <CardView
            style={styles.container}
            cornerRadius={3}
            cardElevation={3}
        >
            <Text style={styles.title} >{this.props.data.name}</Text>
            <View style={styles.imgContainer}>
                <ResizeHeightImage
                    source={{ uri: this.props.data.cover_image }}
                    resizeMode='contain'
                    style={styles.img}
                />
                {this.props.data.vote_category === 1 ? this.renderShowGift() : null}
            </View>
            {this.props.data.summary.length > 0 ? <Text style={styles.summary}>{this.props.data.summary}</Text> : null}
            {this.props.data.brief.length > 0 ? <Text style={styles.showMore} onPress={this.props.showMore}>查看更多</Text> : null}
            <Text style={styles.deadline} >{this._deadlineText()}</Text>
        </CardView>
    }



}

const styles = StyleSheet.create({

    container: {
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        paddingRight: 15,
        paddingBottom: 15,
    },
    title: {
        fontSize: 18,
        color: 'black',
    },
    deadline: {
        marginTop: 5,
        fontSize: 12,
        color: '#999',
    },
    gift: {
        position: 'absolute',
        right: 5,
        bottom: 5,
    },
    imgContainer: {
        alignSelf: 'stretch',
        marginTop: 5,
    },
    summary: {
        marginTop: 5,
    },
    showMore: {
        marginTop: 5,
        color: 'blue',
    },
});