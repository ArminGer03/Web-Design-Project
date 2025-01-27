package com.example.soalpich.repository;


import com.example.soalpich.models.business.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, String> {

}
