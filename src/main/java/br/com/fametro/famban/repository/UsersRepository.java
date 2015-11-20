package br.com.fametro.famban.repository;

import javax.inject.Named;

import br.com.fametro.famban.model.User;

@Named
public class UsersRepository extends AbstractRepository<User>{

	public UsersRepository() {
		super(User.class);
	}
	
	public User findByUsername(String username) {
		String query = "select u from User u left join fetch u.role where u.username = :username";
		return (User) getEntityManager().createQuery(query).setParameter("username", username).getSingleResult();
	}

}
