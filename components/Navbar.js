import React, { useState, useRef, useEffect } from 'react';
import styled, { ThemeProvider} from 'styled-components';
import { useRouter } from "next/router"
import { COLORS } from "@/pages/_app.js";

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
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5vw;
  padding: 2vw;
  width: 100%;
  background: linear-gradient(to bottom, rgba(186, 181, 181, 0.5), rgba(128, 128, 128, 0));
  backdrop-filter: blur(.1vw);
`;

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

const Greetings = styled.div`
  position: relative;
`;

const Navbar = ({user, setUser}) => {
const router = useRouter();

//   useEffect(() => {
//     // Check local storage for user authentication state
//     const loggedInUser = localStorage.getItem('user');
//     if (loggedInUser) {
//       setUser(JSON.parse(loggedInUser));
//     }
//   }, []); // Run only once on component mount

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
        <Separator></Separator>
        <UserContainer>
          {user ? (
              <>
                <Greetings>Hello, {user.displayName}</Greetings>
                <NavigationElement bold >Sign Out</NavigationElement>
              </>
            ) : (
              <NavigationElement onClick={() => goToWantedPage("login")} >Sign In</NavigationElement>
            )}
        </UserContainer>
      </Content>
    </Container>
    </ThemeProvider>
  );
}

export default Navbar;
