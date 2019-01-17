import React, { Component } from 'react';
import {
	AsyncStorage,
	Button,
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	View,
	TextInput,
	TouchableWithoutFeedback
} from 'react-native';

import User from '../../../api/User';

export default class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			passwordConfirmation: '',
			isPasswordConfirmed: true
		};
		this.signup = this.signup.bind(this);
	}

	handleChangeText(field, text) {
		this.setState({
			[ field ]: text
		});
	}

	signup() {
		const isPasswordConfirmed = this.state.password === this.state.passwordConfirmation;
		if (isPasswordConfirmed) {
			User.signup({
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
		this.setState({
			isPasswordConfirmed
		});
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
					<TextInput
						style={[styles.input, {
							marginBottom: 10,
							borderColor: this.state.isPasswordConfirmed ? '#aaa' : '#f00'
						}]}
						placeholder='Confirm password'
						clearButtonMode='while-editing'
						textContentType='password'
						secureTextEntry
						onChangeText={text => this.handleChangeText('passwordConfirmation', text)}
					/>
					<Button title="SIGN UP" onPress={this.signup} />
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