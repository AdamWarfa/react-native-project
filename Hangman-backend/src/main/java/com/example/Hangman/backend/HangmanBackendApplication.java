package com.example.Hangman.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HangmanBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(HangmanBackendApplication.class, args);
	}

}
