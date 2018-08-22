import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default () => {
	return (
		<View style={styles.navbar}>
			<Text style={{marginTop: 20}}>Instagram</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	navbar: {
		height: 55,
		backgroundColor: '#f9f9f9',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomColor: '#ccc',
		borderWidth: StyleSheet.hairlineWidth
	}
});