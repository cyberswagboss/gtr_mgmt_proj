package de.guitarmgmt.manager.services;

import java.util.List;

import org.springframework.stereotype.Service;

import de.guitarmgmt.manager.entities.Guitar;
import de.guitarmgmt.manager.repositories.GuitarRepository;

@Service
public class GuitarService {

    private GuitarRepository guitarRepo;

    public GuitarService(GuitarRepository guitarRepository){
        this.guitarRepo = guitarRepository;
    }

    public boolean guitarExists(Long id){
        return guitarRepo.existsById(id);
    }

    public Guitar addGuitar(Guitar newGuitar){
        return guitarRepo.save(newGuitar);
    }

    public Guitar getGuitarById(Long id){
        return guitarRepo.findById(id).get();
    }

    public List<Guitar> getAllGuitars(){
        return guitarRepo.findAll();
    }

    public List<Guitar> getGuitarsByManufacturers(String name){
        return guitarRepo.findByManufacturer(name);
    }

    public List<Guitar> getGuitarsByBridge(String bridge){
        return guitarRepo.findByBridge(bridge);
    }

    public List<Guitar> getGuitarsByProjects(String project){
        return guitarRepo.findByAssociatedProjects(project);
    }

    public List<Guitar> getGuitarsByStrings(int numberOfStrings){
        return guitarRepo.findByNumberOfStrings(numberOfStrings);
    }

    public List<Guitar> getGuitarsByStringGauge(String stringGauge){
        return guitarRepo.findByStringGauge(stringGauge);
    }

    public List<Guitar> getGuitarsByScaleLength(double scale){
        return guitarRepo.findByScaleLength(scale);
    }

    public List<Guitar> getGuitarsByTuning(String tuning){
        return guitarRepo.findByTuning(tuning);
    }

    public void deleteGuitar(Long id){
        guitarRepo.deleteById(id);
    }
}
