import styled from "styled-components";
import { useState, useEffect } from "react";
// the npm package html-entities gives us the ability to transform entities into characters.
import { decode } from "html-entities";

const Quizz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);

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
    if (answer === quizzes[currentQ].correct_answer) {
      console.log("good answer");
    } else {
      console.log("wrong answer");
    }
    // console.log("clicked");
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
        <h2>{quizzes.length > 0 && decode(quizzes[currentQ].question)}</h2>

        {randomAnswers.map((answer, index) => {
          return (
            <Buttons key={index} onClick={() => handleClick(answer)}>
              {decode(answer)}
            </Buttons>
          );
        })}
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
