package fr.synchoSaiso.demo.entities;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Embeddable
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class UsersActifsId implements Serializable{
	
	@Column(name ="user_id")
	private Integer userId;
	@Column(name ="actif_id")
	private Integer actifId;
//	
	@Override
	public int hashCode() {
		return Objects.hash(actifId, userId);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UsersActifsId other = (UsersActifsId) obj;
		return Objects.equals(actifId, other.actifId) && Objects.equals(userId, other.userId);
	}
	
	
	
	
	
}
