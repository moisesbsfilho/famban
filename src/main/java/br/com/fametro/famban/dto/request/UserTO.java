package br.com.fametro.famban.dto.request;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class UserTO {

	private String username;

	private String password;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
