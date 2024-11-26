package de.guitarmgmt.manager.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import de.guitarmgmt.manager.entities.Guitar;
import de.guitarmgmt.manager.repositories.GuitarRepository;

@SpringBootTest
public class GuitarServiceTest {

    @Mock
    GuitarRepository mockGuitarRepo;

    @InjectMocks
    GuitarService guitarService = new GuitarService(mockGuitarRepo);

    @Test
    void testAddGuitar(){
        Guitar guitar = new Guitar();
        guitar.setManufacturer("Gibson");

        when(mockGuitarRepo.save(guitar)).thenReturn(guitar);

        assertEquals(guitar, guitarService.addGuitar(guitar));
    }

    @Test
    void testGetGuitarById_found(){
        Guitar guitar = new Guitar();
        guitar.setManufacturer("Gibson");

        when(mockGuitarRepo.findById(guitar.getId())).thenReturn(Optional.of(guitar));

        assertEquals(guitar, guitarService.getGuitarById(guitar.getId()).get());
    }

    @Test
    void testGetGuitarById_notFound(){
        when(mockGuitarRepo.findById(1l)).thenReturn(Optional.empty());

        assertEquals(Optional.empty(), guitarService.getGuitarById(1l));
    }

    @Test
    void testGetAllGuitars_filledList(){
        List<Guitar> guitarList = new ArrayList<>();

        Guitar guitar1 = new Guitar();
        guitar1.setManufacturer("ESP");

        Guitar guitar2 = new Guitar();
        guitar2.setManufacturer("Fender");

        guitarList.add(guitar1);
        guitarList.add(guitar2);

        when(mockGuitarRepo.findAll()).thenReturn(guitarList);

        assertEquals(guitarList, guitarService.getAllGuitars());
    }

    @Test
    void testGetAllGuitars_emptyList(){
        List<Guitar> emptyList = new ArrayList<>();
        when(mockGuitarRepo.findAll()).thenReturn(emptyList);

        assertEquals(0, guitarService.getAllGuitars().size());
    }

    @Test
void testGetGuitarsByManufacturer_found() {
    List<Guitar> guitarList = new ArrayList<>();

    Guitar guitar1 = new Guitar();
    guitar1.setManufacturer("Gibson");

    Guitar guitar2 = new Guitar();
    guitar2.setManufacturer("Gibson");

    guitarList.add(guitar1);
    guitarList.add(guitar2);

    when(mockGuitarRepo.findByManufacturer("Gibson")).thenReturn(guitarList);

    assertEquals(guitarList, guitarService.getGuitarsByManufacturers("Gibson"));
}

@Test
void testGetGuitarsByBridge_found() {
    List<Guitar> guitarList = new ArrayList<>();

    Guitar guitar = new Guitar();
    guitar.setBridge("Floyd Rose");
    guitarList.add(guitar);

    when(mockGuitarRepo.findByBridge("Floyd Rose")).thenReturn(guitarList);

    assertEquals(guitarList, guitarService.getGuitarsByBridge("Floyd Rose"));
}

@Test
void testGetGuitarsByProjects_found() {
    List<Guitar> guitarList = new ArrayList<>();

    Guitar guitar = new Guitar();
    guitar.setAssociatedProjects("Recording");
    guitarList.add(guitar);

    when(mockGuitarRepo.findByAssociatedProjects("Recording")).thenReturn(guitarList);

    assertEquals(guitarList, guitarService.getGuitarsByProjects("Recording"));
}

@Test
void testGetGuitarsByStrings_found() {
    List<Guitar> guitarList = new ArrayList<>();

    Guitar guitar = new Guitar();
    guitar.setNumberOfStrings(6);
    guitarList.add(guitar);

    when(mockGuitarRepo.findByNumberOfStrings(6)).thenReturn(guitarList);

    assertEquals(guitarList, guitarService.getGuitarsByStrings(6));
}

@Test
void testGetGuitarsByStringGauge_found() {
    List<Guitar> guitarList = new ArrayList<>();

    Guitar guitar = new Guitar();
    guitar.setStringGauge("10-46");
    guitarList.add(guitar);

    when(mockGuitarRepo.findByStringGauge("10-46")).thenReturn(guitarList);

    assertEquals(guitarList, guitarService.getGuitarsByStringGauge("10-46"));
}

@Test
void testGetGuitarsByScaleLength_found() {
    List<Guitar> guitarList = new ArrayList<>();

    Guitar guitar = new Guitar();
    guitar.setScaleLength(25.5);
    guitarList.add(guitar);

    when(mockGuitarRepo.findByScaleLength(25.5)).thenReturn(guitarList);

    assertEquals(guitarList, guitarService.getGuitarsByScaleLength(25.5));
}

@Test
void testGetGuitarsByTuning_found() {
    List<Guitar> guitarList = new ArrayList<>();

    Guitar guitar = new Guitar();
    guitar.setTuning("E Standard");
    guitarList.add(guitar);

    when(mockGuitarRepo.findByTuning("E Standard")).thenReturn(guitarList);

    assertEquals(guitarList, guitarService.getGuitarsByTuning("E Standard"));
}

@Test
void testUpdateGuitarEntry_success() {
    Guitar existingGuitar = new Guitar();
    existingGuitar.setId(1L);
    existingGuitar.setManufacturer("Gibson");

    Guitar updatedGuitar = new Guitar();
    updatedGuitar.setManufacturer("Fender");

    when(mockGuitarRepo.existsById(1L)).thenReturn(true);
    when(mockGuitarRepo.save(updatedGuitar)).thenAnswer(invocation -> {
        Guitar g = invocation.getArgument(0);
        g.setId(1L);
        return g;
    });

    Guitar result = guitarService.updateGuitarEntry(updatedGuitar, 1L);

    assertEquals("Fender", result.getManufacturer());
    assertEquals(1L, result.getId());
}

@Test
void testUpdateGuitarEntry_notFound() {
    Guitar updatedGuitar = new Guitar();
    updatedGuitar.setManufacturer("Fender");

    when(mockGuitarRepo.existsById(1L)).thenReturn(false);

    try {
        guitarService.updateGuitarEntry(updatedGuitar, 1L);
    } catch (IllegalArgumentException ex) {
        assertEquals("Guitar with ID 1 not found", ex.getMessage());
    }
}

@Test
void testDeleteGuitar() {
    Long guitarId = 1L;

    guitarService.deleteGuitar(guitarId);

    verify(mockGuitarRepo, times(1)).deleteById(guitarId);
}



    
}
