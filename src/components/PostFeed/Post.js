import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Post extends Component {
	constructor(props) {
		super(props);
		this.imagesHeight = (Dimensions.get('window').width * 1.1) | 0;
		this.state = {
			like: false,
			lastPostTap: 0
		};
		this.likePostOnDoubleTap = this.likePostOnDoubleTap.bind(this);
		this.likePost = this.likePost.bind(this);
	}

	likePostOnDoubleTap() {
		const threshold = 400;
		const currentPostTap = new Date().getTime();
		const diff = currentPostTap - this.state.lastPostTap;
		const newStateObj = {
			lastPostTap: currentPostTap
		};
		if (diff < threshold) {
			newStateObj.like = true;
		}
		this.setState(newStateObj);
	}

	likePost() {
		this.setState(previousState => {
			return {
				like: !previousState.like
			};
		});
	}

	render() {
		return (
			<View style={{backgroundColor: '#fff'}}>
				<View style={styles.defaultBar}>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<Image
							source={{uri: this.props.userInfo.userImage}}
							style={styles.userImage}
						/>
						<Text style={{fontWeight: 'bold'}}>{this.props.userInfo.username}</Text>
					</View>
					<View style={{alignItems: 'center'}}>
						<Text style={{fontSize: 25}}>...</Text>
					</View>
				</View>
				<TouchableWithoutFeedback accessibilityTraits={['image', 'button']} onPress={this.likePostOnDoubleTap}>
					<Image
						source={{uri: this.props.url}}
						style={{width: '100%', height: this.imagesHeight}}
					/>
				</TouchableWithoutFeedback>
				<View style={styles.defaultBar}>
					<View style={{flexDirection: 'row'}}>
						<TouchableWithoutFeedback
							hitSlop={{right: 15}}
							accessibilityTraits={['button']}
							onPress={this.likePost}
						>
							<Icon
								name='ios-heart'
								size={30}
								style={[styles.icon, { color: this.state.like ? '#f00' : '#000' }]}
							/>
						</TouchableWithoutFeedback>
						<Icon
							name='ios-chatbubbles'
							size={30}
							style={styles.icon}
						/>
						<Icon
							name='ios-paper-plane'
							size={30}
							style={styles.icon}
						/>
					</View>
					<View>
						<Icon
							name='ios-flag'
							size={30}
							style={[styles.icon, { marginRight: 0 }]}
						/>
					</View>
				</View>
				<View style={{paddingHorizontal: 10, marginBottom: 10}}>
					<Text style={{fontWeight: 'bold'}}>{this.props.numLikes} curtidas</Text>
				</View>
				<View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 10}}>
					<Text>
						<Text style={{fontWeight: 'bold'}}>{this.props.userInfo.username}</Text> {this.props.description}
					</Text>
				</View>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	defaultBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		height: 55,
		backgroundColor: '#fff',
		paddingHorizontal: 10
	},
	userImage: {
		width: 35,
		height: 35,
		marginRight: 10,
		borderRadius: 20
	},
	icon: {
		width: 30,
		height: 30,
		marginRight: 20
	}
});