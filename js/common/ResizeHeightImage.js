import React from 'react';
import { Image } from 'react-native';

export default class ResizeHeightImage extends React.Component {
    static defaultSize = 100;

    constructor(props) {
        super(props);
        this.state = {
            width: this.props.style.width ? this.props.style.width : ResizeHeightImage.defaultSize,
            height: this.props.style.height ? this.props.style.height : ResizeHeightImage.defaultSize,
        }
    }

    static defaultProps = {
        style: {}
    }

    componentDidMount() {
        Image.getSize(this.props.source.uri, (width, height) => {
            const newHeight = height * this.state.width / width
            this.setState({ height: newHeight });
        });
    }

    render() {
        return <Image
            {...this.props}
            style={{ ...this.props.style, height: this.state.height }}
        />
    }

}