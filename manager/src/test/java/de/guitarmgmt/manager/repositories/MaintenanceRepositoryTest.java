package de.guitarmgmt.manager.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import de.guitarmgmt.manager.entities.Guitar;
import de.guitarmgmt.manager.entities.Maintenance;
import de.guitarmgmt.manager.entities.MaintenanceType;

@SpringBootTest
@ActiveProfiles("test")
class MaintenanceRepositoryTest {

    @Autowired
    MaintenanceRepository maintenanceRepo;

    @Autowired
    GuitarRepository geuitarRepo;

    @BeforeEach
    void cleanUpBeforeTest(){
        maintenanceRepo.deleteAll();
        geuitarRepo.deleteAll();
    }

    @AfterEach
    void cleanUpAfterTest(){
        maintenanceRepo.deleteAll();
        geuitarRepo.deleteAll();
    }

    @Test
    void testAddMaintenance(){
        Maintenance maintenance = new Maintenance();
        Guitar guitar = new Guitar();
        geuitarRepo.save(guitar);

        maintenance.setMaintenanceType(MaintenanceType.STRING_CHANGE);
        maintenance.setGuitar(guitar);

        assertEquals(maintenance, maintenanceRepo.save(maintenance));
    }
    
}
