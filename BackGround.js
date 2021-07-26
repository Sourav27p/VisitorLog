/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import BackgroundService from 'react-native-background-actions';

const options = {
  taskName: 'Example',
  taskTitle: 'App running',
  taskDesc: 'This app is running in background',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  linkingURI: 'yourSchemeHere:',
  color: '#ff00ff',
  parameters: {
    delay: 1000,
  },
};
const test = () => {
  const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };
  const veryIntensiveTask = async taskDataArguments => {
    // Example of an infinite loop task
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        await sleep(delay);
      }
    });
  };
  //   await BackgroundService.start(veryIntensiveTask, options);
  //   await BackgroundService.updateNotification({
  //     taskDesc: 'New ExampleTask description',
  //   }); // Only Android, iOS will ignore this call
  //   await BackgroundService.stop();
  const callBackHellper = async () => {
    console.log('AM HERE2');
    await BackgroundService.start(veryIntensiveTask, options);
    // Only Android, iOS will ignore this call
    // iOS will also run everything here in the background until .stop() is called
    // await BackgroundService.stop();
    console.log('AM HERE3');
  };

  useEffect(() => {
    console.log('AM HERE');
    // (async () => {
    //   console.log("AM HERE2");
    //   await BackgroundService.start(veryIntensiveTask, options);
    //   console.log("AM HERE3");
    // })();
    callBackHellper();
  }, []);
  return (
    <View style={styles.screen}>
      <Text>Testing</Text>
      <Button
        title="Stop"
        onPress={async () => await BackgroundService.stop()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default test;

// You can do anything in your task such as network requests, timers and so on,
// as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
// React Native will go into "paused" mode (unless there are other tasks running,
// or there is a foreground app).

// iOS will also run everything here in the background until .stop() is called
