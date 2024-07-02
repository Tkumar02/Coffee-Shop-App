/* prettier-ignore */
/* eslint-disable */
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useStore } from '../store/store'

export default function CartScreen() {
  const CartList = useStore((state: any) => state.CartList);
  console.log("CartList = ", CartList.length)
  return (
    <View>
      <Text>CartScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
