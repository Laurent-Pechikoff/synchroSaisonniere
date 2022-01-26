package fr.synchoSaiso.demo.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
	
}