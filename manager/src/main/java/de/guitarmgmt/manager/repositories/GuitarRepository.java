package de.guitarmgmt.manager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import de.guitarmgmt.manager.entities.Guitar;
import java.util.List;


public interface GuitarRepository extends JpaRepository<Guitar, Long> {
    List<Guitar> findByManufacturer(String manufacturer);
    List<Guitar> findByBridge(String bridge);
    List<Guitar> findByAssociatedProjects(String associatedProjects);
    List<Guitar> findByNumberOfStrings(int numberOfStrings);
    List<Guitar> findByStringGauge(String stringGauge);
    List<Guitar> findByScaleLength(double scaleLength);
    List<Guitar> findByTuning(String tuning);
}
