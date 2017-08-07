import React from 'react';
import { Text, View, Button, Image, Dimensions, FlatList, Alert, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import TitleBar from '../common/TitleBar';
import VoteCenter from '../net/VoteCenter';
import ResizeHeightImage from '../common/ResizeHeightImage'
import CardView from 'react-native-cardview';
import VoteListItem from '../common/VoteListItem';
import VoteItem1 from '../common/VoteItem1';

export default class VoteList extends React.Component {
  static navigationOptions = {
    header: null
  };

  static limit = 10;

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.page = 1;
    this.canLoadMore = true;
    this.isLoading = true;
    this.loadData();
  }

  loadData = () => {
    console.log('loadData');
    VoteCenter.getList(this.page, VoteList.limit)
      .then((result) => {
        this.isLoading = false;
        if (result.code == 0 && result.data && result.data.list) {
          this.setState({
            data: this.state.data.concat(result.data.list)
          });
          this.canLoadMore = (result.data.list.length == VoteList.limit);
        } else {
          Alert.alert(result.msg);
        }
      })
      .catch((error) => {
        this.isLoading = false;
        Alert.alert('请求失败');
      });
  }

  loadMore = () => {
    console.log('loadMore');
    if (this.canLoadMore) {
      this.page++;
      this.loadData();
    }
  }

  onPressItem = (id) => {
    this.props.navigation.navigate('detail', { voteid: id });
  };

  renderItem = ({ item }) => {
    return <VoteListItem
      data={item}
      onPress={this.onPressItem}
    />
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <TitleBar
          title={'有色投票'}
          showBack={false}
        />
        <FlatList
          style={styles.list}
          keyExtractor={(item, index) => item.id}
          data={this.state.data}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => <View style={{ height: 10, backgroundColor: 'white' }} />}
          ListHeaderComponent={() => <View style={{ height: 10, backgroundColor: 'white' }} />}
          ListFooterComponent={() => <View style={{ height: 50, backgroundColor: 'white' }} />}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.2}
        />

      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    backgroundColor: 'white'
  }
});