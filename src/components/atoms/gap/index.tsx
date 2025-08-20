import React from 'react'
import { View } from 'react-native'
import { GapProps } from '../../../types/gap'

export default function index({height, width}: GapProps) {
  return (
    <View style={{height: height, width: width}}/>
  )
}