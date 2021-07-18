import React from "react";
import { Provider } from "react-redux";
 

function reduxStoreWrapper (MyComponent, store) {
    return () => {
        return class StoreWrapper extends React.Component {
            render () {
                return (
                    <Provider store={store}>
                        <MyComponent />
                    </Provider>
                );
            }
        };
    };
}
export default reduxStoreWrapper;
