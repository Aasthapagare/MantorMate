package com.divya.AdminService.service;

import com.divya.AdminService.entity.Student;
import com.divya.AdminService.entity.Teacher;
import com.divya.AdminService.repository.StudentRepository;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public void uploadStudents(MultipartFile file) throws Exception {
        try (CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()))) {

            List<String[]> rows = reader.readAll();
            

            for (int i = 1; i < rows.size(); i++) { // skip header

                String[] row = rows.get(i);

                if (row.length < 5) {
                    throw new RuntimeException("Invalid CSV format at row " + (i + 1));
                }
                if (row[0].isBlank() || row[1].isBlank() || row[2].isBlank()
                        || row[3].isBlank() || row[4].isBlank()) {

                    throw new RuntimeException("Empty value found at row " + (i + 1));
                }

                Student student = new Student();
                student.setRollNo(row[0].trim());
                student.setName(row[1].trim());
                student.setEmail(row[2].trim());
                student.setDepartment(row[3].trim());
                student.setYear(Integer.parseInt(row[4].trim()));

                if (studentRepository.existsByEmail(student.getEmail())) {
                    throw new CsvException("Student with email " + student.getEmail() + " already exists");
                }

                if (studentRepository.existsByRollNo(student.getRollNo())) {
                    throw new CsvException(
                            "Duplicate roll number: " + student.getRollNo()
                    );
                }


                studentRepository.save(student);
            }
        }
    }
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    public void deleteStudent(String rollNo) {

        Student student = studentRepository.findByRollNo(rollNo)
                .orElseThrow(() ->
                        new RuntimeException("Teacher not found with employeeId: " + rollNo)
                );

        studentRepository.delete(student);
    }


}
