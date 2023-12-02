package com.enrolment.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.enrolment.models.CategoryModel;
import com.enrolment.services.CategoryService;

@RestController
public class CategoryController {
	@Autowired
	private CategoryService categoryService;
	
	@PostMapping("addCategory")
	public String addCategory(@RequestBody CategoryModel categoryModel) {
		return categoryService.addCategory(categoryModel);
		
	}
	
	@GetMapping("getCategories")
	public List<CategoryModel> getCategories(){
		List<CategoryModel> categoryModelsList = categoryService.getCategories();
		return categoryModelsList;
	}
	
	@GetMapping("getCategoriesCount")
    public String getCategoriesCount() {
		return categoryService.getCategoriesCount();
	}

}
