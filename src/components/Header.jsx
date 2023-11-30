import React from 'react'
import {styled} from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthorized } from "redux/modules/auth";

function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const signOut = () => {
    if(window.confirm("Are you sure you want to sign out?")){
      alert("You are signed out!");
      dispatch(setIsAuthorized(auth));
      localStorage.clear();
      navigate("/auth");
    }
  }

  return (
    <HeaderArea>
      <BtnContainer>
        <HeaderBtn onClick={()=> {navigate("../")}}>Home</HeaderBtn>
        <BtnSmallContainer>
          <HeaderBtn onClick={signOut}>Sign Out</HeaderBtn>
          <HeaderBtn onClick={()=> {navigate("/profile")}}>My Profile</HeaderBtn>
        </BtnSmallContainer>
      </BtnContainer>
    </HeaderArea>
  )
}

export default Header

const HeaderArea = styled.header`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  height: 100px;
  background-color: #272727;
  width: 100%;
  margin: 0;
  padding: 0 10px 0 0;
`;

const HeaderBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #ffffff;
  background-color: #272727;
  width: 100px;
  height: 70px;
  font-size: 1.2rem;
  margin: 10px;
  border: none;
  cursor: pointer;
  transition: 0.1s ease-in;
  &:hover {
    transform: scale(1.03);
    color: #e49090;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 0 20px 0 0;
`;

const BtnSmallContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;