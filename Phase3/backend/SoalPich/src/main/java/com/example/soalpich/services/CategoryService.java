package com.example.soalpich.services;

import com.example.soalpich.models.Category;
import com.example.soalpich.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category addCategory(Category category){
        category.setCreatedAt(LocalDateTime.now());
        category.setUpdatedAt(LocalDateTime.now());
        return categoryRepository.save(category);
    }

    public void deleteCategory(String id){
        categoryRepository.deleteById(id);
    }


    public Category getCategoryById(String id){
        List<Category> categories = categoryRepository.findAll();
        for (Category category : categories) {
            if (Objects.equals(category.getId(), id)) {
                return category;
            }
        }
        return null;
    }

    public Category updateCategory(String id, Category updatedCategory){
        Category category = getCategoryById(id);
        if (category != null) {
            category.setName(updatedCategory.getName());
            category.setDescription(updatedCategory.getDescription());
            category.setUpdatedAt(LocalDateTime.now());
            return categoryRepository.save(category);
        }
        return null;
    }




}
