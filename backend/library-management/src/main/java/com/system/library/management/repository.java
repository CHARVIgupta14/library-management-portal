package com.system.library.management;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface repository extends JpaRepository<Book,Integer> {

    List<Book> findByBookNameContainingIgnoreCaseAndAuthorContainingIgnoreCase(String title, String author);
    List<Book> findByBookNameContainingIgnoreCase(String title);
    List<Book> findByAuthorContainingIgnoreCase(String title);
}
