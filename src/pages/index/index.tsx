import { View, Text } from '@tarojs/components';
import { useReactive } from 'ahooks';
import { useLoad } from '@tarojs/taro';
import { AtTabs, AtTabsPane, AtTabBar } from 'taro-ui';
import Mine from '../mine'
import './index.scss'

export default function Index() {

  const state = useReactive({
    atTabBarCurrent: 0
  });

  useLoad(() => {
    console.log('Page loaded.');
  })

  // 底部栏点击
  const handleAtTabBarClick = (key) => {
    console.log(key);
    state.atTabBarCurrent = key;
  }

  return (
    <View className='index'>
      <View className="topContent">
        预留位置
      </View>
      <AtTabs current={state.atTabBarCurrent} tabList={[]} onClick={() => {}}>
        <AtTabsPane current={state.atTabBarCurrent} index={0} >
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >标签页一的内容</View>
        </AtTabsPane>
        <AtTabsPane current={state.atTabBarCurrent} index={1}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
        </AtTabsPane>
        <AtTabsPane current={state.atTabBarCurrent} index={2}>
          <Mine></Mine>
        </AtTabsPane>
      </AtTabs>
      <View>
        预留位置
      </View>
      <AtTabBar
        fixed
        tabList={[
          { title: '工具', iconType: 'list'},
          { title: '游戏', iconPrefixClass: 'fa', iconType: 'game' },
          { title: '我的', iconType: 'user'}
        ]}
        onClick={handleAtTabBarClick}
        current={state.atTabBarCurrent}
      />
    </View>
  )
}
