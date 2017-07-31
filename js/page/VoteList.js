import React from 'react';
import { Text, View, Button, Image, Dimensions } from 'react-native';
import TitleBar from '../common/TitleBar';
import VoteCenter from '../net/VoteCenter';
import ResizeHeightImage from '../common/ResizeHeightImage'
import CardView from 'react-native-cardview'

export default class VoteList extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '有色投票'
    }
  }

  componentDidMount() {
    VoteCenter.getList(1, 10)
      .then((VoteList) => {
        // console.log(`VoteList===` + JSON.stringify(VoteList));
      });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <TitleBar
          title={this.state.title}
          showBack={false}
        />
        <Text>Hello, Chat App!</Text>
        <ResizeHeightImage
          source={{ uri: 'http://facebook.github.io/react/img/logo_og.png' }}
          resizeMode='contain'
          style={{
            width: Dimensions.get('window').width - 20, height: 100, margin: 10
          }}
        />
        <CardView
          style={{ width: 200, height: 200 }}
          cardElevation={15}
          cornerRadius={15}>
          <Text>
            Elevation 0
          </Text>
        </CardView>
        <Button
          style={{ color: 'blue' }}
          onPress={() => navigate('detail')}
          title="what"
        />
      </View>
    );
  }
}