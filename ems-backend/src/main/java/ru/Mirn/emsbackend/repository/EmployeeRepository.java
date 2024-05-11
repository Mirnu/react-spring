package ru.Mirn.emsbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.Mirn.emsbackend.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
