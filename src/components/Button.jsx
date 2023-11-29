import React from 'react';
import { useState } from 'react';
import { styled } from 'styled-components';
import { useSelector,useDispatch } from 'react-redux';
import { setCharacter } from 'redux/modules/character';

function Button(){
  const letterShown = useSelector(state => state.character);
  const dispatch = useDispatch();
  // const { setLetterShown, letterShown } = useContext(ButtonLetterContext);
  const [selectedCharacterId, setSelectedCharacterId] = useState(1);
  const [buttonText, setButtonText] = useState(
    [
      {id:1, name: "Paul"},
      {id:2, name: "Elio"},
      {id:3, name: "Gatsby"},
      {id:4, name: "Lee"},
    ]
  );
  const buttonByNameClickHandler = (item) => {
    setSelectedCharacterId(item.id);
    console.log('선택한 아이디',item.id);
    const allFalse = 
    {
      'Paul' : false,
      'Elio' : false,
      'Gatsby' : false,
      'Lee' : false,
    };
    dispatch((setCharacter({ ...allFalse, [item.name] : true})));
    console.log('button click!',{ ...allFalse, [item.name] : true});
    // setLetterShown({ ...allFalse, [item.name] : true});
  }


  return (
    <ButtonBox>
      {buttonText.map((item)=>{
        return(
          <ButtonI key={item.id} onClick={()=> buttonByNameClickHandler(item) } selectedCharacterId={selectedCharacterId} buttonId={item.id}>{item.name}</ButtonI>
        );
      })}
    </ButtonBox>
  )
}

export default Button

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ButtonI = styled.button`
  font-weight: 500;
  width: 15%;
  height: 100px;
  background-color: black;
  color: white;
  font-size: 1.3rem;
  border: none;
  display: block;
  position: fixed;
  right: 0;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    background-color: #343434;
    color: white;
  }
  &:first-child {
    bottom: 55%;
  }
  &:nth-child(2){
    bottom: 43%;
  }
  &:nth-child(3){
    bottom: 31%;
  }
  &:nth-child(4){
    bottom: 19%;
  }
  background-color: ${(props) => (props.selectedCharacterId === props.buttonId ? '#343434' : 'black')};
  color: ${(props) => (props.selectedCharacterId === props.buttonId ? 'white' : 'white')};
`;


