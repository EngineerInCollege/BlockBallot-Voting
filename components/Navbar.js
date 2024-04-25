import React, { useState, useRef, useEffect } from 'react';
import styled, { ThemeProvider} from 'styled-components';
import { useRouter } from "next/router"
import { COLORS } from "@/pages/_app.js";
import { lightTheme } from "@thirdweb-dev/react";
import { useSigner, useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";

import {
  ConnectWallet,
} from "@thirdweb-dev/react";

const theme = {
  colors: COLORS
};

const Container = styled.div`
  position: relative;
`;

const Content = styled.div`
  font-family: 'Helvetica';
  font-size: 1vw;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5vw;
  padding: 2vw;
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(186, 181, 181, 0.5) 0%,
    rgba(186, 181, 181, 0.3) 50%, /* Adjust the opacity here */
    rgba(186, 181, 181, 0) 100%
  );
  backdrop-filter: blur(.1vw);
  z-index: 3;
`;

const ConnectContainer = styled.div`
  position: fixed;
  z-index: 4;
  right: 0;
  padding-top: 1.5vw;
  padding-right: 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Separator = styled.div`
  width: 0.1vw;
  height: 1.5vw;
  background-color:${props => props.theme.colors.main};
`;

const LogoBox = styled.div`
  color: ${props => props.theme.colors.main};
  position: relative;
  cursor: pointer;
  display: inline-block;
  letter-spacing: .1vw;

  span {
    font-weight: bold;
    color: ${props => props.theme.colors.main};
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 0;
    height: .1vw;
    background-color: ${props => props.theme.colors.main};
    transition: width 0.3s;
  }

  &:before {
    left: 0;
  }

  &:after {
    right: 0;
  }

  &:hover:before,
  &:hover:after {
    width: 50%;
  }

`;

const UserContainer = styled.div`
  color: ${props => props.theme.colors.main};
  display: flex;
  padding-right: 5vw;
  gap: 2vw;
`;

const NavigationElement = styled.div`
  color: ${props => props.theme.colors.main};
  position: relative;
  cursor: pointer;
  letter-spacing: .1vw;

  span {
    font-weight: bold;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 0;
    height: .1vw;
    background-color: ${props => props.theme.colors.main};
    transition: width 0.3s;
  }

  &:before {
    left: 0;
  }

  &:after {
    right: 0;
  }

  &:hover:before,
  &:hover:after {
    width: 50%;
  }
`;

const customTheme = lightTheme({
  fontFamily: "Helvetica",
  colors: {
    modalBg: "white",
  },
});

const Greetings = styled.div`
  position: relative;
`;

const Navbar = ({user, setUser}) => {
const router = useRouter();
const signer = useSigner();

function goToWantedPage(string) {
router.push(`${string}`);
}

  return (
    <ThemeProvider theme={theme}>
    <Container>
      <Content>
        <LogoBox onClick={() => goToWantedPage("/")}>
            <span>Block</span>Ballot
        </LogoBox>
        <Separator/>
        <UserContainer>
          {signer ? (
              <NavigationElement onClick={() => goToWantedPage("voting")} >Go Vote</NavigationElement>
            ) : (
              <NavigationElement onClick={() => goToWantedPage("login")} >Sign In</NavigationElement>
            )}
        </UserContainer>
      </Content>
      <ConnectContainer>
      <ConnectWallet theme={customTheme}/>
      </ConnectContainer>
    </Container>
    </ThemeProvider>
  );
}

export default Navbar;
