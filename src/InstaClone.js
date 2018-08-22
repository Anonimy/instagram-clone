import React, { Component } from 'react';
import { View } from 'react-native';
import { createSwitchNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import { Login, MainFeed, Camera, Profile, Signup, AuthLoadingScreen } from './screens';

const TopTabs = createMaterialTopTabNavigator({
	loginScreen: Login,
	signup: Signup
}, {
	initialRouteName: 'loginScreen'
});

const Tabs = createBottomTabNavigator({
	camera: {
		screen: Camera,
		navigationOptions: {
			tabBarLabel: 'Camera',
			tabBarIcon: ({ tintColor }) => (
				<Icon name='ios-camera' size={24} />
			)
		}
	},
	main: {
		screen: MainFeed,
		navigationOptions: {
			tabBarLabel: 'Home',
			tabBarIcon: ({ tintColor }) => (
				<Icon name='ios-home' size={24} />
			)
		}
	},
	profile: {
		screen: Profile,
		navigationOptions: {
			tabBarLabel: 'Profile',
			tabBarIcon: ({ tintColor }) => (
				<Icon name='ios-person' size={24} />
			)
		}
	}
}, {
	initialRouteName: 'main'
});

const MainStack = createSwitchNavigator({
	authLoad: AuthLoadingScreen,
	login: TopTabs,
	mainFeed: Tabs
}, {
	initialRouteName: 'authLoad'
});

export default class InstaClone extends Component {
	render() {
		return (
			<MainStack />
		);
	}
};

