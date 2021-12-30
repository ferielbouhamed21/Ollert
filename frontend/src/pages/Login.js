import styled from "styled-components";
import { AccountBox } from "../components/accountBox";

const AppContainer = styled.div`
  width: 100%;
  margin-bottom:50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top:40px;
`;

function login() {
  return (
        <AppContainer >
      <AccountBox />
      </AppContainer>
  );
}

export default login;