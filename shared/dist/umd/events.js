export var TriviaEvents;
(function (TriviaEvents) {
    TriviaEvents["AddUser"] = "trivia--add user";
    TriviaEvents["GetUsers"] = "trivia--get users";
    TriviaEvents["GetCurrentQuestionNumber"] = "trivia--get current question number";
    TriviaEvents["GetQuestionData"] = "trivia--get question data";
    TriviaEvents["StartGame"] = "trivia--start game";
    TriviaEvents["ResetGame"] = "trivia--reset game";
    TriviaEvents["NextQuestion"] = "trivia--next question";
    TriviaEvents["SubmitAnswer"] = "trivia--submit answer";
    TriviaEvents["GetGameResult"] = "trivia--get game result";
})(TriviaEvents || (TriviaEvents = {}));
export var BuzzEvents;
(function (BuzzEvents) {
    BuzzEvents["AddUser"] = "buzz--add user";
    BuzzEvents["GetUsers"] = "buzz--get users";
    BuzzEvents["StartGame"] = "buzz--start game";
    BuzzEvents["ResetGame"] = "buzz--reset game";
})(BuzzEvents || (BuzzEvents = {}));
