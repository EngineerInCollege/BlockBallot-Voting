import styled, { ThemeProvider } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { COLORS } from "@/pages/_app.js";
import Private from "@/components/Private";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router"
import Head from 'next/head';
import { createThirdwebClient } from "thirdweb";
import { ethers } from "ethers";
import { useSigner, useAddress } from "@thirdweb-dev/react";
import { BLOCK_BALLOT_CONTRACT_ADDRESS } from '@/pages/_app.js';
import blockballotABI from "@/Contract/blockballot.json";
import {
  ThirdwebProvider,
  ConnectButton,
} from "thirdweb/react";
import {
  createWallet,
  walletConnect,
  inAppWallet,
} from "thirdweb/wallets";

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
  padding-bottom: 10vw;
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
  padding: 1vw 3vw;
  background-color: ${props => props.theme.colors.feature};
  color: #fff;
  border: none;
  border-radius: 1vw;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: ${props => props.theme.colors.main};
    transform: translateY(-2px);
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

// const Login = () => {
//   const [publicKey, setPublicKey] = useState('');
//   const [showKey, setShowKey] = useState(false);
//   const [error, setError] = useState(false);

//   const router = useRouter();

//   const handlePublicKeyChange = (event) => {
//     setPublicKey(event.target.value);
//   };

//   const handleShowKeyToggle = () => {
//     setShowKey(!showKey);
//   };

//   const handleLogin = () => {
//     // Validation logic goes here
//     if (publicKey.length === 0) {
//       setError(true);
//       return;
//     }

//     // Mock validation for demonstration
//     if (publicKey === '123') {
//       router.push('voting');
//     } else if (publicKey === 'admin') { //Hard-coded for now
//       router.push('admin');
//     } else {
//       setError(true);
//       setPublicKey('');
//     }
//   };

//   return (
//     <>
//     <LoginContainer>
//       <InputContainer>
//       <LoginInput
//         type={showKey ? 'text' : 'password'}
//         value={publicKey}
//         onChange={handlePublicKeyChange}
//         placeholder="0x"
//       />
//       <ShowHideButton onClick={handleShowKeyToggle}>
//         {showKey ? <img src="/hide-password.png" alt="Hide password" /> : <img src="/show-password.png" alt="Show password" />}
//       </ShowHideButton>
//       <br />
//       </InputContainer>
//       {error && <ErrorMessage>Invalid public key. Please try again.</ErrorMessage>}
//       <LoginButton onClick={handleLogin}>Login</LoginButton>
//     </LoginContainer>
//     </>
//   );
// };

const client = createThirdwebClient({
  clientId: "46279898771d4e37ac4001efde13bd0f",
})

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
];

const LoginPage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const signer = useSigner();
  const [admin, setAdmin] = useState(false);
  const address = useAddress();

  useEffect(() => {    
    console.log(signer);
    console.log(address);
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

    <ThirdwebProvider>
    <ThemeProvider theme={theme}>
    <Navbar user={user} setUser={setUser}/>
    <MainContainer>
      <PrivateAndLoginContainer>
        <Private />
        <Divider />
        <LoginLabel>Please enter your public key below</LoginLabel>
        <ConnectButton
          client={client}
          wallets={wallets}
          theme={"light"}
          connectModal={{ size: "wide" }}
        />
        {admin && <LoginButton>Go to admin page</LoginButton>}
      </PrivateAndLoginContainer>
    </MainContainer>
    <Footer />
    </ThemeProvider>
    </ThirdwebProvider>
    </>
  );
};

export default LoginPage;
