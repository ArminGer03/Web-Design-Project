package com.example.soalpich.repository;


import com.example.soalpich.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

}
