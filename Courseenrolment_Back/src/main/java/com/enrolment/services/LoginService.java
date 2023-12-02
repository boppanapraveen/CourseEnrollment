package com.enrolment.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.enrolment.models.LoginDetailsModel;
import com.enrolment.securityConfig.JwtTokenUtil;

import jakarta.transaction.Transactional;


@Service
@Transactional
public class LoginService {
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private LoginDetailsService loginDetailsService;
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	public ResponseEntity<String> loginAction(LoginDetailsModel loginDetailsModel) {
		System.out.println(loginDetailsModel.getEmail());
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDetailsModel.getEmail(), loginDetailsModel.getPassword()));
			
		}catch (DisabledException e) {
			return ResponseEntity.ok("Email Disabled");
		}
		catch (BadCredentialsException e) {
            return ResponseEntity.ok("Invalid Login Details");
        } catch (Exception e) {
            return ResponseEntity.ok("Invalid Login Details");
        }
		final UserDetails userDetails = loginDetailsService.loadUserByUsername(loginDetailsModel.getEmail());
        final String token = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(token);
	}
}
