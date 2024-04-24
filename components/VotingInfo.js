import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { COLORS } from "@/pages/_app.js";

const theme = {
  colors: COLORS
};

const MainContainer = styled.div`
  font-family: 'Helvetica';
`

const MainHeader = styled.h1`
  color: ${props => props.theme.colors.main};
  text-align: left;
  position: relative;
`;

const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2vw;
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

const Container = styled.div`
  width: 30%;
  padding: 1vw;
  border: .2vw solid ${props => props.theme.colors.feature};
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    transform: scale(1.02);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 20vw;
  background-color: #eee;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 1) 100%), url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const ShortDescription = styled.p`
  color: ${props => props.theme.colors.main};
  padding: 1vw;
  margin-top: 1vw;
`;

const VotingPlatformComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <MainHeader>Voting and Elections</MainHeader>
        <SectionContainer>
          <Container>
            <ImageContainer imageUrl="/secure.jpg"></ImageContainer>
            <LabelContainer>Secure</LabelContainer>
            <ShortDescription>Ensuring the utmost security in the voting process, our platform employs robust encryption protocols and 
            decentralized storage mechanisms. By safeguarding voter data and ballot integrity, we uphold the trust and confidence of participants 
            in the electoral process.
            </ShortDescription>
          </Container>
          <Container>
            <ImageContainer imageUrl="/transparent.jpg"></ImageContainer>
            <LabelContainer>Transparent</LabelContainer>
            <ShortDescription>Transparency lies at the core of our decentralized voting platform. Through immutable blockchain technology, every step
             of the voting journey is recorded and publicly accessible, enabling voters to verify their contributions and ensuring the integrity of 
             election results.
            </ShortDescription>
          </Container>
          <Container>
            <ImageContainer imageUrl="decentralized.jpg"></ImageContainer>
            <LabelContainer>Decentralized</LabelContainer>
            <ShortDescription>Embracing decentralization, our voting platform distributes authority across a network of nodes, eliminating single points of 
            failure and reducing the risk of tampering or manipulation. By empowering individuals with direct control over their votes, we foster a truly 
            democratic voting environment.
            </ShortDescription>
          </Container>
        </SectionContainer>
      </MainContainer>
    </ThemeProvider>
  );
};

export default VotingPlatformComponent;
