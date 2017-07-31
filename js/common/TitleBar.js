import React, { Component, PropTypes } from 'react';
import { StyleSheet, Platform, View, Button, Text, StatusBar, TouchableWithoutFeedback, Image, ToastAndroid } from 'react-native';

const STATUS_BAR_HEIGHT = 20;

const ButtonShape = {
    source: PropTypes.any.isRequired,
    onPress: PropTypes.func,
};

export default class TitleBar extends Component {

    static propTypes = {
        showBack: PropTypes.bool,
        onBackClick: PropTypes.func,
        navRight: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.shape(ButtonShape)),
            PropTypes.element,
        ]),
        title: PropTypes.string,
    }

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        showBack: true,
        title: '',
    }

    renderNavRight(data = []) {
        return (
            (!!data.props) ? data
                : <View style={styles.navBarButton}>
                    {
                        data.map((buttonShape, index) =>
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={buttonShape.onPress || (() => { })}
                            >
                                <Image
                                    resizeMode='center'
                                    source={buttonShape.source}
                                    style={styles.backBtn}
                                />
                            </TouchableWithoutFeedback>
                        )
                    }
                </View>
        );
    }

    render() {
        let statusBar =
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar} barStyle="light-content" style={styles.statusBar} />
            </View>;
        let leftBack =
            <View style={styles.navBarButton}>
                {this.props.showBack ? <TouchableWithoutFeedback
                    onPress={
                        this.props.onBackClick ? this.props.onBackClick : () => { }

                    }
                >
                    <Image
                        resizeMode='center'
                        source={require('../../img/back.png')}
                        style={styles.backBtn}
                    />
                </TouchableWithoutFeedback>
                    : null
                }
            </View>;
        let rightMenu = this.renderNavRight(this.props.navRight);
        let title =
            <View style={styles.titleStyle}>
                <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>{this.props.title}</Text>
            </View>;
        let content =
            <View style={styles.content}>
                {leftBack}
                {title}
                {rightMenu}
            </View>
        return (
            <View style={styles.container}>
                {statusBar}
                {content}
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#34373c'
    },
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50
    },
    backBtn: {
        width: 40
    },
    titleStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 40,
        top: 0,
        right: 40,
        bottom: 0,

    },
    title: {
        color: 'white',
        fontSize: 18
    },
    navBarButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});