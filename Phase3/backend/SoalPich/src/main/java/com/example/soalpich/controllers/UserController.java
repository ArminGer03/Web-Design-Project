package com.example.soalpich.controllers;

import com.example.soalpich.models.business.User;
import com.example.soalpich.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/leaderboard")
    public ResponseEntity<List<User>> getLeaderboard() {
        List<User> users = userService.getAndRankAllUsers();
        if (users == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }
}
