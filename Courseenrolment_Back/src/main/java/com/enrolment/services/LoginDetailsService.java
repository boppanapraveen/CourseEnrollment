package com.enrolment.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.enrolment.models.LoginDetailsModel;
import com.enrolment.repositories.LoginDetailsRepository;
import com.enrolment.securityConfig.JwtTokenUtil;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class LoginDetailsService implements UserDetailsService{
	
	@Autowired
	private LoginDetailsRepository loginDetailsRepository;
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
		LoginDetailsModel loginDetailsModel  = loginDetailsRepository.findByEmail(email);
		if(loginDetailsModel == null) {
			throw new UsernameNotFoundException("Invalid Email Address") ;
		}
		List<SimpleGrantedAuthority> grantedAuthorities = new ArrayList<SimpleGrantedAuthority>();
		SimpleGrantedAuthority authority = new SimpleGrantedAuthority(loginDetailsModel.getRole());
		grantedAuthorities.add(authority);
		return new User(loginDetailsModel.getEmail(),loginDetailsModel.getPassword(),grantedAuthorities);
		
	}
	
	

}
