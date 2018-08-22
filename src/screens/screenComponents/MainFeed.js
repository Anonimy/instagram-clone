import React from 'react';
import { View } from 'react-native';

import MainHeader from '../../components/MainHeader';
import PostFeed from '../../components/PostFeed'

export default () => {
	return (
		<View style={{flex: 1}}>
			<MainHeader />
			<PostFeed />
		</View>
	);
}