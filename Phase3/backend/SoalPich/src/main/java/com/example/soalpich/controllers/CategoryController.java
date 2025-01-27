package com.example.soalpich.controllers;


import com.example.soalpich.models.business.Category;
import com.example.soalpich.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoryController {

    private final CategoryService categoryService;



    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/view-categories")
    public List<Category> getAllCategories(){
        return categoryService.getAllCategories();
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<Category> getSpecificCategory(@PathVariable String id){
        Category category = categoryService.getCategoryById(id);
        if (category != null) {
            return ResponseEntity.ok(category);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/create-category")
    public Category createCategory(@RequestBody Category category){
        return categoryService.addCategory(category);
    }

    @DeleteMapping("/delete-category/{id}")
    public void deleteCategory(@PathVariable String id){
        categoryService.deleteCategory(id);
    }

    @PutMapping("/edit-category/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable String id, @RequestBody Category category){
        Category currentCategory = categoryService.getCategoryById(id);
        if (currentCategory != null) {
            return ResponseEntity.ok(categoryService.updateCategory(id, category));
        }
        return ResponseEntity.notFound().build();
    }


}