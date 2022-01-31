package fr.synchoSaiso.demo.entities;

import java.util.List;
import java.util.Objects;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
	private User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("actifId")
	private Actif actif;
	
	private String emailFemmeMenage;
	private String phoneFemmeMenage;
	
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
 
        if (o == null || getClass() != o.getClass())
            return false;
 
        UsersActifs that = (UsersActifs) o;
        return Objects.equals(user, that.user) &&
               Objects.equals(actif, that.actif);
    }
 
    @Override
    public int hashCode() {
        return Objects.hash(user, actif);
    }
}
