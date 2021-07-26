import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import Home from './Screens/Home';
import Test from './test';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import RNBootSplash from 'react-native-bootsplash';
import {default as theme} from './constant/custom-theme.json';
import Navigation from './navigations/index';
const App = () => {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };
    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
      console.log('Bootsplash has been hidden successfully');
    });
  }, []);
  useEffect(() => {
    if (typeof HermesInternal === 'undefined') {
      console.log('Hermes is not enabled');
    } else {
      console.log('Hermes is enabled');
    }
  }, []);
  return (
    <>
      {/* <Test /> */}
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
        <Navigation />
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
