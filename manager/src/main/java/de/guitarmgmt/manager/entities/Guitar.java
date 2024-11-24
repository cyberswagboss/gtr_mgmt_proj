package de.guitarmgmt.manager.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.ToString;

@Data
@Entity
public class Guitar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // general info
    private String manufacturer;
    private String model;
    private String serial;

    // player specific info
    private int numberOfStrings;
    private String tuning;
    private String stringGauge;
    private String associatedProjects;

    // body info
    private String bodyMaterial;
    private String neckMaterial;
    private String fretboardMaterial;
    private int numberOfFrets;
    private double scaleLength;

    // hw info
    private String bridge;
    private String pickupLayout;
    private String brigdePickup;
    private String neckPickup;

    // maintenance list
    @OneToMany(mappedBy = "guitar", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List <Maintenance> maintenance;
    
}
