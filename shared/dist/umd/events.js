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
    TriviaEvents["CorrectAnswer"] = "trivia--correct answer";
    TriviaEvents["GetIsSubmitted"] = "trivia--get is submitted";
})(TriviaEvents || (TriviaEvents = {}));
export var BuzzEvents;
(function (BuzzEvents) {
    BuzzEvents["AddUser"] = "buzz--add user";
    BuzzEvents["GetUsers"] = "buzz--get users";
    BuzzEvents["StartGame"] = "buzz--start game";
    BuzzEvents["ResetGame"] = "buzz--reset game";
})(BuzzEvents || (BuzzEvents = {}));
export var GenericEvents;
(function (GenericEvents) {
    GenericEvents["JoinRoom"] = "join room";
    GenericEvents["JoinedRoom"] = "joined room";
    GenericEvents["HostRoom"] = "host room";
})(GenericEvents || (GenericEvents = {}));
