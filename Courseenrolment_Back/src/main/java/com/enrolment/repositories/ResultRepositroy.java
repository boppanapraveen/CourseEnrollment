package com.enrolment.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.enrolment.models.EnrollsModel;
import com.enrolment.models.QuestionsModel;
import com.enrolment.models.ResultsModel;

public interface ResultRepositroy extends JpaRepository<ResultsModel, Long> {

	List<ResultsModel> findByEnrollsModel(EnrollsModel enrollsModel);

	List<ResultsModel> findByQuestionsModelIn(List<QuestionsModel> questionsModel);

	List<ResultsModel> findByQuestionsModelAndEnrollsModel(QuestionsModel questionsModel, EnrollsModel enrollsModel);

	List<ResultsModel> findByQuestionsModelInAndEnrollsModel(List<QuestionsModel> questionsModel,
			EnrollsModel enrollsModel);

}
