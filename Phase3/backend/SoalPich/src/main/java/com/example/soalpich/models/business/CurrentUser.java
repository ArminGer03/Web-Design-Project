package com.example.soalpich.models.business;

public class CurrentUser {
    private static User currentUser = new User();

    public static void set(User user) {
        currentUser = user;
    }

    public static User get() {
        return currentUser;
    }

    public static void clear() {
        currentUser = null;
    }
}
