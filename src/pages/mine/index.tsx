import { View, Text } from '@tarojs/components';
import { useReactive } from 'ahooks';
import { useLoad } from '@tarojs/taro';
import { AtTabs, AtTabsPane, AtTabBar } from 'taro-ui';
import './index.scss'

const Index = () => {

  useLoad(() => {
    console.log('Page loaded.');
  })

  return (
    <View className='index'>
      我的
    </View>
  )
}

export default Index;
