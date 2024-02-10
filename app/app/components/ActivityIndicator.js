import React from 'react'
import { View, ActivityIndicator } from 'react-native'

export default () =>
  <View style={{ alignItems: "center", justifyContent: "center" }}>
    <ActivityIndicator testID="activity-indicator" size="small" color="#0000ff" />
  </View>