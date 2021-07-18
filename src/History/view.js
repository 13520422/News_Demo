import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    RefreshControl,
    FlatList,
    pressItem,
    TouchableOpacity,
    Text,
    Image,
    ActivityIndicator
} from 'react-native';

import Search from 'react-native-search-box';
import { Imgs } from '../assets';
import Colors from '../theme/Colors';

export default class HistoryView extends React.Component {
    componentDidMount() {
    }
    shouldComponentUpdate(data,searchText) {
        return this.props.data != data||searchText!=this.props.searchText;
    }


    renderSeparator = () => {
        return (
          <View
            style={{
              height: 2,
              width: '100%',
              backgroundColor: '#CED0CE'
            }}
          />
        );
      };
      renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
         if (!this.props.loadmore) return null;
         return (
           <ActivityIndicator
             style={{ color: '#000' }}
           />
         );
       };

    renderItem(item) {
        return (
            <TouchableOpacity style={[styles.row]} onPress={()=>this.props.onPressItem(item)}>
                { item.thumbnail!=null && item.thumbnail.length > 0 && <Image style={styles.infoImage}
                        source={{ uri: item.thumbnail }}
                    />}
                <View style={styles.info}>
                    <View>
                        <Text style={styles.txt}>{item.headline}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Image style={{height:12}} source={Imgs.history} resizeMode={'center'}/>
                        <Text style={styles.txt2}>{item.datetime}</Text>
                    </View>
                    <View>
                        <Text style={styles.txt3} numberOfLines={3} >{item.body}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        );
    }

    render() {
        const {
            searchText,
            onChangeText,
            onSubmitEditing,
            afterCancel,
            onRefresh,
            data,
            loading,
            loadmore,
            handleLoadMore,
        } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={styles.seachheader}>
                        <Search
                            backgroundColor={Colors.HeaderColor}
                            onChangeText={(text) => onChangeText(text)}
                            afterSearch={onSubmitEditing}
                            defaultValue={searchText}
                            afterCancel={afterCancel}
                            afterDelete={afterCancel}
                        />
                    </View>


                </View>

                <View style={styles.bodylist}>
                    <FlatList

                        refreshControl={<RefreshControl
                          colors={["#9Bd35A", "#689F38"]}
                          refreshing={loading}
                          onRefresh={onRefresh} />}
                          data={(searchText!=''? data.filter(
                            (i) => (i.headline+'').toLowerCase().indexOf(searchText.toLowerCase()) > -1
                          )
                            :data)
                        }
                        keyExtractor={(item,index) => index+''}
                        renderItem={({ item, }) => (this.renderItem(item))}

                        ItemSeparatorComponent={this.renderSeparator}
                        ListFooterComponent={this.renderFooter.bind(this)}
                        onEndReachedThreshold={0}
                        onEndReached={()=>handleLoadMore()}
                    />
                </View>

            </View>

        );
    }
}

const { width, } = Dimensions.get('window');
const styles = StyleSheet.create({
    header: {
        height: 50,
        width,
        backgroundColor: Colors.HeaderColor,
        alignItems: 'center',
    },
    seachheader: {
        height: 37,
        width: width - 30,
        position: 'absolute',
        bottom: 5,
        backgroundColor: Colors.HeaderColor,


    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#eeeeee',
        minHeight: 50,
        width:width-6,
        marginTop:3,

    },
    txt: {
        width: '100%',
        minWidth: 40,
        fontSize:16,
        fontWeight: 'bold',
        textAlign: 'left',
        margin: 5,
        color: Colors.downColor,
    },
    bodylist: {
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        width,
    },
    txt2: {
        width: '100%',
        minWidth: 40,
        fontSize: 10,
        textAlign: 'left',
        color: Colors.downColor,
    },
    txt3: {
        width: '100%',
        fontSize: 14,
        textAlign: 'left',
        margin: 5,
        marginTop: 2,
        color: Colors.downColor,
    },
    info: {
        
        minHeight: 40,
        flex:2,
    },
    infoImage: {
        resizeMode: 'cover',
        minHeight: 40,
        flex:1,
        borderRadius:8,
        shadowColor:'#eeeeee'
    },
});