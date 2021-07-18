import { Navigation, } from 'react-native-navigation';

import { IDs, } from './main/ScreenIDs';
import Colors from './theme/Colors';



const changeTab = (tabIndex) => {
  Navigation.mergeOptions('BottomTabsId', {
    bottomTabs: {
      currentTabIndex: tabIndex,
    },
  });
};



const setDefaultOptions = () => {
  Navigation.setDefaultOptions({
    topBar: {
      buttonColor: '#fff',
      visible: true,
      background: {
        color: Colors.HeaderColor,
      },
      title: {
        color: '#fff',
      },
      backButton: {
        color: '#fff',
      },
    },
    layout: {
      backgroundColor: 'transparent',
    },
    bottomTab: {
      iconColor: Colors.blurWhite,
      textColor: Colors.blurWhite,
      selectedTextColor: Colors.selectedColor,
       
    },
    bottomTabs: {
      backgroundColor: Colors.backgroundL1,
    },

  });
};



export {
  changeTab,
  setDefaultOptions,
};