const Auth = {
  salvarToken(token) {
    localStorage.setItem('token', token);
  },

  salvarUsuario(usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getUsuario() {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  },

  isAdmin() {
    return this.getUsuario()?.tipo_usuario === 'admin';
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
  },

  proteger(adminOnly = false) {
    if (!this.getToken()) {
      window.location.href = 'login.html';
      return false;
    }
    
    if (adminOnly && !this.isAdmin()) {
      alert('Acesso só para admin');
      window.location.href = '../index.html';
      return false;
    }
    
    return true;
  }
};
