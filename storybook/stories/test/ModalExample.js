import React, { Component } from 'react';
import { Modal, Text, TouchableWithoutFeedback, View, Alert } from 'react-native';
import DialogBox from './DialogBox';

class ModalExample extends Component {



  constructor(props) {
    super(props);
    this.state = { modalVisible: false };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return <View>
      <DialogBox
        animationType={"fade"}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => { alert("Modal has been closed.") }}
        clickOutside={() => this.setModalVisible(!this.state.modalVisible)}
      >
        <View style={{
          borderRadius: 10,
          alignItems: 'center',
          backgroundColor: '#fff', padding: 20,
        }}>
          <Text>Title</Text>
          <Text>Message</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'stretch', }}>
            <Text style={{ color: 'blue' }} onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>ok</Text>
            <Text style={{ color: 'red' }} onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>cancel</Text>
          </View>

        </View>
      </DialogBox>

      <TouchableWithoutFeedback onPress={() => {
        this.setModalVisible(true)
      }}>
        <Text>Show Modal</Text>
      </TouchableWithoutFeedback>
    </View>
  }

  // render() {
  //   return (
  //     <View >
  //       <Modal

  //       >
  //         <TouchableWithoutFeedback
  //           onPress={() => Alert.alert('点了')}
  //         >
  //           <View
  //             style={{
  //               flex: 1,
  //               justifyContent: 'center',
  //               padding: 20,
  //               backgroundColor: 'rgba(0, 0, 0, 0.5)'
  //             }}>
  //             <TouchableWithoutFeedback
  //               onPress={() => { }}
  //             >
  //               <View style={{
  //                 borderRadius: 10,
  //                 alignItems: 'center',
  //                 backgroundColor: '#fff', padding: 20,
  //               }}>
  //                 <Text>Title</Text>
  //                 <Text>Message</Text>
  //                 <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'stretch', }}>
  //                   <Text style={{ color: 'blue' }} onPress={() => {
  //                     this.setModalVisible(!this.state.modalVisible)
  //                   }}>ok</Text>
  //                   <Text style={{ color: 'red' }} onPress={() => {
  //                     this.setModalVisible(!this.state.modalVisible)
  //                   }}>cancel</Text>
  //                 </View>

  //               </View>
  //             </TouchableWithoutFeedback>
  //           </View>
  //         </TouchableWithoutFeedback>
  //       </Modal>

  //       <TouchableWithoutFeedback onPress={() => {
  //         this.setModalVisible(true)
  //       }}>
  //         <Text>Show Modal</Text>
  //       </TouchableWithoutFeedback>

  //     </View >
  //   );
  // }
}
export default ModalExample;