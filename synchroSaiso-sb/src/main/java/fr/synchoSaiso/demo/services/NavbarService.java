package fr.synchoSaiso.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import fr.synchoSaiso.demo.dao.NavbarRepository;

@RestController
@CrossOrigin("http://localhost:4200/")
public class NavbarService {

	@Autowired
	private NavbarRepository nbrp;
}
