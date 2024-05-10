import React, { useState, useEffect } from "react";
import { Text, View, Alert } from "react-native";
import StarRating from 'react-native-star-rating-widget';

// import components
import { DefaultInput } from "../components/forms/AppInput";
import { createReview } from "../components/Firebase/firebase";

//import styles and assets
import styled from "styled-components/native";
import { H, Sub1, P } from "../config/Typography";
import colors from "../config/colors";
import * as Button from "../components/Button";
import { NavBar } from "../components/NavBar";

const ReviewInput = (props) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  // const [count, setCount] = useState(0)
  const { selectedSpace } = props.route.params
  const maxReview = 500

  // Need to check if user has a previous review for this space
  // useEffect(() => { // used to set initial value to state
  //   if (selectedSpace && !count) {
  //     setReview(selectedSpace.review)
  //     setCount(1)
  //   }
  // }, [count, selectedSpace])

  const calcLengthReview = () => {
    return maxReview - review.length;
  };

  const onNavigate = () => {
    setLoading(true)
    createReview(selectedSpace.id, review, rating)
      .then(() => {
        Alert.alert("Review submitted!", "Success", [
          {
            text: "OK", onPress: () => {
              setLoading(false)
              props.navigation.goBack()
            }
          },
        ]);
      })
    // console.log(selectedSpace)
    // console.log(review, rating)
  };

  return (
    <Container>
      <NavBar nav="chevron-left" onPress={() => props.navigation.goBack()} />
      <Main testID="review-input-scroll-view" >
        <Step>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <H>Review</H>
            <StarRating
              // disabled={false}
              maxStars={5}
              rating={rating}
              onChange={setRating}
            // selectedStar={(rating) => setRating(rating)}
            // fullStarColor={'red'}
            />
          </View>
          <DefaultInput
            testID="review-input"
            name="Review"
            value={review}
            onChangeText={(text) => setReview(text)}
            maxLength={maxReview}
            multiline={true}
            editable={!loading}
          />
          <Remaining>
            <P color={colors.gray}>{calcLengthReview()}/{maxReview}</P>
          </Remaining>
        </Step>
      </Main>
      <Next>
        <Left></Left>
        <BtnContainer>
          <Button.BtnContain
            testID={"submit-button"}
            label="Submit"
            color={loading ? colors.lightgray : colors.red}
            size="small"
            disabled={loading}
            onPress={() => onNavigate()}
          />
        </BtnContainer>
      </Next>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Main = styled.ScrollView`
  flex: 1;
  padding: 24px;
`;

const Step = styled.View`
  margin: 20px 0;
`;

const Next = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${colors.faintgray};
  background-color: white;
`;

const Left = styled.View``;

const BtnContainer = styled.View`
  width: 30%;
`;

const Remaining = styled.View`
  margin-top: 15px;
`;

export default ReviewInput
