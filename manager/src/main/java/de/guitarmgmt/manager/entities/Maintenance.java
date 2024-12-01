package de.guitarmgmt.manager.entities;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Maintenance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "guitar_id", nullable = false)
    private Guitar guitar;

    private LocalDate date;
    @Enumerated(EnumType.STRING)
    private MaintenanceType maintenanceType;
    private String notes;

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;

        Maintenance that = (Maintenance) o;

        if (id != null && that.id != null && !id.equals(that.id))
            return false; // Persistent entities with assigned IDs
        if (guitar != null ? !guitar.equals(that.guitar) : that.guitar != null)
            return false;
        if (date != null ? !date.equals(that.date) : that.date != null)
            return false;
        if (maintenanceType != that.maintenanceType)
            return false;
        return notes != null ? notes.equals(that.notes) : that.notes == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (guitar != null ? guitar.hashCode() : 0);
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + (maintenanceType != null ? maintenanceType.hashCode() : 0);
        result = 31 * result + (notes != null ? notes.hashCode() : 0);
        return result;
    }

}
