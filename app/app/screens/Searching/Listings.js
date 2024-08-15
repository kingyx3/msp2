import React, { useState, useEffect } from "react";
import { Dimensions, FlatList, View, Modal, TouchableOpacity } from "react-native";
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import * as Network from 'expo-network';

//import components
import { NavBar } from "../../components/NavBar";
import * as Button from "../../components/Button";
import MapCard from "../../components/MapCard";

//import styles and assets
import styled from "styled-components/native";
import * as Typography from "../../config/Typography";
import colors from "../../config/colors";

// import redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

// import firebase actions
import { clearSelectedSpace, setSelectedSpace, setSelectedSpaces, showOfflineAlert } from "../../components/Firebase/firebase";

const { width, height } = Dimensions.get("window");

const Listings = (props) => {
  const isFocused = useIsFocused();
  const { spaceType, start, end, spaceSummary, selectedSpaces: selectedSpacesProp } = props.state;
  const startM = moment(start);
  const endM = moment(end);
  const [selectedSpaces, setSelectedSpacesState] = useState(selectedSpacesProp.slice(0, 25)); // only show first 25
  const [showFilter, setShowFilter] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    if (isFocused) {
      if (spaceSummary && (spaceSummary['spaceType'] === spaceType || Object.keys(spaceSummary).length === 0)) {
        props.setSelectedSpaces(spaceType, startM, endM, spaceSummary);
      }
    }
  }, [isFocused, spaceSummary]);

  useEffect(() => {
    setSelectedSpacesState(selectedSpacesProp.slice(0, 25));
  }, [selectedSpacesProp]);

  const submit = async (spaceId) => {
    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected) {
      const selectedSpace = selectedSpaces.find(space => space.id === spaceId);
      const { periodAvailabilityArray, periodPrice } = selectedSpace;
      props.navigation.navigate('ListStackModal', { screen: "Details", params: { spaceId, periodAvailabilityArray, periodPrice } });
    } else {
      showOfflineAlert();
    }
  };

  const renderItem = ({ item, index }) => (
    <MapCard
      testID={`${index}_listing`}
      key={index.toString()}
      image={item.images[0]}
      property={spaceType}
      title={`${item.location.suburb || item.location.street}, ${item.location.country}`}
      subtitle={`$${item.periodPrice}`}
      caption={item.needHostConfirm ? null : "Insta-Book"}
      rating={item.rating}
      reviews={item.reviews}
      onPress={() => !item.third_party && submit(item.id)}
    />
  );

  const applyFilters = () => {
    const sortedSpaces = [...selectedSpaces].sort((a, b) => sortOrder === 'asc' ? a.periodPrice - b.periodPrice : b.periodPrice - a.periodPrice);
    setSelectedSpacesState(sortedSpaces);
    setShowFilter(false);
  };

  return (
    <Body>
      <NavBar nav="chevron-left" onPress={() => props.navigation.goBack()} />
      <Main>
        <FlatList
          testID="listings-flatlist"
          ListHeaderComponent={
            <Header>
              <View>
                <Typography.SP>{selectedSpaces.length === 0 ? 'No properties' : `${selectedSpaces.length} properties`}</Typography.SP>
                <Typography.H1>{spaceType}</Typography.H1>
                <Typography.SP>{startM.format("DD MMM YYYY hA")} to {endM.format("hA")}</Typography.SP>
              </View>
              {/* <TouchableOpacity onPress={() => setShowFilter(true)}>
                <BtnContainer>
                  <Filter source={require("../../assets/filter.png")} />
                </BtnContainer>
              </TouchableOpacity> */}
            </Header>
          }
          data={selectedSpaces}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
        <MapBtnWrapper>
          <Button.FloatingButton
            testID='listmap-button'
            iconName="map-o"
            label=" map"
            onPress={() => props.navigation.navigate("ListMap", selectedSpaces)}
          />
        </MapBtnWrapper>
      </Main>
      {
        showFilter && (
          <Modal transparent={true} animationType="slide" visible={showFilter}>
            <FilterContainer>
              <ModalContent>
                <CloseBtn onPress={() => setShowFilter(false)}>
                  <Typography.SP>Close</Typography.SP>
                </CloseBtn>
                <Typography.H1>Sort by Price</Typography.H1>
                <FilterOption onPress={() => setSortOrder('asc')} selected={sortOrder === 'asc'}>
                  <FilterOptionText selected={sortOrder === 'asc'}>Low to High</FilterOptionText>
                </FilterOption>
                <FilterOption onPress={() => setSortOrder('desc')} selected={sortOrder === 'desc'}>
                  <FilterOptionText selected={sortOrder === 'desc'}>High to Low</FilterOptionText>
                </FilterOption>
                {/* <Typography.H1>Filters</Typography.H1>
              <FilterOption>
                <TouchableOpacity onPress={() => setFilters([...filters, 'WiFi'])}>
                  <Typography.SP>WiFi</Typography.SP>
                </TouchableOpacity>
              </FilterOption>
              <FilterOption>
                <TouchableOpacity onPress={() => setFilters([...filters, 'Aircon'])}>
                  <Typography.SP>Aircon</Typography.SP>
                </TouchableOpacity>
              </FilterOption>
              <FilterOption>
                <TouchableOpacity onPress={() => setFilters([...filters, 'Heating'])}>
                  <Typography.SP>Heating</Typography.SP>
                </TouchableOpacity>
              </FilterOption>
              <FilterOption>
                <TouchableOpacity onPress={() => setFilters([...filters, 'Hair Dryer'])}>
                  <Typography.SP>Hair Dryer</Typography.SP>
                </TouchableOpacity>
              </FilterOption> */}
                <Button.BtnContain
                  testID="apply-filters-button"
                  color={colors.red}
                  label="Apply Filters"
                  onPress={applyFilters}
                />
              </ModalContent>
            </FilterContainer>
          </Modal>
        )
      }
    </Body >
  );
};

const Body = styled.View`
  flex: 1;
  background-color: white;
`;

const Main = styled.View`
  flex: 1;
  padding: 0 24px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 40px 0 15px 0;
`;

const Filter = styled.Image`
  width: 20px;
  height: 100%;
  resize-mode: contain;
`;

const BtnContainer = styled.View`
  width: 20px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const MapBtnWrapper = styled.View`
  align-self: center;
  position: absolute;
  bottom: 20px;
`;

const FilterContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  width: 80%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
`;

const CloseBtn = styled.TouchableOpacity`
  align-self: flex-end;
  padding: 10px;
`;

const FilterOption = styled.TouchableOpacity`
  margin: 5px 0;
  padding: 10px;
  width: 100%;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ selected }) => (selected ? colors.red : '#f0f0f0')};
`;

const FilterOptionText = styled(Typography.SP)`
  color: ${({ selected }) => (selected ? 'white' : 'black')};
`;

const mapStateToProps = (state) => ({
  state: state.search,
  user: state.user.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ clearSelectedSpace, setSelectedSpace, setSelectedSpaces }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Listings);
