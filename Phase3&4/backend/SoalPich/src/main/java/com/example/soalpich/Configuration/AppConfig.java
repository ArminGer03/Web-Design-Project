package com.example.soalpich.Configuration;
import com.example.soalpich.services.CategoryService;
import com.example.soalpich.services.QuestionService;
import com.example.soalpich.services.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public CategoryService categoryService() {
        return new CategoryService();
    }

    @Bean
    public QuestionService questionService() {
        return new QuestionService();
    }

    @Bean
    public UserService userService() {
        return new UserService();
    }
}
