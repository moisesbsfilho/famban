package br.com.fametro.famban.repository;

import javax.inject.Named;

import br.com.fametro.famban.model.Card;

@Named
public class CardRepository extends AbstractRepository<Card>{

	public CardRepository() {
		super(Card.class);
	}
	
}
