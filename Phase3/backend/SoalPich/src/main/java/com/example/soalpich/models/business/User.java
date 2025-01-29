package com.example.soalpich.models.business;

import com.example.soalpich.models.dto.UserRequest;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String username;

    private String email;

    private String password;

    private String role;

    private LocalDateTime createdAt;

    @DBRef
    private List<Question> answeredQuestions;

    @DBRef
    private List<User> following = new ArrayList<>();

    private int score;
    private int correct;
    private int rank;

    private List<Integer> userAnswer;

    public User() {
    }

    public User(String username, String email, String password, String role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = LocalDateTime.now();
    }

    public User(UserRequest userRequest) {
        this.username = userRequest.getUsername();
        this.email = userRequest.getEmail();
        this.password = userRequest.getPassword();
        this.role = userRequest.getRole();
        this.createdAt = LocalDateTime.now();
        this.answeredQuestions = new ArrayList<>();
        this.userAnswer = new ArrayList<>();
        this.score = 0;
        this.correct = 0;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<Question> getAnsweredQuestions() {
        return answeredQuestions;
    }

    public void setAnsweredQuestions(List<Question> answeredQuestions) {
        this.answeredQuestions = answeredQuestions;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getCorrect() {
        return correct;
    }

    public void setCorrect(int correct) {
        this.correct = correct;
    }

    public List<Integer> getUserAnswer() {
        return userAnswer;
    }

    public void setUserAnswer(List<Integer> userAnswer) {
        this.userAnswer = userAnswer;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", createdAt=" + createdAt +
                ", answeredQuestions=" + answeredQuestions +
                ", score=" + score +
                ", correct=" + correct +
                ", userAnswer=" + userAnswer +
                '}';
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }


    public List<User> getFollowing() {
        return following;
    }

    public void setFollowing(List<User> following) {
        this.following = following;
    }

    public void followUser(User user) {
        if (!following.contains(user)) {
            following.add(user);
        }
    }

    public void unfollowUser(User user) {
        following.remove(user);
    }
}

