import Taro, { useLoad } from '@tarojs/taro'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useReactive } from 'ahooks';
import { View, Text, Button } from '@tarojs/components';
import { cloneDeep } from 'lodash';
import './index.scss';

const colorList = ['whiteBlock', 'blackBlock', 'greyBlock', 'redBlock']

const Index = () => {
  const intervalTimer = useRef<any>(null);
  const state = useReactive<{
    score: number;
    speed: number;
    blockList: number[][];
    positonY: number;
    isRunning: boolean;
  }>({
    score: 0,
    speed: 20,
    blockList: [],
    positonY: 600,
    isRunning: false,
  })

  useLoad(() => {
    // showModal();
    console.log()
    init();
  })

  const init = () => {
    const blockList: any[] = [];
    for (let i = 0; i <= 4; i += 1) {
      const index = Math.floor(Math.random() * 4);
      const arr: number[] = [];
      for (let n = 0; n <= 3; n += 1) {
        if (n === index) {
          arr.push(1);
        } else {
          arr.push(0);
        }
      }
      blockList.push(arr);
    }
    state.blockList = blockList;
  }

  useEffect(() => {
    const positonYabs = Math.abs(state.positonY);
    console.log(state.positonY , 'state.positonY')
    // 每次方块触碰底部时计算高度、顶部增加方块
    if (state.positonY < 0 && positonYabs % 300 <= 20) {
      let currentLength = 0;

      for (let i = 0; i < state.blockList.length; i += 1) {
        if (state.blockList[i].find((i) => i === 1)) {
          currentLength = i * 300;
          break;
        }
      }
      // 黑块到达底部 游戏结束
      if (positonYabs > currentLength) {
        onEnd();
        return;
      }
      // 增加一行
      const newBlock = cloneDeep(state.blockList);
      const index = Math.floor(Math.random() * 4);
      const arr: number[] = [];
      for (let n = 0; n <= 3; n += 1) {
        if (n === index) {
          arr.push(1);
        } else {
          arr.push(0);
        }
      }
      newBlock.push(arr);
      state.blockList = newBlock;
    }
  }, [state.positonY, state.blockList])
  
  useEffect(() => {
    if (state.score === 50) {
      clearInterval(intervalTimer.current);
      intervalTimer.current = setInterval(() => {
        state.positonY = state.positonY - 5
      }, 10);
    } else if (state.score === 100) {
      clearInterval(intervalTimer.current);
      intervalTimer.current = setInterval(() => {
        state.positonY = state.positonY - 5
      }, 5);
    }
  }, [state.score])

  const showModal = () => {
    Taro.showModal({
      title: '开始游戏',
      // content: '开始游戏',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

  // 开始
  const onStart = useCallback(() => {
    state.score = 0;
    state.positonY = 600;
    init();
    intervalTimer.current = setInterval(() => {
      state.positonY = state.positonY - 5;
    }, 20);
  }, [])


  // 继续
  const onContinue = () => {
    intervalTimer.current = setInterval(() => {
      state.positonY = state.positonY - 5;
    }, 20);
  }

  // 结束
  const onEnd = () => {
    clearInterval(intervalTimer.current);
    Taro.showModal({
      title: '游戏结束',
      // content: '开始游戏',
      confirmText: '重新开始',
      cancelText: '退出游戏',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          onStart();
        } else if (res.cancel) {
          console.log('用户点击取消')
          Taro.navigateBack({
            delta: 1
          })
        }
      }
    })
  }
  
  //  点击方块
  const onBlockTap = ({ itIndex, eleIndex, ele }) => {
    const blockList = cloneDeep(state.blockList);
    if (ele === 1) { // 点击黑块变灰 加分
      blockList[itIndex][eleIndex] = 2;
      state.score = state.score + 10;
    } else if (ele === 0) { // 点击白块变红 同时游戏结束
      blockList[itIndex][eleIndex] = 3;
      onEnd();
    }
    state.blockList = blockList;
  }
  
  return (
    <View className="index">
      <View className="score">分数：{state.score}</View>
      <View className='content'>
        <View className='mian' style={{ bottom: Taro.pxTransform(state.positonY) }}>
          {
            state.blockList.map((item, itIndex) => {
              return (
                <View className='row-view'>
                  {
                    item.map((ele, eleIndex) => {
                      return (
                        <View
                          className={`block-view ${ colorList[ele] }`}
                          onTap={() => onBlockTap({ itIndex, eleIndex, ele })}
                        ></View>
                      );
                    })
                  }
                </View>
              );
            })
          }
        </View>
      </View>
      <Button className="bottom" onTap={() => {
        onStart();
      }}>继续</Button>
      <Button className="bottom" onTap={() => {
        clearInterval(intervalTimer.current);
      }}>暂停</Button>
    </View>
  )
}

export default Index;
