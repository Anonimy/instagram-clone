import React, { Component } from 'react';
import { AsyncStorage, Button, View } from 'react-native';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout() {
		(async () => {
			try {
				await AsyncStorage.clear(() => {
					this.props.navigation.navigate('login');
				});
			} catch(e) {
				alert(e);
			}
		})();
	}

	render() {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Button title="Sair" onPress={this.logout} />
			</View>
		);
	}
};