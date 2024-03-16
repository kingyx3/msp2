import React from 'react';
import styled from 'styled-components';

const TermsOfService = () => {
    return (
        <Container>
            <Title>Terms of Service</Title>
            <Paragraph>
                Welcome to {process.env.REACT_APP_NAME}, a platform connecting hosts and users seeking to rent spaces on an hourly basis.
                These Terms of Service govern your use of our website and services, so please read them carefully. By accessing or using our platform, you agree to be bound by these Terms of Service.
            </Paragraph>
            <Heading>1. Overview</Heading>
            <Paragraph>
                {process.env.REACT_APP_NAME} provides an online platform that connects hosts who have spaces available for rent on an hourly basis with users seeking to rent such spaces ("Services"). These Terms of Service, along with our Privacy Policy, constitute a legally binding agreement between you and {process.env.REACT_APP_NAME} regarding your use of the Services.
            </Paragraph>
            <Heading>2. User Eligibility</Heading>
            <Paragraph>
                To use our Services, you must be at least 18 years old and capable of entering into a legally binding agreement. By using our platform, you represent and warrant that you meet these eligibility requirements and that you have the legal authority to enter into these Terms of Service.
            </Paragraph>
            <Heading>3. User Responsibilities</Heading>
            <Paragraph>
                As a user of our platform, you agree to:
            </Paragraph>
            <ul>
                <li>Provide accurate and truthful information when creating an account and using our Services.</li>
                <li>Use the platform solely for lawful purposes and in compliance with these Terms of Service and all applicable laws and regulations.</li>
                <li>Respect the terms and conditions set by hosts when renting their spaces.</li>
                <li>Pay all fees and charges associated with your use of the Services in a timely manner.</li>
                <li>Maintain the confidentiality of your account credentials and not share them with any third parties.</li>
            </ul>
            <Heading>4. Host Responsibilities</Heading>
            <Paragraph>
                As a host using our platform, you agree to:
            </Paragraph>
            <ul>
                <li>Provide accurate and detailed information about the spaces you are offering for rent, including availability, pricing, and any specific terms or conditions.</li>
                <li>Ensure that the spaces you list on our platform comply with all applicable laws and regulations, including zoning and safety requirements.</li>
                <li>Respond promptly to inquiries and booking requests from users.</li>
                <li>Maintain the cleanliness and safety of the spaces you rent out.</li>
                <li>Collect and remit any applicable taxes on rental income in accordance with local laws.</li>
            </ul>
            <Heading>5. Booking and Payment</Heading>
            <Paragraph>
                Users can search for available spaces on our platform and submit booking requests to hosts.
                Hosts have the discretion to accept or decline booking requests based on availability and other factors.
                Users must provide valid payment information at the time of booking. Payment processing is handled securely through our platform.
                Once a booking is confirmed, users are responsible for paying the agreed-upon rental fee and any additional charges specified by the host.
            </Paragraph>
            <Heading>6. Cancellations and Refunds</Heading>
            <Paragraph>
                Hosts may have their own cancellation policies, which will be clearly communicated to users at the time of booking.
                Users may be entitled to a refund in accordance with the host's cancellation policy and our platform's refund procedures.
                {process.env.REACT_APP_NAME} reserves the right to withhold refunds or charge cancellation fees in certain circumstances, such as fraudulent activity or violations of these Terms of Service.
            </Paragraph>
            <Heading>7. Prohibited Activities</Heading>
            <Paragraph>
                You agree not to engage in any of the following prohibited activities:
            </Paragraph>
            <ul>
                <li>Violating any laws or regulations in connection with your use of the Services.</li>
                <li>Using the platform for any fraudulent or unlawful purpose.</li>
                <li>Interfering with the proper functioning of our platform or attempting to circumvent any security measures.</li>
                <li>Harassing, threatening, or otherwise harming other users or hosts.</li>
                <li>Posting any false, misleading, or defamatory information on our platform.</li>
                <li>Infringing upon the intellectual property rights of {process.env.REACT_APP_NAME} or any third party.</li>
            </ul>
            <Heading>8. Intellectual Property</Heading>
            <Paragraph>
                All content and materials on our platform, including but not limited to text, graphics, logos, images, and software, are owned by {process.env.REACT_APP_NAME} or its licensors and are protected by copyright and other intellectual property laws. You agree not to reproduce, distribute, or modify any such content without our prior written consent.
            </Paragraph>
            <Heading>9. Limitation of Liability</Heading>
            <Paragraph>
                To the fullest extent permitted by law, {process.env.REACT_APP_NAME} shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with your use of the Services, including but not limited to damages for loss of profits, goodwill, use, or data.
            </Paragraph>
            <Heading>10. Indemnification</Heading>
            <Paragraph>
                You agree to indemnify and hold {process.env.REACT_APP_NAME} and its officers, directors, employees, and agents harmless from any claims, liabilities, damages, losses, or expenses, including reasonable attorneys' fees, arising out of or in any way related to your use of the Services or violation of these Terms of Service.
            </Paragraph>
            <Heading>11. Modifications to Terms of Service</Heading>
            <Paragraph>
                {process.env.REACT_APP_NAME} reserves the right to modify or update these Terms of Service at any time, with or without prior notice. Any changes to these Terms of Service will be effective immediately upon posting on our platform. Your continued use of the Services after the posting of any revised Terms of Service constitutes your acceptance of such changes.
            </Paragraph>
            <Heading>12. Termination</Heading>
            <Paragraph>
                We reserve the right to suspend or terminate your access to the Services at any time, for any reason, without prior notice or liability. Upon termination, you must cease all use of the platform and delete any content or materials obtained from the platform.
            </Paragraph>
            <Heading>13. Governing Law</Heading>
            <Paragraph>
                These Terms of Service shall be governed by and construed in accordance with the laws of Singapore, without regard to its conflict of law principles.
            </Paragraph>
            <Heading>14. Contact Information</Heading>
            <Paragraph>
                If you have any questions or concerns about these Terms of Service, please contact us at <Link href={"mailto:" + process.env.REACT_APP_SUPPORT_EMAIL}>{process.env.REACT_APP_SUPPORT_EMAIL}</Link>.
            </Paragraph>
            <Paragraph>
                By using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these Terms of Service, you may not use our platform.
            </Paragraph>
        </Container>
    );
};

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Heading = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const Paragraph = styled.p`
  margin-bottom: 10px;
`;

const Link = styled.a`
  color: blue;
  text-decoration: underline;
`;

export default TermsOfService;