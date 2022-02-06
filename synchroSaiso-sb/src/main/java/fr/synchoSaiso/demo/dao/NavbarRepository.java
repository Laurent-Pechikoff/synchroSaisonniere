package fr.synchoSaiso.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import fr.synchoSaiso.demo.entities.NavBar;

@CrossOrigin("*")
@RestController
public interface NavbarRepository extends JpaRepository<NavBar, Long>{

	List<NavBar> findByRoleVisiteurTrue();
	
	List<NavBar> findByRoleUserTrue();
	
}
