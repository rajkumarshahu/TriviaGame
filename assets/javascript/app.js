const trivia = [
  {
    id: 1,
    question:
      "Where did Charlie Chaplin spend his remaining years after being exiled from the U.S. in 1953?",
    choices: ["England", "Switzerland", "Germany", "Holland"],
    answer: "Switzerland",
    gif: "assets/images/gif-01.gif",
  },
  {
    id: 2,
    question:
      "One main reason Charlie was exiled from the U.S. in 1953 was because he refused ______ ?",
    choices: [
      "to pay his taxes",
      "an Academy Award",
      "U.S. citizenship",
      "to meet the President",
    ],
    answer: "U.S. citizenship",
    gif: "assets/images/gif-02.gif",
  },
  {
    id: 3,
    question: "Which actor portrayed Charlie in the film 'Chaplin'?",
    choices: ["Robert Downey Jr.", "Tom Hanks", "Jim Carrey", "Joseph Fines"],
    answer: "Robert Downey Jr.",
    gif: "assets/images/gif-03.gif",
  },
  {
    id: 4,
    question:
      "In 'The Great Dictator', what famous leader did Charlie portray?",
    choices: ["Napoleon", "Adolf Hitler", "Caesar", "George Washington"],
    answer: "Adolf Hitler",
    gif: "assets/images/gif-04.gif",
  },
  {
    id: 5,
    question: "How many times was Charlie married?",
    choices: ["5", "7", "6", "4"],
    answer: "4",
    gif: "assets/images/gif-05.gif",
  },
  {
    id: 6,
    question: "What company did Charlie co-found in 1919?",
    choices: [
      "Columbia Pictures",
      "Paramount",
      "United Artists",
      "Warner Brothers",
    ],
    answer: "United Artists",
    gif: "assets/images/gif-06.gif",
  },
  {
    id: 7,
    question: "Which one of these isn't a Chaplin film?",
    choices: [
      "A Women of Paris",
      "City Lights",
      "The Life of a Tramp",
      " The Kid",
    ],
    answer: "The Life of a Tramp",
    gif: "assets/images/gif-07.gif",
  },
  {
    id: 8,
    question: "Where was Charlie Chaplin born?",
    choices: ["United States", "England", "France", "Australia"],
    answer: "England",
    gif: "assets/images/gif-08.gif",
  },
  {
    id: 9,
    question: "Charlie Chaplin's first solo appearance was in which film?",
    choices: ["One A. M.", "The Bank", "The Tramp", "The Adventurer "],
    answer: "One A. M.",
    gif: "assets/images/gif-09.gif",
  },
  {
    id: 10,
    question:
      'What other silent film funny-man appeared in "Limelight" with Chaplin?',
    choices: [
      "Harold Lloyd",
      "Buster Keaton",
      "John Gilbert",
      "William Haines",
    ],
    answer: "Buster Keaton",
    gif: "assets/images/gif-10.gif",
  },
];

let isAnswered, indexOfUserChoice, intervalId;
let currentQIndex = 0;
let notAnswered = 0;
let correctAns = 0;
let incorrectAns =0;



