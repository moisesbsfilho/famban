package br.com.fametro.famban.model;

import java.util.Set;
import java.util.TreeSet;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

@Entity
@SequenceGenerator(name = "SEQ_BOARD", sequenceName = "SEQ_BOARD")
public class Board {

	@Id
	@GeneratedValue(generator = "SEQ_BOARD", strategy = GenerationType.AUTO)
	private Long id;

	private String title;

	@OneToMany(orphanRemoval = true, cascade = CascadeType.ALL)
	@JoinColumn(name = "board_id")
	private Set<Card> cards;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Set<Card> getCards() {
		if (cards == null)
			cards = new TreeSet<Card>();
		return cards;
	}

	public void setCards(Set<Card> cards) {
		this.cards = cards;
	}

}
