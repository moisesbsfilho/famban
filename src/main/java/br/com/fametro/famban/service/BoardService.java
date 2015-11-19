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

import br.com.fametro.famban.model.Board;
import br.com.fametro.famban.repository.BoardRepository;

@Path("/board")
@Transactional
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class BoardService {

	@Inject
	private BoardRepository boardRepository;
	
	@POST
	public Response save(Board board) {
		boardRepository.save(board);
		return Response.ok().build();
	}
	
	@GET
	public Response findAll() {
		return Response.ok(boardRepository.findAll()).build();
	}
	
	@GET
	@Path("/{id}/card")
	public Response findCards(@PathParam("id") Long id){
		Board board = boardRepository.findWithCards(id);
		return Response.ok(board).build();
	}
	
}
