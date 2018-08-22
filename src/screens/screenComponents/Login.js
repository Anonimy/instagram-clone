import React, { Component } from 'react';
import {
	AsyncStorage,
	Button,
	Keyboard,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View
} from 'react-native';

import User from '../../../api/User';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
		this.login = this.login.bind(this);
	}

	handleChangeText(field, text) {
		this.setState({
			[ field ]: text
		});
	}

	login() {
		User.login({
			username: this.state.username,
			password: this.state.password
		}).then(res => {
			const { code, result } = res;
			const userid = Object(result).session_id || 0;
			if (Number(code) === 1 && userid > 0) {
				(async () => {
					try {
						await AsyncStorage.setItem('USERID', String(userid), () => {
							this.props.navigation.navigate('mainFeed');
						});
					} catch(e) {
						alert(e);
					}
				})();
			} else {
				alert(result || 'Error');
			}
		}).catch(e => alert(e));
	}

	componentDidMount() {
		(async () => {
			try {
				const userid = Number(await AsyncStorage.getItem('USERID'));
				if (userid > 0) {
					this.props.navigation.navigate('mainFeed');
				}
			} catch(e) {
				alert(e);
			}
		})();
	}

	render() {
		return (
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={{flex: 1, alignItems: 'center'}}>
					<View style={{height: '20%'}} />
					<TextInput
						style={styles.input}
						placeholder='Username'
						clearButtonMode='while-editing'
						autoCorrect={false}
						autoCapitalize='none'
						textContentType='username'
						onChangeText={text => this.handleChangeText('username', text)}
					/>
					<TextInput
						style={styles.input}
						placeholder='Password'
						clearButtonMode='while-editing'
						textContentType='password'
						secureTextEntry
						onChangeText={text => this.handleChangeText('password', text)}
					/>
					<Button title="LOGIN" onPress={this.login} />
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	input: {
		borderColor: '#aaa',
		borderWidth: StyleSheet.hairlineWidth,
		width: '80%',
		height: 35,
		marginVertical: 5,
		paddingLeft: 5
	}
});