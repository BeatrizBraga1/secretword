//css
import './App.css';
//components
import { StartScreen } from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';
//react
import {useCallback, useState, useEffect} from 'react';
//data
import {wordsList, WordsList} from './data/words';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState ("");
  const [letters, setLetters] = useState ([]);

  const pickWordAndCategory = () => {

    //essa função pega a categoria do objeto aleatoariamente
  
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //essa funcao pega a palavra da categoria do objeto aleatoriamente
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    console.log(word)

    return {word, category};

  }
  
  //start
  const startGame = () => {
    // pick word and pick category

    const {word, category } = pickWordAndCategory();

    //criar um array das letras

    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase())

    console.log(word, category);
    console.log(wordLetters);

    //setar os estados

    setPickedWord(word);
    setPickedCategory(category)
    setLetters(letters);

    setGameStage(stages[1].name)
  }
  // verify letter
  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  //
  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game verifyLetter={verifyLetter}/>}
      {gameStage === "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
