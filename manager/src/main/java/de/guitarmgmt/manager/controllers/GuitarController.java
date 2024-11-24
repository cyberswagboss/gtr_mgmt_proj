package de.guitarmgmt.manager.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import de.guitarmgmt.manager.entities.Guitar;
import de.guitarmgmt.manager.services.GuitarService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/v1/guitars")
public class GuitarController {

    private GuitarService guitarService;

    public GuitarController(GuitarService service) {
        this.guitarService = service;
    }

    @PostMapping
    public ResponseEntity<Guitar> addGuitarPost(@RequestParam Guitar guitar) {
        return ResponseEntity.ok(guitarService.addGuitar(guitar));
    }

    @GetMapping("/id")
    public ResponseEntity<Guitar> getGuitarById(@RequestParam Long id) {
        if (guitarService.guitarExists(id)) {
            return ResponseEntity.ok(guitarService.getGuitarById(id));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Guitar>> getAllGuitars() {
        return ResponseEntity.ok(guitarService.getAllGuitars());
    }

    @GetMapping("/manufacturer")
    public ResponseEntity<List<Guitar>> getGuitarsByManufacturer(@RequestParam String name) {
        return ResponseEntity.ok(guitarService.getGuitarsByManufacturers(name));
    }

    @GetMapping("/bridge")
    public ResponseEntity<List<Guitar>> getGuitarsByBridge(@RequestParam String bridge) {
        return ResponseEntity.ok(guitarService.getGuitarsByBridge(bridge));
    }

    @GetMapping("/project")
    public ResponseEntity<List<Guitar>> getGuitarsByProject(@RequestParam String project) {
        return ResponseEntity.ok(guitarService.getGuitarsByProjects(project));
    }

    @GetMapping("/strings")
    public ResponseEntity<List<Guitar>> getGuitarsByStringNumber(@RequestParam int strings) {
        return ResponseEntity.ok(guitarService.getGuitarsByStrings(strings));
    }

    @GetMapping("/gauge")
    public ResponseEntity<List<Guitar>> getGuitarsByStringGauge(@RequestParam String gauge) {
        return ResponseEntity.ok(guitarService.getGuitarsByStringGauge(gauge));
    }

    @GetMapping("/scale")
    public ResponseEntity<List<Guitar>> getGuitarsByScale(@RequestParam double scale) {
        return ResponseEntity.ok(guitarService.getGuitarsByScaleLength(scale));
    }

    @GetMapping
    public ResponseEntity<List<Guitar>> getGuitarsByTuning(@RequestParam String tuning) {
        return ResponseEntity.ok(guitarService.getGuitarsByTuning(tuning));
    }

    @DeleteMapping
    public ResponseEntity<String> deleteGuitar(@RequestParam Long id) {
        if (!guitarService.guitarExists(id)) {
            return ResponseEntity.notFound().build();
        } else {
            guitarService.deleteGuitar(id);
            return ResponseEntity.ok("Guitar deleted successfully");
        }
    }

}
