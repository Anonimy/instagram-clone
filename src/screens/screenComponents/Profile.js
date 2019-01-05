import React, { Component } from 'react';
import { AsyncStorage, Button, Image, Text, View } from 'react-native';

import ProfileHeader from '../../components/ProfileHeader';
import User from '../../../api/User';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {}
		};
		this.logout = this.logout.bind(this);
	}

	async componentDidMount() {
		this.setState({
			user: await this.getUserById()
		});
	}

	async getUserById() {
		try {
			const userid = Number(await AsyncStorage.getItem('USERID'));
			return User.getUserById(userid) || {};
		} catch(e) {
			alert(e);
			return {};
		}
	}

	async logout() {
		try {
			await AsyncStorage.clear();
			this.props.navigation.navigate('login');
		} catch(e) {
			alert(e);
		}
	}

	render() {
		return (
			<View>
				<ProfileHeader logout={this.logout} userName={this.state.user.username} />
				<View style={{ flexDirection: 'row', height: 100, marginTop: 10, marginHorizontal: 10 }}>
					<Image
						source={{uri: this.state.user.userImage}}
						style={{
							borderRadius: 50,
							height: 100,
							width: 100
						}}
					/>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', marginLeft: 10 }}>
						<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
							<View style={{ width: '33.3%', alignItems: 'center' }}>
								<Text style={{ fontWeight: 'bold' }}>8</Text>
								<Text>posts</Text>
							</View>
							<View style={{ width: '33.3%', alignItems: 'center' }}>
								<Text style={{ fontWeight: 'bold' }}>279</Text>
								<Text>followers</Text>
							</View>
							<View style={{ width: '33.3%', alignItems: 'center' }}>
								<Text style={{ fontWeight: 'bold' }}>190</Text>
								<Text>following</Text>
							</View>
						</View>
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
							<View style={{ width: '100%', borderColor: 'black', borderWidth: 1, height: '90%', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
								<Text>Edit Profile</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}
};