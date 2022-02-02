package fr.synchoSaiso.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import fr.synchoSaiso.demo.entities.Role;

@CrossOrigin("http://localhost:4200/")
@RestController
public interface RoleRepository extends JpaRepository<Role, Integer>{

}
