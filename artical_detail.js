/**
 * 文章详细内容页面
 */
import React, { Component } from "react";
import {
  Text,
  View,
} from "react-native";
export class ArticalDetailPage extends React.Component {
    //接收上一个页面传过来的title显示出来
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.title,
        headerTitleStyle:{
            fontSize:18,
            fontWeight:'400',
            alignSelf:'center'
        },
        headerStyle: {height: 65, backgroundColor: '#FFF'},
        headerRight: <View><Text style={{paddingRight: 14, color: '#000', fontSize: 18}}>编辑</Text></View>,
        headerBackTitle: '回去',
        headerTruncatedBackTitle: '返回'
    });
    // 点击返回上一页方法
    backFunction= () => {
        //返回首页方法 navigation属性中的自带的返回方法
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={{width:200,height: 50, backgroundColor: 'green', borderRadius:5,justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => {
                        this.backFunction()
                    }}>
                    <Text style={{color:"#FFF"}}>{this.props.navigation.state.params.des}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
