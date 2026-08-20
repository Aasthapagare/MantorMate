package com.divya.AdminService.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AllocateGuideRequest {
    private Long groupId;
    private String guideId;
}
