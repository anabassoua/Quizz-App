import styled from "styled-components";
import { useState, useEffect } from "react";

const Quizz = () => {
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <h1>Quizz</h1>;
};

export default Quizz;
