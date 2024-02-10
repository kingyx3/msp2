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
options = {
    hour: 'numeric', hour12: true
}
const { width, height } = Dimensions.get('window');
const ITEM_HEIGHT = 93

const AvailabilityCalendar = ({ data, setDatedEvents }) => {
    let sortedData = data ? Object.keys(data).sort((a, b) => new Date(a) - new Date(b)) : null
    const startingDate = moment().format('YYYY-MM-DD')
    const startingIndex = sortedData.findIndex(item => item === startingDate);
    sortedData = sortedData.slice(startingIndex)
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeslot, setSelectedTimeslot] = useState(null)
    const [price, setPrice] = useState(0)
    const [bookingData, setBookingData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const selectedDayData = data[selectedDate] ? Object.entries(data[selectedDate]).sort((a, b) => a[0] - b[0]) : null

    useEffect(() => {
        setSelectedDate(startingDate)
    }, [])

    const handleTimeslotPress = (item) => {
        const timeSlot = item[0]
        const [price, ...availability] = item[1];
        setSelectedTimeslot(timeSlot);
        setPrice(price)
        setModalVisible(true);
        setBookingData([...availability])
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
                onPress={() => setSelectedDate(isSelected ? null : item)}
            >
                <Typography.P color={isSelected ? 'white' : 'black'} >{`${moment(item).format("DD/MM/YY")}`}</Typography.P>
                <Typography.P color={isSelected ? 'white' : 'black'} >{`${moment(item).format("(dddd)")}`}</Typography.P>
            </TouchableOpacity>
        );
    };

    const renderTimeslotItem = ({ item }) => {
        const timeSlot = item[0]
        const [price, ...availability] = item[1];
        const totalAvailable = [...availability].length
        const available = [...availability].filter(item => item === '').length;
        const blocked = [...availability].filter(item => item === 'blocked').length;
        const booked = totalAvailable - available - blocked

        return (
            <TouchableOpacity
                testID="timeslot-item"
                style={{ flex: 1, borderWidth: 1, borderColor: 'gray', padding: 10, margin: 5, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => handleTimeslotPress(item)}
            >
                <Text>{`${moment(+timeSlot).format('hA')} - $${price}`}</Text>
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
                    <Typography.H3 color={item == "" ? 'green' : item == "blocked" ? 'red' : 'black'}>{`Court ${index + 1}. ${toggleText}`}</Typography.H3>
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
                                <Typography.H1 bold >{'Edit Price & Availability'}</Typography.H1>
                            </View>
                            <View style={{ flex: 0.3, flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Typography.H2 style={{ marginBottom: 10 }}>{`Date:`}</Typography.H2>
                                        <Typography.H2 style={{ marginBottom: 10 }}>{`${moment(+selectedTimeslot).format('DD/MM/yyyy')}`}</Typography.H2>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Typography.H2>{`Time:`}</Typography.H2>
                                        <Typography.H2>{`${moment(+selectedTimeslot).format('hA')}`}</Typography.H2>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flex: 1, justifyContent: 'center' }}>
                                            <Typography.H2 style={{ marginRight: 10 }}>{'Price:'}</Typography.H2>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Counter result={price} onMinus={(newPrice) => setPrice(newPrice)} onPlus={(newPrice) => setPrice(newPrice)} max={100} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 0.7 }}>
                                <Typography.H2 bold>{'Court Availability'}</Typography.H2>
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
                                    data[selectedDate][selectedTimeslot] = [+price].concat(bookingData);
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