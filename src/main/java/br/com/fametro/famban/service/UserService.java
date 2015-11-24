package br.com.fametro.famban.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.fametro.famban.model.Role;
import br.com.fametro.famban.model.User;
import br.com.fametro.famban.repository.RoleRepository;
import br.com.fametro.famban.repository.UsersRepository;

@Path("/user")
@Transactional
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserService {

	@Inject
	private UsersRepository usersRepository;
	
	@Inject
	private RoleRepository roleRepository;
	
	@POST
	public Response save(User user) {
		Role role = roleRepository.findByRole("ROLE_ADMIN");
		user.setRole(role);
		String passwordDigest = md5(user.getPassword());
		user.setPassword(passwordDigest);
		usersRepository.save(user);
		return Response.ok().build();
	}
	
	@GET
	public Response list() {
		return Response.ok("Ok").build();
	}
	
	public String md5(String senha) {
		MessageDigest md = null;
		try {
			md = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		byte[] digest = md.digest(senha.getBytes());

		StringBuilder builder = new StringBuilder();

		for (int i = 0; i < digest.length; i++) {
			builder.append(Integer.toString((digest[i] & 0xff) + 0x100, 16).substring(1));
		}

		return builder.toString();
	}
	
}
