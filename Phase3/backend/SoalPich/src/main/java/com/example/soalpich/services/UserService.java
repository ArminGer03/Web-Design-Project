package com.example.soalpich.services;

import com.example.soalpich.models.business.User;
import com.example.soalpich.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAndRankAllUsers() {
        List<User> users = userRepository.findAll();
        users.sort(new Comparator<User>() {
            @Override
            public int compare(User u1, User u2) {
                return Integer.compare(u1.getScore(), u2.getScore());
            }
        });

        for (int i = 0 ; i < users.size() ; i++) {
            users.get(i).setRank(i + 1);
        }

        return users;
    }
}
