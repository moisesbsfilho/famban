package br.com.fametro.famban.repository;

import java.util.List;

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

	@SuppressWarnings("unchecked")
	public List<Board> findAllByUser(Long id) {
		String query = "select board from Board board join board.users user where user.id = :id";
		List<Board> resultList = getEntityManager().createQuery(query).setParameter("id", id).getResultList();
		return resultList;
	}
	
}
