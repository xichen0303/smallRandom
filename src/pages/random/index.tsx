import { View, Text, Input, Button, Switch } from '@tarojs/components';
import { useReactive } from 'ahooks';
import Taro, { useLoad } from '@tarojs/taro';
import './index.scss'

const Index = () => {
  const state = useReactive({
    minNumber: '1',
    maxNumber: '10',
    totalNumber: '1',
    randomNumber: [],
    isRepeat: false,
  })
  useLoad(() => {
    
  })

  const keepOnlyNumbers = (value) => {
    let cleanedNum = value.replace(/[^0-9]/g, '');
    // 如果数字以0开头，移除所有前导0
    while (cleanedNum.startsWith('0') && cleanedNum !== '0') {
      cleanedNum = cleanedNum.slice(1);
    }
    return cleanedNum;
  }

  const onInputBlur = (e, stateKey) => {
    state[stateKey] = keepOnlyNumbers(e.target.value);
  }

  const onInputChange = (e, stateKey) => {
    state[stateKey] = e.detail.value;
  }

  const renderConfig = () => {
    const configArray = [
      {
        text: '最小值',
        value: state.minNumber,
        placeholder: '请输入',
        inputType: 'number',
        maxlength: 5,
        onInput: (e) => onInputChange(e, 'minNumber'),
        onBlur: (e) => onInputBlur(e, 'minNumber'),
      },
      {
        text: '最大值',
        value: state.maxNumber,
        placeholder: '请输入',
        inputType: 'number',
        maxlength: 8,
        onInput: (e) => onInputChange(e, 'maxNumber'),
        onBlur: (e) => onInputBlur(e, 'maxNumber'),
      },
      {
        text: '生成个数',
        value: state.totalNumber,
        placeholder: '请输入',
        inputType: 'number',
        onInput: (e) => onInputChange(e, 'totalNumber'),
        onBlur: (e) => onInputBlur(e, 'totalNumber'),
      }
    ]
    return (
      <View className='random-config-content'>
        {configArray.map(item => {
          return (
            <View className='random-config-content-item'>
              <Text>{item.text}：</Text>
              <Input
                className='random-config-content-item-input'
                value={item.value}
                controlled={true}
                type={"number"}
                maxlength={item.maxlength}
                placeholder={item.placeholder}
                onInput={item.onInput}
                onBlur={item.onBlur}
              />
            </View>
          );
        })}
        {
          parseInt(state.totalNumber, 10) > 1 &&
          <View className='random-config-content-item'>
            <Text>是否重复：</Text>
            <Switch
              checked={state.isRepeat}
              onChange={() => state.isRepeat = !state.isRepeat}
              color="#7FB8ED"
            />
          </View>
        }
      </View>
    );
  }

  const renderResult = () => {
    return (
      <View className='rendom-result-content'>
        <View className='rendom-result-content-number'>
          <Text
            className='rendom-result-content-text'
            selectable

          >
            {state.randomNumber.map((item, index) => {
              if (index + 1 === state.randomNumber?.length) {
                return `${item}`
              }
              return `${item}，`
            })}
          </Text>
        </View>
      </View>
    );
  }

  // 生成随机数 可控制生成个数、是否允许重复
  const generateRandomNumbers = (minNumberStr, maxNumberStr, countStr, allowDuplicates = false) => {
    // 将字符串参数转换为整数
    const minNumber = parseInt(minNumberStr, 10);
    const maxNumber = parseInt(maxNumberStr, 10);
    const count = parseInt(countStr, 10);
  
    // 检查输入有效性
    if (isNaN(minNumber) || isNaN(maxNumber) || isNaN(count)) {
      Taro.showToast({
        title: '请输入',
        icon: 'none',
        duration: 2000
      });
      return [];
      // throw new Error('Invalid input: Ensure all parameters are numeric strings.');
    }
    if (minNumber > maxNumber) {
      Taro.showToast({
        title: '最大值需要大于等于最小值',
        icon: 'none',
        duration: 2000
      })
      return [];
      // throw new Error('Invalid input: minNumber must be less than or equal to maxNumber.');
    }
    if (count < 0 || count > 100) {
      Taro.showToast({
        title: '生成数量需要大于0小于等于100',
        icon: 'none',
        duration: 2000
      })
      return [];
      // throw new Error('Invalid input: Count must be a non-negative integer.');
    }
    if (count > (maxNumber - minNumber + 1) && !allowDuplicates) {
      Taro.showToast({
        title: '不允许重复时，生成数量需要大于数值范围',
        icon: 'none',
        duration: 2000
      })
      return [];
      // throw new Error('Count exceeds the range of possible unique numbers when duplicates are not allowed.');
    }
    Taro.showLoading({
      title: '生成中',
    })
    const range = maxNumber - minNumber + 1;
    let randomNumbers: number[] = [];
  
    if (allowDuplicates) {
      // 允许重复
      for (let i = 0; i < count; i++) {
        randomNumbers.push(Math.floor(Math.random() * range) + minNumber);
      }
    } else {
      // 不允许重复
      randomNumbers = Array.from({length: range}, (_, index) => index + minNumber);
      randomNumbers = randomNumbers.sort(() => 0.5 - Math.random()).slice(0, count);
    }
    setTimeout(function () {
      Taro.hideLoading()
    }, 100)
    return randomNumbers;
  }
  
  // 点击“生成”
  const onCreateTap = () => {
    const numberArr = generateRandomNumbers(state.minNumber, state.maxNumber, state.totalNumber, state.isRepeat);
    state.randomNumber = numberArr;
  }

  // 点击“重置”
  const onResetTap = () => {
    state.minNumber = '0';
    state.maxNumber = '10';
    state.totalNumber = '1';
    state.randomNumber = [];
  }

  const renderButton = () => {
    return (
      <View className='rendom-button-content'>
        <Button
          className="rendom-button buttonColor"
          hoverClass="hoverColor"
          onTap={onCreateTap}
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
      {renderConfig()}
      {renderResult()}
      {renderButton()}
    </View>
  )
}

export default Index;
