package fr.synchoSaiso.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import fr.synchoSaiso.demo.entities.User;

@CrossOrigin("*")
@RestController
public interface UserRepository extends JpaRepository<User, Long>{
	//@Query(value = "select * from bddsynchro.user u where u.login = ?1 and u.mdp = ?2", nativeQuery = true)
	List<User> findByLoginAndMdp(String login,String mdp);
}
