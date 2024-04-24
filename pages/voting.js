import Head from "next/head";
import styled, { ThemeProvider } from 'styled-components';
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Candidates from "@/components/Candidates";
import { COLORS } from "@/pages/_app.js";
import Footer from "@/components/Footer";
import { fetchRecentCandidates } from "@/firebase/firebaseConfig";

const theme = {
  colors: COLORS
};

const ParentContainer = styled.div`
  padding-top: 5vw;
  font-family: 'Helvetica';
`
const VotingContainer = styled.div`
  padding: 5vw;
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
`;

const VotingPage = () => {
  const [user, setUser] = useState(null);
  const [candidates, setCandidates] = useState([]);

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
      <Navbar user={user} setUser={setUser}/>
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
            <Candidates candidate={candidate}/>
          ))}
        </CandidatesContainer>
        <ElectionLabel>General Elections</ElectionLabel>
        <CandidatesContainer>
          {generalCandidates.map(candidate => (
            <Candidates candidate={candidate}/>
          ))}
        </CandidatesContainer>
        <Divider />
      </VotingContainer>
      <Footer></Footer>
      </ParentContainer>
      </ThemeProvider>
    </>
  );
}

export default VotingPage;