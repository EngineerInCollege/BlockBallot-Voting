import styled, { ThemeProvider } from 'styled-components';
import React, { useState } from 'react';
import { COLORS } from "@/pages/_app.js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { writeData } from '@/firebase/firebaseConfig';
import Head from 'next/head';
import { useSigner } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { BLOCK_BALLOT_CONTRACT_ADDRESS } from '@/pages/_app.js';
import blockballotABI from "@/Contract/blockballot.json";

/*
This is an admin page for adding candidates to a voting platform. It uses Firebase for
data management. The page includes form inputs for entering candidate information such as name,
party, office, municipality, description, and a photo link. Users can toggle between adding
candidates for primary and general elections. Upon submitting the candidate details, the component
validates the input fields, writes candidate data to both Firebase Realtime Database and the smart
contract on the Ethereum blockchain. It also provides error handling for various scenarios, such
as incompolete form submissions or authenticiation failures. Regardless, tihs page is inentionally
made for the admin, so not all error handling scenarios are considered. This page also displays
success and error messages to notify users of the oucome of their actions.
*/

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
  overflow: hidden;

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

const ErrorMessage = styled.p`
  color: red;
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
    const signer = useSigner();
    const [fail, setFail] = useState({ status: false, message: '' });

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

        const contract = new ethers.Contract(BLOCK_BALLOT_CONTRACT_ADDRESS, blockballotABI, signer);
        const isAdmin = await contract.giveAdmin();

        if(!signer || !isAdmin) {
          return;
        }

        if(!name || !party || !municipality || !description || !photoLink) {
          setFail({ status: true, message: "Please fill out all fields." });
          setTimeout(() => {
            setFail(false);
          }, 3000);
          return;
        }

        // Write candidate data to the Firebase database
        await writeData(name, candidateData);

        // Write candidate data to the contract
        const electionType = office === "President of the United States" ? "Primary" : "General";
        await contract.addCandidate(electionType, name, party);

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
        setShowGeneral(false);
        setShowPrimary(false);
    } catch (error) {
        console.error("Error adding candidate:", error);
        if(!signer || !isAdmin) {
          setFail({ status: true, message: "You must be the admin to add a candidate." });
        } else {
          setFail({ status: true, message: "There was an error when trying to add a candidate." });
        }
        setTimeout(() => {
          setFail(false);
        }, 3000);
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
                <Input placeholder="Party" rightBorderVisibility="none" onChange={(e) => setParty(e.target.value)} />
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
            {fail.status && <ErrorMessage>{fail.message}</ErrorMessage>}
          </InputContainer>
        </AddCandidateContainer>
      </MainContainer>
      <Footer />
    </ThemeProvider>
    </>
  );
};

export default AdminPage;
