import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Item, {Post} from './item';

const ListPost = React.memo(() => {
  const [isRefresh, setIsRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get('https://api.themoviedb.org/3/discover/movie', {
        params: {
          api_key: '26763d7bf2e94098192e629eb975dab0',
          page: 1,
        },
      })
      .then(function (response) {
        if (response?.data?.results) {
          setData(response?.data?.results);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        setIsRefresh(false);
      });
  };

  return (
    <SafeAreaView style={styles.wrap}>
      {loading && (
        <View style={[styles.container]}>
          <ActivityIndicator />
        </View>
      )}
      <FlatList
        onRefresh={() => {
          true;
          getData();
        }}
        ListHeaderComponent={() => (
          <Text style={styles.title}>Popular list</Text>
        )}
        showsVerticalScrollIndicator={false}
        refreshing={isRefresh}
        contentContainerStyle={styles.wrapContent}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({item, index}) => (
          <Item index={index} key={item?.id.toString()} item={item} />
        )}
        data={data}
      />
    </SafeAreaView>
  );
});

export default ListPost;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapContent: {
    paddingHorizontal: 18,
  },
  title: {
    marginVertical: 20,
    fontSize: 22,
    fontWeight: '500',
    color: '#8B8B8B',
  },
  container: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.65)',
    zIndex: 1,
  },
});
