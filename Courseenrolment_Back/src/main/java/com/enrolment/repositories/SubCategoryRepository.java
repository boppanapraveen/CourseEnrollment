package com.enrolment.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.enrolment.models.SubCategoryModel;

public interface SubCategoryRepository extends JpaRepository<SubCategoryModel, Long> {
	@Query(value = "select  count(*)  as total from sub_categories", nativeQuery = true)
	String getSubCategoryCount();

}
