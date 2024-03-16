import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { loginWithEmailLink } from '../../components/Firebase/firebase';
import styled from 'styled-components/native';
import { H, H4, P } from '../../config/Typography';
import { Ionicons } from '@expo/vector-icons';
import { NavBar } from '../../components/NavBar';

const EmailLinkSentScreen = (props) => {
  const [timer, setTimer] = useState(30);
  const [showResend, setShowResend] = useState(false);
  const email = props.route.params

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setShowResend(true);
    }
  }, [timer]);

  const handleResend = async () => {
    // handle resend email link here
    await loginWithEmailLink(email)
    setTimer(30);
    setShowResend(false);
  };

  return (
    <Container>
      <NavBar
        onPress={() => props.navigation.goBack()} />
      <SubContainer>
        <Ionicons name="mail" size={120} color="#4b0082" />
        <H>Login Link Sent</H>
        <H />
        <H4>Please click the login link sent to</H4>
        <H4 bold> {email}.</H4>
        <H4>Do check your spam/junk mailboxes too.</H4>
        <H />
        <InlineText>
          <P>Didn't receive the email?  </P>
          {<Button title="Resend" disabled={!showResend} color={showResend ? 'purple' : 'grey'} onPress={handleResend} />}
        </InlineText>
        {!showResend && <TimerText>{timer} seconds remaining</TimerText>}
      </SubContainer>
    </Container>
  );
};

export default EmailLinkSentScreen;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const SubContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f0f8ff;
`;

const InlineText = styled.View`
  flex-direction: row;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

const TimerText = styled.Text`
  font-size: 16px;
  color: #808080;
`;