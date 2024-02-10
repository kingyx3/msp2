import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";

//import components
import PickerItem from "./PickerItem";
import * as Typography from "../config/Typography"

//import styles and asses
import styled from "styled-components/native";
import { EvilIcons } from "@expo/vector-icons";
import Colors from "../config/colors";

const AppPicker = ({
  icon,
  placeholder,
  items,
  onSelectItem,
  selectedItem,
  center,
  disabled
}) => {
  const [openOptions, setOpenoptions] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => {
        if (disabled) {
          null
        } else {
          setOpenoptions(true)
        }
      }
      }>
        <Container style={{ justifyContent: center ? 'center' : 'space-between' }}>
          <Typography.P >
            {selectedItem ? (
              selectedItem.label
            ) : (
              placeholder
            )}
          </Typography.P>
          {!center && <EvilIcons name={icon} size={20} />}
        </Container>
      </TouchableWithoutFeedback>
      <Modal visible={openOptions} animationType="slide">
        <CloseBtn>
          <TouchableOpacity testID='close-modal' onPress={() => setOpenoptions(false)}>
            <EvilIcons name="close" size={30} />
          </TouchableOpacity>
        </CloseBtn>
        {/* <Button title="close" onPress={() => setOpenoptions(false)} /> */}
        <OptionsWrapper>
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            data={items}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <PickerItem
                label={item.label}
                icon={item.icon}
                onPress={() => {
                  setOpenoptions(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </OptionsWrapper>
      </Modal>
    </>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid ${Colors.lightgray};
  border-radius: 8px;
  padding: 10px;
`;

const CloseBtn = styled.View`
  margin-top: ${Platform.OS === "ios" ? "40px" : "40px"};
  margin-left: 20px;
  border-radius: 6px;
  padding: 4px;
`;//position: absolute; removed

const OptionsWrapper = styled.View`
  height: 100%;
  padding-top: 10px;
`;

export default AppPicker;
