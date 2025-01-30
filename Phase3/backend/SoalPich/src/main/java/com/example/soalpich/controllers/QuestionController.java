package com.example.soalpich.controllers;

import com.example.soalpich.models.dto.AnswerRequest;
import com.example.soalpich.models.business.Question;
import com.example.soalpich.models.dto.QuestionDTO;
import com.example.soalpich.services.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class QuestionController {

    private final QuestionService questionService;


    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }


    private List<QuestionDTO> convertToDTO(List<Question> questions) {
        if (questions == null)
            return null;

        List<QuestionDTO> questionDTOs = new ArrayList<>();
        for (Question question : questions) {
            questionDTOs.add(new QuestionDTO(question));
        }
        return questionDTOs;
    }

    @GetMapping("/view-questions")
    public List<QuestionDTO> getAllCategories(){
        return  convertToDTO(questionService.getUserQuestions());
    }

    @PostMapping("/create-question")
    public QuestionDTO createCategory(@RequestBody Question question){
        return new QuestionDTO(questionService.addQuestion(question));
    }

    @DeleteMapping("/delete-question/{id}")
    public void deleteQuestion(@PathVariable String id){
        questionService.deleteQuestion(id);
    }

    @PutMapping("/edit-question/{id}")
    public ResponseEntity<QuestionDTO> updateQuestion(@PathVariable String id, @RequestBody Question question){
        Question currentQuestion = questionService.getQuestionById(id);
        if (currentQuestion != null) {
            return ResponseEntity.ok(new QuestionDTO(questionService.updateQuestion(id, question)));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/question/{id}")
    public ResponseEntity<QuestionDTO> getSpecificQuestion(@PathVariable String id){
        Question question = questionService.getQuestionById(id);
        if (question != null) {
            return ResponseEntity.ok(new QuestionDTO(question));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/answer-category/{cat_id}")
    public ResponseEntity<List<QuestionDTO>> getQuestionsByCategory(@PathVariable String cat_id){
        List<Question> question = questionService.getQuestionByQuestionCategory(cat_id);
        if (question != null) {
            return ResponseEntity.ok(convertToDTO(question));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/answer-random")
    public ResponseEntity<QuestionDTO> getRandomQuestion(){
        Question question = questionService.getRandomQuestion();
        if (question != null) {
            return ResponseEntity.ok(new QuestionDTO(question));
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
    public ResponseEntity<List<QuestionDTO>> getAnsweredQuestions(@PathVariable String cat_id){
        List<Question> res = questionService.getAnsweredQuestions(cat_id);
        if (res != null) {
            return ResponseEntity.ok(convertToDTO(res));
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

    @GetMapping("/player-feed/{username}")
    public ResponseEntity<List<QuestionDTO>> getPlayerFeed(@PathVariable String username){
        return new ResponseEntity<>(convertToDTO(questionService.getQuestionsByCreator(username)), HttpStatus.OK);
    }
}
