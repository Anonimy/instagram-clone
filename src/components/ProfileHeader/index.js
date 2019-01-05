import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default ({ logout, userName }) => {
	return (
		<View style={styles.navbar}>
			<Icon name='ios-person' size={34} />
			<Text style={{ fontWeight: 'bold' }}>{userName || ''}</Text>
			<Icon name='ios-log-out' size={34} onPress={logout} />
		</View>
	);
}

const styles = StyleSheet.create({
	navbar: {
		flexDirection: 'row',
		height: 55,
		backgroundColor: '#f9f9f9',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomColor: '#ccc',
		borderWidth: StyleSheet.hairlineWidth,
		paddingTop: 20,
		paddingRight: 10,
		paddingLeft: 16
	}
});