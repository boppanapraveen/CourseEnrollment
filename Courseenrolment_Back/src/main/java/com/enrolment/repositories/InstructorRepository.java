package com.enrolment.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.enrolment.models.InstructorModel;

public interface InstructorRepository extends JpaRepository<InstructorModel, Long> {

	List<InstructorModel> findByEmailOrPhone(String email, String phone);

	InstructorModel findByEmail(String email);
	@Query(value = "select  count(*)  as total from instructor", nativeQuery = true)
	String getInstructor();

}
