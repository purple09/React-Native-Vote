import React, { PropTypes } from 'react';
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback, Alert, Button } from 'react-native';
import ResizeHeightImage from './ResizeHeightImage';

export default class VoteItem1 extends React.Component {


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
                </View>
                <Button
                    disabled={!!this.props.data.is_voted}
                    color={this.props.data.is_voted ? 'gray' : 'red'}
                    title={'投票'}
                    style={styles.btn}
                />
            </View>
        </View >
    }

}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,

    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    btn: {
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
});