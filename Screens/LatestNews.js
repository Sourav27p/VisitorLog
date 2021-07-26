import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
} from 'react-native';
import {
  Layout,
  Text,
  Divider,
  Spinner,
  Input,
  Card,
  Select,
  SelectItem,
  Button,
} from '@ui-kitten/components';
import axios from 'axios';
import Header from '../components/Header';

const LatestNews = props => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpg, setTotalpg] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   axios
  //     .get(
  //       'https://newsapi.org/v2/top-headlines?country=in&apiKey=1848b5465b1449d78d10c2991b1bea98',
  //     )
  //     .then(res => {
  //       setTotalpg(parseInt(res.data.totalResults));
  //     });
  // }, []);
  const getData = () => {
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&page=${currentPage}&apiKey=1848b5465b1449d78d10c2991b1bea98`;
    axios
      .get(url)
      .then(res => {
        setNews([...news, ...res.data.articles]);
        setCurrentPage(currentPage + 1);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  };

  const loadMore = () => {
    getData();
  };
  const Head = props => {
    return (
      <View>
        <ImageBackground
          source={{
            uri: props.url,
          }}
          style={styles.image}
        />
        {/* <Text category="h6">Maldives</Text>
      <Text category="s1">By Wikipedia</Text> */}
      </View>
    );
  };
  // console.log('News', news);
  const renderItem = items => {
    console.log(items);
    return (
      <Card style={styles.card} header={<Head url={items.item.urlToImage} />}>
        <Text>{items.item.title}</Text>
      </Card>
    );
  };

  const renderFooter = () => {
    return loading ? (
      <Layout style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Spinner size="medium" />
      </Layout>
    ) : null;
  };
  if (news.length < 1) {
    return (
      <>
        <Header title="News" toggleDrawer={props.navigation.toggleDrawer} />
        <Divider style={{elevation: 1}} />
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Spinner size="giant" />
        </Layout>
      </>
    );
  }
  return (
    <>
      <Header title="News" toggleDrawer={props.navigation.toggleDrawer} />
      <Divider style={{elevation: 1}} />
      <View style={{flex: 1}}>
        <FlatList
          renderItem={renderItem}
          data={news}
          keyExtractor={(item, idex) => idex.toString()}
          ListFooterComponent={renderFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  text: {
    margin: 2,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: 200,
  },
  //   container: {
  //     minHeight: 128,
  //   },
});
export default LatestNews;
