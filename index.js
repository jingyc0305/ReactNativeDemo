import { AppRegistry } from 'react-native';
import {StackNavigator} from 'react-navigation'; // 引入react-navigation组件
import Home from './App';
import { ArticalDetailPage } from './artical_detail';

const App = StackNavigator({    // 使用StackNavigator方法配置路由
    Main:{screen:Home},    // 配置路由 
    Artical:{screen:ArticalDetailPage}
},{
    initialRouteName:'Main'    // 设置默认显示页面 Main 
})

AppRegistry.registerComponent('AwesomeProject', () => App);