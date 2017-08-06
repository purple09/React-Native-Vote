import React, { PropTypes } from 'react';
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback, Alert, Button } from 'react-native';
import ResizeHeightImage from './ResizeHeightImage';

export default class VoteItem1 extends React.Component {

    static propTypes = {
        data: PropTypes.object,
        onPressVote: PropTypes.func,
    }

    constructor(props) {
        super(props)
        this.state = {
            showDesc: false,
        }
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.order}>{this.props.data.order}</Text>
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
                    {this.props.data.url && <ResizeHeightImage source={{ uri: this.props.data.url }} style={styles.img} />}
                </View>
                <Text
                    onPress={this.props.onPressVote && this.props.onPressVote.bind(null, this.props.data)}
                    style={StyleSheet.flatten([styles.btn, { backgroundColor: this.props.data.is_voted ? 'gray' : 'red' }])}
                >
                    投票
                </Text>
            </View>

        </View >
    }

}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 5,
    },
    content: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
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
});