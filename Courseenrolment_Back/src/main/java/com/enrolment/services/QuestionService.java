package com.enrolment.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enrolment.models.QuestionsModel;
import com.enrolment.models.VideosModel;
import com.enrolment.repositories.QuestionRepository;
import com.enrolment.repositories.VideosRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class QuestionService {
	@Autowired private QuestionRepository questionRepository;
	@Autowired private VideosRepository videosRepository;

	public String addQuestions(QuestionsModel questionsModel, long videoId) {
		List<QuestionsModel> questionsList = questionRepository.findByQuestion(questionsModel.getQuestion());
		if(questionsList.size()>0) {
			return  "Question Exists";
		}else {
			VideosModel videosModel = videosRepository.findById(videoId).get();
			questionsModel.setVideosModel(videosModel);
			questionRepository.save(questionsModel);
			return "Question Added";
		}
	 }

	public List<QuestionsModel> viewQuestions(long videoId) {
		VideosModel videosModel = videosRepository.findById(videoId).get();
		List<QuestionsModel> questionsModelsList = questionRepository.findByVideosModel(videosModel);
		return questionsModelsList;
	}
	

}
