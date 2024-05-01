import React from 'react';
import styled from 'styled-components';
import { envVars } from '../../envConfig';

const HostCancellationPolicy = () => {
  return (
    <Container>
      <Title>Host Cancellation Policy</Title>
      <Paragraph>
        <strong>Effective Date:</strong> 1 January 2024
      </Paragraph>
      <Paragraph>
        At {envVars.REACT_APP_NAME}, we understand that cancellations can disrupt plans and affect user trust. To address this, if a host cancels a confirmed booking or is found responsible for a cancellation under this policy, {envVars.REACT_APP_NAME} may impose fees and other consequences. These are designed to reflect the costs and other impacts of cancellations on users, the broader host community, and the platform.
      </Paragraph>

      <SubTitle>Cancellation Fees</SubTitle>
      <Paragraph>
        If a Host cancels a confirmed reservation or is found responsible for a cancellation under this Policy, we will impose fees subject to a minimum cancellation fee of $20 SGD. The fee is based on the reservation amount and when the reservation is canceled:
        <ul>
          <li>If the reservation is canceled 48 hours or less before check-in, or after check-in, the fee is 50% of the reservation amount for the hours not used.</li>
          <li>If the reservation is canceled anytime between 48 hours and 30 days before check-in, the fee is 25% of the reservation amount.</li>
          <li>If the reservation is canceled more than 30 days before check-in, the fee is 10% of the reservation amount.</li>
        </ul>
      </Paragraph>

      <SubTitle>Fee Handling</SubTitle>
      <Paragraph>
        Cancellation fees are typically withheld from the next payout(s) to the Host as provided in the Payments Terms of Service. In addition to the fees and consequences set out in this Policy, Hosts who cancel, or are found responsible for a cancellation, will not receive a payout for the canceled reservation, or, if the payout has already been made, then the amount of the payout will be withheld from the next payout(s).
      </Paragraph>

      <SubTitle>Waiver Conditions</SubTitle>
      <Paragraph>
        We will waive the fees set out in this Policy in appropriate situations, for example, if the Host cancels because of Extenuating Circumstances or certain valid reasons beyond the Host’s control. Hosts who believe one of these situations applies will be required to provide documentation or other support. We will determine whether to waive any fees and other consequences after evaluating the available evidence.
      </Paragraph>

      <SubTitle>Other Consequences</SubTitle>
      <Paragraph>
        In addition to a cancellation fee, other consequences may apply, such as preventing the Host from accepting another reservation for the Listing on the affected dates by blocking the Listing’s calendar. Hosts who cancel confirmed bookings without a valid reason may experience other consequences, as explained in our Terms of Service and Hosting rules. For example, Hosts may have their Listing or account suspended or removed.
      </Paragraph>

      <SubTitle>Host Responsibility</SubTitle>
      <Paragraph>
        If a Host cannot honor a reservation—regardless of the reason—it’s their responsibility to cancel in a timely manner to allow their guest time to adjust their plans. A Host may not encourage the guest to cancel the reservation. Providing false statements or materials in connection with this Policy violates our Terms of Service and may result in account termination and other consequences.
      </Paragraph>

      <SubTitle>Policy Scope</SubTitle>
      <Paragraph>
        This Policy applies to cancellations that occur on or after the effective date. Any right that guests or Hosts may have to initiate legal action remains unaffected. Any changes to this Policy will be made in accordance with our Terms of Service.
      </Paragraph>

      <Paragraph>
        By continuing to use {envVars.REACT_APP_NAME}, hosts agree to abide by this cancellation policy and all associated terms and conditions.
      </Paragraph>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  margin-bottom: 15px;
`;

export default HostCancellationPolicy;
