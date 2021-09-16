import { useState } from "react";
import "./App.css";
import styled, { createGlobalStyle } from "styled-components";
import FormHeadBlock from "./components/FormHeadBlock.js";
import MainForm from "./components/MainForm.js";

// styled components
const GlobalStyle = createGlobalStyle`
  body {
    background: rgba(0,0,0,0.3);
  }
`;

const Wrapper = styled.div`
  max-width: 645px;
  background: white;
  margin: 10% auto;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  border-top: 8px solid #fad312;
  padding: 64px 32px;

  @media screen and (max-width: 768px) {
    margin: 0 auto;
  }
`;

const Footer = styled.div`
  background: black;
  color: #999999;
  font-size: 3px;
  text-align: center;
  padding: 24px;
`;

function App() {
  const [isPass, setIsPass] = useState(false);
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <FormHeadBlock />
        <MainForm isPass={isPass} setIsPass={setIsPass} />
      </Wrapper>
      <Footer>© 2020 © Copyright. All rights Reserved.</Footer>
    </>
  );
}

export default App;
