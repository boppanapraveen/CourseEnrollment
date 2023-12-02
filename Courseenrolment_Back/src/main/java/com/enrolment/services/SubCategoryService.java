package com.enrolment.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enrolment.models.CategoryModel;
import com.enrolment.models.SubCategoryModel;
import com.enrolment.repositories.CategoryRepository;
import com.enrolment.repositories.SubCategoryRepository;


import jakarta.transaction.Transactional;

@Service
@Transactional
public class SubCategoryService {
	@Autowired
	private SubCategoryRepository subCategoryRepository;
	@Autowired
	private CategoryRepository categoryRepository;

	public String addSubCategory(SubCategoryModel subCategoryModel) {
		CategoryModel categoryModel = categoryRepository.findById(subCategoryModel.getCategoryId()).get();
		subCategoryModel.setCategoryModel(categoryModel);
		subCategoryRepository.save(subCategoryModel);
		return "SubCategory Added";
	}

	public List<SubCategoryModel> getSubCategories() {
		List<SubCategoryModel> subCategoryModelsList = subCategoryRepository.findAll();
		return subCategoryModelsList;
	}

	public String getsubCategoriesCount() {
		String subCategories = subCategoryRepository.getSubCategoryCount();
		return subCategories;
	}

	

}
