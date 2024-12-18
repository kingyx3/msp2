import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import colors from '../config/colors';
import { auth } from '../components/Firebase/firebaseConfig';
import appsFlyer from 'react-native-appsflyer';

const ReferralScreen = () => {
  const user = auth.currentUser;
  const userId = user.uid;
  // State to hold the referral link
  const [referralLink, setReferralLink] = null // useState(`https://makeshiftplans.com/referrals?r=${userId.substring(4)}`);

  useEffect(() => {
    // set the template ID before you generate a link. Without it UserInvite won't work.
    appsFlyer.setAppInviteOneLinkID(process.env.EXPO_PUBLIC_APPSFLYER_ONELINK_REFERRAL_LINK_ID, null);

    // set the user invite params
    appsFlyer.generateInviteLink(
      {
        channel: 'app',
        campaign: 'in_app_referral',
        customerID: userId,
        userParams: {
          deep_link_value: 'in_app_referral', // deep link param
          deep_link_sub1: userId, // deep link param
          custom_param: 'custom',
          brandDomain: 'makeshiftplans.com'
        },
      },
      (link) => {
        setReferralLink(link);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  // Function to copy referral link to clipboard
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(referralLink);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Invite Your Friends</Text>
      <Text style={styles.description}>
        Share your referral link with your friends and earn rewards when they join!
      </Text>

      {/* Referral Link Section */}
      <View style={styles.referralLinkContainer}>
        <Text style={styles.referralLinkLabel}>My Referral Link:</Text>
        <Text style={styles.referralLink}>{referralLink}</Text>
      </View>

      {/* Copy Link Button */}
      <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
        <Text style={styles.buttonText}>Copy Referral Link</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  referralLinkContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  referralLinkLabel: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  referralLink: {
    color: '#0066cc',
    fontSize: 16,
  },
  copyButton: {
    backgroundColor: colors.red,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ReferralScreen;
