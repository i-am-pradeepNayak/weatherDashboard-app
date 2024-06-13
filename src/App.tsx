import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Weather from "./components/Weather";
import styled from "styled-components";
import ProtectedRoute from "./Pages/ProtectedRoute";
import PageNotFound from "./components/PageNotFound";


const App: React.FC = () => {
  return (
    <Router>
      <Container>
        <Routes>
          <Route index element={<Login />} />
          <Route
            path="weather"
            element={
              <ProtectedRoute>
                <Weather />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
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
