package fr.synchoSaiso.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import fr.synchoSaiso.demo.entities.Rent;

@CrossOrigin("http://localhost:4200/")
@RestController
public interface RentRepository extends JpaRepository<Rent, Long>{
	
	@Query(value = "select * from bddsynchro.rent  where actif_actif_id = ?1", nativeQuery = true)
	List<Rent> findByActifId(int id);
}
