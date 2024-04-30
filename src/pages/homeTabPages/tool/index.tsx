import { View, Text } from '@tarojs/components';
import { useReactive } from 'ahooks';
import Taro, { useLoad } from '@tarojs/taro';
import { AtGrid } from 'taro-ui';
import './index.scss'

const Index = () => {

  const listData = [
    {
      // image: '',
      page: 'random',
      value: '随机数'
    },
    {
      // image: '',
      value: '小转盘'
    },
    {
      // image: '',
      value: 'lalala'
    },
  ]

  useLoad(() => {
    console.log('Page loaded.');
  })

  const handleClick = (item) => {
    console.log(item, 'item')
    Taro.navigateTo({
      url: `/pages/${item.page}/index`,
    })
  }

  return (
    <View className='index'>
      <AtGrid
        hasBorder={false}
        data={listData}
        columnNum={2}
        onClick={handleClick}
      />
    </View>
  )
}

export default Index;
