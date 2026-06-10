const Analytics = {

  trackView(pagina) {

    if (!pagina) return;

    const headers = {
      'Content-Type': 'application/json'
    };

    const token = localStorage.getItem('token');

    if (token) {
      headers['Authorization'] = 'Bearer ' + token;
    }

    fetch('/api/visualizacoes', {
      method: 'POST',
      headers,
      body: JSON.stringify({ pagina })
    }).catch(() => {});

  }

};
