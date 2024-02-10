import React from "react";
import { Text, Platform, PixelRatio } from "react-native";

import styled from "styled-components/native";
import colors from "../config/colors";

const fontScale = PixelRatio.getFontScale();
export const getFontSize = size => size / fontScale * 0.9;

export const headingFontSize = getFontSize(28)
export const heading1FontSize = getFontSize(24)
export const heading2FontSize = getFontSize(22)
export const heading3FontSize = getFontSize(20)
export const heading4FontSize = getFontSize(18)
export const subtitle1FontSize = getFontSize(16)
export const subtitle2FontSize = getFontSize(16)
export const paragraphFontSize = getFontSize(14)
export const paragraphSmallFontSize = getFontSize(13)
export const paragraphBoldFontSize = getFontSize(14)
export const smallParagraphFontSize = getFontSize(14)
export const captionFontSize = getFontSize(12)

export const headingFontSizeIOS = getFontSize(28)
export const heading1FontSizeIOS = getFontSize(24)
export const heading2FontSizeIOS = getFontSize(22)
export const heading3FontSizeIOS = getFontSize(20)
export const heading4FontSizeIOS = getFontSize(18)
export const subtitle1FontSizeIOS = getFontSize(16)
export const subtitle2FontSizeIOS = getFontSize(16)
export const paragraphFontSizeIOS = getFontSize(14)
export const paragraphSmallFontSizeIOS = getFontSize(13)
export const paragraphBoldFontSizeIOS = getFontSize(14)
export const smallParagraphFontSizeIOS = getFontSize(14)
export const captionFontSizeIOS = getFontSize(12)

export const H = ({ children, color, testID }) =>
  <ViewContainer testID={testID}>
    <Container>
      <HeadingMain style={{ color }}>{children}</HeadingMain>
    </Container>
  </ViewContainer>

export const H1 = ({ bold, children, color, testID }) =>
  <ViewContainer testID={testID}>
    <Container>
      <Text style={bold && { fontWeight: "bold" }}>
        <Heading1 style={{ color }}>{children}</Heading1>
      </Text>
    </Container>
  </ViewContainer>

export const H2 = ({ bold, children, colors, testID }) =>
  <ViewContainer testID={testID}>
    <Container>
      <Text style={bold && { fontWeight: "bold" }}>
        <Heading2 style={{ color: colors }}>{children}</Heading2>
      </Text>
    </Container>
  </ViewContainer>

export const H3 = ({ bold, children, color, testID }) =>
  <ViewContainer testID={testID}>
    <Container>
      <Text style={bold && { fontWeight: "bold" }}>
        <Heading3 style={{ color }}>{children}</Heading3>
      </Text>
    </Container>
  </ViewContainer>

export const H4 = ({ bold, children, color, numberOfLines, testID }) =>
  <ViewContainer testID={testID} >
    <Container numberOfLines={numberOfLines}>
      <Text style={bold && { fontWeight: "bold" }}>
        <Heading4 style={{ color }}>{children}</Heading4>
      </Text>
    </Container>
  </ViewContainer >

export const P = ({ bold, children, color, numberOfLines, testID }) =>
  <ViewContainer testID={testID} >
    <Container numberOfLines={numberOfLines}>
      <Text style={bold && { fontWeight: "bold" }}>
        <Paragraph style={{ color }}>{children}</Paragraph>
      </Text>
    </Container>
  </ViewContainer >

export const SP = ({ bold, children, color, testID }) =>
  <ViewContainer testID={testID}>
    <Container>
      <Text style={bold && { fontWeight: "bold" }}>
        <SmallParagraph style={{ color }}>{children}</SmallParagraph>
      </Text>
    </Container>
  </ViewContainer>

//should be colors instead of color - but this ripples down to lots of buttons being black i/o white
export const Sub1 = ({ bold, children, color, selectable, testID }) =>
  <ViewContainer testID={testID} >
    <Container selectable={selectable}>
      <Text style={bold && { fontWeight: "bold" }} >
        <Subtitle1 style={{ color }}>{children}</Subtitle1>
      </Text>
    </Container>
  </ViewContainer >

