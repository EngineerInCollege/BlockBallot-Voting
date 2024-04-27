import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { COLORS } from "@/pages/_app.js";
import { useRouter } from "next/router"

/*
This component is a guide for users on how to vote in the system. It presents information on the
voting process and prompts users to sign in with their public key in order to vote securely.
*/

const theme = {
  colors: COLORS
};

const MainContainer = styled.div`
  font-family: 'Helvetica';
  padding-bottom: 5vw;
`

const MainHeader = styled.h1`
  color: ${props => props.theme.colors.main};
  text-align: left;
`;

const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2vw;
`;

const Container = styled.div`
  width: 100%;
  padding: 1vw;
  border: .2vw solid ${props => props.theme.colors.feature};
  
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 20vw;
  background-color: #eee;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 1) 100%), url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const LabelContainer = styled.div`
  position: absolute;
  margin-top: -1vw;
  margin-left: 1vw;
  font-size: 1.5vw;
  padding-bottom: 1vw;
  color: ${props => props.theme.colors.main};
  font-weight: bold;
`;

const ShortDescription = styled.p`
  color: ${props => props.theme.colors.main};
  padding: 1vw;
  margin-top: 1vw;
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors.main};
  color: white;
  padding: 0.5vw 1vw;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 0.5vw;
  margin-left: 1vw;

  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    &:hover {
    transform: scale(1.05);
    }
`;

  const LoginToVote = () => {
  const router = useRouter();

  function goToWantedPage(string) {
    router.push("login");
  }

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <MainHeader>How To Vote</MainHeader>
        <SectionContainer>
          <Container>
            <ImageContainer imageUrl="/publickey.jpg"></ImageContainer>
            <LabelContainer>Sign in with your public key to vote</LabelContainer>
            <ShortDescription>In order to vote, you need to sign in using your public key. Your public key ensures the security and integrity of your vote, protecting it from unauthorized access.
            </ShortDescription>
            <Button onClick={goToWantedPage}>Go to Login</Button> {/* Button to navigate to the login page */}
          </Container>
        </SectionContainer>
      </MainContainer>
    </ThemeProvider>
  );
};

export default LoginToVote;
