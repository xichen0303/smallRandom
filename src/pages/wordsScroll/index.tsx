import { View, Text, Input, Button, Switch } from '@tarojs/components';
import { useReactive } from 'ahooks';
import Taro, { useLoad } from '@tarojs/taro';
import { useCallback, useEffect, useMemo } from 'react';
import './index.scss'

const Index = () => {
  const query = Taro.createSelectorQuery();
  const state = useReactive({
    textContent: '收到李逵负荆啊立丰国际哦为i就都说了咖啡机阿拉',
    during: 3,
    textHeight: 0,
    windowHeight: 0,
    keyframes: '',
  })
  useEffect(() => {
    Taro.getSystemInfoAsync({
      success: (res) => {
        // console.log(res, 'resss')
        state.windowHeight = res.windowHeight;
      }
    });
  }, [])

  useEffect(() => {
    query.select('.content-text').boundingClientRect().exec(res => {
      // console.log(res, 'res')
      state.textHeight = res[0].height;
    })
    insertKeyframes();
    console.log(state.textContent, 'state.textContent')
  }, [state.textContent])

  const insertKeyframes = useCallback(() => {
    const startY = state.textHeight + state.windowHeight;
    const endY = -(state.textHeight + state.windowHeight);
    const keyframes = `
      @keyframes loop {
        from {
          transform: translateY(${startY}px) rotate(90deg);
          -webkit-transform: translateY(${startY}px) rotate(90deg);
        }
        to {
          transform: translateY(${endY}px) rotate(90deg);
          -webkit-transform: translateY(${endY}px) rotate(90deg);
        }
      }
    `;
    state.keyframes = keyframes;
    const styleNode = document.createElement('style');
    styleNode.innerHTML = keyframes;
    document.head.appendChild(styleNode);
    console.log(styleNode, 'styleNode')
    console.log(document, 'document')
  }, [state.textHeight, state.windowHeight])

  useLoad(() => {
    
  })

  const renderContent = useMemo(() => {
    let startY = state.textHeight + state.windowHeight;
    let endY = -(state.textHeight + state.windowHeight);

    return (
      <View className='content' onTap={() => {

        }}>
        <View className="content-view">
          {/* <Text className="content-text" style={`--during--:${state.during}s;--startY--:${startY}px;--endY--:${endY}}px`}>{state.textContent}</Text> */}
          <Text className="content-text" style={`--during--:${state.during}s;`}>{state.textContent}</Text>
        </View>
      </View>
    );
  }, [state.textHeight, state.windowHeight, state.during])

  return (
    <View className='index'>
      {renderContent}
    </View>
  )
}

export default Index;
