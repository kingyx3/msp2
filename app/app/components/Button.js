import React from "react";
import { TouchableOpacity, TouchableWithoutFeedback, View, Platform, StyleSheet, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { EvilIcons, FontAwesome } from "@expo/vector-icons";
import colors from "../config/colors";
import * as Typography from "../config/Typography";

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5a2d82',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('2%'),
    width: '100%',
    alignItems: 'center',
    marginBottom: hp('4%'),
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4%'),
  },
  container: {
    width: '100%',
  },
  filled: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('6%'),
    padding: wp('4%'),
    backgroundColor: colors.gray,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlined: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('6%'),
    padding: wp('4%'),
    borderWidth: wp('0.5%'),
  },
  labelWrapper: {
    paddingVertical: hp('1%'),
  },
  labelWrapper2: {
    paddingVertical: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelWrapper3: {
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  fbWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
    borderRadius: wp('6%'),
    padding: wp('4%'),
    elevation: 3,
  },
});

export const BtnContainNew = ({ color, disabled, label, onPress, size, testID }) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: disabled ? colors.gray : color || colors.purple }]}
    disabled={disabled}
    onPress={onPress}
    testID={testID}
  >
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

export const BtnContain = ({ color, disabled, label, onPress, icon, size, testID }) => (
  <View style={styles.container}>
    <TouchableOpacity testID="btn-contain-touchable" onPress={onPress} disabled={disabled} style={{ padding: wp('0.25%') }}>
      <View testID="btn-contain-filled" style={[styles.filled, color && { backgroundColor: color }]}>
        <View style={styles.wrapper}>
          {icon && (
            <FontAwesome
              name={icon}
              color="white"
              style={{ marginRight: wp('2%') }}
              testID="btn-contain-icon"
            />
          )}
          {size === "small" ? (
            <Typography.pS testID={testID} color="white" bold>
              {label}
            </Typography.pS>
          ) : (
            <Typography.Sub1 testID={testID} color="white" bold>
              {label}
            </Typography.Sub1>
          )}
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

export const BtnOutline = ({ color, disabled, label, labelcolor, onPress, testID }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[styles.outlined, { borderColor: color }]}>
        <Typography.Sub1 testID={testID} bold color={labelcolor}>
          {label}
        </Typography.Sub1>
      </View>
    </TouchableOpacity>
  </View>
);

export const BtnText = ({ color, label, onPress, testID }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.labelWrapper}>
        <Typography.Sub1 testID={testID} bold color={color}>
          {label}
        </Typography.Sub1>
      </View>
    </TouchableOpacity>
  </View>
);

export const BtnTxtUnderline = ({ color, label, onPress, testID }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.labelWrapper2}>
        <Typography.Sub1
          testID={testID}
          bold
          color={color}
          style={{
            fontSize: Platform.OS === 'ios' ? wp('4%') : wp('2.5%'),
            textDecorationLine: "underline",
          }}
        >
          {label}
        </Typography.Sub1>
      </View>
    </TouchableOpacity>
  </View>
);

export const FloatingButton = ({ iconName, label, onPress, testID }) => (
  <View style={styles.container}>
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.fbWrapper}>
        <FontAwesome name={iconName} color="white" />
        <Typography.Sub1
          testID={testID}
          bold
          color="white"
          style={{
            marginLeft: wp('2%'),
            fontSize: Platform.OS === 'ios' ? wp('3.5%') : wp('2%')
          }}
        >
          {label}
        </Typography.Sub1>
      </View>
    </TouchableWithoutFeedback>
  </View>
);

export const BtnCircle = ({ iconName, size, color, onPress, testID }) => (
  <View style={styles.container}>
    <TouchableOpacity testID="btn-circle" onPress={onPress}>
      <View style={{ backgroundColor: color || 'white', borderRadius: wp('50%'), padding: wp('1%') }}>
        <EvilIcons testID={testID} name={iconName} size={size} color="black" />
      </View>
    </TouchableOpacity>
  </View>
);

export const BtnDateTime = ({ label, color, onPress, testID }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.labelWrapper3}>
      <Typography.Sub1 testID={testID} color={color}>
        {label}
      </Typography.Sub1>
    </View>
  </TouchableOpacity>
);