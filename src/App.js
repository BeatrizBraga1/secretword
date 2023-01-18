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
];

const guessesQty = 3;

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState ("");
  const [letters, setLetters] = useState ([]);

  //estado de letras advinhadas
  const [guessedLetters, setGuessedLetters] = useState([]);

  //estado de letras erradas
  const [wrongLetters, setWrongLetters] = useState([]);

  //estado de tentativas (chances)
  const [guesses, setGuesses] = useState(guessesQty);

  //pontuacao do jogo
  const [score, setScore] = useState(50);

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

    wordLetters = wordLetters.map((l) => l.toUpperCase());

    console.log(word, category);
    console.log(wordLetters);

    //setar os estados

    setPickedWord(word);
    setPickedCategory(category)
    setLetters(wordLetters);

    setGameStage(stages[1].name)
  }
  // verify letter
  const verifyLetter = (letter) => {
   
    const normalizedLetter = letter.toUpperCase();

    //validação se a letra ja foi utilizada de alguma maneira

    if(
      guessedLetters.includes(normalizedLetter) || 
      wrongLetters.includes(normalizedLetter)
      ) {
        return;
      }

      // incluir as letras ja usadas para acertadas ou erradas que o usuario jogar
      if(letters.includes(normalizedLetter)) {
          setGuessedLetters((actualGuessedLetters) => [
            ...actualGuessedLetters,
            normalizedLetter,
          ]);
      } else {
        setWrongLetters((actualWrongLetters) => [
          ...actualWrongLetters,
          normalizedLetter,
        ]);

        setGuesses((actualGuesses) => actualGuesses - 1);
      }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  useEffect(() => {
    if(guesses <= 0){
      //resetar todos states

      clearLetterStates();

      setGameStage(stages[2].name)
    }

  }, [guesses])


  //
  const retry = () => {

    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game 
      verifyLetter={verifyLetter} 
      pickedWord={pickedWord} 
      pickedCategory={pickedCategory}
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}
      />}
      {gameStage === "end" && <GameOver 
      retry={retry}
      score={score}
       />}
    </div>
  );
}

export default App;
