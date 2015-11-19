package br.com.fametro.famban.repository;

import javax.inject.Named;

import br.com.fametro.famban.model.Board;

@Named
public class BoardRepository extends AbstractRepository<Board>{

	public BoardRepository() {
		super(Board.class);
	}

	public Board findWithCards(Long id) {
		String query = "select board from Board board left join fetch board.cards where board.id = :id";
		return (Board) getEntityManager().createQuery(query).setParameter("id", id).getSingleResult();
	}
	
}
