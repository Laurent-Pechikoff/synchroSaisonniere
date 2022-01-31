package fr.synchoSaiso.demo.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import org.hibernate.annotations.ManyToAny;

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
	
	//many to many sans propriété (table 1/2)
	@ManyToMany
	@JoinTable(
			name = "actifRentCalendar",
			joinColumns = @JoinColumn(name = "actif_id"),
			inverseJoinColumns = @JoinColumn(name = "rentCalendar_id")
			)
	private List<RentCalendar> rentcalendars = new ArrayList<>();
	
	@OneToMany(
			mappedBy = "actif",
			cascade = CascadeType.ALL,
			orphanRemoval = true
			)
	private List<UsersActifs> users = new ArrayList<>();
}
