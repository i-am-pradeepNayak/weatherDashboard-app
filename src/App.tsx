import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Weather from "./components/Weather";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  console.log("App component");
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </Container>
      <ToastContainer />
    </Router>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px);
  background-color: #e9ecef;
`;
