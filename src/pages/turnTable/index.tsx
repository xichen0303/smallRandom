import { View, Text, Input, Button, Switch } from '@tarojs/components';
import { useReactive } from 'ahooks';
import Taro, { useLoad } from '@tarojs/taro';
import { useEffect } from 'react';
import './index.scss'

const Index = () => {
  const state = useReactive({
    count: 6,
    itemlist: []
  })
  useEffect(() => {
    const list: any[] = [];
    const eleAngle = (360 / state.count).toFixed(2);
    for (let i = 0; i < state.count; i++) {
      list.push({
        key: i,
        style: {
          // backgroundColor: getRandomColor(),
          transform: `rotate(${+eleAngle * i}deg)`,
        },
        angle: +eleAngle * i,
      })
    }
    console.log(list, 'list')
    state.itemlist = list;
  }, [state.count])
  useLoad(() => {
    
  })

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

  const renderTopCon = () => {
    
    return (
      <View className='content-wrapper'>
        <View className="roll-content">
          {state.itemlist.map(item => {
            return (<View className='roll-item' style={item.style} key={item.key}></View>)
          })}
        </View>
      </View>
      
    );
  }

  // 点击“重置”
  const onResetTap = () => {
    
  }

  const renderButton = () => {
    return (
      <View className='rendom-button-content'>
        <Button
          className="rendom-button buttonColor"
          hoverClass="hoverColor"
          // onTap={onCreateTap}
        >生成</Button>
        <Button
          className="rendom-button"
          onTap={onResetTap}
        >重置</Button>
      </View>
    );
  }

  return (
    <View className='index'>
      {renderTopCon()}
      {/* {renderResult()}
      {renderButton()} */}
    </View>
  )
}

export default Index;
