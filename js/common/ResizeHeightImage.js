import React from 'react';
import { Image } from 'react-native';

export default class ResizeHeightImage extends React.Component {
    static defaultSize = 100;

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        style: {}
    }

    layout(e) {
        this.layoutParams = {
            width: e.nativeEvent.layout.width
        }
    }

    loadEnd() {
        Image.getSize(this.props.source.uri, (width, height) => {
            let newHeight = height * (this.layoutParams ? this.layoutParams.width : 100) / width
            this.image && this.image.setNativeProps({
                style: {
                    height: newHeight
                }
            });
        });
    }

    componentDidMount() {

    }

    render() {
        return <Image
            ref={view => this.image = view}
            {...this.props}
            onLoadEnd={this.loadEnd.bind(this)}
            onLayout={this.layout.bind(this)}
            style={this.props.style}
        />
    }

}