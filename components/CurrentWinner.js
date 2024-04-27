import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSigner } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { BLOCK_BALLOT_CONTRACT_ADDRESS } from '@/pages/_app.js';
import blockballotABI from "@/Contract/blockballot.json";
import { fetchRecentCandidates } from "@/firebase/firebaseConfig";

/*
This component is a user interface for displaying winning candidates in an election system.
It has a button that allows uers to toggle the display of winning candidates. When
expanded, it shows the current winners of the primary and general elections, including
their names, parites, and the number of votes they've received. To calculate the winning
canddiate and show their votes, calls to the contract are made. For each election's candidates,
a function calls the number of votes they each have and compares them to find the greatest one.
This winning candidate's name, number of votes, and party is returned for display.
*/

const ButtonLabel = styled.h1`
  font-family: "Helvetica";
  font-size: 1.25vw;
  color: ${props => props.theme.colors.main};
`;

const TabButton = styled.div`
  position: fixed;
  z-index: 10;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: ${({ isExpanded }) => (isExpanded ? '13vw' : '0vw')};
  right: 0;
  width: 23vw;
  height: 3vw;
  margin-right: 3vw;
  border: .2vw solid ${props => props.theme.colors.feature};
  border-bottom: none;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, bottom 0.3s ease;
  .material-symbols-outlined {
    color: ${props => props.theme.colors.main};
    font-size: 1.5vw;
    transition: transform 0.3s ease; 
    transform: rotate(${({ isExpanded }) => (isExpanded ? '180deg' : '0deg')});
  }
  
  &:hover {
    background-color: ${props => props.theme.colors.feature};
    ${ButtonLabel} {
      color: white; 
    }
    .material-symbols-outlined {
      color: white; 
    }
  }
`;

const Divider = styled.div`
  width: 85%;
  height: .1vw;
  background-color: ${props => props.theme.colors.main};
  margin: 0 auto;
  margin-top: .25vw;
`;

const PullUpContainer = styled.div`
  font-family: "Helvetica";
  z-index: 9;
  position: fixed;
  flex-grow: 1;
  bottom: ${({ isExpanded }) => (isExpanded ? '0vw' : '-13vw')}; 
  right: 0;
  width: 23vw;
  height: 13vw;
  margin-right: 3vw;
  background-color: white;
  color: ${props => props.theme.colors.feature};
  border: .2vw solid ${props => props.theme.colors.feature};
  border-bottom: none;
  transition: bottom 0.3s ease;
  overflow: hidden;
`;

const PullUpContent = styled.div`
  padding: 1vw;
`;

const ContainerLabel = styled.div`
  font-family: "Helvetica";
  font-size: 1.25vw;
  color: ${props => props.theme.colors.main};
  margin-left: 1vw;
  padding-bottom: .5vw;
`

const VotesLabel = styled.div`
  font-size: .75vw;
  padding-bottom: 1vw;
  margin-left: 2vw;
  color: ${props => props.theme.colors.feature};
`;

const ElectionLabel = styled.div`
  font-size: 1vw;
  margin-left: 1.5vw;
  color: ${props => props.theme.colors.main};
`

const WinningCandidate = styled.div`
  margin-left: 1.5vw;
  padding-top: .25vw;
  font-size: 1.25vw;
  color: ${props => props.theme.colors.main};
  span {
    font-size: 1vw;
    font-style: italic;
    color: ${props => props.theme.colors.feature};
  }
`;

const PullUpUI = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [winningPrimaryCandidate, setWinningPrimaryCandidate] = useState({name: null, party: null, votes: 0});
  const [winningGeneralCandidate, setWinningGeneralCandidate] = useState({name: null, party: null, votes: 0});
  const signer = useSigner();

  useEffect(() => {
    const fetchCandidates = async () => {
      const recentCandidates = await fetchRecentCandidates();
      setCandidates(recentCandidates);
    };
    fetchCandidates();
  }, []);

  const primaryCandidates = candidates.filter(candidate => candidate.candidateData.office === "President of the United States");
  const generalCandidates = candidates.filter(candidate => candidate.candidateData.office !== "President of the United States");

  const contract = new ethers.Contract(BLOCK_BALLOT_CONTRACT_ADDRESS, blockballotABI, signer);
  
  useEffect(() => {

    if(!signer) {return};

    const fetchVotes = async () => {
      let maxPrimaryVotes = 0;
      let maxGeneralVotes = 0;
      let winningPrimaryCandidate = null;
      let winningGeneralCandidate = null;  

        for (const candidate of primaryCandidates) {
            try {
              const index = await contract.getIndex("Primary", candidate.candidateData.name, candidate.candidateData.party);
              let votesHex = await contract.getResults("Primary", index);
              let votes = parseInt(votesHex, 16);

              if (votes > maxPrimaryVotes) {
                maxPrimaryVotes = votes;
                winningPrimaryCandidate = { name: candidate.candidateData.name, party: candidate.candidateData.party }; 
              }
            } catch (error) {
              console.error("Error fetching votes", error);
            }
        }
        for (const candidate of generalCandidates) {
          try {
            const index = await contract.getIndex("General", candidate.candidateData.name, candidate.candidateData.party);
            const votesHex = await contract.getResults("General", index);
            const votes = parseInt(votesHex, 16);
    
            if (votes > maxGeneralVotes) {
              maxGeneralVotes = votes;
              winningGeneralCandidate = { name: candidate.candidateData.name, party: candidate.candidateData.party };
            }
          } catch (error) {
            console.error(`Error fetching votes for ${candidate.candidateData.name} (${candidate.candidateData.party}):`, error);
          }
        } 
        setWinningPrimaryCandidate({ ...winningPrimaryCandidate, votes: maxPrimaryVotes});    
        setWinningGeneralCandidate({ ...winningGeneralCandidate, votes: maxGeneralVotes});   
    };
    fetchVotes();
  }, [signer, primaryCandidates, generalCandidates]);

  const togglePullUp = () => {
    setIsExpanded(!isExpanded);
  };

  const formatVotesText = (votes) => {
    return votes === 1 ? "vote" : "votes";
  };

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,500,0,0" />
      <TabButton onClick={togglePullUp} isExpanded={isExpanded}>
      <ButtonLabel>See winning candidates</ButtonLabel>
      <div class="material-symbols-outlined">
        keyboard_double_arrow_up
      </div>
      </TabButton>
      <PullUpContainer isExpanded={isExpanded}>
        <Divider/>
        <PullUpContent>
        <ContainerLabel>Current Winners</ContainerLabel>
        <ElectionLabel>Primary Election</ElectionLabel>
          <WinningCandidate>{winningPrimaryCandidate.name} 
          <span> ({winningPrimaryCandidate.party}) </span></WinningCandidate>
          <VotesLabel>In the lead with {winningPrimaryCandidate.votes} {formatVotesText(winningPrimaryCandidate.votes)}.</VotesLabel>
        <ElectionLabel>General Election</ElectionLabel>
          <WinningCandidate>{winningGeneralCandidate.name} 
          <span> ({winningGeneralCandidate.party}) </span></WinningCandidate>
          <VotesLabel>In the lead with {winningGeneralCandidate.votes} {formatVotesText(winningGeneralCandidate.votes)}.</VotesLabel>
        </PullUpContent>
      </PullUpContainer>
    </>
  );
};

export default PullUpUI;
