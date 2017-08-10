import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, SectionList, Button, PanResponder, processColor, Alert } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import TitleBar from './js/common/TitleBar';
import VoteList from './js/page/VoteList';
import VoteDetail from './js/page/VoteDetail';
import VoteBrief from './js/page/VoteBrief';

export default Vote = StackNavigator({
  main: { screen: VoteList },
  detail: { screen: VoteDetail },
  brief: { screen: VoteBrief },
});

