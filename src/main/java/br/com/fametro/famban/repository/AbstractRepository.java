package br.com.fametro.famban.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public abstract class AbstractRepository<T> {

	@PersistenceContext
	private EntityManager entityManager;
	
	private Class<T> clazz;
	
	public AbstractRepository(Class<T> clazz) {
		this.clazz = clazz;
	}
	
	public void save(T t){
		entityManager.persist(t);
	}
	
	public List<T> findAll(){
		StringBuilder query = new StringBuilder();
		query.append("select entity from ").append(getClazz().getSimpleName()).append(" as entity");
		return (List<T>) entityManager.createQuery(query.toString(), getClazz()).getResultList();
	}
	
	public T find(Long id){
		return entityManager.find(getClazz(), id);
	}
	
	public T update(T t){
		return entityManager.merge(t);
	}
	
	public Class<T> getClazz(){
		return this.clazz;
	}
	
	public EntityManager getEntityManager(){
		return this.entityManager;
	}
	
}
