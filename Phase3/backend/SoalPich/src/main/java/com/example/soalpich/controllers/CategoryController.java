package com.example.soalpich.controllers;


import com.example.soalpich.models.Category;
import com.example.soalpich.services.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoryController {

    private final CategoryService categoryService;



    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/api/player-categories")
    public List<Category> getAllCategories(){
        return categoryService.getAllCategories();
    }


}