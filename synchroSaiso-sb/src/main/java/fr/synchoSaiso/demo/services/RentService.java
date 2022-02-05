package fr.synchoSaiso.demo.services;

import java.util.ArrayList;
import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import fr.synchoSaiso.demo.dao.ActifRepository;
import fr.synchoSaiso.demo.dao.RentRepository;
import fr.synchoSaiso.demo.entities.Actif;
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
	
	
	
	@GetMapping("/allRentByActif/{id}")
	private List<Rent> getRentsByUser(@PathVariable ("id") int id){
		
		
		return rrp.findByActifId(id);
	}
	@DeleteMapping("/supprimRent/{id}")
	private void deletRent(@PathVariable ("id") Long id) {
		rrp.deleteById(id);
	}
	
	private void postRent(Long id,Rent rent) {
		Rent newRent = new Rent();
		newRent = rent;
		Actif actif = arp.findById(id).orElse(null);
		newRent.setActif(actif);
		actif.getRents().add(newRent);
		
		rrp.save(newRent);
		arp.save(actif);
	}
	@PostMapping("/addRent/{id}")
	private void postListRent(@PathVariable ("id") Long id,@RequestBody List<Rent> rents) {
		for (Rent rent : rents) {
			postRent(id,rent);
		}
	}
}
