package fr.synchoSaiso.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import fr.synchoSaiso.demo.dao.UserRepository;
import fr.synchoSaiso.demo.entities.User;

@RestController
@CrossOrigin("*")
public class UserService {
	@Autowired
	private UserRepository urp;
	
	
	@GetMapping("/getUsers")
	private List<User> getUsers(){
		return urp.findAll();
	}
	
	@GetMapping("/getUser/{id}")
	private User user(@PathVariable ("id") Long id) {
		return urp.findById(id).orElse(null);
	}
	
	@PostMapping("/addUser")
	public void addUser(@RequestBody User user) {
		System.out.println("coucou");
		urp.save(user);
	}
	
	@DeleteMapping("/deleteUser/{id}")
	private void deleteUser(@PathVariable ("id") Long id) {
		urp.deleteById(id);
	}
	
	@PutMapping("/putUser/{id}")
	public void putUser(@PathVariable ("id") Long id,
			@RequestBody User userUpdate){		
		userUpdate.setId(id);
		urp.save(userUpdate);
	}
}
