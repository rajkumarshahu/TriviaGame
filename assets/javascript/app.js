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
      " The Life a Tramp",
      " The Kid",
    ],
    answer: "The Life a Tramp",
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

// when window loads show start game button

$(() => {
  $("#question-holder").hide();
  $("#play-again-btn").hide();
  $(".decision-container").hide();

// when start game clicked
  $("#start-btn").on("click", e => {
    $(e.currentTarget).hide();
    $("#question-holder").show();
    startGame();
  });

  $("#play-again-btn").on("click", e => {
    $(e.currentTarget).hide();
    $("#question-holder").show();
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
    isAnswered = true;
    indexOfUserChoice = null;


    $("#question-holder").html(trivia[currentQIndex].question);

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
    maxTime = 5;
    $("#remaining-time").text(maxTime);
    answered = true;
    intervalId = setInterval(showCountdown, 1000);
  };

  let showCountdown = () => {
    maxTime--;
    $("#remaining-time").text(maxTime);
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


    console.log("trivia[currentQIndex].choices[indexOfUserChoice]: "+trivia[currentQIndex].choices[indexOfUserChoice]);
    console.log("currentQIndex: "+ currentQIndex);

    console.log("indexOfUserChoice: "+indexOfUserChoice);

    $(".image").attr("src", `${trivia[currentQIndex].gif}`);

    if( indexOfUserChoice == null) {
      isAnswered = true;
      $(".message").text("Time ran out!!!");
    }else{
      if (
        trivia[currentQIndex].choices[indexOfUserChoice].localeCompare(
          trivia[currentQIndex].answer
        ) === 0 &&
        isAnswered == true
      ) {
        $(".message").text("Correct answer!!!");
        console.log("correct answer");
      } else {
        $(".message").text("Sorry incorrect answer!!!");
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
    $("#result-container").show();
    $("#play-again-btn").show();
  };

});
