import { View, Text } from '@tarojs/components';
import { useReactive } from 'ahooks';
import { useLoad } from '@tarojs/taro';
import { AtGrid, AtInput, AtForm, AtButton } from 'taro-ui';
import './index.scss'

const Index = () => {
  const state = useReactive({
    minNumber: '0',
    maxNumber: '10',
    totalNumber: '10',
  })
  useLoad(() => {
    
  })

  const handleClick = (item) => {
    
  }

  const renderConfig = () => {
    return (
      <View className='random-config-content'>
      
      </View>
    );
  }

  const renderResult = () => {
    return (
      <View className='rendom-result-content'>
        
      </View>
    );
  }

  const renderButton = () => {
    return (
      <View className='rendom-button-content'>

      </View>
    );
  }

  return (
    <View className='index'>
      {renderConfig()}
      {renderResult()}
      {renderButton()}
    </View>
  )
}

export default Index;
