import Head from "next/head";
import { Inter } from "next/font/google";
import styled, { ThemeProvider } from 'styled-components';
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import VotingInfo from "@/components/VotingInfo";
import { COLORS } from "@/pages/_app.js";
import LoginToVote from "@/components/LoginToVote";
import Footer from "@/components/Footer";

const theme = {
  colors: COLORS
};

const inter = Inter({ subsets: ["latin"] });

const ParentContainer = styled.div`
  padding-top: 5vw;
  font-family: 'Helvetica';
`
const Divider = styled.div`
  width: 85%;
  height: .15vw;
  background-color: ${props => props.theme.colors.main};
  margin: 0 auto;
  margin-top: 3vw;
  margin-bottom: 3vw;
`;

const BackgroundImage = styled.div`
  position: relative;
  height: 20vw;
  background-image: url("/frontpageimage.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2vw;
`;

const OverlayText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.5vw;
  text-align: center;
`;

const InfoContainer = styled.div`
  padding-left: 10vw;
  padding-right: 10vw;
`

export default function Home() {

  return (
    <>
      <Head>
        <title>BlockBallot</title>
        <meta name="description" content="Decentralized voting" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
      <Navbar/>
      <ParentContainer>
      <BackgroundImage>
          <OverlayText>
            Empowering Democracy, One Block at a Time.
          </OverlayText>
      </BackgroundImage>
      <InfoContainer>
      <Divider/>
      <VotingInfo/>
      <Divider/>
      <LoginToVote/>
      </InfoContainer>
      <Footer/>
      </ParentContainer>
      </ThemeProvider>
    </>
  );
}
