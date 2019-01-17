import React from 'react';
import { Image, Text, View } from 'react-native';

export default ({ user }) => {
    return (
        <View style={{ flexDirection: 'row', height: 100, marginTop: 10, marginHorizontal: 10 }}>
            <Image
                source={{uri: user.userImage || 'https://i.stack.imgur.com/4zFaC.png?s=328&g=1'}}
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
    );
}