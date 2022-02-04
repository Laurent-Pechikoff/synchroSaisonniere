package fr.synchoSaiso.demo.entities;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Rent {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private LocalDate startDate;
	private	LocalDate endDate;
	private LocalTime startHour;
	private LocalTime endHour;
	private String urlOrigin;
	private Long idOrigin;
	private String description;
	
	@ManyToOne
	@JsonBackReference
	private Actif actif;
}
