import styled from "styled-components";
import { useState, useEffect } from "react";
// the npm package html-entities gives us the ability to transform entities into characters.
import { decode } from "html-entities";

const Quizz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((resData) => {
        // We shuffling the answers and appending new property inside the function. its easier this way to shuffle everything at this step in order to get all the answers shuffled for the duration of the quizz.
        const shuffledAnswers = resData.results.map((answ) => {
          const answers = [...answ.incorrect_answers, answ.correct_answer];
          const randomAnswers = answers.sort(() => Math.random() - 0.5);
          return { ...answ, allAnswers: randomAnswers };
        });
        setQuizzes(shuffledAnswers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (quizzes.length === 0) {
    return <div>Loading...</div>; // Add a loading state while fetching data
  }

  const handleClick = (answer) => {
    setSelectedAnswer(answer);
    setTimeout(() => {
      if (answer === quizzes[currentQ].correct_answer) {
        setCurrentQ(currentQ + 1);
        setCount(count + 1);
      }

      if (currentQ === quizzes.length - 1) {
        setGameFinished(true);
        setScore(Math.floor((count / (quizzes.length - 1)) * 100));
        setCurrentQ(-1);
      } else {
        setCurrentQ(currentQ + 1);
        setSelectedAnswer(null);
      }
    }, 1000);
  };

  const handleRestart = () => {
    setGameFinished(false);
    setCurrentQ(0);
    setScore(0);
    setCount(0);
  };

  return (
    <Div>
      <Header>Quizzle Of The Day 🤖</Header>
      <h3>{!gameFinished && `Question ${currentQ + 1}/${quizzes.length}`}</h3>
      <h2>Score : {count}</h2>
      <Container>
        {gameFinished ? (
          <>
            <h1>Game Over</h1>
            <button onClick={handleRestart}>Restart Game</button>
            <h2>You have a score of {score}%</h2>
          </>
        ) : (
          <>
            <h2>{quizzes.length > 0 && decode(quizzes[currentQ].question)}</h2>
            {quizzes[currentQ].allAnswers.map((answer, index) => {
              const isCorrect = answer === quizzes[currentQ].correct_answer;
              const isSelected = answer === selectedAnswer;
              return (
                <Buttons
                  key={index}
                  onClick={() => handleClick(answer)}
                  style={{
                    background: isSelected
                      ? isCorrect
                        ? "green"
                        : "red"
                      : "none",
                  }}
                >
                  {decode(answer)}
                </Buttons>
              );
            })}
          </>
        )}
      </Container>
    </Div>
  );
};
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.h1`
  text-align: center;
`;

const Buttons = styled.button`
  margin-bottom: 15px;
  border: 1px solid gray;
  border-radius: 5px;
  width: 400px;
  height: 100px;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Container = styled.div`
  border: 1px solid green;
  padding: 15px;
  width: 700px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default Quizz;
