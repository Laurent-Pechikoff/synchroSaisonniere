package fr.synchoSaiso.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.synchoSaiso.demo.dao.NavbarRepository;
import fr.synchoSaiso.demo.entities.NavBar;

@RestController
@CrossOrigin("*")
public class NavbarService {

	@Autowired
	private NavbarRepository nbrp;
	
	
	@PostMapping("/creaNavbar")
	private void creaNavBar() {
		nbrp.save(new NavBar(null, "Qui sommes nous?", "about", true, true, true, false));
		nbrp.save(new NavBar(null, "Vos Actifs", "actifs", false, true, true, true));
		nbrp.save(new NavBar(null, "Votre Agenda", "calendar", false, true, true, false));
		nbrp.save(new NavBar(null, "Vos Statistiques", "statistique", false, true, true, false));
		nbrp.save(new NavBar(null, "Administration", "admin", false, false, true, false));
	}
	@DeleteMapping("/deleteNavbar")
	private void deleteNavbar() {
		nbrp.deleteAll();
	}
	
}
