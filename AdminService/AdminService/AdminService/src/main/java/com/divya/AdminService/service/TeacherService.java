package com.divya.AdminService.service;

import com.divya.AdminService.entity.Teacher;
import com.divya.AdminService.repository.TeacherRepository;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;

    public String uploadTeachers(MultipartFile file) throws CsvException {

        if (file.isEmpty()) {
            throw new CsvException("File is empty");
        }

        List<Teacher> teachers = new ArrayList<>();

        try (CSVReader reader = new CSVReader(
                new InputStreamReader(file.getInputStream()))) {

            String[] row;
            int rowNumber = 0;

            reader.readNext(); // skip header

            while ((row = reader.readNext()) != null) {
                rowNumber++;

                if (row.length < 4) {
                    throw new CsvException("Invalid row at line " + rowNumber);
                }

                if (row[0].isBlank() || row[1].isBlank() || row[2].isBlank()
                        || row[3].isBlank()) {
                    throw new CsvException("Empty value at line " + rowNumber);
                }

                Teacher teacher = new Teacher();
                teacher.setEmployeeId(row[0].trim());
                teacher.setName(row[1].trim());
                teacher.setEmail(row[2].trim());
                teacher.setDepartment(row[3].trim());


                if (teacherRepository.existsByEmployeeId(teacher.getEmployeeId())) {
                    throw new CsvException("Teacher already exists with employeeId: " + teacher.getEmployeeId());
                }


                if (teacherRepository.existsByEmail(teacher.getEmail())) {
                    throw new CsvException(
                            "Duplicate email: " + teacher.getEmail()
                    );
                }

                teachers.add(teacher);
            }

            teacherRepository.saveAll(teachers);

        } catch (Exception e) {
            throw new CsvException("Teacher CSV upload failed: " + e.getMessage());
        }

        return teachers.size() + " teachers uploaded successfully";
    }
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }
    public void deleteTeacher(String employeeId) {

        Teacher teacher = teacherRepository.findByEmployeeId(employeeId)
                .orElseThrow(() ->
                        new RuntimeException("Teacher not found with employeeId: " + employeeId)
                );

        teacherRepository.delete(teacher);
    }

}
