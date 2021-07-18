import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Dimensions, Linking, } from 'react-native';
import { connect, } from 'react-redux';
import { Types } from '../stores/home/actions';
import { GetNewsList } from './action';
import HomeView from './view';
import Moment from 'moment';
import moment from 'moment';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchKeyword: '',
            loading: false,
            loadmore: false,

            type: 1,//0 ncc, 1 nytime

            fromncc: 0,
            size: 20,
            fromnytime: 0,

            datanews: []
        };

    }
    componentDidMount() {
        //alert('dsehfhure')
        this.GetNewsList();
    }

    //   shouldComponentUpdate(loading) {
    //     return loading != this.props.loading;
    //   }

    GetNewsList() {
        const { dispatch, } = this.props;
        let { datanews, fromncc, fromnytime, size, searchText, type } = this.state

        //?q=news&size=50&from=0

        let param = {};
        if (type == 0) {
            param = {
                q: searchText,
                size: size,
                from: fromncc,
                sort: 'newest',
            }
        }
        else {
            let page= parseInt( fromnytime/size)+1
            param = {
                q: searchText,
                sortBy:'publishedA',
                pageSize:size,
                page:page,
            }


        }

        this.setState({ loading: true, });
        dispatch(GetNewsList(param, type + '')).then((result) => {
            this.setState({ loading: false, loadmore: false });
            if (result) {
                let list = [];
                //console.log("-----------------------------\n"+result.result)
                if (type + '' == '0') {
                    if (result.result.length > 0) {
                        result.result.map((item) => {
                            let i = {
                                id: item._id,
                                type: item.type,
                                headline: item.headline,
                                body: item.body,
                                url: item.url,
                                datetime: Moment(item.lastModifiedDate).format('lll'),
                                thumbnail: item.thumbnail,
                            }
                            datanews.push(i);
                        });
                    }
                }
                else {

                    if (result.articles != null) {

                        let data = result.articles;
                        if (data != null && data.length) {
                            let page= parseInt( fromnytime/size)
                            //console.log('page   '+ page+'   '+data.length);
                            for (var i = fromnytime-(page*20); i < fromnytime-(page*20) + size; i++) {
                                // if(docs.length>=i)
                                let item = data[i];
                                if (item != null) {
                                    let detail = {
                                        id: '',
                                        type: 'articles',
                                        headline: item.title,
                                        body: item.description,
                                        url: item.url,
                                        datetime: Moment(item.publishedAt).format('lll'),
                                        thumbnail: item.urlToImage,
                                    }
                                    datanews.push(detail);
                                }

                            }


                        }


                    }
                }



                this.setState({ datanews });


            }

        });
    }
    onChangeTextSearch(text) {
        this.setState({ searchText: text })
    }

    onSubmitEditingSearch() {
        this.setState({ fromncc: 0, fromnytime: 0, datanews: [] });

        setTimeout(() => { this.GetNewsList() }, 500);
    }

    afterCancelSearch() {
        this.setState({ fromncc: 0, fromnytime: 0, searchText: '', datanews: [] });

        setTimeout(() => { this.GetNewsList() }, 500);

    }

    onRefresh() {
        this.setState({ fromncc: 0, fromnytime: 0, searchText: '', datanews: [] });

        setTimeout(() => { this.GetNewsList() }, 500);

    }

    onPressItem(item) {
        // alert(item.url);
        const { dispatch, } = this.props;
        Linking.openURL(item.url);
        item.datetime = moment(new Date()).format('lll');
        dispatch({
            type: Types.UPDATE_DATA,
            payload: item,

        });
    }

    handleLoadMore() {
        const { datanews, fromncc, fromnytime, size, searchText, type } = this.state

        if (type == 0) {
            //alert(datanews.length+' '+fromncc + size)
            if (datanews.length >= fromncc + size) {
                this.setState({ fromncc: fromncc + size, fromnytime: 0, loadmore: true });
                setTimeout(() => { this.GetNewsList() }, 300);
            }
        }
        else {

            // alert(datanews.length+'   '+(fromnytime+size))
            if (datanews.length >= fromnytime + size) {
                this.setState({ fromncc: 0, fromnytime: fromnytime + size, loadmore: true });
                setTimeout(() => { this.GetNewsList() }, 300);
            }
        }

    }
    submitType(t)
    {
        const {  type } = this.state

        if(type==t)
        {
            return;
        }
        else
        {
            this.setState({ type:t,fromncc: 0, fromnytime: 0, searchText: '', datanews: [] });
            setTimeout(() => { this.GetNewsList() }, 500);
        }
        
    }

    render() {

        return (
            <View style={styles.container}>
                <HomeView
                    data={this.state.datanews}
                    onChangeText={(text) => { this.onChangeTextSearch(text) }}
                    onSubmitEditing={() => { this.onSubmitEditingSearch() }}
                    afterCancel={() => { this.afterCancelSearch() }}
                    onRefresh={() => { this.onRefresh() }}
                    loading={this.state.loading}
                    onPressItem={(item) => this.onPressItem(item)}
                    searchText={this.state.searchText}
                    handleLoadMore={() => { this.handleLoadMore() }}
                    loadmore={this.state.loadmore}
                    type={this.state.type}
                    submitType={(type)=>this.submitType(type)}
                ></HomeView>
            </View>
        );
    }
}
const { width, } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width,
    },
});
export default connect((state) => ({
}), (dispatch) => ({ dispatch, }))(HomeScreen);

 //export default HomeScreen