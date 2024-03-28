import React from 'react';
import styled from 'styled-components';

const cancellationPolicies = [
  { label: 'Super Flex', numberOfHours: 72 },
  { label: 'Flex', numberOfHours: 48 },
  { label: 'Medium', numberOfHours: 24 },
  { label: 'Strict', numberOfHours: 12 },
  { label: 'Super Strict', numberOfHours: 0 }
];

const CancellationPolicy = () => {
  return (
    <CancellationPolicyContainer>
      <Title>Cancellation Policy</Title>
      <PolicyList>
        {cancellationPolicies.map(policy => (
          <PolicyItem key={policy.label}>
            <PolicyLabel>{policy.label}</PolicyLabel>
            <PolicyDetails>
              {policy.numberOfHours === 0 ? (
                <span>No free cancellation allowed</span>
              ) : (
                <span>Free cancel up to {policy.numberOfHours} hours prior to booking start</span>
              )}
            </PolicyDetails>
          </PolicyItem>
        ))}
      </PolicyList>
    </CancellationPolicyContainer>
  );
};

const CancellationPolicyContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

const PolicyList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PolicyItem = styled.li`
  margin-bottom: 20px;
`;

const PolicyLabel = styled.strong`
  color: #555;
  font-size: 18px;
`;

const PolicyDetails = styled.div`
  color: #666;
  font-size: 16px;
  margin-top: 5px;
`;

export default CancellationPolicy;
