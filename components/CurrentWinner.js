import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSigner } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { BLOCK_BALLOT_CONTRACT_ADDRESS } from '@/pages/_app.js';
import blockballotABI from "@/Contract/blockballot.json";
import { fetchRecentCandidates } from "@/firebase/firebaseConfig";

const TabContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 7vw;
  height: 2vw;
  margin-right: 4vw;
  background-color: #007bff;
  border-radius: .5vw .5vw 0 0;
  cursor: pointer;
  transition: transform 0.3s ease;
  transform: translateY(${({ isExpanded }) => (isExpanded ? '-100%' : '0')});
  
  &:hover {
    transform: translateY(-1vw);
  }
`;

const TabIcon = styled.div`
  color: #fff;
  font-size: 24px;
  line-height: 50px;
  text-align: center;
`;

const PullUpContainer = styled.div`
  position: fixed;
  bottom: ${({ isExpanded }) => (isExpanded ? '0' : '-400px')};
  right: 0;
  width: 300px;
  height: 400px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 0;
  transition: bottom 0.3s ease;
  overflow: hidden;
`;

const PullUpContent = styled.div`
  padding: 10px;
`;

const CandidateVotes = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const WinningCandidate = styled.div`
  font-weight: bold;
  color: green;
  cursor: pointer;
`;

const PullUpUI = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [winningPrimaryCandidate, setWinningPrimaryCandidate] = useState({name: null, party: null});
  const [winningGeneralCandidate, setWinningGeneralCandidate] = useState({name: null, party: null});
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
    let primaryCandidateVotes = 0;
    let generalCandidateVotes = 0;

    if(!signer) {return};

    const asyncFunc = async () => {
        for (const candidate of primaryCandidates) {
            try {
              const index = await contract.getIndex("Primary", candidate.candidateData.name, candidate.candidateData.party);
              let votesHex = await contract.getResults("Primary", index);
              let votes = parseInt(votesHex, 16);
              if (votes > primaryCandidateVotes) {
                primaryCandidateVotes = votes;
                setWinningPrimaryCandidate({ name: candidate.candidateData.name, party: candidate.candidateData.party }); 
              }
            } catch (error) {
              console.error("Error fetching votes", error);
            }
        }
        for (const candidate of generalCandidates) {
            try {
              const index = await contract.getIndex("General", candidate.candidateData.name, candidate.candidateData.party);
              let votesHex = await contract.getResults("General", index);
              let votes = parseInt(votesHex, 16);
              if (votes > generalCandidateVotes) {
                generalCandidateVotes = votes;
                setWinningGeneralCandidate({ name: candidate.candidateData.name, party: candidate.candidateData.party }); 
              }
            } catch (error) {
              console.error("Error fetching votes", error);
            }
        }
    }
    asyncFunc();
  }, []);

  return (
    <>
      <TabContainer isExpanded={isExpanded} onMouseEnter={() => setIsExpanded(true)} onMouseLeave={() => setIsExpanded(false)}>
        <TabIcon>▲</TabIcon>
      </TabContainer>
      <PullUpContainer isExpanded={isExpanded}>
        <PullUpContent>
          <h3>Current Votes</h3>
         <h2>{winningPrimaryCandidate.name}</h2>
         <h2>{winningGeneralCandidate.name}</h2>
        </PullUpContent>
      </PullUpContainer>
    </>
  );
};

export default PullUpUI;
