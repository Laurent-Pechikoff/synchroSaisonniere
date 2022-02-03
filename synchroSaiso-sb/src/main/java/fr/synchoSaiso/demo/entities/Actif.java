package fr.synchoSaiso.demo.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

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

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Actif {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Integer idActifs;
	private Long actifId;
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
	
//	//many to many sans propriété (table 1/2)
	@ManyToMany
	@JoinTable(
			name = "actifRentCalendar",
			joinColumns = @JoinColumn(name = "actif_id"),
			inverseJoinColumns = @JoinColumn(name = "rentCalendar_id")
			)
	@JsonBackReference
	private List<RentCalendar> rentcalendars = new ArrayList<>();
	
//	many to many user sans propriété (table2/2)
	@JsonManagedReference
	@ManyToMany(mappedBy = "actifs")
	private List<User> users = new ArrayList<>();
	
	
}
