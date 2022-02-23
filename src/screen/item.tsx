import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export type Post = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type Props = {
  item: Post;
  index: number;
};

const DEVICE_WIDTH = Dimensions.get('window').width;

const Item = React.memo<Props>(({item, index}) => {
  const renderVoteNumber = number => {
    const strNumber = number.toString().split('');
    return strNumber.map((e, i) => (
      <Text key={i.toString()} style={[styles.voteNumber, {fontSize: i === 0 ? 20 : 14}]}>
        {e}
      </Text>
    ));
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[index % 2 === 0 ? {marginRight: 8} : {marginLeft: 8}]}>
      <ImageBackground
        style={[styles.bg, styles.shadowProp]}
        imageStyle={styles.imgStyle}
        source={{
          // uri: 'https://api.themoviedb.org/upload/' + item?.poster_path,
          uri: 'https://upload.wikimedia.org/wikipedia/vi/b/b4/Poster_phim_7_thi_th%E1%BB%83.jpg'
        }}>
        <View style={styles.wrapVote}>
          {renderVoteNumber(item?.vote_average)}
        </View>
        <View>
          <Text style={styles.year}>
            {new Date(item?.release_date).getFullYear()}
          </Text>
          <Text style={styles.title}>{item?.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
});

export default Item;

const styles = StyleSheet.create({
  bg: {
    width: (DEVICE_WIDTH - 36) / 2 - 8,
    marginBottom: 18,
    height: 300,
    padding: 10,
    justifyContent: 'flex-end',
  },
  imgStyle: {
    borderRadius: 12,
  },
  wrapVote: {
    backgroundColor: '#E96339',
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: 10,
    flexDirection: 'row',
  },
  voteNumber: {
    color: 'white',
    fontWeight: '500',
  },
  year: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -3, height: 12},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: 'white',
    borderRadius: 8,
  },
});
