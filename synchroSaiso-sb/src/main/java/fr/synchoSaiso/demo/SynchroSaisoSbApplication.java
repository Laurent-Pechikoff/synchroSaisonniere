package fr.synchoSaiso.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import fr.synchoSaiso.demo.dao.ActifRepository;
import fr.synchoSaiso.demo.dao.RentCalendarRepository;
import fr.synchoSaiso.demo.dao.UserRepository;
import fr.synchoSaiso.demo.entities.Actif;
import fr.synchoSaiso.demo.entities.NavBar;
import fr.synchoSaiso.demo.entities.RentCalendar;
import fr.synchoSaiso.demo.entities.Role;
import fr.synchoSaiso.demo.entities.User;
import fr.synchoSaiso.demo.entities.UsersActifs;

@SpringBootApplication
public class SynchroSaisoSbApplication implements CommandLineRunner{
	
	@Autowired
	private ActifRepository arp;
	@Autowired
	private RentCalendarRepository rcr;
	@Autowired
	private UserRepository urp;
	@Autowired
	private RepositoryRestConfiguration rrc;
	
	public static void main(String[] args) {
		SpringApplication.run(SynchroSaisoSbApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		rrc.exposeIdsFor(Actif.class,User.class,RentCalendar.class,NavBar.class,Role.class,UsersActifs.class);
		System.out.println("Coucou Synchro!!!");
		
//		urp.save(new User(null, "nom1", "prenom", null, null, null, null, null));
//		urp.save(new User(null, "nom2", "prenom2", null, null, null, null, null));
	}

}
