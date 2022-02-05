package fr.synchoSaiso.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import fr.synchoSaiso.demo.entities.EntityTest;

@CrossOrigin("*")
@RestController
public interface EntityTestRepository extends JpaRepository<EntityTest, String>{

}
