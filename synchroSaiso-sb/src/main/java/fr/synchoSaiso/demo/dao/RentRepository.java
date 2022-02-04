package fr.synchoSaiso.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import fr.synchoSaiso.demo.entities.Rent;

@CrossOrigin("http://localhost:4200/")
@RestController
public interface RentRepository extends JpaRepository<Rent, Long>{

	List<Rent> findByActifId(Long id);
}
