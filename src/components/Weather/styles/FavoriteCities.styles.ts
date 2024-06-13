import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
`;

const CityList = styled.ul`
  width: 100%;
  height: 65vh;
  list-style: none;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const CityItem = styled.li`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  background-color: var(--color-dark--2);
  border-radius: 7px;
  padding: 1rem 2rem;
  border-left: 5px solid var(--color-brand--2);
  cursor: pointer;
  color: inherit;
  text-decoration: none;
`;

export { Container, CityList, CityItem };
