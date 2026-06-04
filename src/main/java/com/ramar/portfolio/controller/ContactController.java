package com.ramar.portfolio.controller;

import com.ramar.portfolio.model.ContactMessage;
import com.ramar.portfolio.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*") // Allows your HTML portfolio file to send data safely to port 8080
public class ContactController {

    private final ContactRepository contactRepository;

    @Autowired
    public ContactController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @PostMapping
    public ResponseEntity<String> saveMessage(@RequestBody ContactMessage message) {
        try {
            // Saves data straight to your MySQL database
            contactRepository.save(message);
            return ResponseEntity.ok("Message successfully written into the MySQL database!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving message: " + e.getMessage());
        }
    }
}