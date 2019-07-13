

//       show first question
//       show options
//       show countdown timer
//       show question number

// condition 1: if user selects right option
//         hide the question
//         show gif
// condition 2:  if countdown timer reaches zero
//         hide the question
//         show right answer
//         show gif
// condition 3:  if user selects wrong answer
//         hide the question
//         show right answer
//         show gif
// after above 3 conditions met move to next question
// after all questions attempted show score (number of correct answers, incorrect answers, unanswered) and start over button
// if user clicks start over button repeat the above process
let getDecision = ()=>{
  $("#question-holder").empty();
  $("#choices-holder").empty();


  console.log(trivia[currentQIndex].choices[indexOfUserChoice].localeCompare(trivia[currentQIndex].answer));
      $("#image").attr("src", `${trivia[currentQIndex].gif}`);
  if (
      trivia[currentQIndex].choices[indexOfUserChoice].localeCompare(trivia[currentQIndex].answer) ===
        0 &&
      isAnswered == true
    ) {

      console.log("correct answer");
    } else if(
      trivia[currentQIndex].choices[indexOfUserChoice].localeCompare(trivia[currentQIndex].answer) !=
        0 &&
      isAnswered == true
    ) {
      console.log("Sorry");
    }else{

        isAnswered = true;
    }

    if(currentQIndex == (trivia.length-1)){
  setTimeout(endGame, 5000)
} else{
  currentQIndex++;
      setTimeout(trivialTrivia, 5000);

}

}