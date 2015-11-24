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
import br.com.fametro.famban.model.Card;
import br.com.fametro.famban.repository.BoardRepository;
import br.com.fametro.famban.repository.CardRepository;

@Path("/{boardId}/card")
@Transactional
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CardService {

	@Inject
	private CardRepository cardRepository;
	
	@Inject
	private BoardRepository boardRepository;

	@GET
	public Response findAll() {
		return Response.ok(cardRepository.findAll()).build();
	}
	
	@GET
	@Path("/{cardId}")
	public Response remove(@PathParam("boardId") Long boardId, @PathParam("cardId") Long cardId) {
		Card card = cardRepository.find(cardId);
		cardRepository.delete(card);
		return Response.ok().build();
	}

	@POST
	public Response save(Card card, @PathParam("boardId") Long boardId) {
		Board board = boardRepository.find(boardId);
		board.getCards().add(card);
		return Response.ok(boardRepository.update(board)).build();
	}
	
}
