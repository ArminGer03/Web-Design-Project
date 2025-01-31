package com.example.soalpich.models.business;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "questions")
public class Question {

    @Id
    private String id;

    private String question;

    private List<String> options;

    private int correctOption;

    private String difficulty;

    @DBRef
    private Category category;

    @DBRef
    private List<Question> relevantQuestions;

    @DBRef
    private User creator;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Question() {
    }

    public Question(String question, List<String> options, int correctOption, String difficulty, Category category, User creator) {
        this.question = question;
        this.options = options;
        this.correctOption = correctOption;
        this.difficulty = difficulty;
        this.category = category;
        this.creator = creator;
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

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public List<Question> getRelevantQuestions() {
        return relevantQuestions;
    }

    public void setRelevantQuestions(List<Question> relevantQuestions) {
        this.relevantQuestions = relevantQuestions;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "Question{" +
                "id='" + id + '\'' +
                ", question='" + question + '\'' +
                ", options=" + options +
                ", correctOption=" + correctOption +
                ", difficulty='" + difficulty + '\'' +
                ", category=" + category +
                ", relevantQuestions=" + relevantQuestions +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
