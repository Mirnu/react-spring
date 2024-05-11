package ru.Mirn.emsbackend.service;

import ru.Mirn.emsbackend.dto.EmployeeDTO;

import java.util.List;

public interface EmployeeService {
    EmployeeDTO create(EmployeeDTO employeeDTO);
    EmployeeDTO getEmployeeById(Long employeeId);
    List<EmployeeDTO> getAllEmployees();
    EmployeeDTO updateEmployee(Long employeeId, EmployeeDTO updatedEmployee);
    void deleteEmployee(Long employeeId);
}
