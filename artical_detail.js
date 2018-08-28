/**
 * 文章详细内容页面
 */
import React, { Component } from "react";
import { Text, View, WebView } from "react-native";
var title = "";
export class ArticalDetailPage extends React.Component {
  //接收上一个页面传过来的title显示出来
  static navigationOptions = ({ navigation }) => ({
    
    title:navigation.state.params.title,
    headerTitle: navigation.state.params.title,
    articalUrl:navigation.state.params.link,
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: "400",
      alignSelf: "center"
    },
    headerStyle: { height: 65, backgroundColor: "#FFF" },
    headerRight: (
      <View>
        <Text style={{ paddingRight: 14, color: "#000", fontSize: 18 }}>
          编辑
        </Text>
      </View>
    ),
    headerBackTitle: "回去",
    headerTruncatedBackTitle: "返回"
  });
  // 点击返回上一页方法
  backFunction = () => {
    //返回首页方法 navigation属性中的自带的返回方法
    this.props.navigation.goBack();
  };
  constructor(props){
      super(props);
  }

  render() {
    return (
      <WebView
        source={{ uri: this.props.navigation.state.params.artical_url }}
        style={{ width: "100%", height: "100%" }}
      />
    );
  }
}
