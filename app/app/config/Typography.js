import React from "react";
import { Text, Platform, PixelRatio } from "react-native";
import styled from "styled-components/native";
import colors from "../config/colors";

const fontScale = PixelRatio.getFontScale();
export const getFontSize = size => (size / fontScale) * 0.9;

const fontSizes = {
  heading: getFontSize(28),
  heading1: getFontSize(24),
  heading2: getFontSize(22),
  heading3: getFontSize(20),
  heading4: getFontSize(18),
  subtitle1: getFontSize(16),
  subtitle2: getFontSize(16),
  paragraph: getFontSize(14),
  paragraphSmall: getFontSize(13),
  paragraphBold: getFontSize(14),
  smallParagraph: getFontSize(14),
  caption: getFontSize(12),
};

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

const styledText = (Component, fontSize, extraStyles = {}) => styled(Component)`
  font-size: ${fontSize + "px"};
  ${extraStyles}
`;

const HeadingMain = styledText(Text, fontSizes.heading);
const Heading1 = styledText(Text, fontSizes.heading1);
const Heading2 = styledText(Text, fontSizes.heading2);
const Heading3 = styledText(Text, fontSizes.heading3);
const Heading4 = styledText(Text, fontSizes.heading4);
const Subtitle1 = styledText(Text, fontSizes.subtitle1);
const Subtitle2 = styledText(Text, fontSizes.subtitle2, "font-weight: bold;");
const Paragraph = styledText(Text, fontSizes.paragraph, "line-height: 22px;");
const ParagraphSmall = styledText(Text, fontSizes.paragraphSmall, "line-height: 22px;");
const ParagraphBold = styledText(Text, fontSizes.paragraphBold, "font-weight: bold;");
const SmallParagraph = styledText(Text, fontSizes.smallParagraph, `color: ${colors.darkgray}; line-height: 18px;`);
const Caption = styledText(Text, fontSizes.caption);

const Typography = ({ Component, bold, children, color, numberOfLines, testID, selectable }) => (
  <ViewContainer testID={testID}>
    <Container numberOfLines={numberOfLines} selectable={selectable}>
      <Text style={bold ? { fontWeight: "bold" } : null}>
        <Component style={{ color }}>{children}</Component>
      </Text>
    </Container>
  </ViewContainer>
);

export const H = props => <Typography Component={HeadingMain} {...props} />;
export const H1 = props => <Typography Component={Heading1} {...props} />;
export const H2 = props => <Typography Component={Heading2} {...props} />;
export const H3 = props => <Typography Component={Heading3} {...props} />;
export const H4 = props => <Typography Component={Heading4} {...props} />;
export const P = props => <Typography Component={Paragraph} {...props} />;
export const SP = props => <Typography Component={SmallParagraph} {...props} />;
export const Sub1 = props => <Typography Component={Subtitle1} {...props} />;
export const Sub2 = props => <Typography Component={Subtitle2} {...props} />;
export const Sub3 = props => <Typography Component={Subtitle3} {...props} />;
export const pS = props => <Typography Component={ParagraphSmall} {...props} />;
export const PBold = props => <Typography Component={ParagraphBold} {...props} />;
export const Cap = props => <Typography Component={Caption} {...props} />;