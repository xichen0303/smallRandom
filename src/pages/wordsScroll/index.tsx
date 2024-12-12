import { View, Text, Input, Button, Switch } from '@tarojs/components';
import { useReactive } from 'ahooks';
import Taro, { useLoad } from '@tarojs/taro';
import { useEffect } from 'react';
import './index.scss'

const Index = () => {
  const state = useReactive({
    textContent: '文案文案文案文案文案文案',
    during: 3
    
  })
  useEffect(() => {
    
  }, [])

  useLoad(() => {
    
  })

  const renderContent = () => {
    return (
      <View className='content' onTap={() => {}}>
        <Text className="content-text" style={`--during--:${state.during}s`}>{state.textContent}</Text>
      </View>
    );
  }

  return (
    <View className='index'>
      {renderContent()}
    </View>
  )
}

export default Index;
