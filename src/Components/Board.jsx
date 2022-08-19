import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';



export default function Board(props) {

    //default values
    const [turn,setTurn] = useState('x');
    const [squares,setSquares] = useState(Array(9).fill(null));
    const [winner,setWinner] = useState();
    //finding the winner
    const checkForWinner = (cells)=>{
	    //every function call combos creating again.
        const combos = {
            accros:[
                [0,1,2],
                [3,4,5],
                [6,7,8],
            ],
            down:[
                [0,3,6],
                [1,4,7],
                [2,5,8],

            ],
            diagnol:[
                [0,4,8],
                [2,4,6],
            ],
        };
        for (var combo in combos){
            combos[combo].forEach((pattern)=>{
              
                if(
                    cells[pattern[0]] === '' ||
                    cells[pattern[1]] === '' ||
                    cells[pattern[2]] === '' 
                ){
                    //do nothing
                }else if(
                    cells[pattern[0]] === cells[pattern[1]] &&
                    cells[pattern[1]] === cells[pattern[2]] 
                ){
                    setWinner(cells[pattern[0]]);
                    console.log(cells[pattern[0]])
                }
            });
        }
    };




    //when the button is clicked the value will change.
    const handleClick = (num) => {
       
        if(squares[num] !== null){
            alert('already clicked');
            return;
        }
        let cells = [...squares];
       //alert(num);
       if (turn === 'x') {
           cells[num] = 'x';
           setTurn('o');
       } else {
           cells[num] = 'o';
           setTurn('x');
       }
       setSquares(cells);
       checkForWinner(cells);
    };
    //cell that it includes the value.
    const Square = ({num}) => {
        return <td onClick = {()=> handleClick(num)}> {squares[num]} </td>;
    }
    //for restarting
    
	const handleRestart = () => {
		setWinner(null);
		setSquares(Array(9).fill(null));
	};
    

  return (
      <>
      <div className='board'>
          
          <table>
              <tbody>
                  <tr>
                     <Square num={0}/>
                     <Square num={1}/>
                     <Square num={2}/>
                  </tr>
                  <tr>
                     <Square num={3}/>
                     <Square num={4}/>
                     <Square num={5}/>
                  </tr>
                  <tr>
                     <Square num={6}/>
                     <Square num={7}/>
                     <Square num={8}/>
                  </tr>
              </tbody>
          </table>
            <BackGround />
      </div>
       
        <Text>
            Turn : {turn}
        </Text>
        <Text >
            {winner && (
                <>
                <Text>{winner} is the winner!</Text>
                <button onClick={() => handleRestart()} style = {{
                 "position":"absolute",
                 "top":"200px",
                 "bottom":"100px",
                 "z-index":"100",
                 "height":"50px",
                 "width":"150px",
                 backgroundColor:"transparent",
                 color:"white",
                 border:"1.5px solid white"
                
                   

            }}>
                Play Again!
            </button>
                </>
            )} 
          
        </Text>

        
   </>
  )
}

const BackGround = ()=>{
    return (
        <>
        <div className="space stars1"></div>
        <div className="space stars2"></div>
        <div className="space stars3"></div>
        
        </>
    );
}
const Text = styled.h2`
    justify-content:end;
    display:flex;
    padding-right: 20px;
   
`;



