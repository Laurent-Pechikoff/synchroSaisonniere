package fr.synchoSaiso.demo.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class RentCalendar {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idrentCalendar;
	
	private String rentCalendarcol;
	private String urlOrigin;
	
	//many to many sans propriété (table2/2)
	@JsonManagedReference
	@ManyToMany(mappedBy = "rentcalendars")
	private List<Actif> actifs = new ArrayList<>();
}
