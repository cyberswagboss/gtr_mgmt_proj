package de.guitarmgmt.manager.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.guitarmgmt.manager.entities.Maintenance;
import de.guitarmgmt.manager.entities.MaintenanceType;
import de.guitarmgmt.manager.repositories.GuitarRepository;
import de.guitarmgmt.manager.repositories.MaintenanceRepository;

@Service
public class MaintenanceService {

    private MaintenanceRepository maintenanceRepo;
    private GuitarService guitarService;

    public MaintenanceService(MaintenanceRepository maintenanceRepository, GuitarService guitarService) {
        this.maintenanceRepo = maintenanceRepository;
        this.guitarService = guitarService;
    }

    public Maintenance addMaintenance(Maintenance maintenance) throws IllegalArgumentException {
        if(!guitarService.guitarExists(maintenance.getGuitar().getId())){
            throw new IllegalArgumentException("Guitar does not exist");
        }
        return maintenanceRepo.save(maintenance);
    }

    public List<Maintenance> getAllMaintenances() {
        return maintenanceRepo.findAll();
    }

    public List<Maintenance> getAllMaintenancesByGuitar(Long id) {
        return maintenanceRepo.findByGuitarId(id);
    }

    public List<Maintenance> getAllMaintenancesByType(MaintenanceType type) {
        return maintenanceRepo.findByMaintenanceType(type);
    }

    public List<Maintenance> getAllMaintenancesByDate(LocalDate date) {
        return maintenanceRepo.findByDate(date);
    }


}
