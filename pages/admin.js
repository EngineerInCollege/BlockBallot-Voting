import styled, { ThemeProvider } from 'styled-components';
import React, { useState } from 'react';
import { COLORS } from "@/pages/_app.js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { writeData } from '@/firebase/firebaseConfig';
import Head from 'next/head';

const theme = {
    colors: COLORS
};

const Divider = styled.div`
    width: 85%;
    height: .1vw;
    background-color: ${props => props.theme.colors.main};
    margin: 0 auto;
    margin-top: 2vw;
    margin-bottom: 2vw;
`;

const MainContainer = styled.div`
  padding-bottom: 15vw;
  height: 30vw;
  font-family: 'Helvetica';
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.colors.background};
`;

const AddCandidateContainer = styled.div`
  width: 50%;
  height: 20vw;
  margin-top: 6%;
  background-color: white;
  box-shadow: 0 1vw 2vw rgba(0, 0, 0, 0.1);
  padding: 3vw;
  padding-bottom: 10vw;
`;

const AddCandidateLabel = styled.h1`
  color: ${props => props.theme.colors.main};
  padding-bottom: 2vw;
`;

const CheckboxContainer = styled.div`
  display: flex;
  margin-bottom: 1vw;
  justify-content: center;
  align-items: center;
`;

const CheckboxLabel = styled.div`
  margin-right: 2vw;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.main};
`;

const Checkbox = styled.div`
  display: inline-block;
  margin-right: .5vw;
  width: 1vw;
  height: 1vw;
  border-radius: 1vw;
  background-color: ${props => props.checked ? 'lightblue' : 'white'};
  border: .1vw solid black;
  cursor: pointer;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 1vw;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 1vw 1vw;
  border-radius: ${props => props.borderRadius};
  border: 0.1vw solid ${props => props.theme.colors.main};
  border-right: ${props => props.rightBorderVisibility};
  border-left: ${props => props.leftBorderVisibility};

  &:focus {
    border-color: gray;
    outline: none;
  }
`;

const DescriptionInput = styled.textarea`
  font-family: 'Helvetica';
  width: 70%;
  height: 20%;
  padding: 1vw;
  padding-left: 3vw;
  border-radius: 1vw;
  border: 0.1vw solid ${props => props.theme.colors.main};
  resize: vertical;
  overflow-y: auto;

  &:focus {
    border-color: gray;
    outline: none;
  }
`;

const PhotoInput = styled.input`
  font-family: 'Helvetica';
  width: 70%;
  height: 20%;
  padding: 1vw;
  padding-left: 3vw;
  border-radius: 1vw;
  border: 0.1vw solid ${props => props.theme.colors.main};
  resize: vertical;
  overflow-y: auto;

  &:focus {
    border-color: gray;
    outline: none;
  }
`;

const AddCandidateButton = styled.button`
  flex: 2;
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

const SuccessMessage = styled.p`
  color:  ${props => props.theme.colors.feature};
`;

const AdminPage = () => {
    const [showPrimary, setShowPrimary] = useState(false);
    const [showGeneral, setShowGeneral] = useState(false);
    const [name, setName] = useState('');
    const [party, setParty] = useState('');
    const [office, setOffice] = useState('');
    const [municipality, setMunicipality] = useState('');
    const [description, setDescription] = useState('');
    const [photoLink, setPhotoLink] = useState('');  
    const [success, setSuccess] = useState(false); 

  const handlePrimaryChange = () => {
    setShowPrimary(!showPrimary);
    setShowGeneral(false);
    setOffice("President of the United States");
  };

  const handleGeneralChange = () => {
    setShowGeneral(!showGeneral);
    setShowPrimary(false);
  };

  const handleAddCandidate = async () => {
    try {
        // Form candidate object
        const candidateData = {
            name: name,
            party: party,
            office: office,
            municipality: municipality,
            description: description,
            photoLink: photoLink,
        };

        // Write candidate data to the Firebase database
        await writeData(name, candidateData);

        // Reset form fields
        setName('');
        setParty('');
        setOffice('');
        setMunicipality('');
        setDescription('');
        setPhotoLink('');
        setSuccess(true);

        setTimeout(() => {
          setSuccess(false);
        }, 3000);

        console.log("Candidate added successfully!");
    } catch (error) {
        console.error("Error adding candidate:", error);
    }
  }

  return (
    <>
      <Head>
        <title>BlockBallot - Admin Page</title>
        <meta name="description" content="Admin page for adding candidates" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
      <Navbar />
      <MainContainer>
        <AddCandidateContainer>
          <AddCandidateLabel>Add Candidate</AddCandidateLabel>
          <CheckboxContainer>
            <CheckboxLabel>
              <Checkbox checked={showPrimary} onClick={handlePrimaryChange} />
              Primary
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox checked={showGeneral} onClick={handleGeneralChange} />
              General
            </CheckboxLabel>
          </CheckboxContainer>
          <Divider />
          <InputContainer>
            {showGeneral && (
             <InputContainer>
              <InputGroup>
                <Input borderRadius="1vw 0 0 1vw" rightBorderVisibility="none" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <Input placeholder="Party" onChange={(e) => setParty(e.target.value)} />
                <Input placeholder="Office" onChange={(e) => setOffice(e.target.value)} />
                <Input borderRadius="0 1vw 1vw 0" leftBorderVisibility="none" placeholder="Municipality" onChange={(e) => setMunicipality(e.target.value)} />
              </InputGroup>
              <DescriptionInput borderRadius="1vw 1vw 1vw 1vw" placeholder="A 2 to 3 sentence description" onChange={(e) => setDescription(e.target.value)} />
              <PhotoInput borderRadius="1vw 1vw 1vw 1vw" placeholder="Photo Link" onChange={(e) => setPhotoLink(e.target.value)} />
              </InputContainer>
            )}
            {showPrimary && (
             <InputContainer>
             <InputGroup>
               <Input borderRadius="1vw 0 0 1vw" rightBorderVisibility="none" placeholder="Name" onChange={(e) => setName(e.target.value)} />
               <Input placeholder="Party" onChange={(e) => setParty(e.target.value)}/>
               <Input borderRadius="0 1vw 1vw 0" leftBorderVisibility="none" placeholder="Municipality" onChange={(e) => setMunicipality(e.target.value)} />
             </InputGroup>
             <DescriptionInput borderRadius="1vw 1vw 1vw 1vw" placeholder="A 2 to 3 sentence description" onChange={(e) => setDescription(e.target.value)} />
             <PhotoInput borderRadius="1vw 1vw 1vw 1vw" placeholder="Photo Link" onChange={(e) => setPhotoLink(e.target.value)} />
             </InputContainer>
            )}
            {(showPrimary || showGeneral) && (
                <AddCandidateButton onClick={handleAddCandidate}>Add Candidate</AddCandidateButton>
            )}
            {success && <SuccessMessage>Candidate added successfully!</SuccessMessage>}
          </InputContainer>
        </AddCandidateContainer>
      </MainContainer>
      <Footer />
    </ThemeProvider>
    </>
  );
};

export default AdminPage;
