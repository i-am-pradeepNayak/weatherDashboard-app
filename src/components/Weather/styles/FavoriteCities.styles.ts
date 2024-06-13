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
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 15px;
`;

const CityItem = styled.li`
 
  text-align : center;
  gap: 1.6rem;
  align-items: center;
  background-color: var(--color-dark--2);
  border-radius: 7px;
  padding: 1rem 2rem;
  border-left: 5px solid var(--color-brand--2);
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  border: 1px solid white;
    margin-bottom: 5px;
    background: #d7d7d729;
    border-radius: 9px;
    font-weight: 600;
    width: 80%;
    display: block;
    margin: 4px auto;
    &:hover  {
      background : #bfbfbf;
    }
`;

export { Container, CityList, CityItem };
