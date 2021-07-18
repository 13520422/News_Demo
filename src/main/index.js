 
import { Navigation, } from 'react-native-navigation';
import IDs from './ScreenIDs';
import HomeScreen from './../Home/index';
import HistoryScreen from './../History/index';
const screens = {
  [IDs.Home]: HomeScreen,
  [IDs.History]: HistoryScreen,
};

const registerScreens = (enhancers: Function = (a) => a, store: Object, Provider: Object,persisttor: Object) => {
  // Loop through the array and register every screen in it.
  Object.keys(screens).map((screenID) => {
    //Navigation.registerComponentWithRedux(screenID, () => enhancers(screens[screenID]), Provider, store);
    //Navigation.registerComponent(screenID, ()=>  enhancers(screens[screenID],store));
    Navigation.registerComponent(screenID, enhancers(screens[screenID], store));
    // Navigation.registerComponent(screenID, () => screens[screenID]);

  });
}; 
 



export { registerScreens, IDs };