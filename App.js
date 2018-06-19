/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  AppConfig,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";
import Swiper from "react-native-swiper";
import TabNavigator from 'react-native-tab-navigator';
/**
 * 测试模拟电影列表数据
 */
var MOCKED_MOVIES_DATA = [
  {
    title: "功夫熊猫",
    year: "2018",
    posters: { thumbnail: "http://i.imgur.com/UePbdph.jpg" }
  }
];
/**
 * 测试真实电影json数据
 */
var REQUEST_URL =
  "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

/**
 * wanandroid 文章列表api
 */
var REQUEST_WANANDROID_URL_ARTICALS = "http://www.wanandroid.com/article/list/";
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android: "摇一摇打开"
});
var curPage = 1; //当前页数
var itemNumbers = 20; //数据条目数
var totalPages = 1; //总页数
//type Props = {};
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //movies:null,
      data: [], //数据源
      neterror: false, //网络请求错误
      errorinfo: "", //错误信息
      showfooter: 0, //控制列表底部显示状态 0 隐藏 1 没有更多 2 正在加载更多...
      loaded: false, //列表数据加载状态
      refreshing: false,//控制下拉刷新
      selectedTab: "home"
    };
    this.fetchData = this.fetchData.bind(this);
  }

  //分割线
  separatorComponent = () => {
    return <View style={styles.separator} />;
  };

  //组件加载完成 开始请求数据 生命周期回调函数
  componentDidMount() {
    this.fetchData(curPage);
  }
  fetchData(curPage) {
    //实现分页加载
    console.log(
      "artical_url*",
      REQUEST_WANANDROID_URL_ARTICALS + (curPage - 1) + "/json"
    );
    fetch(REQUEST_WANANDROID_URL_ARTICALS + (curPage - 1) + "/json")
      .then(response => response.json())
      .then(responseData => {
        totalPages = responseData.data.pageCount;
        curPage = responseData.data.curPage;
        itemNumbers = responseData.data.total;

        let foot = 1;
        if (curPage >= totalPages) {
          foot = 1;
        } else {
          foot = 2;
        }
        //console.log(JSON.stringify(responseData.data.datas));
        this.setState({
          data: this.state.data.concat(responseData.data.datas),
          loaded: true,
          showfooter: foot,
          isRefreshing: false
        });
      })
      .catch(error => {
        this.setState({
          neterror: true,
          errorinfo: error
        });
      })
      .done();
  }

  //添加item唯一key 解决警告
  _keyExtractor = (item, index) => index.toString();

  //渲染页面视图
  render() {
    if (!this.state.loaded && !this.state.error) {
      return this.renderloading();
    } else if (this.state.error) {
      return this.renderErrorView();
    } else if (this.state.data.size <= 0) {
      return this.renderEmptyView();
    }

    //使用FaltList组件渲染一个列表
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="首页"
            renderIcon={() => <Image source={require('./image/home_normal.png')} stype = {styles.tabicon} />}
            renderSelectedIcon={() => <Image  source={require('./image/home.png')} stype = {styles.tabicon} />}
            badgeText="1"
            onPress={() => this.setState({ selectedTab: 'home' })}>
            <FlatList
              data={this.state.data} //数据源
              keyExtractor={this._keyExtractor} //item key
              renderItem={({ item }) => this.rendermovies(item)}
              ItemSeparatorComponent={this.separatorComponent} // 分割线
              ListHeaderComponent={this._bannerComponent.bind(this)} //头部轮播或背景的view
              ListFooterComponent={() => this.footerComponent()} //底部加载数据状态的view
              onEndReached={this._onEndReached.bind(this)} //上拉加载更多监听
              onEndReachedThreshold={1}
              refreshing={this.state.refreshing}
              onRefresh={() => this.onPullRefresh()} //下拉刷新
              style={styles.liststyle}>
            </FlatList>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'mine'}
            title="我的"
            renderIcon={() => <Image stype = {styles.tabicon} source={require('./image/mine_normal.png')} />}
            renderSelectedIcon={() => <Image stype = {styles.tabicon} source={require('./image/mine.png')} />}
            //renderBadge={() => <CustomBadgeView />}
            onPress={() => this.setState({ selectedTab: 'mine' })}>
            <View style={styles.container}>
              <Text>我的</Text>
            </View>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
  //渲染 加载中样式......
  renderloading() {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating={true} color="lightgray" size="large" />
        <Text>正在加载...</Text>
      </View>
    );
  }
  //渲染 加载失败
  renderErrorView() {
    return (
      <View style={styles.container}>
        <Text>加载失败</Text>
      </View>
    );
  }
  //渲染 加载空视图
  renderEmptyView() {
    return (
      <View style={styles.container}>
        <Text>暂无数据</Text>
      </View>
    );
  }
  //测试头部
  _testHeaderView() {
    return <Text style={styles.testheader}>Beautiful</Text>;
  }
  //轮播图
  _bannerComponent() {
    return (
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        height={200}
        paginationStyle={{ bottom: 10 }}
        dotStyle={{ backgroundColor: "rgba(0,0,0,.2)", width: 6, height: 6 }}
        activeDotStyle={{
          backgroundColor: "rgba(0,0,0,.5)",
          width: 6,
          height: 6
        }}
      >
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
    );
  }
  //底部 footer view
  footerComponent = () => {
    if (this.state.showfooter === 1) {
      return (
        <View style={styles.year}>
          <Text>没有更多了</Text>
        </View>
      );
    } else if (this.state.showfooter === 2) {
      return (
        <View style={styles.bottomloadmorecontainer}>
          <ActivityIndicator animating={true} color="lightgray" size="small" />
          <Text>正在加载...</Text>
        </View>
      );
    } else if (this.state.showfooter === 0) {
      return (
        <View style={styles.year}>
          <Text />
        </View>
      );
    }
  };
  //下拉刷新.......
  onPullRefresh = () => {
    this.setState(
      {
        data: [],
        showfooter: 0,
        loaded: false,
        refreshing: false //控制下拉刷新
      },
      () => {
        curPage = 1;
        this.fetchData(curPage);
      }
    );
  };
  //上拉加载更多 监听列表滑动到底部
  _onEndReached() {
    if (this.state.showfooter == 1) {
      //正在加载或加载完成
      return;
    }
    if (curPage >= totalPages && curPage != 1) {
      //当前页大于总页数且当前页不是第一页
      return;
    } else {
      //当前页数递增
      curPage++;
    }
    //显示底部view
    this.state.showfooter = 2;
    //加载数据
    this.fetchData(curPage);
  }
  //渲染 列表数据样式
  rendermovies(item) {
    return (
      <View style={styles.articalcontainer}>
        {/* <Image source={{ uri: movie.posters.thumbnail }} style={styles.imgesize}/> */}
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{"分类: " + item.chapterName}</Text>
        <View style={styles.bottomcontainer}>
          <Text style={styles.instructions}>{"作者: " + item.author}</Text>
          <Text style={styles.date}>{"日期: " + item.niceDate}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  articalcontainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    alignContent: "space-around",
    margin: 8
  },
  loading: {
    flexDirection: "column",
    alignSelf: "center",
    flex: 1,
    justifyContent: "center"
  },
  righttextcontainer: {
    flex: 1
  },
  bottomcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "flex-start"
  },
  bottomloadmorecontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center"
  },
  welcome: {
    fontSize: 25,
    margin: 10
  },
  instructions: {
    alignSelf: "flex-start"
  },
  date: {
    alignSelf: "flex-end"
  },
  category: {
    alignSelf: "flex-start",
    marginTop: 8
  },
  imgesize: {
    margin: 15,
    width: 100,
    height: 150
  },
  title: {
    fontSize: 20,
    alignSelf: "flex-start",
    color: "#333333"
  },
  year: {
    alignSelf: "center",
    padding: 15,
    fontSize: 20
  },
  liststyle: {
    backgroundColor: "#F5FCFF"
  },
  separator: {
    height: 1,
    backgroundColor: "#C0C0C0"
  },

  //轮播banner------------start
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  },
  //-------------------------end
  testheader: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#97CAE5",
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    height: 150,
    alignItems: "center"
  },
  tabicon: {
    width: 10,
    height: 10
},
});