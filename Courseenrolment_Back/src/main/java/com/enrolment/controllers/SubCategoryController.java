package com.enrolment.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enrolment.models.SubCategoryModel;
import com.enrolment.services.SubCategoryService;

@RestController
public class SubCategoryController {
	@Autowired
	private SubCategoryService subCategoryService;
	
	@PostMapping("addSubCategory")
	public String addSubCategory(@RequestParam("subCategoryName") String subCategoryName,@RequestParam("categoryId") long categoryId) {
		System.out.println(subCategoryName);
		System.out.println(categoryId);
		SubCategoryModel subCategoryModel = new SubCategoryModel();
		subCategoryModel.setSubCategoryName(subCategoryName);
		subCategoryModel.setCategoryId(categoryId);
		return subCategoryService.addSubCategory(subCategoryModel);
	}
	
	@GetMapping("getSubCategories")
	public List<SubCategoryModel> getSubCategories(){
		return subCategoryService.getSubCategories();
	}
	@GetMapping("getsubCategoriesCount")
	public String getsubCategoriesCount() {
		return subCategoryService.getsubCategoriesCount();
	}

}
