package fr.synchoSaiso.demo;


import java.util.ArrayList;
import java.util.List;

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
import fr.synchoSaiso.demo.entities.Rent;
import fr.synchoSaiso.demo.entities.RentCalendar;
import fr.synchoSaiso.demo.entities.Role;
import fr.synchoSaiso.demo.entities.User;



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
		rrc.exposeIdsFor(Actif.class,User.class,Rent.class,NavBar.class,Role.class);
		System.out.println("Coucou Synchro!!!");
		//creation user
//		urp.save(new User(null, "nom1", "prenom", null, null, null, null, null));
//		urp.save(new User(null, "nom2", "prenom2", null, null, null, null, null));
	
	
//		
//		List<User> usersTest = new ArrayList<>();
//		List<Actif> actifTest = new ArrayList<>();
//		for (int i = 0; i < 3; i++) {
//			User u = new User(null, "nom "+i, "prenom "+i , null, null, null, null, null);
//					urp.save(u);
//					System.out.println("user "+i+" crée");
//					usersTest.add(u);
//					usersTest.forEach(user->{
//						System.out.println("tata :"+ user.getName());
//					});
//		}
//			
//		urp.findAll().forEach(u->{
//			for (int i = 0; i < 3; i++) {
//			
//			Actif a = new Actif(null, "actif "+i, "adresse "+i, 13000+i, null, null, null, null, null, null, null, null, null, null, usersTest);
//			actifTest.add(a);
//			arp.save(a);
//			
//			
//			}
//			u.setActifs(actifTest);
//			urp.save(u);
//		});
		
	}

}
