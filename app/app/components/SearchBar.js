import React from "react";
import { TouchableOpacity, Platform } from "react-native";

//import styles and assets
import styled from "styled-components/native";
import colors from "../config/colors";
import { EvilIcons } from "@expo/vector-icons";
import { paragraphFontSize, paragraphFontSizeIOS } from "../config/Typography";

export const SearchBar = ({ icon, size, placeholder, setSearch, ...otherProps }) => {
  return (
    <Container {...otherProps}>
      <TouchableOpacity testID="search-bar-touchable" onPress={setSearch}>
        <SearchArea>
          <Flex>
            <EvilIcons name={icon} size={size} color={colors.black} />
            <Placeholder>{placeholder}</Placeholder>
          </Flex>
        </SearchArea>
      </TouchableOpacity>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const SearchArea = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  border: 1px solid ${colors.lightgray};
  border-radius: 25px;
  padding: 10px;
  background-color: white;
`;

const Flex = styled.View`
  flex-direction: row;
`;

const Placeholder = styled.Text`
  color: ${colors.gray};
  font-size: ${Platform.OS == 'ios' ? paragraphFontSizeIOS : paragraphFontSize}px;
  margin-left: 10px;
`;
