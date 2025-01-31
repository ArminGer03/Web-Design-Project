package com.example.soalpich.controllers;

import com.example.soalpich.models.business.User;
import com.example.soalpich.models.dto.UserDTO;
import com.example.soalpich.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/leaderboard")
    public ResponseEntity<List<UserDTO>> getLeaderboard() {
        List<UserDTO> users = userService.getLeaderBoard();
        if (users == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }


    @GetMapping("/view-following")
    public ResponseEntity<List<UserDTO>> getFollowing() {
        List<UserDTO> users = userService.getFollow();
        return ResponseEntity.ok(users);
    }


    @PostMapping("/follow-user")
    public ResponseEntity<?> followUser(@RequestBody Map<String, String> request) {
        String username = request.get("username");

       String response = userService.followUser(username);

       if (response.equals("success"))
           return ResponseEntity.ok(Map.of("success", true));
       else if (response.equals("User not found or user not a designer"))
           return ResponseEntity.ok().body(Map.of("success", false, "message", "User not found or not a designer"));
       else if (response.equals("the same user"))
           return ResponseEntity.ok().body(Map.of("success", false, "message", "User already followed"));
       return null;
    }

    @PostMapping("/unfollow-user")
    public ResponseEntity<?> unfollowUser(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        userService.unfollowUser(username);
        return ResponseEntity.ok().body(Map.of("success", true));
    }
}
