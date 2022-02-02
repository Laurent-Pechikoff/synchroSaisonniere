package fr.synchoSaiso.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import fr.synchoSaiso.demo.dao.ActifRepository;
import fr.synchoSaiso.demo.entities.Actif;

@RestController
@CrossOrigin("http://localhost:4200/")
public class ActifService {

	@Autowired
	private ActifRepository arp;
	
	@PostMapping("/addActif")
	private void addActif(@RequestBody Actif actif) {
		arp.save(actif);
	}
	
	@GetMapping("/getAllActifs")
	private List<Actif> getActifs() {
		return arp.findAll();
	}
	
	@GetMapping("/getActif/{id}")
	private Actif getActif(@PathVariable ("id") Integer id) {
		return arp.findById(id).orElse(null);
	}
	

	
	@DeleteMapping("/deleteActif/{id}")
	private void deleteActif(@PathVariable ("id") Integer id) {
		arp.deleteById(id);
	}
	
	
	
	
}
