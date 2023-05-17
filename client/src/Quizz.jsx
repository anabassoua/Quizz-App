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

  const allAnswers = [
    ...quizzes[currentQ].incorrect_answers,
    quizzes[currentQ].correct_answer,
  ];
  console.log("test", allAnswers);

  const randomAnswers = allAnswers.sort(() => Math.random() - 0.5);

  console.log("random", randomAnswers);

  return (
    <div>
      <h1>Quizzle Of The Day 🤖</h1>
      {/*Box of question below*/}
      <h2>{quizzes.length > 0 && decode(quizzes[currentQ].question)}</h2>

      {randomAnswers.map((quizz, index) => {
        return <Box key={index}>{decode(quizz)}</Box>;
      })}
    </div>
  );
};

const Box = styled.div`
  display: flex;
`;
export default Quizz;
