package com.example.soalpich.models;

public class AnswerRequest {
    private String questionId;
    private int points;
    private int userAnswer;

    public String getQuestionId() {
        return questionId;
    }

    public int getPoints() {
        return points;
    }

    public int getUserAnswer() {
        return userAnswer;
    }
}
