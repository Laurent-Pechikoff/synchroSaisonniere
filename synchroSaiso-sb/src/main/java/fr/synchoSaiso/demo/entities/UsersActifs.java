package fr.synchoSaiso.demo.entities;

import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class UsersActifs {

	@EmbeddedId
	private UsersActifsId id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("userId")
	@JoinColumn(name = "user_id")
	private User user;
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("actifId")
	@JoinColumn(name ="actif_id")
	private Actif actif;
	
	
	@Column(name = "email_femme_menage")
	private String emailFemmeMenage;
	@Column(name = "phone_femme_menage")
	private String phoneFemmeMenage;
	@Override
	public int hashCode() {
		return Objects.hash(actif, emailFemmeMenage, id, phoneFemmeMenage, user);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UsersActifs other = (UsersActifs) obj;
		return Objects.equals(actif, other.actif) && Objects.equals(emailFemmeMenage, other.emailFemmeMenage)
				&& Objects.equals(id, other.id) && Objects.equals(phoneFemmeMenage, other.phoneFemmeMenage)
				&& Objects.equals(user, other.user);
	}
	
	
}
