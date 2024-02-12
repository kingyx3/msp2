import React from "react";
import { View, TouchableHighlight, StyleSheet, } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Badge } from 'react-native-elements';
import {
  AntDesign,
  EvilIcons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import styled from "styled-components/native";
import * as Typography from "../config/Typography";
import colors from "../config/colors";
import ImgSliderItems from "./ImgSliderItems";

export const Default = ({ containedicon, icon, secondary, meta, title, onPress, ...otherProps }) => {
  return (
    <TouchableHighlight {...otherProps} underlayColor={colors.lightgray} onPress={onPress}>
      <Container >
        {containedicon && (
          <IconContainer >
            <MaterialIcons name={containedicon} size={18} />
          </IconContainer>
        )}
        <TextContainer>
          <Typography.Sub1 color={colors.black}>{title}</Typography.Sub1>
          {meta && <Typography.SP color={colors.black}>{meta}</Typography.SP>}
          {secondary && <Typography.P>{secondary}</Typography.P>}
        </TextContainer>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={24}
            style={{ color: colors.gray }}
          />
        )}
      </Container>
    </TouchableHighlight>
  );
};

export const UserList = ({
  image,
  imagesmall,
  imagexsmall,
  meta,
  onPress,
  secondary,
  title,
  RightActions,
  unreadCount,
  ...otherProps
}) => {
  return (
    <Swipeable renderRightActions={RightActions}>
      <TouchableHighlight {...otherProps} underlayColor={colors.faintgray} onPress={onPress}>
        <View>
          <Container>
            {image ? (
              <ImgSliderItems
                source={image}
                customStyle={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  marginRight: 15,
                }}
                placeholder={require('../assets/default_user.png')}
              />
              // <Avatar source={{ uri: image }} />
            ) : imagesmall ? (
              <AvatarSmall source={{ uri: imagesmall }} />
            ) : imagesmall === null ? (
              <AvatarSmallEmpty>
                <AntDesign name="user" size={26} color="white" />
              </AvatarSmallEmpty>
            ) : imagexsmall ? (
              <AvatarXsmall source={{ uri: imagexsmall }} />
            ) : imagexsmall === null ? (
              <AvatarXsmallEmpty>
                <AntDesign name="user" size={26} color="white" />
              </AvatarXsmallEmpty>
            ) : (
              <AvatarEmpty>
                <AntDesign name="user" size={26} color="white" />
              </AvatarEmpty>
            )}
            <TextContainer>
              <FirstLine>
                <Typography.Sub1 color={colors.black}>{title}</Typography.Sub1>
                <Typography.Cap color={colors.black}>{meta}</Typography.Cap>
              </FirstLine>
              <FirstLine>
                {secondary && (
                  <Typography.P numberOfLines={1} color={colors.gray}>
                    {secondary}
                  </Typography.P>
                )}
                {unreadCount > 0 &&
                  <Badge
                    value={unreadCount}
                    status="primary"
                    size="medium"
                    containerStyle={{ paddingRight: 10 }}
                  />
                }
              </FirstLine>
            </TextContainer>
          </Container>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
};

export const LogsList = ({
  image,
  imagesmall,
  imagexsmall,
  meta,
  onPress,
  secondary,
  title,
  RightActions,
  unreadCount,
  defaultImageUrl,
  created,
  message,
  logType,
  amount,
  positive,
  testID
}) => {
  return (
    <TouchableHighlight underlayColor={colors.faintgray} onPress={onPress}>
      <View style={styles.item2}>
        <View style={styles.header}>
          <Typography.H4 testID={testID} bold>{title}</Typography.H4>
          <Typography.Cap>{created}</Typography.Cap>
        </View>
        <View style={styles.details}>
          <Typography.P>{message}</Typography.P>
          <Typography.P color={positive ? 'green' : 'red'} bold>{amount}</Typography.P>
        </View>
        <Typography.P numberOfLines={1} color={colors.gray}>{secondary}</Typography.P>
      </View>
    </TouchableHighlight>
  );
};

const Container = styled.View`
  background-color: white;
  flex-direction: row;
  align-items: center;
  padding: 20px 0;
`;

const TextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const IconContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  background-color: ${colors.faintgray};
  border-radius: 8px;
  border: 1px solid ${colors.lightgray};
  margin-right: 15px;
`;

const Avatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-right: 15px;
`;

const AvatarEmpty = styled.View`
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-right: 15px;
  background-color: ${colors.lightgray};
`;

const AvatarSmall = styled.Image`
  width: 46px;
  height: 46px;
  border-radius: 23px;
  margin-right: 12px;
  background-color: ${colors.lightgray};
`;

const AvatarSmallEmpty = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 46px;
  border-radius: 23px;
  margin-right: 12px;
  background-color: ${colors.lightgray};
`;

const AvatarXsmall = styled.Image`
  width: 34px;
  height: 34px;
  border-radius: 17px;
  margin-right: 10px;
  background-color: ${colors.lightgray};
`;

const AvatarXsmallEmpty = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  border-radius: 17px;
  margin-right: 10px;
  background-color: ${colors.lightgray};
`;

const FirstLine = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  bookingId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookingDate: {
    fontSize: 14,
  },
  hostEarnings: {
    fontSize: 14,
    fontStyle: 'italic',
  },



  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  item2: {
    backgroundColor: '#fff3ff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
  },

  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    justifyContent: 'space-between'
  },
});