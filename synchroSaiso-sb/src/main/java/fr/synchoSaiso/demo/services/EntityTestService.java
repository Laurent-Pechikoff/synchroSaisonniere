package fr.synchoSaiso.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import fr.synchoSaiso.demo.dao.EntityTestRepository;
import fr.synchoSaiso.demo.entities.EntityTest;

@RestController
@CrossOrigin("*")
public class EntityTestService {
	@Autowired
	private EntityTestRepository etrp;
	
	@PostMapping("/addTest")
	public void addTest(@RequestBody EntityTest test) {
		etrp.save(test);
	}
	
}
