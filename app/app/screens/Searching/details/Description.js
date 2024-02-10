import React from "react";
import { View, Text, ScrollView } from "react-native";

//import styles and assets
import styled from "styled-components/native";
import * as Typography from "../../../config/Typography";

const Description = (props) => {
  const description = props.route.params
  return (
    <Container>
      <ScrollView>
        <Typography.H1>Description</Typography.H1>
        <Spacing />
        <Typography.P>
          {description}
        </Typography.P>
        {/*
        <Spacing />
        <Typography.P>
          Located in the western part of Jeju, a quiet and Jeju-like stone wall space,
          A small hotel in front of Gwideok-ri Beach where you can see the sea
          Accommodation. It is a 30-minute drive from Jeju Airport and an 8-minute walk
          There is a bus stop on the street and a convenience store is a 10-minute walk away.
        </Typography.P>
        */}
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 20px;
`;

const Spacing = styled.View`
  padding: 10px 0;
`;

export default Description;
