import React from 'react';
import styled from 'styled-components';
import { useRouter } from "next/router";

/* This is the footer component for the website. It includes sections for the logo, contact
* info, sign-up, and navigation links to destinations and interests. Each section is styled
* seperately for control over styling.
*/

const FooterContainer = styled.footer`
  font-family: 'Helvetica';
  background-color: ${props => props.theme.colors.black};
  font-size: 1vw;
  padding: 4vw;
  display: flex;
`;

const MainContainer = styled.div`
  flex: 1;
`;

const Logo = styled.p`
  font-size: 1.5vw;
  color: white;
  cursor: pointer;
  span {
    font-weight: bold;
    color: white;
  }
`;

const Contact = styled.div`
  color: white;
`;

const ContactUs = styled.p`
  padding-top: 2vw;
  font-size: 1.5vw;
  color: white;
`;

const ContactInfoList = styled.ul`
  padding-top: .5vw;
`;

const ContactInfo = styled.div`
  padding-top: .5vw;
  padding-left: 2vw;
  display: flex;
  flex-direction: column;
  span {
    color: white;
  }
`;

const Links = styled.a`
  color: ${props => props.theme.colors.feature};
`;

const Footer = () => {
  const router = useRouter();

  function goToWantedPage(string) {
    router.push(`${string}`);
  }

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      localStorage.setItem('user', JSON.stringify(result.user)); // Save user data to local storage
        
      const { uid, displayName, email } = result.user;
      writeUserData(uid, displayName, email);
      
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };  

  return (
    <FooterContainer>
      <MainContainer>
        <Logo onClick={() => goToWantedPage("/")}><span>Block</span>Ballot</Logo>
        <Contact>
          <ContactUs>Contact us</ContactUs>
          Questions about voting?
          <ContactInfoList>
            <ContactInfo>
              <span>Call us at <Links href="tel:+1234567890">+1 123 456 7890</Links></span>
            </ContactInfo>
            <ContactInfo>
              <span>Send us a <Links href="mailto:example@example.com">message</Links></span>
            </ContactInfo>
          </ContactInfoList>
        </Contact>
      </MainContainer>
    </FooterContainer>
  );
};

export default Footer;
