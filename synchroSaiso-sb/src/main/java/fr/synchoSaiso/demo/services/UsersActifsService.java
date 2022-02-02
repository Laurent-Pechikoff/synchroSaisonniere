package fr.synchoSaiso.demo.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import fr.synchoSaiso.demo.dao.ActifRepository;
import fr.synchoSaiso.demo.dao.UsersActifsRepository;
import fr.synchoSaiso.demo.entities.Actif;
import fr.synchoSaiso.demo.entities.UsersActifs;

@RestController
@CrossOrigin("http://localhost:4200/")
public class UsersActifsService {

	@Autowired
	private UsersActifsRepository uarp;
	@Autowired
	private ActifRepository arp;
	
	
	@GetMapping("/getActifsByUser/{id}")
	private List<Actif> getActifsByUserId(@PathVariable ("id") Integer id){
		List<UsersActifs> result = uarp.findByUserId(id);
		System.out.println(result);
		List<Actif> listActifs = new ArrayList<>();
		for (UsersActifs usersActifs : result) {
			int index = usersActifs.getId().getActifId();
			System.out.println((index));
			listActifs.add(arp.findById(index).orElse(null));
			System.out.println(listActifs);
		}
		return listActifs;
		
	}
}
