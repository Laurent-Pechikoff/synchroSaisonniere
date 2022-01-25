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
public class Actif {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idActifs;
	
	private String nameActifs;
	private String adresseActifs;
	private int cpActifs;
	private String villeActifs;
	private String longitudeActifs;
	private String latitudeActifs;
	private String numeroFiscalActifs;
	private String statutFiscalActifs;
	private String urlAirBnb;
	private String urlBooking;
	private String urlTripAdvisor;
	private String urlHomeAway;
	
}
