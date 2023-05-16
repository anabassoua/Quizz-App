import styled from "styled-components";
import { useState, useEffect } from "react";
// the npm package html-entities gives us the ability to transform entities into characters.
import { decode } from "html-entities";

const Quizz = () => {
  const [quizzes, setQuizzes] = useState([]);

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

  return (
    <div>
      <h1>Quizzle Of The Day 🤖</h1>
      {/*Box of question below*/}
      {quizzes.map((quizz, index) => {
        return <Box key={index}>{decode(quizz.question)}</Box>;
      })}
    </div>
  );
};

const Box = styled.div`
  display: flex;
`;
export default Quizz;
