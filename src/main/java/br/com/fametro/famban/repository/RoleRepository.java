package br.com.fametro.famban.repository;

import javax.inject.Named;

import br.com.fametro.famban.model.Role;

@Named
public class RoleRepository extends AbstractRepository<Role>{

	public RoleRepository() {
		super(Role.class);
	}

	public Role findByRole(String role) {
		String query = "select r from Role r where r.role = :role";
		return (Role) getEntityManager().createQuery(query).setParameter("role", role).getSingleResult();
	}
	
}
