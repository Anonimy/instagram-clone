import React from 'react';
import { CameraRoll, Dimensions, FlatList, Image, View } from 'react-native';

export default class Camera extends React.Component {
	constructor(props) {
		super(props);
		this.imageSize = (Dimensions.get('window').width * 0.34) | 0;
		this.state = {
			photos: []
		}
	}

	async componentDidMount() {
		try {
			const images = await CameraRoll.getPhotos({ first: 33, assetType: 'Photos' });
			this.setState({
				photos: images.edges
			});
		} catch(e) {
			alert(e);
		}
	}

	render() {
		return (
			<View style={{ marginTop: 20 }}>
				<FlatList
					numColumns={3}
					data={this.state.photos}
					renderItem={({ item }) => (
						<Image
							style={{
								width: this.imageSize,
								height: this.imageSize
							}}
							source={{ uri: item.node.image.uri }}
						/>
					)}
					keyExtractor={item => item.node.image.uri}
				>
				</FlatList>
			</View>
		);
	}
}