import React from "react";
import useState from 'react-usestateref'
import { FlatList, View, Text, TouchableOpacity, StatusBar, Platform } from "react-native";

//import libraries
import _isEmpty from "lodash/isEmpty";

//import components
import * as TextInput from "../../components/forms/AppInput";
import * as ListItem from "../../components/List";

//import data
import { setSpaceSummary } from "../../components/Firebase/firebase";

//import styles and assets
import styled from "styled-components/native";
import colors from "../../config/colors";

//import redux
import { connect } from "react-redux";
import { setSpaceType } from "../../store/search";

const SpaceTypePicker = (props) => {
  const spaceTypes = props.spaceTypes.filter((spaceType) => spaceType.active)
  const [searchterm, setSearchterm] = useState("");

  const filteredSpace = spaceTypes.filter((space) => {
    return space.label.toLowerCase().includes(searchterm.toLocaleLowerCase());
  });

  const onNavigate = async (spaceType) => {
    await props.setSpaceType(spaceType);
    await props.setSpaceSummary(spaceType)
    return props.navigation.navigate("RangePicker");
  };

  return (
    <Container>
      <Safe>
        <FlatList
          testID="search-flatlist"
          ListHeaderComponent={
            <SearchSpace>
              <TextInput.SearchInput
                placeholder="search"
                autoCorrect={false}
                onChangeText={(text) => setSearchterm(text)}
              />
              {/*
              <TouchableOpacity onPress={() => {
                setSearch(false)
              }}>
                <CancelBtn>Cancel</CancelBtn>
              </TouchableOpacity> */}

            </SearchSpace>
          }
          keyboardShouldPersistTaps={"handled"}
          data={filteredSpace}
          keyExtractor={(item) => item.label}
          renderItem={({ item }) =>
            <View testID={item.label} style={{ paddingHorizontal: 20 }}>
              <ListItem.Default
                title={item.label}
                containedicon="location-on"
                onPress={() => onNavigate(item.label)}
              />
            </View>
          }
          ItemSeparatorComponent={() => <HLine />}
        />
      </Safe>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Main = styled.View`
  background-color: white;
  padding-bottom: 30px;
`;

const SearchStart = styled.View`
  padding: 10px 0 5px 0;
`;

const SearchSpace = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Safe = styled.SafeAreaView`
  padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
  flex: 1;
`;

const HLine = styled.View`
  width: 100%;
  margin: 0 auto;
  height: 1px;
  background-color: ${colors.faintgray};
`;

const CancelBtn = styled.Text`
  color: ${colors.black};
  text-decoration: underline;
  margin-left: 10px;
`;

const HeroText = styled.View`
  width: 100%;
  padding: 30px;
`;

const Footer = styled.View`
  background-color: #fafafa;
`;

const mapStateToProps = (state) => {
  return {
    spaceTypes: state.user.spaceTypes,
  };
};

export default connect(mapStateToProps, { setSpaceType, setSpaceSummary })(SpaceTypePicker);
