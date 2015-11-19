package br.com.fametro.famban.repository;

import java.util.List;

public interface Repository<Entity> {

	List<Entity> all();

	Entity find(Long id);

	Entity save(Entity entity);
	
	Entity find_by(String property, Object value);

	void update(Entity entity);

	Boolean delete(Long id);
	

}
