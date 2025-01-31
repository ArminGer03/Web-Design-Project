package com.example.soalpich.models.dto;

import java.time.LocalDateTime;

public class UserRequest {
    private String username;

    private String email;

    private String password;

    private String role;

    private LocalDateTime createdAt;

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
