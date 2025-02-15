import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, Dimensions, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';
import * as Button from './Button';
import Counter from './Counter';
import colors from '../config/colors';
import * as Typography from '../config/Typography';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you are using Expo
import moment from 'moment'
const options = {
    hour: 'numeric', hour12: true
}
const { width, height } = Dimensions.get('window');
const ITEM_HEIGHT = 93

const AvailabilityCalendar = ({ data, setDatedEvents, unitLabel, disabled, selectedSpace }) => {
    const today = moment().format('YYYY-MM-DD')
    let sortedData = data
        ? Object.keys(data)
            .filter((a) => new Date(a) >= new Date(today))
            .sort((a, b) => new Date(a) - new Date(b))
        : null
    const firstDate = sortedData[0]
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeslot, setSelectedTimeslot] = useState(null)
    const [priceType, setPriceType] = useState(0)
    const [bookingData, setBookingData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const selectedDayData = data[selectedDate] ? Object.entries(data[selectedDate]).sort((a, b) => a[0] - b[0]) : null

    useEffect(() => {
        setSelectedDate(firstDate)
    }, [firstDate])

    const handleTimeslotPress = (item) => {
        const timeSlot = item[0]
        const [priceType, ...availability] = item[1];
        setSelectedTimeslot(timeSlot);
        setModalVisible(true);
        setBookingData([...availability])
        setPriceType(priceType)
    };

    const renderDate = ({ item }) => {
        const isSelected = selectedDate === item;
        return (
            <TouchableOpacity
                testID="date-item"
                style={[
                    { flex: 1, borderWidth: 1, borderColor: 'gray', padding: 10, margin: 4 },
                    { backgroundColor: isSelected ? 'black' : 'transparent' },
                ]}
                disabled={disabled}
                onPress={() => setSelectedDate(isSelected ? null : item)}
            >
                <Typography.P color={isSelected ? 'white' : 'black'} >{`${moment(item).format("DD MMM YY")}`}</Typography.P>
                <Typography.P color={isSelected ? 'white' : 'black'} >{`${moment(item).format("(dddd)")}`}</Typography.P>
            </TouchableOpacity>
        );
    };

    const renderTimeslotItem = ({ item }) => {
        const timeSlot = item[0]
        const [priceType, ...availability] = item[1];
        const totalAvailable = [...availability].length
        const available = [...availability].filter(item => item === '').length;
        const blocked = [...availability].filter(item => item === 'blocked').length;
        const booked = totalAvailable - available - blocked
        const displayPrice = getPrice(priceType, selectedSpace.price, selectedSpace.peakPrice, selectedSpace.offPeakPrice)

        return (
            <TouchableOpacity
                testID="timeslot-item"
                style={{ flex: 1, borderWidth: 1, borderColor: 'gray', padding: 10, margin: 5, justifyContent: 'center', alignItems: 'center' }}
                disabled={disabled}
                onPress={() => handleTimeslotPress(item)}
            >
                <Text>{`${moment(+timeSlot).format('hA')} - $${displayPrice}`}</Text>
                <Text style={{ color: 'green' }}>{'Available: ' + available}</Text>
                <Text style={{ color: 'red' }}>{'Blocked: ' + blocked}</Text>
                <Text style={{ color: 'blue' }}>{'Booked: ' + booked}</Text>
            </TouchableOpacity>
        );
    };

    const renderBlockSetter = ({ item, index }) => {
        const toggleText = (item == "") ? "Available " : (item == "blocked") ? "Blocked " : item
        return (
            <TouchableHighlight
                activeOpacity={1}
                disabled={disabled}
                onPress={() => {
                    let bookingDataCopy = [...bookingData]
                    if (bookingData[index] == "") {
                        bookingDataCopy[index] = "blocked"
                    } else if (bookingData[index] == "blocked") {
                        bookingDataCopy[index] = ""
                    }
                    setBookingData(bookingDataCopy)
                }}
                underlayColor="transparent" // No underlay color for a cleaner look
            >
                <View style={{ flexDirection: 'row' }}>
                    <Typography.H3 color={item == "" ? 'green' : item == "blocked" ? 'red' : 'black'}>{`${unitLabel} ${index + 1}. ${toggleText}`}</Typography.H3>
                    {(item == "" || item == "blocked") &&
                        <FontAwesome
                            name={'refresh'}
                            size={20}
                            color={'purple'}
                            style={{ marginRight: 10 }}
                        />
                    }
                </View>
            </TouchableHighlight>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Date Navigation */}
            <View >
                <FlatList
                    testID='date-flatlist'
                    data={sortedData}
                    renderItem={renderDate}
                    keyExtractor={(item) => item.toString()}
                    horizontal
                />
            </View>

            {/* Timeslot List */}
            <View style={{ flex: 1 }}>
                <FlatList
                    testID='time-flatlist'
                    data={selectedDayData}
                    renderItem={renderTimeslotItem}
                    keyExtractor={(item) => item.toString()}
                    numColumns={1} // Adjust the number of columns as needed
                />
            </View>
            {/* Update Modal */}
            <Modal
                testID='modal'
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                    activeOpacity={1}
                    onPressOut={() => setModalVisible(false)}>
                    <TouchableWithoutFeedback>
                        <ModalView>
                            <View style={{ marginBottom: 30 }}>
                                <Typography.H2 bold >{'Edit Price & Availability'}</Typography.H2>
                            </View>
                            <View style={{ flex: 0.3, flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Typography.H3 style={{ marginBottom: 10 }}>{`Date:`}</Typography.H3>
                                        <Typography.H3 style={{ marginBottom: 10 }}>{`${moment(+selectedTimeslot).format('DD/MM/yyyy')}`}</Typography.H3>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Typography.H3>{`Time:`}</Typography.H3>
                                        <Typography.H3>{`${moment(+selectedTimeslot).format('hA')}`}</Typography.H3>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flex: 1, justifyContent: 'center' }}>
                                            <Typography.H3 style={{ marginRight: 10 }}>{'Price:'}</Typography.H3>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Counter
                                                result={getPrice(priceType, selectedSpace.price, selectedSpace.peakPrice, selectedSpace.offPeakPrice)}
                                                onMinus={(priceType) => setPriceType(priceType)}
                                                onPlus={(priceType) => setPriceType(priceType)}
                                                min={5}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 0.7 }}>
                                <Typography.H3 bold>{`${unitLabel} Availability`}</Typography.H3>
                                <FlatList
                                    data={bookingData}
                                    keyExtractor={(item, index) => `${item}${index}`}
                                    renderItem={renderBlockSetter}
                                />
                            </View>
                            <Button.BtnContain
                                testID='confirm-button'
                                label="Confirm"
                                color={colors.red}
                                onPress={() => {
                                    data[selectedDate][selectedTimeslot] = [priceType].concat(bookingData);
                                    setDatedEvents(data);
                                    setModalVisible(false);
                                }}
                                style={{ marginTop: 20 }}
                            />
                            <Button.BtnContain
                                testID='cancel-button'
                                label="Cancel"
                                color={colors.red}
                                onPress={() => {
                                    setModalVisible(false);
                                }}
                                style={{ marginTop: 20 }}
                            />
                        </ModalView>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        </View >
    );
};

