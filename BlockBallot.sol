// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

// Ballot contract for managing votes for two separate election (general and primary)
contract Ballot{

    struct Candidate{
        string name;
        string party;
        uint voteCount;
    }

    struct Voter{
        bool generalVote;
        bool primaryVote;
        uint generalVoteIndex;
        uint primaryVoteIndex;
    }

    // Mapping to track voters' information
    mapping(address => Voter) public voters;

    // Mapping to track candidate indexes using a unique key
    mapping(bytes32 => uint) public candidateIndexMapping;

    // Arrays to hold candidates for different types of elections
    Candidate[] public generalElection;
    Candidate[] public primaryElection;

    address public adminWalletOne = 0x0f812DB9A0A8b50ED85d2f4F513B9eE0540EA258;
    address public adminWalletTwo = 0x030E365cD3ec7A659051b6F261bB9D06e0f8CA0B;

    // Function to check if the user is the admin
    function giveAdmin() public view returns (bool) {
        if (msg.sender == adminWalletOne || msg.sender == adminWalletTwo) {return true;}
        else {return false;}
    }

    // Function to add a candidate to a specified election type
    function addCandidate(string memory electionType, string memory name, string memory party) public {
        require((bytes(electionType).length > 0) && (compareStrings(electionType, "General") || compareStrings(electionType, "Primary")), "Please add a candidate party");
        require(bytes(name).length > 0, "Please add a candidate name");
        require(bytes(party).length > 0 , "Please add a candidate party");

        // Generate a unique candidate key based on electionType, name, and party. This makes searching for candidates more efficient
        bytes32 candidateKey = keccak256(abi.encodePacked(electionType, name, party));

        // Check that the candidate has not been added to the specified election
        require(candidateIndexMapping[candidateKey] == 0, "Candidate has already been added for this election");

        uint index;

        // Determine the election type and add the candidate
        if (compareStrings(electionType, "General")) {
            index = generalElection.length;
            generalElection.push(Candidate({
                name: name,
                party: party,
                voteCount: 0
            }));
        }
        if (compareStrings(electionType, "Primary")) {
            index = primaryElection.length;
            primaryElection.push(Candidate({
                name: name,
                party: party,
                voteCount: 0
            }));
        } 

        // Store candidate index in the mapping
        candidateIndexMapping[candidateKey] = index;
    }

    // General function to cast a vote
    function vote(string memory electionType, uint candidateIndex) public {
        require((bytes(electionType).length > 0) && (compareStrings(electionType, "General") || compareStrings(electionType, "Primary")), "Please add a candidate party");
        require(candidateIndex >= 0, "This candidate doesn't exist");

        // Validate election type and voting status
        if (compareStrings(electionType, "General")) {
            require(!voters[msg.sender].generalVote, "You have already voted in the general election.");
            require(candidateIndex < generalElection.length, "Invalid candidate index.");
            voters[msg.sender].generalVote = true;
            voters[msg.sender].generalVoteIndex = candidateIndex;
            generalElection[candidateIndex].voteCount += 1;
        }
        if (compareStrings(electionType, "Primary")) {
            require(!voters[msg.sender].primaryVote, "You have already voted in the primary election.");
            require(candidateIndex < primaryElection.length, "Invalid candidate index.");
            voters[msg.sender].primaryVote = true;
            voters[msg.sender].primaryVoteIndex = candidateIndex;
            primaryElection[candidateIndex].voteCount += 1;
        }
    }

    // Returns the index of a candidate in a certain election. This will be called and passed as the parameter for the voting and getResults function
    function getIndex (string memory electionType, string memory name, string memory party) public view returns (uint) {
        require((bytes(electionType).length > 0) && (compareStrings(electionType, "General") || compareStrings(electionType, "Primary")), "Please add a candidate party");
        require(bytes(name).length > 0 , "Please add a candidate name");
        require(bytes(party).length > 0 , "Please add a candidate party");

        bytes32 candidateKey = keccak256(abi.encodePacked(bytes(electionType), bytes(name), bytes(party)));

        require (candidateIndexMapping[candidateKey] >= 0, "This candidate doesn't exist");
        return candidateIndexMapping[candidateKey];
    }

    function getResults (string memory electionType, uint candidateIndex) public view returns (uint) {
        require((bytes(electionType).length > 0) && (compareStrings(electionType, "General") || compareStrings(electionType, "Primary")), "Please add a candidate party");
        
        if (compareStrings(electionType, "General")) {
            require(candidateIndex < generalElection.length, "Invalid candidate index.");
            return(generalElection[candidateIndex].voteCount);
        }
        else if (compareStrings(electionType, "Primary")) {
            require(candidateIndex < primaryElection.length, "Invalid candidate index.");
            return(primaryElection[candidateIndex].voteCount);
        } else {
            revert("An error has occured");
        }
    }   

    // Utility function for string comparison to avoid repeated keccak256 comparisons
    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}