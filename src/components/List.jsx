import React from 'react'
import {styled} from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import UserIcon from './UserIcon';
import { useSelector } from 'react-redux/es/hooks/useSelector';


function List() {
  const letterShown = useSelector((state) => state.character);
  const letters = useSelector((state)=> state.letters);
  const navigate = useNavigate();
  const filteredByNameList = letters.filter((letter)=>{
    return letterShown[letter.wroteTo];
  })
  // const user = useSelector((state)=> state.user);

  return (
    <ListOuterFrame>
      <ListArea>
      {filteredByNameList.length === 0 ? (
          <h4>There are no fan letters saved.<br /> Be the first one to post a fan letter!</h4>
        ) : (
          filteredByNameList.map((letter) => (
            <Letter
              key={letter.id}
              onClick={()=> {navigate(`/letter-details/${letter.id}`)}}
            >
              <UserIcon />
              <LetterContent>
                <Nickname>{letter.nickname}</Nickname>
                <p>{letter.createdAt}</p>
                <span>{letter.wroteTo},&nbsp;</span>
                <Message>{letter.message}</Message>
              </LetterContent>
            </Letter>
          ))
        )}
      </ListArea>
    </ListOuterFrame>

  )
}

export default List


const ListArea = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 300px;
  margin: 10px;
  background-color: #f2f2f2;
  color: #000000;
  padding: 10px;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    padding-right: 20px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.4);
    border: 10px solid white;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

const Letter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: black;
  background-color: #e9e9e9;
  margin: 10px;
  padding: 10px;
  gap: 5px;
  height: 150px;
  width: 90%;
  /* border-radius: 20px; */
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s ease;
  &:hover {
    transform: scale(1.02);
    background-color: #acacac;
  }
`;

const Message = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;  
`;

const LetterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 260px;
`;

const Nickname = styled.h3`
  margin: 0;
  padding: 0;
  font-weight: 800;
`;

const ListOuterFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border-radius: 20px; */
  width: 90%;
  height: 400px;
  border-radius: 20px;
  margin: 20px;
  background-color: #f2f2f2;
  padding: 10px;
`;