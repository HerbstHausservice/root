
(function(){
  const banner = document.getElementById('cookieBanner');
  const btn = document.getElementById('acceptCookies');
  if (banner && localStorage.getItem('herbst_cookie_ok') !== '1') banner.classList.add('show');
  if (btn) btn.addEventListener('click', function(){ localStorage.setItem('herbst_cookie_ok','1'); banner.classList.remove('show'); });

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data = new FormData(form);
      const subject = data.get('subject') || 'Anfrage über die Website';
      const body = [
        'Name: ' + data.get('name'),
        'E-Mail: ' + data.get('email'),
        'Telefon: ' + (data.get('phone') || '-'),
        '',
        String(data.get('message') || '')
      ].join('
');
      window.location.href = 'mailto:info@herbst-hausservice.de?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();
