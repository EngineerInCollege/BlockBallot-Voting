import Head from "next/head";
import styled, { ThemeProvider } from 'styled-components';
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Candidates from "@/components/Candidates";
import CurrentWinner from "@/components/CurrentWinner";
import { COLORS } from "@/pages/_app.js";
import Footer from "@/components/Footer";
import { fetchRecentCandidates } from "@/firebase/firebaseConfig";
import Popup from "@/components/Popup";
import Confetti from 'react-confetti';

/*
This page is the core interface for users to participate in the voting process within the BlockBallot
application. Each voting section (primary and general) displays a list of candidates available for voting.
The list of candidates is fetched from the Firebase database. This page also manages voting-related states
such as voting errors, successful votes, and the visibility of the confetti animation upon a successful
vote. It includes event handlers to manage voting errors, vote scucess, and the closing of popup
notifications.
*/

const theme = {
  colors: COLORS
};

const ParentContainer = styled.div`
  padding-top: 5vw;
  font-family: 'Helvetica';
`
const VotingContainer = styled.div`
  padding: 5vw;
  position: relative;
  z-index: 1;
`

const Divider = styled.div`
  width: 85%;
  height: .15vw;
  background-color: ${props => props.theme.colors.main};
  margin: 0 auto;
  margin-top: 5vw;
  margin-bottom: 2vw;
`;

const ElectionLabel = styled.h1`
  color: ${props => props.theme.colors.main};
  padding-top: 2vw;
  text-align: left;
  position: relative;
`

const BackgroundImage = styled.div`
  position: relative;
  height: 22vw;
  background-image: url("/voting.jpeg");
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
  color: ${props => props.theme.colors.feature};
  font-size: 1.5vw;
  text-align: center;
`;

const CandidatesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
`;

const ConfettiContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
`

const VotingPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [votingError, setVotingError] = useState(false);
  const [votePassed, setVotePassed] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);

  const handleVotingError = () => {
    setVotingError(true);
    setPopupVisible(true); // Show the popup in case of voting error
  }

  const handleClose = () => {
    setVotingError(false);
    setPopupVisible(false); // Close the popup
    setConfettiPieces(0); 
  }

  const handleVoteSuccess = () => {
    setVotePassed(true);
    setConfettiPieces(200);
    setPopupVisible(true); // Show the popup on successful vote
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      const recentCandidates = await fetchRecentCandidates();
      setCandidates(recentCandidates);
    };
    fetchCandidates();
  }, []);

  const primaryCandidates = candidates.filter(candidate => candidate.candidateData.office === "President of the United States");
  const generalCandidates = candidates.filter(candidate => candidate.candidateData.office !== "President of the United States");

  return (
    <>
      <Head>
        <title>BlockBallot - Voting</title>
        <meta name="description" content="Decentralized voting" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
      {votePassed && 
        <ConfettiContainer>
      <Confetti 
          colors={["#FF474C", "#89CFF0"]}
          numberOfPieces={confettiPieces}
      />
        </ConfettiContainer>
      }
      <Navbar/>
      <CurrentWinner/>
      <ParentContainer>
      <BackgroundImage>
          <OverlayText>
            Vote Secure. Vote Safe. Vote Today.
          </OverlayText>
      </BackgroundImage>
      <VotingContainer>
        <ElectionLabel>Primary Elections</ElectionLabel>
        <Divider />
        <CandidatesContainer>
          {primaryCandidates.map(candidate => (
            <Candidates candidate={candidate} onVoteError={handleVotingError} onVotePass={handleVoteSuccess}/>
          ))}
        </CandidatesContainer>
        <Divider/>
        <ElectionLabel>General Elections</ElectionLabel>
        <CandidatesContainer>
          {generalCandidates.map(candidate => (
            <Candidates candidate={candidate} onVoteError={handleVotingError} onVotePass={handleVoteSuccess}/>
          ))}
        </CandidatesContainer>
        <Divider />
      </VotingContainer>
      <Footer></Footer>
      </ParentContainer>
      {popupVisible && <Popup message={votingError ? "Voting failed. Please log in or vote for only one election." : "Your vote has successfully been recorded."} onClose={handleClose} />}
      </ThemeProvider>
    </>
  );
}

export default VotingPage;