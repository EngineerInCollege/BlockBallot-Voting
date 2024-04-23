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
  margin-top: 5vw;
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

const MainContent = styled.div`
  flex: 1;
  padding: 1vw;
`;

export default function Home() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // Listen for authentication state changes
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       // User is signed in
  //       setUser(user);
  //     } else {
  //       // No user is signed in
  //       setUser(null);
  //     }
  //   });

  //   // Cleanup function to unsubscribe from the listener when the component unmounts
  //   return () => unsubscribe();
  // }, []); // Run only once when the component mounts

  return (
    <>
      <Head>
        <title>BlockBallot</title>
        <meta name="description" content="Decentralized voting" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
      <Navbar user={user} setUser={setUser}/>
      <ParentContainer>
      <BackgroundImage>
          <OverlayText>
            Empowering Democracy, One Block at a Time.
          </OverlayText>
      </BackgroundImage>
      <Divider></Divider>
      <VotingInfo></VotingInfo>
      <Divider></Divider>
      <LoginToVote></LoginToVote>
      <Footer></Footer>
      </ParentContainer>
      </ThemeProvider>
    </>
  );
}
