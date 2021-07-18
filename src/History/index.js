
    import React from 'react';
    import { Text, View, StyleSheet, ActivityIndicator, Dimensions, Linking, } from 'react-native';
    import { connect, } from 'react-redux';
    import HistoryView from './view';
    import {Types} from '../stores/home/actions';
    
    class HistoryScreen extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                searchText: '',
                searchKeyword: '',
                loading: false,
                loadmore:false,
                type: 0,//0 ncc, 1 nytime
    
                fromncc: 0,
                size: 20,
                fromnytime: 0,
    
                datanews:[]
            };
    
        }
        componentDidMount() {
            //alert(JSON.stringify( this.props.history))
            this.GetHistoryList();
        }
    
    
        GetHistoryList() {

            const { dispatch, } = this.props;
            let datahis=this.props.history.DataHistory
            
            const { datanews,fromncc, fromnytime, size, searchText, type } = this.state
            let data=[]
            
            if(datahis!=null && datahis.length>0)
            {
                
                if(searchText.length>0)
                {
                    data=datahis.filter(
                        (i) => (i.headline + '').toLowerCase().indexOf(searchText.toLowerCase()) > -1
                    );
                }
                else
                {
                    data=datahis;
                }
                if(data!=null && data.length>0)
                for (var i=fromncc; i < fromncc+size; i++) {
                    if(data[i]!=null)
                    {
                        datanews.push(data[i]);
                    }
                    
                    
                }
                this.setState({datanews:datanews})
            }
            this.setState({loadmore:false,loading:false});



            // dispatch({
            //     type: Types.CLEAR_DATA,
            //     payload:{},
          
            //   });



        }
        onChangeTextSearch(text)
        {
            this.setState({searchText:text})
        }
    
        onSubmitEditingSearch()
        {

            

            this.setState({fromncc: 0,fromnytime: 0,datanews:[]});
    
            setTimeout(() => {this.GetHistoryList()}, 1000); 
            
        }
    
        afterCancelSearch()
        {
            
            this.setState({fromncc: 0,fromnytime: 0,searchText:'',datanews:[]});
    
            setTimeout(() => {this.GetHistoryList()}, 1000);
    
        }
    
        onRefresh()
        { 
           
            this.setState({fromncc: 0,fromnytime: 0,searchText:'',datanews:[]});
    
            setTimeout(() => {this.GetHistoryList()}, 1000);
    
        }
    
        onPressItem(item)
        {
           // alert(item.url);
    
            Linking.openURL(item.url);
        }
    

        handleLoadMore()
        {
            //alert('handleLoadMore')
            const { datanews,fromncc, fromnytime, size, searchText, type } = this.state
    
            
            
            if(datanews.length>=size)
            {
                this.setState({fromncc: fromncc+size,fromnytime: 0,loadmore:true});
                setTimeout(() => {this.GetHistoryList()}, 300);
            }
                
        }

        render() {
    
            return (
                <View style={styles.container}>
                    <HistoryView
                        data={this.state.datanews}
                        onChangeText={(text)=>{this.onChangeTextSearch(text)}}
                        onSubmitEditing={()=>{this.onSubmitEditingSearch()}}
                        afterCancel={()=>{this.afterCancelSearch()}}
                        onRefresh={()=>{this.onRefresh()}}
                        loading={this.state.loading}
                        onPressItem={(item)=>this.onPressItem(item)}
                        searchText={this.state.searchText}
                        handleLoadMore={()=>{this.handleLoadMore()}}
                        loadmore={this.state.loadmore}
                    ></HistoryView>
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

    history: state.history,

}), (dispatch) => ({ dispatch, }))(HistoryScreen);

 //export default HistoryScreen