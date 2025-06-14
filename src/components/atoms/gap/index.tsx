import React from 'react'
import { View } from 'react-native'

type PropsGap = {
    height: number,
    width: number
}
export default function index({height, width}: PropsGap) {
  return (
    <View style={{height: height, width: width}}/>
  )
}