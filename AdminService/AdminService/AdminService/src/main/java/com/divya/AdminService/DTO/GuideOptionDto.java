package com.divya.AdminService.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GuideOptionDto {
    private String guideId;
    private String guideName;
    private int preferenceOrder;
}
