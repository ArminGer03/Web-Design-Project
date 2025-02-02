package com.example.soalpich.models.dto;

import com.example.soalpich.models.business.User;

import java.util.ArrayList;
import java.util.List;

public class UserDTO {
    private String username;
    private int score;
    private int correct;
    private int rank;

    private List<User> following = new ArrayList<>();

    public UserDTO(User user) {
        this.username = user.getUsername();
        this.score = user.getScore();
        this.correct = user.getCorrect();
        this.rank = user.getRank();
        this.following = user.getFollowing();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
}
