import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, Text, View } from 'react-native';

export default class AuthLoadingScreen extends Component {
	constructor(props) {
		super(props);
		(async () => {
			const userid = Number(await AsyncStorage.getItem('USERID'));
			this.props.navigation.navigate(userid > 0 ? 'mainFeed' : 'login');
		})();
	}

	render() {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator />
			</View>
		);
	}
};