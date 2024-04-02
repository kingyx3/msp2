import React from 'react';
import styled from 'styled-components';

const HostingRules = () => {
    return (
        <Container>
            <Title>Hosting Rules</Title>
            <Paragraph>
                We require Hosts to follow our rules in these areas, which help create enjoyable events for users:
            </Paragraph>

            <SubTitle>Reservation commitment</SubTitle>
            <Paragraph>
                Hosts should honor accepted reservations and provide a reliable registration experience.
            </Paragraph>

            <SubTitle>Timely communication</SubTitle>
            <Paragraph>
                Hosts should be available to respond to user inquiries or unexpected issues that may come up before and during stays.
            </Paragraph>

            <SubTitle>Listing accuracy</SubTitle>
            <Paragraph>
                The listing page at the time of booking should accurately describe the space and reflect the features and amenities that will be available at the listing.
            </Paragraph>

            <SubTitle>Reporting a violation</SubTitle>
            <Paragraph>
                MakeShiftPlans encourages guests to promptly report violations of these ground rules. When a user is dealing with a suspected or actual violation of these hosting rules, we ask that they:
                <ul>
                    <li>Communicate with the Host — the Host is in the best position to quickly resolve issues.</li>
                    <li>Document the issue using the MakeShiftPlans message thread, photos, etc.</li>
                    <li>If the Host can't resolve the issue, contact us to report the issue directly or request a refund through the Resolution Center.</li>
                    <li>Leave an honest review with feedback so that the Host can improve for future guests.</li>
                </ul>
            </Paragraph>

            <SubTitle>Holding Hosts to these rules</SubTitle>
            <Paragraph>
                MakeShiftPlans is committed to enforcing these rules. When a rule violation is reported, MakeShiftPlans will attempt to contact the Host to understand what occurred.
            </Paragraph>

            <SubTitle>Appealing violations</SubTitle>
            <Paragraph>
                Hosts may appeal decisions under this policy by contacting customer support or through the link provided to start the appeals process.
            </Paragraph>

            <Paragraph>
                For more details, please refer to the <Link href="/terms-of-service" target="_blank">Terms of Service</Link>.
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

const Link = styled.a`
  text-decoration: underline;
  color: #007bff;
  cursor: pointer;
`;

export default HostingRules;
