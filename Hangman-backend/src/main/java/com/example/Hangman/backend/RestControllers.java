package com.example.Hangman.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RestControllers {

    private String url = "https://random-word-api.herokuapp.com/word";
    private String fetchedWord;

    @GetMapping(value = "/hello", produces = "application/json")
    public ResponseEntity<String> getHello() {
        // Process the response data as needed
        if (fetchedWord != null) {
            System.out.println("Fetched Word: " + fetchedWord);

            // Return the JSON array as a string
            return new ResponseEntity<>(fetchedWord, HttpStatus.OK);
        } else {
            System.out.println("Failed to fetch data.");

            // Return an error response
            return new ResponseEntity<>("Failed to fetch data.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Scheduled(fixedRate = 24 * 60 * 60 * 1000)
    public void fetchData() {
        // Use the FetchWord class to fetch data
        fetchedWord = FetchWord.fetchDataFromUrl(url);
    }
}
