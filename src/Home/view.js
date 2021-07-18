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

export default class HomeView extends React.Component {
    componentDidMount() {
    }
    shouldComponentUpdate(data, searchText, loading) {
        return this.props.data != data || searchText != this.props.searchText || loading != his.props.loading;
    }

    renderItem(item) {
        return (
            <TouchableOpacity style={[styles.row]} onPress={() => this.props.onPressItem(item)}>
                <View style={{ flexDirection: 'row' }}>
                    {item.thumbnail && item.thumbnail.length > 0 && <Image style={styles.infoImage}
                        source={{ uri: item.thumbnail }}
                    />}
                    <View style={styles.info}>
                        <View>
                            <Text style={styles.txt}>{item.headline}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={{ height: 12 }} source={Imgs.history} resizeMode={'center'} />
                            <Text style={styles.txt2}>{item.datetime}</Text>
                        </View>

                    </View>
                </View>
                <View>
                    <Text style={styles.txt3} numberOfLines={4} >{item.body}</Text>
                </View>

            </TouchableOpacity>
        );
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
            type,
            submitType,
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
                <View style={styles.fromdata}>
                    <TouchableOpacity style={[styles.typedata]} onPress={() => { submitType(1) }}>

                        <Text style={[styles.typetext,{color:type==1?'red':Colors.downColor}]}>New York Times</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.typedata]} onPress={() => { submitType(0) }}>
                        <Text style={[styles.typetext,{color:type==0?'red':Colors.downColor}]}>Cable News Network</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.bodylist}>
                    <FlatList

                        refreshControl={<RefreshControl
                            colors={["#9Bd35A", "#689F38"]}
                            refreshing={loading && !loadmore}
                            onRefresh={onRefresh} />}
                        data={(searchText != '' ? data.filter(
                            (i) => (i.headline + '').toLowerCase().indexOf(searchText.toLowerCase()) > -1
                        )
                            : data)
                        }
                        keyExtractor={(item, index) => index + ''}
                        renderItem={({ item, }) => (this.renderItem(item))}

                        ItemSeparatorComponent={this.renderSeparator}
                        ListFooterComponent={this.renderFooter.bind(this)}
                        onEndReachedThreshold={0.4}
                        onEndReached={() => handleLoadMore()}
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
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderColor: '#eeeeee',
        minHeight: 100,
        width: width - 6,
        marginTop: 3,

    },
    txt: {
        width: '100%',
        minWidth: 40,
        fontSize: 16,
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

        minHeight: 100,
        flex: 2,
        justifyContent: 'flex-end',
        marginBottom: 5,
    },
    infoImage: {
        resizeMode: 'cover',
        minHeight: 100,
        flex: 1,
        borderRadius: 8,
        shadowColor: '#eeeeee'
    },
    fromdata: {
        alignItems: 'center',
        backgroundColor: 'white',
        width,
        minHeight: 40,
        borderBottomWidth: 1,
        borderColor: '#eeeeee',
        flexDirection: 'row'
    },
    typedata: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width,
        minHeight: 40,
        color: Colors.downColor,
        flex: 1,

    },
    typetext: {

        fontSize: 18,

    },
});