export const Sub2 = ({ bold, children, color, testID }) =>
  <ViewContainer testID={testID}>
    <Container>
      <Text style={bold && { fontWeight: "bold" }}>
        <Subtitle2 style={{ color }}>{children}</Subtitle2>
      </Text>
    </Container>
  </ViewContainer>

export const Sub3 = ({ bold, children, color, testID }) =>
  <ViewContainer testID={testID}>
    <Container>
      <Text style={bold && { fontWeight: "bold" }}>
        <Subtitle3 style={{ color }}>{children}</Subtitle3>
      </Text>
    </Container>
  </ViewContainer>

export const pS = ({ bold, children, color, testID }) =>
  <ViewContainer testID={testID}>
    <Container>
      <Text style={bold && { fontWeight: "bold" }}>
        <ParagraphSmall style={{ color }}>{children}</ParagraphSmall>
      </Text>
    </Container>
  </ViewContainer>

export const PBold = ({ children, colors, testID }) =>
  <ViewContainer testID={testID}>
    <Container>
      <ParagraphBold style={{ color: colors }}>{children}</ParagraphBold>
    </Container>
  </ViewContainer>

export const Cap = ({ children, color, testID }) =>
  <ViewContainer testID={testID}>
    <Container>
      <Caption style={{ color }}>{children}</Caption>
    </Container>
  </ViewContainer>

const ViewContainer = styled.View``;

const Container = styled.Text`
  ${Platform.select({
  ios: {
    fontFamily: "Avenir",
  },
  android: {
    fontFamily: "Roboto",
  },
})}
`;

const HeadingMain = styled.Text`
  font-size: ${Platform.OS === "ios" ? headingFontSizeIOS + "px" : headingFontSize + "px"};
`;

const Heading1 = styled.Text`
  font-size: ${Platform.OS === "ios" ? heading1FontSizeIOS + "px" : heading1FontSize + "px"};
`;

const Heading2 = styled.Text`
  font-size: ${Platform.OS === "ios" ? heading2FontSizeIOS + "px" : heading2FontSize + "px"};
`;

const Heading3 = styled.Text`
  font-size: ${Platform.OS === "ios" ? heading3FontSizeIOS + "px" : heading3FontSize + "px"};
`;

const Heading4 = styled.Text`
  font-size: ${Platform.OS === "ios" ? heading4FontSizeIOS + "px" : heading4FontSize + "px"};
`;

const Subtitle1 = styled.Text`
  font-size: ${Platform.OS === "ios" ? subtitle1FontSizeIOS + "px" : subtitle1FontSize + "px"};
`;

const Subtitle2 = styled.Text`
  font-size: ${Platform.OS === "ios" ? subtitle2FontSizeIOS + "px" : subtitle2FontSize + "px"};
  font-weight: bold;
`;

const Paragraph = styled.Text`
  font-size: ${Platform.OS === "ios" ? paragraphFontSizeIOS + "px" : paragraphFontSize + "px"};
  line-height: 22px;
`;

const ParagraphSmall = styled.Text`
  font-size: ${Platform.OS === "ios" ? paragraphSmallFontSizeIOS + "px" : paragraphSmallFontSize + "px"};
  line-height: 22px;
`;

const ParagraphBold = styled.Text`
  font-size: ${Platform.OS === "ios" ? paragraphBoldFontSizeIOS + "px" : paragraphBoldFontSize + "px"};
  font-weight: bold;
`;

const SmallParagraph = styled.Text`
  font-size: ${Platform.OS === "ios" ? smallParagraphFontSizeIOS + "px" : smallParagraphFontSize + "px"};
  color: ${colors.darkgray};
  line-height: 18px;
`;

const Caption = styled.Text`
  font-size: ${Platform.OS === "ios" ? captionFontSizeIOS + "px" : captionFontSize + "px"};
`;
