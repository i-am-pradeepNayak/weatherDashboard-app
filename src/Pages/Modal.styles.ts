import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 23px;
  border-radius: 8px;
  position: relative;
  width: 80%;
  max-width: 500px;
  -webkit-box-shadow: 0px 0px 18px -4px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 18px -4px rgba(0,0,0,0.75);
box-shadow: 0px 0px 18px -4px rgba(0,0,0,0.75);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;
const List = styled.p`
  margin-bottom : 10px;
`;

const RemoveBtn = styled.button`
    margin: 45px auto 0 auto;
    display: block;
    padding: 8px;
    background: #FF6347;
    border: none;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    margin-top : 45px;
`;

export { Overlay,ModalContent,CloseButton,List,RemoveBtn}