package com.divya.AdminService.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileUploadResponse {
    private String fileName;
    private long size;
    private String message;
	public FileUploadResponse(String fileName, long size, String message) {
		super();
		this.fileName = fileName;
		this.size = size;
		this.message = message;
	}
    
    
}
