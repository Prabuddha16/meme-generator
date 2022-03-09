import * as React from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, TextInput, Image, Button, Share } from 'react-native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';

// Converts a React View to a png
import { captureRef } from 'react-native-view-shot';

import TakePhotoButton from './components/TakePhotoButton';
import ChoosePhotoButton from './components/ChoosePhotoButton';
import SharePhotoButton from './components/SharePhotoButton';

const { width: screenWidth } = Dimensions.get('window');

const memeTemplateImageUris = [
  'https://imgur.com/WtjU7HU.jpg',
  'https://imgur.com/UMRARaT.jpg',
  'https://imgur.com/hjgIXpT.jpg',
  'https://imgur.com/JjdSWi7.jpg',
  'https://imgur.com/fzrCvKu.jpg',
];

export default function App() {
  const [topText, setTopText] = React.useState('');
  const [bottomText, setBottomText] = React.useState('');

  const placeholderMeme = memeTemplateImageUris[0];
  const [imgUri, setImgUri] = React.useState(placeholderMeme);
  const memeView = React.useRef();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setTopText(text)}
        value={topText}
      />
      <TextInput
        style={styles.textInput}
        onChangeText={text => setBottomText(text)}
        value={bottomText}
      />
      <View
        collapsable={false}
        ref={memeView}>
        <Image
          source={{ uri: imgUri }}
          style={{ height: screenWidth, width: screenWidth }}
        />
        <Text style={[styles.memeText, { top: 5 }]}>
          {topText}
        </Text>
        <Text style={[styles.memeText, { bottom: 5 }]}>
          {bottomText}
        </Text>
      </View>
      <TakePhotoButton setImgUri={setImgUri} />
      <ChoosePhotoButton setImgUri={setImgUri} />
      <View style={{ flexDirection: 'row' }}>
        {memeTemplateImageUris.map((uri) => {
          return (
            <TouchableOpacity
              key={uri}
              onPress={() => {
                setImgUri(uri);
              }}>
              <Image source={{ uri }} style={styles.templateImage} />
            </TouchableOpacity>
          );
        })}
      </View>
      <SharePhotoButton memeView={memeView} />
    </View>
  );
}

const styles = StyleSheet.create({
  memeText: {
    color: 'white',
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
    position: 'absolute',
    left: 5,
    right: 5,
    backgroundColor: 'transparent',
    textShadowColor: 'none',
    textShadowRadius: 1,
    textShadowOffset: { height: 5, width: 5 },
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    width: screenWidth,
  },
  templateImage: {
    height: 60,
    width: 60,
    marginHorizontal: 0,
    marginVertical: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
});
