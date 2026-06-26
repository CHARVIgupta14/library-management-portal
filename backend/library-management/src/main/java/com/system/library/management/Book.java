package com.system.library.management;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.AnyDiscriminatorImplicitValues;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
private int bookId;
    @Column(nullable = false,length = 200)
    private String author;
    @Column(nullable = false,length = 200)
    private String bookName;
    @Column(nullable = false)
    private boolean isIssued;

private Integer stuId;
@Column(length = 200)
private String stuName;
    private LocalDateTime dateAdded;
    private LocalDateTime lastModified;
    @PrePersist
    public void onCreate() {
        dateAdded = LocalDateTime.now();
        lastModified = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        lastModified = LocalDateTime.now();
    }

}
