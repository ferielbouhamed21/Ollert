import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from '@fortawesome/free-brands-svg-icons' 

const Box = styled.div`
  padding: 10px 10px;
  background: rgb(122, 173, 172);
  position: absolute;
  bottom: 0;
  width: 100%;
  @media (max-width: 1000px) {
    padding: 30px 30px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 50px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  grid-gap: 10px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const Flinks = styled.a`
  color: black;
  margin-bottom: 5px;
  font-size: 12px;
  text-decoration: none;
  &:hover {
    color: grey;
    transition: 200ms ease-in;
  }
`;

const Heading = styled.p`
  font-size: 18px;
  color: rgb(4, 9, 51);
  margin-bottom: 10px;
  font-weight: bold;
`;
const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Container>
        <Row>
          <Column>
            <Heading>About us</Heading>
            <Flinks onClick={() => navigate('/')}>Find more about us</Flinks>
          </Column>
          <Column>
            <Heading>Careers</Heading>
            <Flinks onClick={() => navigate('/')}>Contact us</Flinks>
          </Column>
          <Column>
            <Heading>Projects</Heading>
            <Flinks onClick={() => navigate('/')}> Projects list</Flinks>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <Flinks href='https://www.facebook.com/junior.entreprise.insat'>
              <i className='fab fa-facebook-f'>
                <span style={{ marginLeft: '10px' }}>Facebook</span>
              </i>
            </Flinks>
            <Flinks href='https://instagram.com/junior_entreprise_insat?utm_medium=copy_link'>
              <i className='fab fa-instagram'>
                <span style={{ marginLeft: '10px' }}>Instagram</span>
              </i>
            </Flinks>
            <Flinks href='https://www.youtube.com/channel/UCmNCQRBMVP_RzhWZjnJfUPA'>
              <i className='fab fa-youtube'>
                <span style={{ marginLeft: '10px' }}>Youtube</span>
              </i>
            </Flinks>
          </Column>
        </Row>
      </Container>
    </Box>
  );
}
export default Footer;