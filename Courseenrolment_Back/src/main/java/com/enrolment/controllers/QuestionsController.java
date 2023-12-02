package com.enrolment.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enrolment.models.QuestionsModel;
import com.enrolment.services.QuestionService;

@RestController
public class QuestionsController {
	@Autowired private QuestionService questionService;
	
	@PostMapping("addQuestions")
	public String addQuestions(@RequestBody QuestionsModel questionsModel,@RequestParam("videoId") long videoId) {
		return questionService.addQuestions(questionsModel,videoId);
	}
	
	@GetMapping("viewQuestions")
	public List<QuestionsModel> viewQuestions(@RequestParam("videoId") long videoId){
		return questionService.viewQuestions(videoId);
	}

}
