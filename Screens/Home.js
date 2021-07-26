import React, {useLayoutEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Keyboard,
  View,
  Pressable,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {
  Layout,
  Text,
  Divider,
  Input,
  Select,
  SelectItem,
  Button,
  IndexPath,
  Icon,
  Avatar,
} from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchCamera} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import index from '../navigations';
import { event } from 'react-native-reanimated';

const typeOfVisit = ['Meeting', 'Delivery', 'Personal'];
const Home = props => {
  const todayDate = new Date().toJSON().slice(0, 10);
  const [timeOfEntry, setTimeOfEntry] = useState(new Date());
  const [timeOfExist, setTimeOfExist] = useState(new Date());
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const showTimepicker = () => {
    setShow(true);
  };
  const showTimepicker2 = () => {
    setShow2(true);
  };
  const onChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || timeOfEntry;
    setTimeOfEntry(currentDate);
  };
  const onChangeExist = (event, selectedDate) => {
    setShow2(false);
    const currentDate = selectedDate || timeOfExist;
    setTimeOfExist(currentDate);
  };
  const InitialIndex = 0;
  const [selectedIndex, setSelectedIndex] = useState(
    new IndexPath(InitialIndex),
  );
  const InitialTextValue = '';
  const [name, setName] = useState(InitialTextValue);
  const [email, setEmail] = useState(InitialTextValue);
  const [person, setPerson] = useState(InitialTextValue);
  const selectedValue = typeOfVisit[selectedIndex.row];
  const renderOption = title => <SelectItem title={title} key={index} />;

  const resetValue = () => {
    setName(InitialTextValue);
    setEmail(InitialTextValue);
    setPerson(InitialTextValue);
    setSelectedIndex(new IndexPath(InitialIndex));
    setFilePath(null);
    setTimeOfEntry(new Date());
    setTimeOfExist(new Date());
  };

  const onSubmit = () => {
    console.log(
      'Name:',
      name,
      'Email:',
      email,
      'PersonName:',
      person,
      'Date:',
      todayDate,
      'Type of Visit',
      typeOfVisit[selectedIndex.row],
    );
    const jsonData = {
      Name: name,
      Email: email,
      url: filePath?.base64,
      entry: timeOfEntry.toLocaleTimeString(),
      exit: timeOfExist.toLocaleTimeString(),
      PersonName: person,
      Date: todayDate,
      'Type of Visit': typeOfVisit[selectedIndex.row],
    };
    storeData(jsonData);
    // removeValue();
    resetValue();
  };
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('Logs');
    } catch (e) {
      // remove error
    }

    console.log('Done.');
  };
  const storeData = async value => {
    try {
      const existLogs = await AsyncStorage.getItem('Logs');
      console.log(existLogs);
      let newLogs = JSON.parse(existLogs);
      if (!newLogs) {
        newLogs = [];
      }
      console.log(newLogs);
      newLogs.push(value);
      await AsyncStorage.setItem('Logs', JSON.stringify(newLogs));
    } catch (e) {
      console.log(e);
    }
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };
  const [filePath, setFilePath] = useState(undefined);
  const captureImage = async type => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 200,
      includeBase64: true,
      quality: 0.4, //Video max duration in seconds
      saveToPhotos: false,
    };
    let isCameraPermitted = await requestCameraPermission();
    if (isCameraPermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response?.assets?.[0]);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        setFilePath(response?.assets?.[0]);
      });
    }
  };
  const clickImage = () => {
    console.log('click');
    captureImage();
  };

  const isDisabled = name === '' || email === '' || person === '';
  const StarIcon = props => <Icon {...props} name="camera-outline" />;
  return (
    <ScrollView>
      <Header
        title="Visitor Logs"
        toggleDrawer={props.navigation.toggleDrawer}
      />
      <Divider style={{elevation: 1}} />
      <Layout style={{flex: 1}}>
        <Layout>
          <Text style={styles.text} category="s1">
            Name :
          </Text>
          <Input
            placeholder="Enter Name"
            keyboardType="default"
            value={name}
            onChangeText={e => setName(e)}
          />
        </Layout>
        <Layout>
          <Text style={styles.text} category="s1">
            Email :
          </Text>
          <Input
            placeholder="Enter Email"
            keyboardType="email-address"
            value={email}
            onChangeText={e => setEmail(e)}
          />
        </Layout>
        <Layout>
          <Text style={styles.text} category="s1">
            Type of Visit :
          </Text>
          <Select
            placeholder="Select"
            selectedIndex={selectedIndex}
            value={selectedValue}
            onSelect={indx => setSelectedIndex(indx)}>
            {typeOfVisit.map(renderOption)}
          </Select>
        </Layout>
        <Layout>
          <Text style={styles.text} category="s1">
            Person to visit :
          </Text>
          <Input
            placeholder="Enter Person Name"
            value={person}
            onChangeText={e => setPerson(e)}
          />
        </Layout>
        <Layout>
          <Text style={styles.text} category="s1">
            Date of entry :
          </Text>
          <Input defaultValue={todayDate} disabled />
        </Layout>
        <Layout>
          <Text style={styles.text} category="s1">
            Selfie :
          </Text>
          <View style={styles.row}>
            <Button
              style={styles.button}
              appearance="ghost"
              status="danger"
              onPress={clickImage}
              accessoryLeft={StarIcon}
            />
            {filePath && (
              <Avatar
                style={styles.avatar}
                shape="square"
                size="large"
                source={{uri: filePath.uri}}
              />
            )}
          </View>
        </Layout>
        <Layout>
          <Text style={styles.text} category="s1">
            Time of entry :
          </Text>
          <Pressable onPress={showTimepicker}>
            <View pointerEvents="none">
              <Input placeholder={timeOfEntry.toLocaleTimeString()} />
            </View>
          </Pressable>
          {show && (
            <DateTimePicker
              value={timeOfEntry}
              mode="time"
              display="default"
              onChange={onChange}
            />
          )}
        </Layout>
        <Layout>
          <Text style={styles.text} category="s1">
            Time of exist :
          </Text>
          <Pressable onPress={showTimepicker2}>
            <View pointerEvents="none">
              <Input placeholder={timeOfExist.toLocaleTimeString()} />
            </View>
          </Pressable>
          {show2 && (
            <DateTimePicker
              value={timeOfExist}
              mode="time"
              display="default"
              onChange={onChangeExist}
            />
          )}
        </Layout>
        <Layout>
          <Button onPress={onSubmit} disabled={isDisabled}>
            Submit
          </Button>
        </Layout>
      </Layout>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    margin: 2,
    // alignItems: 'center',
  },
  text: {
    margin: 2,
  },
  button: {
    borderColor: 'grey',
  },
  //   container: {
  //     minHeight: 128,
  //   },
});
export default Home;
