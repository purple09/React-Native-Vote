/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from 'react';
import { Text, Modal, View, TouchableHighlight, TextInput } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Button from './Button';
import CenterView from './CenterView';
import Welcome from './Welcome';
import VoteDetail from '../../js/page/VoteDetail';
import ModalExample from './test/ModalExample';
import { baseUrl, token } from './../../js/net/Constant'

class TestText extends React.Component {

  static defaultProps = {
    text: "没有输入"
  }

  render() {
    return <View>
      <TextInput />
      <Text>{this.props.text}</Text>
    </View>
  }
}

class Test extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      a: {
        b: {
          c: [3, 6, 8]
        }
      }
    }
  }

  render() {
    return <View>
      <Text onPress={() => {
        let x = this.state.a;
        x.b.c.unshift(666);
        this.setState({ a: x });
      }}>{this.state.a.b.c.join('=')}</Text>
    </View>
  }
}

storiesOf('vote', module)
  .add('VoteDetail', () =>
    <VoteDetail
      navigation={{
        state: {
          params: {
            voteid: 194
          }
        },
        goBack: action('goback'),
      }
      }
    />
  );
storiesOf('test', module)
  .addDecorator(getStory =>
    <CenterView>
      {getStory()}
    </CenterView>
  )
  .add('modal', () =>
    <ModalExample />
  )
  .add('aaa', () =>
    <Test />
  );



// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

// storiesOf('Button', module)
//   .addDecorator(getStory =>
//     <CenterView>
//       {getStory()}
//     </CenterView>
//   )
//   .add('with text', () =>
//     <Button onPress={action('clicked-text')}>
//       <Text>Hello Button</Text>
//     </Button>
//   )
//   .add('with some emoji', () =>
//     <Button onPress={action('clicked-emoji')}>
//       <Text>😀 😎 👍 💯</Text>
//     </Button>
//   );
