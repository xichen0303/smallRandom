import { View, Text } from '@tarojs/components';
import { useReactive } from 'ahooks';
import Taro, { useLoad } from '@tarojs/taro';
import { AtGrid } from 'taro-ui';
import './index.scss'

const Index = () => {

  const listData = [
    {
      // image: '',
      page: 'pianoBlock',
      value: '别踩白块'
    },
    // {
    //   // image: '',
    //   value: '不知道'
    // },
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
