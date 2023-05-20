# Quizz-App

## 🦉 Summary

Quizz Of The Day is a fun and interactive quiz application that allows users to test their general knowledge by answering a series of 10 random questions fetched from the Open Trivia Database API. It's built with React and utilizes hooks for state management. When the game starts, you have a random question with multiple choices as answers. As soon as the user selects an answer, the background of the answer turns green if it is good or in red if it is a bad answer. At the end of the game the user get the final score of the game and a Restart button to restart the game.

One of the challenges faced during the development of this application was managing the asynchronous nature of setting state in React. We initially faced issues when updating state using setTimeout, as the state update was asynchronous and didn't align with the intended user experience.We resolved this by introducing a new piece of state to control when the answer feedback (correct or incorrect) should be shown. This allowed us to correctly sequence the user's interaction, showing them whether their answer was correct or incorrect before moving onto the next question.

---

## Tech Stack 💻

- React.js: A JavaScript library for building user interfaces.
- Styled Components: A modern CSS-in-JS styling library for styling React components.
- html-entities: A package used for decoding entities into characters.
