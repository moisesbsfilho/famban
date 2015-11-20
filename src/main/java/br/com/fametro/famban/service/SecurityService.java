package br.com.fametro.famban.service;

import javax.inject.Inject;
import javax.inject.Named;
import javax.transaction.Transactional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import br.com.fametro.famban.model.User;
import br.com.fametro.famban.repository.UsersRepository;

@Named
@Transactional
public class SecurityService implements UserDetailsService{

	@Inject
	private UsersRepository usersRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		User user = usersRepository.findByUsername(username);
		if (user == null)
			throw new UsernameNotFoundException("UserDetailsService.badCredentials");
		return user;
	}

}
