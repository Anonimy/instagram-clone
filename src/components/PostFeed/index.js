import React, { Component } from 'react';
import { AsyncStorage, FlatList, View, Text } from 'react-native';

import User from '../../../api/User';
import Post from './Post';

export default class PostFeed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			feedPosts: []
		};
	}

	async componentDidMount() {
		try {
			const userid = Number(await AsyncStorage.getItem('USERID'));
			this.setState({
				feedPosts: this.props.isOwn ? User.listOwnPosts(userid) : User.listPosts(userid)
			});
		} catch(e) {
			alert(e);
		}
	}

	render() {
		return (
			<View style={{flex: 1, justifyContent: 'center'}}>
				<FlatList
					data={this.state.feedPosts}
					renderItem={({ item }) => (
						<Post
							url={item.url}
							numLikes={item.numLikes}
							description={item.description}
							userInfo={item.user}
						/>
					)}
					keyExtractor={item => String(item.id)}
				/>
			</View>
		);
	}
}
