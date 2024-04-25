import styled, { ThemeProvider } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { COLORS } from "@/pages/_app.js";
import Private from "@/components/Private";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router"
import Head from 'next/head';
import { ethers } from "ethers";
import { useSigner, ConnectWallet, ConnectEmbed } from "@thirdweb-dev/react";
import { BLOCK_BALLOT_CONTRACT_ADDRESS } from '@/pages/_app.js';
import blockballotABI from "@/Contract/blockballot.json";
import { lightTheme } from "@thirdweb-dev/react";

const theme = {
    colors: COLORS
  };
  
const Divider = styled.div`
    width: 85%;
    height: .15vw;
    background-color: ${props => props.theme.colors.main};
    margin: 0 auto;
    margin-top: 2vw;
    margin-bottom: 2vw;
`;

const MainContainer = styled.div`
  padding-bottom: 15vw;
  font-family: 'Helvetica';
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.colors.background};
`;

const PrivateAndLoginContainer = styled.div`
  margin-top: 6%;
  background-color: white;
  box-shadow: 0 1vw 2vw rgba(0, 0, 0, 0.1);
  padding: 1vw;
  padding-bottom: 5vw;
`

const LoginContainer = styled.div`
  margin-top: 3vw;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
`;

const LoginLabel = styled.h2`
  color: ${props => props.theme.colors.main};
  padding-left: 5vw;
  padding-top: 3vw;
`

const InputContainer = styled.div`
  display: flex;
  flex: 1;
  width: 75%;
  gap: 1vw;
`

const LoginInput = styled.input`
  flex: 1;
  padding: 1vw;
  margin-bottom: 2vw;
  border-radius: 1vw;
  border: 0.1vw solid ${props => props.theme.colors.main};

  &:focus {
    border-color: gray;
    outline: none;
  }
`;

const ShowHideButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 1.5vw;

  img {
    width: 3vw;
    height: 3vw;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  padding: 2vw;
`

const LoginButton = styled.button`
  padding: 1vw 2vw;
  background-color: ${props => props.theme.colors.feature};
  color: #fff;
  border: none;
  border-radius: 1vw;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  overflow:hidden;

  &:hover {
    background-color: ${props => props.theme.colors.main};
  }

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: -1;
    transition: width 0.3s ease-out;
  }

  &:hover::after {
    width: 0;
  }
`;

const ConnectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2vw;
  flex-direction: column;
  gap: 1vw;
`

const customTheme = lightTheme({
  fontFamily: "Helvetica",
  colors: {
    modalBg: "white",
  },
});

const LoginPage = () => {
  const router = useRouter();
  const signer = useSigner();
  const [admin, setAdmin] = useState(false);

  const handleRouting = (location) => {
        if (location === "admin") {router.push('admin');}
        else if (location === "voting") {router.push('voting');}
      };

  useEffect(() => {    
    const checkIfAdmin = async () => {
      if(!signer) {return};
      const contract = new ethers.Contract(BLOCK_BALLOT_CONTRACT_ADDRESS, blockballotABI, signer);
      const isAdmin = await contract.giveAdmin();
      if (isAdmin) {setAdmin(true)};
    };
    checkIfAdmin();
  }, [signer]);

  return (
    <>
    <Head>
      <title>BlockBallot - Login Page</title>
      <meta name="description" content="Login page" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ThemeProvider theme={theme}>
    <Navbar/>
    <MainContainer>
      <PrivateAndLoginContainer>
        <Private />
        <Divider />
        <LoginLabel>Please connect to your wallet below</LoginLabel>
        <ConnectContainer>
         <ConnectWallet theme={customTheme}/>
        {admin && <LoginButton onClick={() => handleRouting("admin")}>Admin page</LoginButton>}
        {signer && <LoginButton onClick={() => handleRouting("voting")}>Go vote</LoginButton>}
        </ConnectContainer>
      </PrivateAndLoginContainer>
    </MainContainer>
    <Footer />
    </ThemeProvider>
    </>
  );
};

export default LoginPage;
