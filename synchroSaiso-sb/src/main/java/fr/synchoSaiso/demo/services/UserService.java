package fr.synchoSaiso.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import fr.synchoSaiso.demo.dao.UserRepository;
import fr.synchoSaiso.demo.entities.User;

@RestController
@CrossOrigin("http://localhost:4200/")
public class UserService {
	@Autowired
	private UserRepository urp;
	
	
	@GetMapping("/getUsers")
	private List<User> getUsers(){
		return urp.findAll();
	}
	
	@GetMapping("/getUser/{id}")
	private User user(@PathVariable ("id") Integer id) {
		return urp.findById(id).orElse(null);
	}
	
}
