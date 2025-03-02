// src/pages/AddAccountPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaChevronLeft } from 'react-icons/fa';

const Container = styled.div`
  max-width: 450px;
  margin: 0 auto;
  background-color: ${props => props.theme.colors.white};
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-right: 15px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
`;

const BankList = styled.div`
  margin-top: 20px;
`;

const BankOption = styled.div`
  padding: 15px;
  border-bottom: 1px solid ${props => props.theme.colors.secondary};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const BankLogo = styled.img`
  height: 30px;
  margin-right: 15px;
`;

const BankName = styled.div`
  font-size: 16px;
`;

const AddAccountPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/')}>
          <FaChevronLeft />
        </BackButton>
        <Title>Add Account</Title>
      </Header>

      <BankList>
        <BankOption>
          <BankLogo src="/images/chase-logo.png" alt="Chase" />
          <BankName>Chase</BankName>
        </BankOption>
        <BankOption>
          <BankLogo src="/images/capital-one-logo.png" alt="Capital One" />
          <BankName>Capital One</BankName>
        </BankOption>
        <BankOption>
          <BankLogo src="/images/bank-of-america-logo.png" alt="Bank of America" />
          <BankName>Bank of America</BankName>
        </BankOption>
        <BankOption>
          <BankLogo src="/images/wells-fargo-logo.png" alt="Wells Fargo" />
          <BankName>Wells Fargo</BankName>
        </BankOption>
      </BankList>
    </Container>
  );
};

export default AddAccountPage;