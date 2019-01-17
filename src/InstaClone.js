import React, { Component } from 'react';
import { createSwitchNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import { Login, MainFeed, Camera, Profile, Signup, AuthLoadingScreen } from './screens';

const TopTabs = createMaterialTopTabNavigator({
	loginScreen: Login,
	signup: Signup
}, {
	initialRouteName: 'loginScreen',
	tabBarOptions: {
		style: {
			paddingTop: 20
		}
	}
});

const BotTabs = createBottomTabNavigator({
	main: {
		screen: MainFeed,
		navigationOptions: {
			tabBarLabel: 'Home',
			tabBarIcon: ({ tintColor }) => (
				<Icon name='ios-home' color={tintColor} size={24} />
			)
		}
	},
	camera: {
		screen: Camera,
		navigationOptions: {
			tabBarLabel: 'Camera',
			tabBarIcon: ({ tintColor }) => (
				<FAIcon name='plus-square-o' color={tintColor} size={24} />
			)
		}
	},
	profile: {
		screen: Profile,
		navigationOptions: {
			tabBarLabel: 'Profile',
			tabBarIcon: ({ tintColor }) => (
				<Icon name='ios-person' color={tintColor} size={24} />
			)
		}
	}
}, {
	initialRouteName: 'main',
	tabBarOptions: {
		showLabel: false,
		inactiveTintColor: '#000'
	}
});

const MainStack = createSwitchNavigator({
	authLoad: AuthLoadingScreen,
	login: TopTabs,
	mainFeed: BotTabs
}, {
	initialRouteName: 'authLoad',
});

export default class InstaClone extends Component {
	render() {
		return (
			<MainStack />
		);
	}
};

