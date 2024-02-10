import { initStripe } from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { colors } from '../../config/colors';
import { API_URL } from './config';

interface Props {
  paymentMethod?: string;
}

const PaymentScreen: React.FC<Props> = ({ paymentMethod, children }) => {
  const [loading, setLoading] = useState(true);

  async function fetchPublishableKey(
    paymentMethod?: string
  ): Promise<string | null> {
    let fullUrl = `${API_URL}/stripe-key?paymentMethod=${paymentMethod}` 
    try {
      // const response = await fetch(fullUrl);
      // const { publishableKey } = await response.json();
      // console.log(publishableKey)
      // return publishableKey;
      // console.log(fullUrl)
      return fetch(fullUrl)
      .then((response)=> response.json())
      .then((response)=> response['publishable_key'])
    } catch (e) {
      console.warn('Unable to fetch publishable key. Is your server running?', e);
      Alert.alert(
        'Error',
        'Unable to fetch publishable key. Is your server running?'
      );
      return null;
    }
  }

  useEffect(() => {
    async function initialize() {
      const publishableKey = await fetchPublishableKey(paymentMethod);
      // console.log(publishableKey,'lolol')
      if (publishableKey) {
        await initStripe({
          publishableKey,
          merchantIdentifier: 'merchant.com.stripe.react.native',
          urlScheme: 'stripe-example',
          // setUrlSchemeOnAndroid: true,
        });
        setLoading(false);
      }
    }
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />
  ) : (
    <ScrollView
      accessibilityLabel="payment-screen"
      style={styles.container}
      keyboardShouldPersistTaps="handled">
      {children}
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Text style={{ opacity: 0 }}>appium fix</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
});

export default PaymentScreen;
