import React, { Component, PropTypes } from 'react';
import { Modal, Text, TouchableWithoutFeedback, View, Alert, } from 'react-native';

export default class DialogBox extends Component {

    static propTypes = {
        visible: PropTypes.bool,
        transparent: PropTypes.bool,
        animationType: PropTypes.oneOf(["none", "slide", "fade"]),
        onRequestClose: PropTypes.func.isRequired,
        clickOutside: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static defaultProps = {
        visible: false,
        transparent: false,
        animationType: 'none',
    }


    render() {
        return <View>
            <Modal
                animationType={this.props.animationType}
                transparent={this.props.transparent}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}
            >
                <TouchableWithoutFeedback
                    onPress={this.props.clickOutside}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            padding: 20,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)'
                        }}>
                        <TouchableWithoutFeedback
                            onPress={() => { }}
                        >
                            {this.props.children}
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    }
}