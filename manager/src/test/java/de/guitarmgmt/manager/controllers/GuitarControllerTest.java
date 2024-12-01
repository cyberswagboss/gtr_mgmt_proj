package de.guitarmgmt.manager.controllers;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Collections;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import de.guitarmgmt.manager.entities.Guitar;
import de.guitarmgmt.manager.services.GuitarService;

@WebMvcTest(GuitarController.class)
@ActiveProfiles("test")
class GuitarControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GuitarService guitarService;

    private Guitar testGuitar;

    @BeforeEach
    public void setUp() {
        testGuitar = new Guitar();
        testGuitar.setId(1L);
        testGuitar.setManufacturer("Gibson");
        testGuitar.setModel("Les Paul");

    }

    @Test
    void testAddGuitarPost() throws Exception {
        when(guitarService.addGuitar(any())).thenReturn(testGuitar);

        mockMvc.perform(post("/api/v1/guitars")
                .param("guitar", "testGuitar")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.manufacturer").value("Gibson"));
    }

    @Test
    void testGetGuitarByIdExists() throws Exception {
        when(guitarService.guitarExists(1L)).thenReturn(true);
        when(guitarService.getGuitarById(1L)).thenReturn(Optional.of(testGuitar));

        mockMvc.perform(get("/api/v1/guitars/id")
                .param("id", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.manufacturer").value("Gibson"));
    }

    @Test
    void testGetGuitarByIdNotExists() throws Exception {
        when(guitarService.guitarExists(1L)).thenReturn(false);

        mockMvc.perform(get("/api/v1/guitars/id")
                .param("id", "1"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testGetAllGuitars() throws Exception {
        when(guitarService.getAllGuitars()).thenReturn(Collections.singletonList(testGuitar));

        mockMvc.perform(get("/api/v1/guitars"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].manufacturer").value("Gibson"));
    }

    @Test
    void testGetGuitarsByManufacturer() throws Exception {
        when(guitarService.getGuitarsByManufacturers("Gibson")).thenReturn(Collections.singletonList(testGuitar));

        mockMvc.perform(get("/api/v1/guitars/manufacturer")
                .param("name", "Gibson"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].manufacturer").value("Gibson"));
    }

    @Test
    void testDeleteGuitarExists() throws Exception {
        when(guitarService.guitarExists(1L)).thenReturn(true);

        mockMvc.perform(delete("/api/v1/guitars")
                .param("id", "1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Guitar deleted successfully"));
    }

    @Test
    void testDeleteGuitarNotExists() throws Exception {
        when(guitarService.guitarExists(1L)).thenReturn(false);

        mockMvc.perform(delete("/api/v1/guitars")
                .param("id", "1"))
                .andExpect(status().isNotFound());
    }
}
