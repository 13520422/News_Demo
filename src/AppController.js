
import { Navigation, } from 'react-native-navigation';
import { Imgs } from './assets';

import ScreenIDs from './main/ScreenIDs';
import Colors from './theme/Colors';




export const startHome = () => {
    Navigation.setRoot({
        root: {
            bottomTabs: {
                id: 'BottomTabsId',
                children: [
                  {
                    stack: {
                      id: 'Home',
                      children: [
                        {
                          component: {
                            id: ScreenIDs.Home,
                            name: ScreenIDs.Home
                          }
                        }
                      ],
                      options: {

                        topBar: {
                            title: {
                              text: 'Home',
                            },
        
                          },

                        bottomTab: {
                          icon: Imgs.home,
                          //iconColor:Colors.HeaderColor,
                          selectedIconColor:Colors.HeaderColor,
                        }
                      }
                    }
                  },
                  {
                    stack: {
                      id: 'history',
                      children: [
                        {
                          component: {
                            id: ScreenIDs.History,
                            name: ScreenIDs.History,
                          }
                        }
                      ],
                      
                      options: {

                        topBar: {
                            title: {
                              text: 'History',
                            },
        
                          },

                        bottomTab: {
                          icon: Imgs.history,
                            //iconColor:Colors.HeaderColor,
                            selectedIconColor:Colors.HeaderColor,
                        }
                      }
                    }
                  }
                ]
              }
        },
    });
};