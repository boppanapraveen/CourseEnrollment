package com.enrolment.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.enrolment.models.QuestionsModel;
import com.enrolment.models.VideosModel;

public interface QuestionRepository extends JpaRepository<QuestionsModel, Long> {

	List<QuestionsModel> findByQuestion(String question);

	List<QuestionsModel> findByVideosModel(VideosModel videosModel);


}
