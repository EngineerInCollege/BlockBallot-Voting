import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { COLORS } from "@/pages/_app.js";

const theme = {
  colors: COLORS
};

const MainContainer = styled.div`
  font-family: 'Helvetica';
  padding: 2vw;
`

const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2vw;
`;

const Divider = styled.div`
    width: 75%;
    height: .1vw;
    background-color: ${props => props.theme.colors.main};
    margin: 0 auto;
    margin-bottom: 1vw;
`;

const NameLabel = styled.div`
  position: absolute;
  margin-top: -1vw;
  margin-left: 1vw;
  font-size: 1.5vw;
  padding-bottom: 1vw;
  color: ${props => props.theme.colors.main};
  font-weight: bold;
`;

const PartyLabel = styled.div`
  margin-left: 1vw;
  font-size: 1.25vw;
  padding-top: 1vw;
  color: ${props => props.theme.colors.main};
`;

const MunicipalityLabel = styled.div`
  margin-left: 1vw;
  font-size: 1vw;
  color: ${props => props.theme.colors.main};
  font-style: italic;
`;

const OfficeLabel = styled.div`
  margin-left: 1vw;
  font-size: 1vw;
  padding-bottom: 1vw;
  color: ${props => props.theme.colors.main};
`;

const ShortDescription = styled.p`
  color: ${props => props.theme.colors.main};
  padding: 1vw;
`;

const Container = styled.div`
  width: 20vw;
  padding: 1vw;
  border: .2vw solid ${props => props.theme.colors.feature};
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    transform: scale(1.05);
  }

`;

const ImageContainer = styled.div`
  width: 100%;
  height: 20vw;
  background-color: #eee;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 1) 100%), url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const VoteButton = styled.button`
  background-color: ${props => props.theme.colors.feature};
  color: #fff;
  border: none;
  border-radius: 0.5vw;
  margin-left: 1vw;
  padding: 0.5vw 1vw;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: ${props => props.theme.colors.main};
    transform: translateY(-2px);
  }
`;


const CandidatesComponent = ({candidate}) => {
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <SectionContainer>
          <Container>
            <ImageContainer imageUrl={candidate.candidateData.photoLink} />
            <NameLabel>{candidate.candidateData.name}</NameLabel>
            <PartyLabel>{candidate.candidateData.party}</PartyLabel>

            <OfficeLabel>{candidate.candidateData.office}</OfficeLabel>
            <Divider />
            <MunicipalityLabel>{candidate.candidateData.municipality}</MunicipalityLabel>
            <ShortDescription>{candidate.candidateData.description}</ShortDescription>
            <VoteButton>Vote for this candidate</VoteButton>
          </Container>
          
        </SectionContainer>
      </MainContainer>
    </ThemeProvider>
  );
};

export default CandidatesComponent;
