package de.guitarmgmt.manager.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import de.guitarmgmt.manager.entities.Maintenance;
import de.guitarmgmt.manager.entities.MaintenanceType;
import de.guitarmgmt.manager.services.MaintenanceService;

@RestController
@RequestMapping("api/v1/maintenance")
public class MaintenanceController {

    private MaintenanceService maintenanceService;
    
    public MaintenanceController(MaintenanceService maintenanceService){
        this.maintenanceService = maintenanceService;
    }
    
    @PostMapping
    public ResponseEntity<Maintenance> addMaintenance(@RequestParam Maintenance maintenance){
        return ResponseEntity.ok(maintenanceService.addMaintenance(maintenance));
    }

    @GetMapping
    public ResponseEntity<Maintenance> getMaintenanceById(@RequestParam Long id){
        return ResponseEntity.ok(maintenanceService.getMaintenanceById(id));
    }

    @GetMapping
    public ResponseEntity<List<Maintenance>> getAllMaintenances(){
        return ResponseEntity.ok(maintenanceService.getAllMaintenances());
    }

    @GetMapping("/guitar")
    public ResponseEntity<List<Maintenance>> getMaintenancesByGuitar(@RequestParam Long id){
        return ResponseEntity.ok(maintenanceService.getAllMaintenancesByGuitar(id));
    }

    @GetMapping("/type")
    public ResponseEntity<List<Maintenance>> getMaintenancesByType(@RequestParam MaintenanceType type){
        return ResponseEntity.ok(maintenanceService.getAllMaintenancesByType(type));
    }

    @GetMapping("/date")
    public ResponseEntity<List<Maintenance>> getMaaintenancesByDate(@RequestParam LocalDate date){
        return ResponseEntity.ok(maintenanceService.getAllMaintenancesByDate(date));
    }

    @DeleteMapping
    public ResponseEntity<String> deleteMaintenance(Long maintenanceId){
        if(!maintenanceService.maintenanceExists(maintenanceId)){
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok("Maintenance No. " + maintenanceId + " deleted successfully");
        }
    }


}
