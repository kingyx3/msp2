import React, { useState } from "react";
import { TouchableOpacity, Text, Platform, Alert, View } from "react-native";
import { useFormikContext } from "formik";
//import components
import ErrorMessage from "./ErrorMessage";

//import styles and assets
import styled from "styled-components/native";
import colors from "../../config/colors";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { heading2FontSize, heading2FontSizeIOS, Sub1 } from "../../config/Typography";

export const Default = ({ name, ...otherProps }) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  return (
    <Container>
      <Inputfield
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        {...otherProps}
      ></Inputfield>
      {<ErrorMessage error={errors[name]} visible={touched[name]} />}
    </Container>
  );
};

export const Pw = ({ name, ...otherProps }) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  const [hide, setHide] = useState(true);

  const TogglePw = () => {
    setHide((hide) => !hide);
  };

  return (
    <Container>
      <InputLine>
        <Input
          secureTextEntry={hide}
          onBlur={() => setFieldTouched(name)}
          onChangeText={handleChange(name)}
          {...otherProps}
        ></Input>
        <TouchableOpacity onPress={TogglePw}>
          {hide === true ? <Text>Show</Text> : <Text>Hide</Text>}
        </TouchableOpacity>
      </InputLine>
      {<ErrorMessage error={errors[name]} visible={touched[name]} />}
    </Container>
  );
};

export const DefaultInput = ({ name, value, onChangeText, ...otherProps }) => {
  return (
    <Container>
      <Inputfield
        name={name}
        value={value}
        onChangeText={onChangeText}
        // autoCapitalize="sentences" //enum('none', 'sentences', 'words', 'characters')
        // autoCorrect={false}
        // multiline={true}
        clearButtonMode="always"
        {...otherProps}
      />
    </Container>
  );
};

export const SearchInput = ({ ...otherProps }) => {
  return (
    <SearchSpace>
      <EvilIcons name="search" size={Platform.OS == 'ios' ? 20 : 14} color={colors.black} />
      <SearchInputText autoFocus={true} {...otherProps} />
    </SearchSpace>
  );
};

export const TopUpInput = ({ ...otherProps }) => {
  return (
    <TopUpSpace>
      <TopUpInputText
        keyboardType="numeric"
        maxLength={3}
        multiline={false}
        {...otherProps} />
    </TopUpSpace>
  );
};

export const NameInput = ({ initialName, onSave, ...otherProps }) => {
  const [name, setName] = useState(initialName);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    if (name.trim().length === 0) {
      Alert.alert('Invalid Name', 'Please enter a valid name.');
      return;
    }

    onSave(name);
    setEditing(false);
  };

  const handleCancel = () => {
    setName(initialName);
    setEditing(false);
  };


  return (
    <Container>
      {editing ? (
        <>
          <View style={{ flexDirection: 'row' }}>
            <Input
              onChangeText={text => setName(text)}
              value={name}
              {...otherProps}
            />
            <TouchableOpacity onPress={handleSave}>
              <Feather name="check-circle" size={30} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel}>
              <Feather name="x-circle" size={30} color="red" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={{ flexDirection: 'row' }}>
            <Sub1 numberOfLines={1}>
              {name?.substring(0, 25) + (name.length > 25 ? "...   " : "   ")}
            </Sub1>
            <TouchableOpacity onPress={() => setEditing(true)}>
              <Feather name="edit" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* <Inputfield
        name={name}
        value={value}
        onChangeText={onChangeText}
        // autoCapitalize="sentences" //enum('none', 'sentences', 'words', 'characters')
        // autoCorrect={false}
        // multiline={true}
        clearButtonMode="always"
        {...otherProps}
      /> */}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
`;

const Inputfield = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: #d4d4d4;
  padding: 20px 0;
  /* height: 40px; */
`;

const InputLine = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.lightgray};
`;

const Input = styled.TextInput`
  width: 90%;
  height: 40px;
`;

const SearchSpace = styled.View`
  flex-direction: row;
  align-items: center;
  width: 80%;
  border: 1px solid ${colors.lightgray};
  border-radius: 25px;
  padding: 10px;
`;

const SearchInputText = styled.TextInput`
  margin-left: 10px;
`;

const TopUpSpace = styled.View`
  background-color: ${colors.white};
  flex: 1;
`;

const TopUpInputText = styled.TextInput`
  color: ${colors.blackText};
  font-weight: bold;
  font-size: ${Platform.OS == 'ios' ? heading2FontSizeIOS : heading2FontSize}px;
  background: ${colors.white};
`;