package com.example.soalpich.services;

import com.example.soalpich.models.Category;
import com.example.soalpich.models.CurrentUser;
import com.example.soalpich.models.Question;
import com.example.soalpich.repository.CategoryRepository;
import com.example.soalpich.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;


    public List<Question> getUserQuestions() {
        String currentUserId = CurrentUser.get().getId();
        List<Question> questions = questionRepository.findAll();
        return questions.stream()
                .filter(question -> question.getCreator().getId().equals(currentUserId))
                .collect(Collectors.toList());

    }

    public Question addQuestion(Question question){
        question.setCreatedAt(LocalDateTime.now());
        question.setUpdatedAt(LocalDateTime.now());
        question.setCreator(CurrentUser.get());
        return questionRepository.save(question);
    }

    public void deleteQuestion(String id){
        questionRepository.deleteById(id);
    }


    public Question getQuestionById(String id){
        List<Question> questions = questionRepository.findAll();
        for (Question question : questions) {
            if (Objects.equals(question.getId(), id)) {
                return question;
            }
        }
        return null;
    }


    public Question updateQuestion(String id, Question updatedQuestion){
        Question question = getQuestionById(id);
        if (question != null) {
            question.setQuestion(updatedQuestion.getQuestion());
            question.setOptions(updatedQuestion.getOptions());
            question.setDifficulty(updatedQuestion.getDifficulty());
            question.setCorrectOption(updatedQuestion.getCorrectOption());
            question.setCategory(updatedQuestion.getCategory());
            question.setUpdatedAt(LocalDateTime.now());
            return questionRepository.save(question);
        }
        return null;
    }
}
