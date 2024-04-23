import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { COLORS } from "@/pages/_app.js";

const theme = {
  colors: COLORS
};

const MainContainer = styled.div`
  font-family: 'Helvetica';
  padding: 3vw 4vw;
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
  height: 15vw;
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

  const Private = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <MainHeader>Log In</MainHeader>
        <SectionContainer>
          <Container>
            <ImageContainer imageUrl="/password.jpg"></ImageContainer>
            <LabelContainer>Never share your private key</LabelContainer>
            <ShortDescription>It's essential to keep your private key secure. Do not share it with anyone.
            </ShortDescription>
          </Container>
        </SectionContainer>
      </MainContainer>
    </ThemeProvider>
  );
};

export default Private;
