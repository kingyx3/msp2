import React from 'react';
import styled from 'styled-components';
import { getCancellationPolicies } from '../../components/Firebase/firebase';

const CancellationPolicy = () => {
  const [cancellationPolicies, setCancellationPolicies] = useState([])
  const cancellationPoliciesSorted = cancellationPolicies.sort((a, b) => a.numberOfHours - b.numberOfHours)
  useEffect(() => {
    getCancellationPolicies(setCancellationPolicies)
  }, [])

  return (
    <CancellationPolicyContainer>
      <Title>Cancellation Policy</Title>
      <PolicyList>
        {cancellationPoliciesSorted.map(policy => (
          <PolicyItem key={policy.label}>
            <PolicyLabel>{policy.label}</PolicyLabel>
            <PolicyDetails>
              {policy.numberOfHours === 0 ? (
                <span>Free cancellation before booking starts</span>
              ) : (
                <span>Free cancellation up to {policy.numberOfHours} hours before booking starts</span>
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
