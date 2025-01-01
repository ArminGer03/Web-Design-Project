package com.example.soalpich.repository;


import com.example.soalpich.models.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuestionRepository extends MongoRepository<Question, String> {

}
