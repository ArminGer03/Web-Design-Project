package com.example.soalpich.controllers;

import com.example.soalpich.models.Category;
import com.example.soalpich.models.CurrentUser;
import com.example.soalpich.models.Question;
import com.example.soalpich.services.QuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class QuestionController {

    private final QuestionService questionService;


    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/view-questions")
    public List<Question> getAllCategories(){
        return questionService.getUserQuestions();
    }

    @PostMapping("/create-question")
    public Question createCategory(@RequestBody Question question){
        return questionService.addQuestion(question);
    }

    @DeleteMapping("/delete-question/{id}")
    public void deleteCategory(@PathVariable String id){
        questionService.deleteQuestion(id);
    }

    @PutMapping("/edit-question/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable String id, @RequestBody Question question){
        Question currentQuestion = questionService.getQuestionById(id);
        if (currentQuestion != null) {
            return ResponseEntity.ok(questionService.updateQuestion(id, question));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/question/{id}")
    public ResponseEntity<Question> getSpecificQuestion(@PathVariable String id){
        Question question = questionService.getQuestionById(id);
        if (question != null) {
            return ResponseEntity.ok(question);
        }
        return ResponseEntity.notFound().build();
    }
}
