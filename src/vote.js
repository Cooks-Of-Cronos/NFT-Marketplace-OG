import React, { useState } from 'react';
import styled from 'styled-components';




const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
`;

const ProposalList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProposalItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const VoteButton = styled.button`
  padding: 5px 10px;
  background-color: #3ba8f8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const NFTContractUI = () => {
  const [proposals, setProposals] = useState([]);

  const handleCreateProposal = () => {
    // Add code to create a proposal
  };

  const handleVote = (proposalIndex) => {
    // Add code to vote for a proposal
  };

  return (
    <Container>
      <Title>NFT Contract</Title>
      <ProposalList>
        {proposals.map((proposal, index) => (
          <ProposalItem key={index}>
            <span>{proposal.name}</span>
            <VoteButton onClick={() => handleVote(index)}>Vote</VoteButton>
          </ProposalItem>
        ))}
      </ProposalList>
      <div>
        <input type="text" placeholder="Enter proposal name" />
        <button onClick={handleCreateProposal}>Create Proposal</button>
      </div>
    </Container>
  );
};

export default NFTContractUI;
