package fr.synchoSaiso.demo.services;

import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import fr.synchoSaiso.demo.dao.ActifRepository;
import fr.synchoSaiso.demo.dao.RentRepository;
import fr.synchoSaiso.demo.entities.Rent;

@RestController
@CrossOrigin("*")
public class RentService {
	@Autowired
	private RentRepository rrp;
	@Autowired
	private ActifRepository arp;
	
	@GetMapping("/allRent")
	private List<Rent> getRents() {
		return rrp.findAll();
	}
	
	@GetMapping("/allRentByUser/{id}")
	private List<Rent> getRentsByUser(@PathParam ("id") Long id){
		return rrp.findByActifId(id);
	}
	@DeleteMapping("/supprimRent/{id}")
	private void deletRent(@PathParam ("id") Long id) {
		rrp.deleteById(id);
	}
	@PostMapping("/addRent/{id}")
	private void postRent(@RequestBody Rent rent, @PathParam ("id") Long id) {
		Rent newRent = new Rent();
		newRent = rent;
		newRent.setActif(arp.findById(id).orElse(null));
		
		rrp.save(newRent);
	}
}
