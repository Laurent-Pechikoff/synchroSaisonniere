package fr.synchoSaiso.demo.services;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import fr.synchoSaiso.demo.dao.RoleRepository;

@RestController
@CrossOrigin("http://localhost:4200/")
public class RoleService {

	private RoleRepository rrp;
}
