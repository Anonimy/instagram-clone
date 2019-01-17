import React, { Component } from 'react';
import { Animated, Easing, Image, ImageBackground, StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default class Post extends Component {
	constructor(props) {
		super(props);
		this.imagesHeight = (Dimensions.get('window').width * 1.1) | 0;
		this.state = {
			like: false,
			lastPostTap: 0,
			likeAnim: new Animated.Value(0),
			likeAnimDisplay: 'none'
		};
		this.likePostOnDoubleTap = this.likePostOnDoubleTap.bind(this);
		this.likePost = this.likePost.bind(this);
	}

	startLikeAnimation = () => {
		Animated.timing(this.state.likeAnim, {
			toValue: 130,
			duration: 300,
			easing: Easing.elastic()
		}).start(({ finished }) => {
			if (finished) {
				setTimeout(() => {
					this.setState({
						likeAnim: new Animated.Value(0),
						likeAnimDisplay: 'none'
					});
				}, 200);
			}
		});
	}

	likePostOnDoubleTap() {
		const threshold = 400;
		const currentPostTap = new Date().getTime();
		const diff = currentPostTap - this.state.lastPostTap;
		const newStateObj = {
			lastPostTap: currentPostTap
		};
		if (diff < threshold) {
			newStateObj.likeAnimDisplay = 'flex';
			newStateObj.like = true;
		}
		this.setState(newStateObj, () => {
			this.startLikeAnimation();
		});
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
							source={{uri: this.props.userInfo.userImage || 'https://i.stack.imgur.com/4zFaC.png?s=328&g=1'}}
							style={styles.userImage}
						/>
						<Text style={{fontWeight: 'bold'}}>{this.props.userInfo.username}</Text>
					</View>
					<View style={{alignItems: 'center'}}>
						<Text style={{fontSize: 25}}>...</Text>
					</View>
				</View>
				<TouchableWithoutFeedback style={{flex: 1}} accessibilityTraits={['image', 'button']} onPress={this.likePostOnDoubleTap}>
					<ImageBackground
						source={{uri: this.props.url}}
						style={{width: '100%', height: this.imagesHeight}}
					>
						<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', display: this.state.likeAnimDisplay}}>
							<AnimatedIcon
								name='ios-heart'
								style={{color: '#f00', fontSize: this.state.likeAnim}}
							/>
						</View>
					</ImageBackground>
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