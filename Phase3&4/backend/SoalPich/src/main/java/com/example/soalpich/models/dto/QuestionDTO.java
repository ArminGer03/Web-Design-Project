package com.example.soalpich.models.dto;

import com.example.soalpich.models.business.Category;
import com.example.soalpich.models.business.Question;

import java.util.List;

public class QuestionDTO {
    private String id;

    private String question;

    private List<String> options;

    private int correctOption;

    private String difficulty;

    private Category category;

    public QuestionDTO(Question question) {
        this.id = question.getId();
        this.question = question.getQuestion();
        this.options = question.getOptions();
        this.correctOption = question.getCorrectOption();
        this.difficulty = question.getDifficulty();
        this.category = question.getCategory();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public int getCorrectOption() {
        return correctOption;
    }

    public void setCorrectOption(int correctOption) {
        this.correctOption = correctOption;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
