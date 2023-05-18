import styled from "styled-components";
import { useState, useEffect } from "react";
// the npm package html-entities gives us the ability to transform entities into characters.
import { decode } from "html-entities";

const Quizz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData.results);
        setQuizzes(resData.results);
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
      }

      if (currentQ === quizzes.length - 1) {
        setGameFinished(true);
      } else {
        setCurrentQ(currentQ + 1);
        setSelectedAnswer(null);
      }
    }, 1000);
  };

  const allAnswers = [
    ...quizzes[currentQ].incorrect_answers,
    quizzes[currentQ].correct_answer,
  ];
  console.log("test", allAnswers);

  const randomAnswers = allAnswers.sort(() => Math.random() - 0.5);

  console.log("random", randomAnswers);

  return (
    <Div>
      <Header>Quizzle Of The Day 🤖</Header>
      <Container>
        {gameFinished ? (
          <>
            <h1>Game Over</h1>
            <button>Restart Game</button>
          </>
        ) : (
          <>
            <h2>{quizzes.length > 0 && decode(quizzes[currentQ].question)}</h2>
            {randomAnswers.map((answer, index) => {
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
