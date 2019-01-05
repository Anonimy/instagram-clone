import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, View } from 'react-native';

export default class AuthLoadingScreen extends Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		try {
			const userid = Number(await AsyncStorage.getItem('USERID'));
			this.props.navigation.navigate(userid > 0 ? 'mainFeed' : 'login');
		} catch(e) {
			console.log(e);
			this.props.navigation.navigate('login');
		}
	}

	render() {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator />
			</View>
		);
	}
};