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

import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private String name;
	private String firstName;
	private String statutUsers;
	private String email;
	private String phone;
	private String password;
	
	@OneToMany(
			mappedBy = "user",
			cascade = CascadeType.ALL
			)
	@JsonManagedReference
	private List<UsersActifs> actifs = new ArrayList<>();
	//private Set<UsersActifs> uActifs;

	@Override
	public int hashCode() {
		return Objects.hash(actifs, email, firstName, id, name, password, phone, statutUsers);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		return Objects.equals(actifs, other.actifs) && Objects.equals(email, other.email)
				&& Objects.equals(firstName, other.firstName) && Objects.equals(id, other.id)
				&& Objects.equals(name, other.name) && Objects.equals(password, other.password)
				&& Objects.equals(phone, other.phone) && Objects.equals(statutUsers, other.statutUsers);
	}

	
	
}
