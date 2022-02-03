package fr.synchoSaiso.demo.services;

import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import fr.synchoSaiso.demo.dao.ActifRepository;
import fr.synchoSaiso.demo.dao.UserRepository;
import fr.synchoSaiso.demo.entities.Actif;
import fr.synchoSaiso.demo.entities.User;

@RestController
@CrossOrigin("http://localhost:4200/")
public class ActifService {

	@Autowired
	private ActifRepository arp;
	@Autowired
	private UserRepository urp;
	
	@PostMapping("/addActif/{id}")
	private void addActif(@RequestBody Actif actif,@PathVariable ("id") Long id) {
		User userTrouve =new User();
		userTrouve = urp.findById(id).orElse(null);
		//userTrouve.setId(id);
		actif.getUsers().add(userTrouve);
		arp.save(actif);
		userTrouve.getActifs().add(actif);
		urp.save(userTrouve);
	}
	
	
	
	@GetMapping("/getAllActifs")
	private List<Actif> getActifs() {
		return arp.findAll();
	}
	
	@GetMapping("/getAllActifsByUser/{id}")
	private List<Actif> getAllActifByUser(@PathVariable ("id") Long id){
		
		return arp.findByUsersId(id);
	}
	
	@GetMapping("/getActif/{id}")
	private Actif getActif(@PathVariable ("id") Long id) {
		return arp.findById(id).orElse(null);
	}
	

	
	@DeleteMapping("/deleteActif/{id}")
	private void deleteActif(@PathVariable ("id") Long id) {
		arp.deleteById(id);
	}
	
	@PutMapping("/putActif/{id}")
	public void putUser(@PathVariable ("id") Long id,
			@RequestBody Actif actifUpdate){		
		actifUpdate.setActifId(id);
		arp.save(actifUpdate);
	}
	
	
}
