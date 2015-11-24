package br.com.fametro.famban.service;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.security.core.context.SecurityContextHolder;

import br.com.fametro.famban.model.Board;
import br.com.fametro.famban.model.User;
import br.com.fametro.famban.repository.BoardRepository;
import br.com.fametro.famban.repository.UsersRepository;

@Path("/board")
@Transactional
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class BoardService {

	@Inject
	private BoardRepository boardRepository;
	
	@Inject
	private UsersRepository userRepository;
	
	private User userLogged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	
	@POST
	public Response save(Board board) {
		board.getUsers().add(userLogged);
		boardRepository.update(board);
		return Response.ok().build();
	}
	
	@GET
	public Response findAll() {
		return Response.ok(boardRepository.findAllByUser(userLogged.getId())).build();
	}
	
	@GET
	@Path("/{id}/card")
	public Response findCards(@PathParam("id") Long id){
		Board board = boardRepository.findWithCards(id);
		return Response.ok(board).build();
	}
	
	@GET
	@Path("/{id}/user/{username}")
	public Response addUser(@PathParam("id") Long id, @PathParam("username") String username){
		Board board = boardRepository.findWithCards(id);
		User user = userRepository.findByUsername(username);
		board.getUsers().add(user);
		return Response.ok(boardRepository.update(board)).build();
	}
	
	@GET
	@Path("/{id}/user")
	public Response findUsers(@PathParam("id") Long id){
		Board board = boardRepository.find(id);
		return Response.ok(board.getUsers()).build();
	}
	
}
