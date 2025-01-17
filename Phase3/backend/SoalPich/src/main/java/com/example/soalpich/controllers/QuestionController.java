package com.example.soalpich.controllers;

import com.example.soalpich.models.AnswerRequest;
import com.example.soalpich.models.Category;
import com.example.soalpich.models.CurrentUser;
import com.example.soalpich.models.Question;
import com.example.soalpich.services.QuestionService;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yaml.snakeyaml.util.Tuple;

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

    @GetMapping("/answer-category/{cat_id}")
    public ResponseEntity<List<Question>> getQuestionsByCategory(@PathVariable String cat_id){
        List<Question> question = questionService.getQuestionByQuestionCategory(cat_id);
        if (question != null) {
            return ResponseEntity.ok(question);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/answer-random")
    public ResponseEntity<Question> getRandomQuestion(){
        System.out.println("holla");
        Question question = questionService.getRandomQuestion();
        if (question != null) {
            return ResponseEntity.ok(question);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/update-score")
    public ResponseEntity<Void> getAnswer(@RequestBody AnswerRequest ans) {
        String id = ans.getQuestionId();
        int userAnswer = ans.getUserAnswer();
        int points = ans.getPoints();
        boolean res = questionService.checkAnswer(id, userAnswer, points);
        if(res){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/answered-questions/{cat_id}")
    public ResponseEntity<List<Question>> getAnsweredQuestions(@PathVariable String cat_id){
        List<Question> res = questionService.getAnsweredQuestions(cat_id);
        if (res != null) {
            return ResponseEntity.ok(res);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/user-answers/{cat_id}")
    public ResponseEntity<List<Integer>> getUserAnswers(@PathVariable String cat_id){
        List<Integer> res = questionService.getUserAnswers(cat_id);
        if (res != null) {
            return ResponseEntity.ok(res);
        }
        return ResponseEntity.notFound().build();
    }
}
