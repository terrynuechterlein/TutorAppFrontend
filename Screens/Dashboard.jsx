import React, { useState } from 'react';
import { Text, View, TextInput, Button, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../Constants/colors';
import hornetlogo2 from '../assets/hornetLogo2.png'; 

export default function Dashboard({ navigation }) {
    const [postText, setPostText] = useState("");
    const [posts, setPosts] = useState([]);

    const handlePost = () => {
        if (postText) {
            setPosts(prevPosts => [...prevPosts, { text: postText, id: Date.now().toString() }]);
            setPostText("");
        }
    };

    return (
        <LinearGradient style={{ flex: 1 }} colors={[COLORS.torquoise, COLORS.purple]}>
            <View style={{ flex: 1, padding: 20 }}>
                <Image source={hornetlogo2} style={{ width: 100, height: 100, alignSelf: 'center' }} />
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: COLORS.torquoise,
                        borderRadius: 5,
                        padding: 10,
                        marginTop: 20,
                        backgroundColor: 'white',
                    }}
                    placeholder="Post a question"
                    value={postText}
                    onChangeText={setPostText}
                />
                <Button title="Post" onPress={handlePost} />

                <ScrollView style={{ marginTop: 20 }}>
                    {posts.map(post => (
                        <View key={post.id} style={{ marginVertical: 10, padding: 10, backgroundColor: 'white', borderRadius: 5 }}>
                            <Text>{post.text}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </LinearGradient>
    );
}
