
import { IDs, registerScreens,screens } from './main';
import withReduxStoreWrapper from './app-navigation/screenHOC';
import * as AppsController from './AppController';
import * as AppNavigation from './AppNavigation';
import { Provider, store,persisttor } from './redux';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import ScreenIDS from './main/ScreenIDs';
import HomeScreen from './Home/index';
//const logger = Logg.create('App');

// IMPORTANT: register screens on native level, must be excuted before other code.
registerScreens(withReduxStoreWrapper, store);
//registerScreens();
const startApp = async () => {
  //await rehydrateStore(store);
  AppNavigation.setDefaultOptions();

  //startSaga();

  //Navigation.registerComponent("FirstScreenName", () => (props) => <FirstScreen {...props} />);

//Navigation.registerComponent('Home', () => HomeScreen);
//Navigation.registerComponent(IDs.Home,()=> withReduxStoreWrapper(HomeScreen),store);
  //Navigation.registerComponent(IDs.Home, () => HomeScreen);


  //AppsController.startHome()
  Navigation.events().registerAppLaunchedListener(async () => {
    AppsController.startHome()
    
  });
  
};




// const HomeScreen = (props) => {
//   return (
//     <View style={styles.root}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// };
// Navigation.registerComponent('Home', () => HomeScreen);



const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke'
  }
});


export default { start: startApp, };