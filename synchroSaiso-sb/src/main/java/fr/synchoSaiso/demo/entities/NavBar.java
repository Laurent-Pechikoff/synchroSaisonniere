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
public class NavBar {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idNavBar;
	
	private String item;
	private String routerLink;
	private boolean roleVisiteur;
	private boolean roleUser;
	private boolean roleAdmin;
	private boolean navbarVert;
}
