import React, { PropTypes } from 'react';
import CardView from 'react-native-cardview';
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import ResizeHeightImage from './ResizeHeightImage';
import moment from 'moment';

export default class VoteListItem extends React.Component {

    static propTypes = {
        data: PropTypes.object,
        onPress: PropTypes.func,
    }

    constructor(props) {
        super(props)
    }

    static defaultProps = {
        data: {

        }
    }


    _imgUri() {
        return (this.props.data.list_image && this.props.data.list_image.length > 0) ?
            this.props.data.list_image : this.props.data.cover_image;
    }

    _deadlineText() {
        return '投票截止日：' + (this.props.data.never_expires ? '永久有效' : moment.unix(this.props.data.deadline).format('YYYY-MM-DD'));
    }

    render() {
        return <TouchableWithoutFeedback
            onPress={this.props.onPress && this.props.onPress.bind(null, this.props.data.id)}
        >
            <CardView
                style={styles.container}
                cornerRadius={3}
                cardElevation={3}
            >
                <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>{this.props.data.name}</Text>
                <ResizeHeightImage
                    source={{
                        uri: this._imgUri()

                    }}
                    resizeMode='contain'
                    style={styles.img}
                />
                <View style={styles.bottom}>
                    <Text style={styles.deadline} >{this._deadlineText()}</Text>
                    {this.props.data.vote_category === 1 ? <Image
                        style={styles.gift}
                        source={require('../../img/vote.png')}
                    /> : null}
                </View>

            </CardView>
        </TouchableWithoutFeedback>
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
    bottom: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    deadline: {
        fontSize: 12,
        color: '#999',
    },
    gift: {

    },
    img: {
        alignSelf: 'stretch',
        marginTop: 5,
    }
});