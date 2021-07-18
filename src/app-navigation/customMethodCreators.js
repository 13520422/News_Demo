
import { Navigation, } from 'react-native-navigation';
import TransitionState from './TransitionState';



export const createCustomPush = (componentId: string) => {
  if (!componentId) {
    throw new Error('Tried to create custom push method without a componentId');
  }

  return (params, bypassDebounce: boolean) => {
    if (!TransitionState.isTransiting() || bypassDebounce) {
      TransitionState.start();
      Navigation.push(componentId, {
        component: {
          ...params,
        },
      });
    }
  };
};



export const createPopFunc = (componentId) => {
  if (!componentId) {
    throw new Error('Tried to create custom push method without a componentId');
  }
  return () => {
    Navigation.pop(componentId);
  };
};
