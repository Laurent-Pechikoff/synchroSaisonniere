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
	private Integer actifId;
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
	//private Set<UsersActifs> uActifs;

	@Override
	public int hashCode() {
		return Objects.hash(actifId, adresseActifs, cpActifs, latitudeActifs, longitudeActifs, nameActifs,
				numeroFiscalActifs, rentcalendars, statutFiscalActifs, urlAirBnb, urlBooking, urlHomeAway,
				urlTripAdvisor, users, villeActifs);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Actif other = (Actif) obj;
		return Objects.equals(actifId, other.actifId) && Objects.equals(adresseActifs, other.adresseActifs)
				&& cpActifs == other.cpActifs && Objects.equals(latitudeActifs, other.latitudeActifs)
				&& Objects.equals(longitudeActifs, other.longitudeActifs)
				&& Objects.equals(nameActifs, other.nameActifs)
				&& Objects.equals(numeroFiscalActifs, other.numeroFiscalActifs)
				&& Objects.equals(rentcalendars, other.rentcalendars)
				&& Objects.equals(statutFiscalActifs, other.statutFiscalActifs)
				&& Objects.equals(urlAirBnb, other.urlAirBnb) && Objects.equals(urlBooking, other.urlBooking)
				&& Objects.equals(urlHomeAway, other.urlHomeAway)
				&& Objects.equals(urlTripAdvisor, other.urlTripAdvisor) && Objects.equals(users, other.users)
				&& Objects.equals(villeActifs, other.villeActifs);
	}

	
	
}
