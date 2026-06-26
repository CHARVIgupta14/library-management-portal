package com.system.library.management;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class service {
    @Autowired
    repository repo;

    public Book Addbook(AddBook add) {
        Book book = new Book();
        book.setBookName(add.getTitle());
        book.setAuthor(add.getAuthor());
        return repo.save(book);
    }


    public Book issue(int id,int stuId, String stuName) {
        Book book = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        if(book.isIssued()){
                throw new RuntimeException(
                        "this book is already issued to other student"
                );}
                book.setIssued(true);
        book.setStuId(stuId);
        book.setStuName(stuName);
      return  repo.save(book);

    }
    public Book returnBook(int id){
        Book book=repo.findById(id).orElseThrow(() -> new RuntimeException("Book not found !"));
        book.setStuName(null);
        book.setStuId(null);
        book.setIssued(false);
        return repo.save(book);
    }
    public void deleteBook(int id){
        if(!repo.existsById(id)){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Book not found"
            );
        }

        repo.deleteById(id);
    }

}