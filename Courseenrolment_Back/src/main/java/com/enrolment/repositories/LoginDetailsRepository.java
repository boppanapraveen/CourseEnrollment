package com.enrolment.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.enrolment.models.LoginDetailsModel;
@Repository
public interface LoginDetailsRepository extends JpaRepository<LoginDetailsModel, Long> {

	LoginDetailsModel findByEmail(String email);

}
