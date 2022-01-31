package fr.synchoSaiso.demo.entities;

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
public class UsersActifsId {
	
	private User user;
	private Actif actif;
	
	@ManyToOne(cascade = CascadeType.ALL)
    public User getUser() {
        return user;
    }
	public void setUser(User user) {
        this.user = user;
    }
	@ManyToOne(cascade = CascadeType.ALL)
    public Actif getActif() {
        return actif;
    }
 
    public void setActif(Actif actif) {
        this.actif = actif;
    }
	
}
