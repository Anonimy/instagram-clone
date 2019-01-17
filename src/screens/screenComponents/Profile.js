import React, { Component } from 'react';
import { AsyncStorage, ScrollView, View } from 'react-native';

import { ProfileHeader, ProfileSummary } from '../../components/Profile';
import PostFeed from '../../components/PostFeed';

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
			<View style={{ flex: 1 }}>
				<ProfileHeader logout={this.logout} userName={this.state.user.username} />
				<ScrollView>
					<ProfileSummary user={this.state.user} />
					<PostFeed isOwn />
				</ScrollView>
			</View>
		);
	}
};