package com.example.soalpich.services;

import com.example.soalpich.models.business.CurrentUser;
import com.example.soalpich.models.business.User;
import com.example.soalpich.models.dto.UserDTO;
import com.example.soalpich.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAndRankAllUsers() {
        List<User> users = userRepository.findAll();
        users.sort(new Comparator<User>() {
            @Override
            public int compare(User u1, User u2) {
                return Integer.compare(-u1.getScore(), -u2.getScore());
            }
        });

        for (int i = 0 ; i < users.size() ; i++) {
            users.get(i).setRank(i + 1);
        }

        return users;
    }

    public List<UserDTO> getLeaderBoard() {
        List<User> users = getAndRankAllUsers();
        if (users == null) {
            return null;
        }

        List<UserDTO> userDTOS = new ArrayList<>();
        for (User user : users) {
            if (!user.getRole().equals("designer")) {
                userDTOS.add(new UserDTO(user));
            }
        }
        return userDTOS;
    }

    public List<UserDTO> getFollow() {
        List<UserDTO> followingUsers = new ArrayList<>();
        for (User user : CurrentUser.get().getFollowing()) {
            followingUsers.add(new UserDTO(user));
        }
        return followingUsers;
    }

    public String followUser(String username){
        User userToFollow = userRepository.findByUsername(username).orElse(null);
        User currentUser = CurrentUser.get();

        if (userToFollow == null || !"designer".equals(userToFollow.getRole())) {
            return "User not found or user not a designer";
        }

        boolean new_user = true;
        for (User user : currentUser.getFollowing()){
            if (userToFollow.getId().equals(user.getId())){
                new_user = false;
                break;
            }
        }

        if (new_user) {
            currentUser.getFollowing().add(userToFollow);
            userRepository.save(currentUser);
            return "success";
        }

        return "the same user";
    }

    public void unfollowUser(String username){
        User userToUnFollow = null;
        for (User user : CurrentUser.get().getFollowing()){
            if (user.getUsername().equals(username)){
                userToUnFollow = user;
            }
        }
        CurrentUser.get().getFollowing().remove(userToUnFollow);
        userRepository.save(CurrentUser.get());
    }
}
