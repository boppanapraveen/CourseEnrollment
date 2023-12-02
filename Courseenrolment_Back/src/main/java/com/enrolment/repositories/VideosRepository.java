package com.enrolment.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.enrolment.models.SectionModel;
import com.enrolment.models.VideosModel;

public interface VideosRepository extends JpaRepository<VideosModel, Long> {

	List<VideosModel> findBySectionModel(SectionModel sectionModel);

}
