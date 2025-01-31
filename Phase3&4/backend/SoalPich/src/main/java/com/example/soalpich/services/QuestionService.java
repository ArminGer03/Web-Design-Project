package com.example.soalpich.services;

import com.example.soalpich.models.business.CurrentUser;
import com.example.soalpich.models.business.Question;
import com.example.soalpich.models.business.User;
import com.example.soalpich.repository.QuestionRepository;
import com.example.soalpich.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    @Cacheable(value = "questions", key = "#root.methodName")
    public List<Question> getUserQuestions() {
        String currentUserId = CurrentUser.get().getId();
        List<Question> questions = questionRepository.findAll();
        return questions.stream()
                .filter(question -> question.getCreator().getId().equals(currentUserId))
                .collect(Collectors.toList());
    }

    @CacheEvict(value = "questions", allEntries = true)
    public Question addQuestion(Question question) {
        question.setCreatedAt(LocalDateTime.now());
        question.setUpdatedAt(LocalDateTime.now());
        question.setCreator(CurrentUser.get());
        return questionRepository.save(question);
    }

    @CacheEvict(value = "questions", allEntries = true)
    public void deleteQuestion(String id) {
        questionRepository.deleteById(id);
    }

    @Cacheable(value = "question", key = "#id")
    public Question getQuestionById(String id) {
        Optional<Question> questionOpt = questionRepository.findById(id);
        return questionOpt.orElse(null);
    }

    @CacheEvict(value = {"questions", "question"}, key = "#id", allEntries = true)
    public Question updateQuestion(String id, Question updatedQuestion) {
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

    @Cacheable(value = "category-questions", key = "#questionCategory")
    public List<Question> getQuestionByQuestionCategory(String questionCategory) {
        List<Question> questions = questionRepository.findAll();
        List<Question> answered_questions = CurrentUser.get().getAnsweredQuestions();
        List<Question> filtered = new ArrayList<>();
        for (Question question : questions) {
            if (questionCategory.equals(question.getCategory().getId())) {
                if (answered_questions == null || !answered_questions.contains(question)) {
                    filtered.add(question);
                }
            }
        }
        return filtered;
    }

    @Cacheable(value = "random-question")
    public Question getRandomQuestion() {
        List<Question> questions = questionRepository.findAll();
        if (questions.isEmpty()) return null;
        Random random = new Random();
        int index = random.nextInt(questions.size());
        return questions.get(index);
    }

    @CacheEvict(value = "questions", allEntries = true)
    public boolean checkAnswer(String id, int userAnswer, int point) {
        User user = CurrentUser.get();
        Question question = getQuestionById(id);

        if (question == null) {
            return false;
        }

        user.getAnsweredQuestions().add(question);
        user.getUserAnswer().add(userAnswer);
        if (userAnswer == question.getCorrectOption()) {
            user.setScore(user.getScore() + point);
        }
        userRepository.save(user);
        return true;
    }

    @Cacheable(value = "answered-questions", key = "#id")
    public List<Question> getAnsweredQuestions(String id) {
        List<Question> questions = CurrentUser.get().getAnsweredQuestions();
        List<Question> filtered = new ArrayList<>();
        for (Question question : questions) {
            if (Objects.equals(question.getCategory().getId(), id)) {
                filtered.add(question);
            }
        }
        return filtered;
    }

    @Cacheable(value = "user-answers", key = "#id")
    public List<Integer> getUserAnswers(String id) {
        List<Question> questions = CurrentUser.get().getAnsweredQuestions();
        List<Integer> answered = CurrentUser.get().getUserAnswer();
        List<Integer> filtered = new ArrayList<>();
        if (answered.size() != questions.size()) {
            return null;
        }
        for (int i = 0; i < questions.size(); i++) {
            if (Objects.equals(questions.get(i).getCategory().getId(), id)) {
                filtered.add(answered.get(i));
            }
        }
        return filtered;
    }

    public List<Question> getQuestionsByCreator(String creatorUsername) {
        List<Question> questions = questionRepository.findAll();
        List<Question> filtered = new ArrayList<>();
        for (Question question : questions) {
            if (Objects.equals(question.getCreator().getUsername(), creatorUsername)) {
                filtered.add(question);
            }
        }
        return filtered;
    }
}
