package com.system.library.management;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class controller {
@Autowired
service s;
@Autowired
repository repo;
@PostMapping("/api/books")
public ResponseEntity<Book> addbook(@RequestBody AddBook add){
    return  new ResponseEntity<>(s.Addbook(add), HttpStatus.CREATED);
}
@GetMapping("/api/books")
    public List<Book> showBooks(String title, String author) {

        if (title != null && author != null) {
            return repo.findByBookNameContainingIgnoreCaseAndAuthorContainingIgnoreCase(title, author);
        }

        if (title != null) {
            return repo.findByBookNameContainingIgnoreCase(title);
        }

        if (author != null) {
            return repo.findByAuthorContainingIgnoreCase(author);
        }

        return repo.findAll();
    }
    @PutMapping("/api/books/{id}/{stuId}/{stuName}/issue")
    public ResponseEntity<?> issue(@PathVariable int id, @PathVariable int stuId,@PathVariable String stuName){
    return ResponseEntity.ok(s.issue(id,stuId,stuName));
    }
    @PutMapping("/api/books/{id}/return")
    public ResponseEntity<?> returnBook (@PathVariable int id){
    return ResponseEntity.ok(s.returnBook(id));
    }
    @DeleteMapping("/api/books/{id}/delete")
    public ResponseEntity<?> deleteBook(@PathVariable int id){
    s.deleteBook(id);
    return ResponseEntity.ok("book deleted successfully");
    }
}
