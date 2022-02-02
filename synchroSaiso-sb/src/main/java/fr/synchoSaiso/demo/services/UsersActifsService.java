package fr.synchoSaiso.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import fr.synchoSaiso.demo.dao.UsersActifsRepository;
import fr.synchoSaiso.demo.entities.Actif;
import fr.synchoSaiso.demo.entities.UsersActifs;

@RestController
@CrossOrigin("http://localhost:4200/")
public class UsersActifsService {

	@Autowired
	private UsersActifsRepository uarp;
	
	@GetMapping("/getActifsByUser/{id}")
	private List<UsersActifs> getActifsByUserId(@PathVariable ("id") Integer id){
		return uarp.findByUserId(id);
		
	}
}
