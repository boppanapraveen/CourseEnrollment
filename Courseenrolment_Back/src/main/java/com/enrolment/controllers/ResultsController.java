package com.enrolment.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enrolment.models.ResultsModel;
import com.enrolment.services.ResultsService;

@RestController
public class ResultsController {
	@Autowired private ResultsService resultsService;
	
	@PostMapping("writeQuestions")
	public String writeQuestions(@RequestBody List<ResultsModel> resultsModel,Principal principal,@RequestParam("videoId") long videoId) {
		System.out.println(resultsModel);
		System.out.println("jii");
		return resultsService.writeQuestions(principal.getName(),resultsModel,videoId);
	}
	
	@GetMapping("viewResults")
	public List<ResultsModel> viewResults(@RequestParam("videoId") long videoId){
		return resultsService.viewResults(videoId);
	}
	
	@GetMapping("getQuizCount")
	public int getQuizCount(@RequestParam("videoId") long videoId,Principal principal) {
		return resultsService.getQuizCount(videoId,principal.getName());
		
	}
	

}
