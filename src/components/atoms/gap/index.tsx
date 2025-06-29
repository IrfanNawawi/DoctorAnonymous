import React from 'react'
import { View } from 'react-native'

type GapProps = {
    height?: number,
    width?: number
}
export default function index({height, width}: GapProps) {
  return (
    <View style={{height: height, width: width}}/>
  )
}