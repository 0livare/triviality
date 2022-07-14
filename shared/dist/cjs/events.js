"use strict";
exports.__esModule = true;
exports.GenericEvents = exports.BuzzEvents = exports.TriviaEvents = void 0;
var TriviaEvents;
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
})(TriviaEvents = exports.TriviaEvents || (exports.TriviaEvents = {}));
var BuzzEvents;
(function (BuzzEvents) {
    BuzzEvents["AddUser"] = "buzz--add user";
    BuzzEvents["GetUsers"] = "buzz--get users";
    BuzzEvents["StartGame"] = "buzz--start game";
    BuzzEvents["ResetGame"] = "buzz--reset game";
})(BuzzEvents = exports.BuzzEvents || (exports.BuzzEvents = {}));
var GenericEvents;
(function (GenericEvents) {
    GenericEvents["JoinRoom"] = "join room";
    GenericEvents["JoinedRoom"] = "joined room";
    GenericEvents["HostRoom"] = "host room";
})(GenericEvents = exports.GenericEvents || (exports.GenericEvents = {}));
