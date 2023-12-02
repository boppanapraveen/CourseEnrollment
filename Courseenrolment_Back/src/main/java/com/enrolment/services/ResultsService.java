package com.enrolment.services;

import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.enrolment.models.CourseModel;
import com.enrolment.models.EnrollsModel;
import com.enrolment.models.QuestionsModel;
import com.enrolment.models.ResultsModel;
import com.enrolment.models.StudentModel;
import com.enrolment.models.VideosModel;
import com.enrolment.repositories.EnrollsRepository;
import com.enrolment.repositories.QuestionRepository;
import com.enrolment.repositories.ResultRepositroy;
import com.enrolment.repositories.StudentRepository;
import com.enrolment.repositories.VideosRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ResultsService {
	@Autowired private ResultRepositroy resultRepositroy;
	@Autowired private EnrollsRepository enrollsRepository;
	@Autowired private VideosRepository videosRepository;
	@Autowired private StudentRepository studentRepository;
	@Autowired private QuestionRepository questionRepository;

	public String writeQuestions(String name, List<ResultsModel> resultsModelList,long videoId) {
		VideosModel videosModel  = videosRepository.findById(videoId).get();
		CourseModel courseModel = videosModel.getSectionModel().getCourseModel();
		StudentModel studentModel = studentRepository.findByEmail(name);
		EnrollsModel enrollsModel = enrollsRepository.findByCourseModelAndStudentModel(courseModel,studentModel);
		Iterator<ResultsModel> iterator = resultsModelList.iterator();
		while(iterator.hasNext()) {
			ResultsModel resultsModel = iterator.next();
			System.out.println(resultsModel.getQuestionId());
			QuestionsModel questionsModel = questionRepository.findById(resultsModel.getQuestionId()).get();
			resultsModel.setQuestionsModel(questionsModel);
			resultsModel.setEnrollsModel(enrollsModel);
			resultsModel.setDate(new Date());
			resultRepositroy.save(resultsModel);
			
		}
		return "Your Response Submitted";
		
	}

	public List<ResultsModel> viewResults(long videoId) {
		VideosModel videosModel = videosRepository.findById(videoId).get();
		List<QuestionsModel> questionsModel = questionRepository.findByVideosModel(videosModel);
//		List<EnrollsModel> enrollsModelList = enrollsRepository.findByCourseModel(courseModel);
//		EnrollsModel enrollsModel = enrollsModelList.get(0);
		List<ResultsModel> resultsModelsList = resultRepositroy.findByQuestionsModelIn(questionsModel);
		return resultsModelsList;
	}

	public int getQuizCount(long videoId, String name) {
		VideosModel videosModel  = videosRepository.findById(videoId).get();
		List<QuestionsModel> questionsModel = questionRepository.findByVideosModel(videosModel);
		CourseModel courseModel = videosModel.getSectionModel().getCourseModel();
		StudentModel studentModel = studentRepository.findByEmail(name);
		EnrollsModel enrollsModel = enrollsRepository.findByCourseModelAndStudentModel(courseModel,studentModel);
		List<ResultsModel> resultsModelsList = resultRepositroy.findByQuestionsModelInAndEnrollsModel(questionsModel,enrollsModel);
		System.out.println(resultsModelsList.size());
		int count = resultsModelsList.size();
		return count;
	}

}
