package de.guitarmgmt.manager.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import de.guitarmgmt.manager.entities.Maintenance;
import de.guitarmgmt.manager.entities.MaintenanceType;
import java.time.LocalDate;


public interface MaintenanceRepository extends JpaRepository<Maintenance, Long> {
    List<Maintenance> findByGuitarId(Long id);
    List<Maintenance> findByDate(LocalDate date);
    List<Maintenance> findByMaintenanceType(MaintenanceType maintenanceType);
}
