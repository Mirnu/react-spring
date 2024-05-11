package ru.Mirn.emsbackend.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.Mirn.emsbackend.dto.EmployeeDTO;
import ru.Mirn.emsbackend.entity.Employee;
import ru.Mirn.emsbackend.exception.ResourceNotFoundException;
import ru.Mirn.emsbackend.mapper.EmployeeMapper;
import ru.Mirn.emsbackend.repository.EmployeeRepository;
import ru.Mirn.emsbackend.service.EmployeeService;

import java.lang.reflect.Array;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;

    @Override
    public EmployeeDTO create(EmployeeDTO employeeDTO) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDTO);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDTO(savedEmployee);
    }

    @Override
    public EmployeeDTO getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee is not exists with given id : " + employeeId));

        return EmployeeMapper.mapToEmployeeDTO(employee);
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map(EmployeeMapper::mapToEmployeeDTO)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDTO updateEmployee(Long employeeId, EmployeeDTO updatedEmployeeDTO) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee is not exists with given id : " + employeeId));
        employee.setFirstName(updatedEmployeeDTO.getFirstName());
        employee.setLastName(updatedEmployeeDTO.getLastName());
        employee.setEmail(updatedEmployeeDTO.getEmail());

        Employee updatedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDTO(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                        .orElseThrow(() -> new ResourceNotFoundException("Employee is not exists with given id : " + employeeId));
        employeeRepository.deleteById(employeeId);
    }
}
