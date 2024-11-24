package de.guitarmgmt.manager.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import de.guitarmgmt.manager.entities.Guitar;

// just some basic crud tests

@SpringBootTest
@ActiveProfiles("test")
class GuitarRepositoryTest {

    @Autowired
    private GuitarRepository guitarRepo;

    @BeforeEach
    void cleanUpBeforeTest() {
        System.out.println("Before Test: Count = " + guitarRepo.count());
        guitarRepo.deleteAll();
    }

    @AfterEach
    void cleanUpAfterTest() {
        System.out.println("After Test: Count = " + guitarRepo.count());
        guitarRepo.deleteAll();
    }

    @Test
    void testSave() {
        Guitar guitar = new Guitar();
        guitar.setManufacturer("Gibson");

        assertEquals(guitar, guitarRepo.save(guitar));
    }

    @Test
    void testDelete() {
        Guitar guitar = new Guitar();
        guitar.setManufacturer("Gibson");

        guitarRepo.save(guitar);
        assertEquals(guitarRepo.count(), 1l);

        guitarRepo.delete(guitar);
        assertEquals(guitarRepo.count(), 0l);
    }

    @Test
    void testCRUD() {
        Guitar guitar = new Guitar();
        guitar.setManufacturer("Gibson");
        Guitar savedGuitar = guitarRepo.save(guitar);

        assertNotNull(savedGuitar.getId());
        assertEquals("Gibson", savedGuitar.getManufacturer());

        Guitar retrievedGuitar = guitarRepo.findById(savedGuitar.getId())
                .orElseThrow(() -> new AssertionError("Guitar not found"));
        assertEquals(savedGuitar, retrievedGuitar);

        retrievedGuitar.setModel("Explorer");
        Guitar updatedGuitar = guitarRepo.save(retrievedGuitar);

        assertEquals("Explorer", updatedGuitar.getModel());
        assertEquals(savedGuitar.getId(), updatedGuitar.getId());

        guitarRepo.delete(updatedGuitar);
        assertEquals(0, guitarRepo.count());
    }

    @Test
    void testFindByManufacturer() {
        Guitar guitar1 = new Guitar();
        guitar1.setManufacturer("Fender");
        guitarRepo.save(guitar1);

        Guitar guitar2 = new Guitar();
        guitar2.setManufacturer("Fender");
        guitarRepo.save(guitar2);

        List<Guitar> results = guitarRepo.findByManufacturer("Fender");
        assertEquals(2, results.size());
        assertEquals("Fender", results.get(0).getManufacturer());
    }

    @Test
    void testFindByBridge() {
        Guitar guitar = new Guitar();
        guitar.setBridge("Tremolo");
        guitarRepo.save(guitar);

        List<Guitar> results = guitarRepo.findByBridge("Tremolo");
        assertEquals(1, results.size());
        assertEquals("Tremolo", results.get(0).getBridge());
    }

    @Test
    void testFindByAssociatedProjects() {
        Guitar guitar = new Guitar();
        guitar.setAssociatedProjects("Band A");
        guitarRepo.save(guitar);

        List<Guitar> results = guitarRepo.findByAssociatedProjects("Band A");
        assertEquals(1, results.size());
        assertEquals("Band A", results.get(0).getAssociatedProjects());
    }

    @Test
    void testFindByNumberOfStrings() {
        Guitar guitar = new Guitar();
        guitar.setNumberOfStrings(6);
        guitarRepo.save(guitar);

        List<Guitar> results = guitarRepo.findByNumberOfStrings(6);
        assertEquals(1, results.size());
        assertEquals(6, results.get(0).getNumberOfStrings());
    }

    @Test
    void testFindByStringGauge() {
        Guitar guitar = new Guitar();
        guitar.setStringGauge("10-46");
        guitarRepo.save(guitar);

        List<Guitar> results = guitarRepo.findByStringGauge("10-46");
        assertEquals(1, results.size());
        assertEquals("10-46", results.get(0).getStringGauge());
    }

    @Test
    void testFindByScaleLength() {
        Guitar guitar = new Guitar();
        guitar.setScaleLength(25.5);
        guitarRepo.save(guitar);

        List<Guitar> results = guitarRepo.findByScaleLength(25.5);
        assertEquals(1, results.size());
        assertEquals(25.5, results.get(0).getScaleLength());
    }

    @Test
    void testFindByTuning() {
        Guitar guitar = new Guitar();
        guitar.setTuning("E Standard");
        guitarRepo.save(guitar);

        List<Guitar> results = guitarRepo.findByTuning("E Standard");
        assertEquals(1, results.size());
        assertEquals("E Standard", results.get(0).getTuning());
    }

    @Test
    void testNoResults() {
        List<Guitar> results = guitarRepo.findByManufacturer("NonExistent");
        assertTrue(results.isEmpty());

        results = guitarRepo.findByBridge("NonExistent");
        assertTrue(results.isEmpty());

        results = guitarRepo.findByAssociatedProjects("NonExistent");
        assertTrue(results.isEmpty());

        results = guitarRepo.findByNumberOfStrings(12);
        assertTrue(results.isEmpty());

        results = guitarRepo.findByStringGauge("NonExistent");
        assertTrue(results.isEmpty());

        results = guitarRepo.findByScaleLength(99.9);
        assertTrue(results.isEmpty());

        results = guitarRepo.findByTuning("NonExistent");
        assertTrue(results.isEmpty());
    }

}