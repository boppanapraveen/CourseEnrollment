package com.enrolment.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.enrolment.models.StudentModel;

public interface StudentRepository extends JpaRepository<StudentModel, Long> {

	List<StudentModel> findByEmailOrPhone(String email, String phone);

	StudentModel findByEmail(String email);

}