$(() => {
  $("#question-holder").hide();
  $("#play-again-btn").hide();
  $(".decision-container").hide();
  $("#remaining-time").hide();
  $(".result-container").hide();
// when start game clicked
  $("#start-btn").on("click", e => {
    $(e.currentTarget).hide();
    $(".result-container").hide();
    $("#about-charlie").hide();
    $("#question-holder").show();
    $("#remaining-time").show();
    startGame();
  });

  $("#play-again-btn").on("click", e => {
    $(e.currentTarget).hide();
    $(".result-container").hide();
    $("#question-holder").show();
    notAnswered = 0;
    correctAns = 0;
    incorrectAns =0;
    startGame();
  });

  let startGame = () => {
    currentQIndex = 0;
    indexOfUserChoice = null;
    trivialTrivia();
  };

  let trivialTrivia = () => {
    $("#question-holder").empty();
    $(".margin").show();
    $("#choices-holder").empty();
    $(".decision-container").hide();
    $("#remaining-time").show();
    isAnswered = true;
    indexOfUserChoice = null;


    $("#question-holder").html(`Q.(${trivia[currentQIndex].id}/${trivia.length}): ${trivia[currentQIndex].question}`);

    trivia[currentQIndex].choices = shuffleArray(trivia[currentQIndex].choices);

    for (var i = 0; i < trivia[currentQIndex].choices.length; i++) {
      var choicesHolder = $("#choices-holder");
      choicesHolder.append(
        '<li class="user-choices animated zoomIn delay-0.3s">' +
          trivia[currentQIndex].choices[i] +
          "</li>"
      );
    }

    getCountDown();

    $("li").click(e => {
      indexOfUserChoice = $(e.target).index(".user-choices");

      console.log('clicked index:');
      console.log(indexOfUserChoice);
      clearInterval(intervalId);

      getDecision();
    });
  };

  let getCountDown = () => {
    maxTime = 20;
    $("#remaining-time").html(`<h3>Time remaining: ${maxTime} seconds</h3>`);
    answered = true;
    intervalId = setInterval(showCountdown, 1000);
  };

  let showCountdown = () => {
    maxTime--;
    $("#remaining-time").html(`<h3>Time remaining: ${maxTime} seconds</h3>`);
    if (maxTime < 1) {
      clearInterval(intervalId);
      isAnswered = false;
      getDecision();
    }
  };

  let getDecision = () => {
    $("#question-holder").empty();
    $(".margin").hide();
    $("#choices-holder").empty();
    $(".decision-container").show();
    // //Test and debugging
    // console.log("trivia[currentQIndex].choices[indexOfUserChoice]: "+trivia[currentQIndex].choices[indexOfUserChoice]);
    // console.log("currentQIndex: "+ currentQIndex);
    // console.log("indexOfUserChoice: "+indexOfUserChoice);

    $(".image").attr("src", `${trivia[currentQIndex].gif}`);

    if( indexOfUserChoice == null) {
      notAnswered++;
      isAnswered = true;
      $("#remaining-time").hide();
      $(".message").html(`<div class="alert alert-info ml-4 mr-4 animated bounce" role="alert">
      <h3>Time ran out!!!<br> Correct answer is: <strong>${trivia[currentQIndex].answer}</strong></h3>
    </div>`);
    }else{
      if (
        trivia[currentQIndex].choices[indexOfUserChoice].localeCompare(
          trivia[currentQIndex].answer
        ) === 0 &&
        isAnswered == true
      ) {
        correctAns++
        $("#remaining-time").hide();
        $(".message").html(`<div class="alert alert-success ml-4 mr-4 animated fadeIn" role="alert">
        <h3>Correct!!! You got it right.<br>Your answered: <strong>${trivia[currentQIndex].answer}</strong></h3>
      </div>`);
        console.log("correct answer");
      } else {
        incorrectAns++
        $("#remaining-time").hide();
        $(".message").html(`<div class="alert alert-danger ml-4 mr-4 animated tada" role="alert">
        <h3>Incorrect!!!<br> Correct answer is: <strong>${trivia[currentQIndex].answer}.</strong> You answered:<strong>${trivia[currentQIndex].choices[indexOfUserChoice]}.</strong>  </h3>
      </div>`);
        isAnswered == true
        console.log("Sorry");
      }
    }

    if (currentQIndex == trivia.length - 1) {
      setTimeout(endGame, 5000);
    } else {
      currentQIndex++;
      setTimeout(trivialTrivia, 5000);
    }
  };

  let endGame = () => {
    $(".decision-container").hide();
    $(".result-container").show();
    $("#play-again-btn").show();
    $("#correct-ans").html(`Correct answers: ${correctAns}`);
    $("#incorrect-ans").html(`Incorrect answers: ${incorrectAns}`);
    $("#not-answered").html(`Not attempted: ${notAnswered}`);
  };

});

shuffleArray = ( array )=> {
  var counter = array.length, temp, index;
  while ( counter > 0 ) {
      index = Math.floor( Math.random() * counter );
      counter--;
      temp = array[ counter ];
      array[ counter ] = array[ index ];
      array[ index ] = temp;
  }
  return array;
}