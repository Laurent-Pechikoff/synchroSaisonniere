package fr.synchoSaiso.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import fr.synchoSaiso.demo.entities.Actif;

@CrossOrigin("http://localhost:4200/")
@RestController
public interface ActifRepository extends JpaRepository<Actif, Long>{

	//find actif by user id 
	@Query(value = "select * from bddsynchro.actif  a inner join bddsynchro.user_actif ua on  a.actif_id = ua.actif_id where ua.user_id = ?1", nativeQuery = true)
	List<Actif> findByUsersId(Long id);
	
}
