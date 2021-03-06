package fr.synchoSaiso.demo.entities;

import java.util.ArrayList;
import java.util.Collection;
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
	private String name;
	private String type;
	private int surface;
	private int capacite;
	private int numero;
	private String rue;
	private int cp;
	private String ville;
	private String departement;
	private String region;
	private String pays;
	private String lat;
	private String lng;
	private String numeroFiscal;
	private String statutFiscal;
	private String urlAirBnb;
	private String urlBooking;
	private String urlTripAdvisor;
	private String urlHomeAway;
	
	

	
//	many to many user sans propriété (table2/2)
	@JsonBackReference(value = "list_user")
	@ManyToMany(mappedBy = "actifs")
	private List<User> users = new ArrayList<>();
	
	
	//relation avec rent
	@OneToMany(mappedBy = "actif")
	//@JsonBackReference(value = "list_rents")
	@JsonManagedReference(value = "list_rents")
	private Collection<Rent> rents;
	
}
