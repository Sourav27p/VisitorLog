import React, {useState, useCallback} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Layout,
  Text,
  Divider,
  Avatar,
  List,
  ListItem,
} from '@ui-kitten/components';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

const data = new Array(20).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

const VisitorLog = props => {
  console.log('Logs');
  const [log, setLog] = useState([]);
  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );
  console.log('LOGS', log);
  const getData = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem('Logs');
      console.log(JSON.parse(jsonValue));
      if (jsonValue !== null) {
        setLog(JSON.parse(jsonValue));
      }
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  // const renderItemIcon = props => <Icon {...props} name="person" />;
  const ItemImage = props => {
    return (
      <Avatar
        size="large"
        shape="square"
        // style={[props.style, {tintColor: null}]}
        source={{uri: 'data:image/jpeg;base64,' + props.url}}
      />
    );
  };
  const RightItem = props => {
    return (
      <View>
        <Text>{props.email}</Text>
        <Text>Entry:{props.entry}</Text>
        <Text>Exit:{props.exit}</Text>
      </View>
    );
  };
  const renderItem = ({item, index}) => (
    <ListItem
      title={`${item.Name}`}
      description={`${item.Date}`}
      accessoryLeft={<ItemImage url={item.url} />}
      accessoryRight={
        <RightItem email={item.Email} entry={item.entry} exit={item.exit} />
      }
      style={{height: 80}}
    />
  );

  const emptyList = () => {
    return <Text>Empty</Text>;
  };
  return (
    <>
      <Header title="Logs" toggleDrawer={props.navigation.toggleDrawer} />
      <Divider style={{elevation: 1}} />
      <Layout style={{flex: 1}}>
        <List
          style={styles.container}
          data={log}
          ListEmptyComponent={emptyList}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
      </Layout>
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
  //   container: {
  //     minHeight: 128,
  //   },
});
export default VisitorLog;