export default AvailabilityCalendar;

const ModalView = styled.View`
  flex: 1;
  margin-top: ${width * 0.5}px;
  margin-bottom: ${width * 0.5}px;
  background-color: white; /* Use camelCase for backgroundColor */
  width: ${width * 0.9}px;
  border-radius: 10px;
  padding: 20px; /* Slightly reduced padding */
  justify-content: space-between; /* Added space between content */
  shadow-opacity: 0.25;
`;

const Step = styled.View`
margin: 20px 0;
`;

const Flex = styled.View`
align - items: center;
justify - content: space - between;
`;

function getPrice(priceType, price, peakPrice, offPeakPrice) {
    if (!isNaN(priceType)) {
        return priceType;
    }
    switch (priceType) {
        case "r":
            return price;
        case "p":
            return peakPrice;
        case "o":
            return offPeakPrice;
        default:
            console.log("Invalid Price... setting to default regular hour price");
            return price;
    }
}

// function getPriceType(price, regularPrice, peakPrice, offPeakPrice) {
//     if (price === regularPrice) {
//         return "r";
//     } else if (price === peakPrice) {
//         return "p";
//     } else if (price === offPeakPrice) {
//         return "o";
//     } else {
//         console.log("Invalid Price... setting to default regular hour price type");
//         return "r";
//     }
// }