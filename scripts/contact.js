(() => {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const status = form.querySelector('[data-form-status]');
  const recipient = 'info@herbst-hausservice.de';

  const setStatus = (message, type) => {
    if (!status) return;
    status.textContent = message;
    status.dataset.type = type;
  };

  const markInvalidFields = () => {
    const fields = form.querySelectorAll('input, select, textarea');
    fields.forEach((field) => {
      field.toggleAttribute('aria-invalid', !field.checkValidity());
    });
  };

  const valueOf = (formData, key) => (formData.get(key) || '').toString().trim();

  form.addEventListener('input', (event) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) {
      event.target.toggleAttribute('aria-invalid', !event.target.checkValidity());
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    if (valueOf(formData, 'website')) {
      setStatus('Ihre Nachricht wurde vorbereitet.', 'success');
      form.reset();
      return;
    }

    if (!form.checkValidity()) {
      markInvalidFields();
      setStatus('Bitte füllen Sie alle Pflichtfelder korrekt aus.', 'error');
      form.reportValidity();
      return;
    }

    const name = valueOf(formData, 'name');
    const email = valueOf(formData, 'email');
    const telefon = valueOf(formData, 'telefon') || 'Nicht angegeben';
    const leistung = valueOf(formData, 'leistung') || 'Nicht ausgewählt';
    const ort = valueOf(formData, 'ort') || 'Nicht angegeben';
    const betreff = valueOf(formData, 'betreff') || `Anfrage von ${name}`;
    const nachricht = valueOf(formData, 'nachricht');

    const body = [
      'Neue Anfrage über herbst-hausservice.de',
      '',
      `Name: ${name}`,
      `E-Mail: ${email}`,
      `Telefon: ${telefon}`,
      `Gewünschte Leistung: ${leistung}`,
      `Einsatzort: ${ort}`,
      '',
      'Nachricht:',
      nachricht,
      '',
      'Datenschutz: zugestimmt',
    ].join('\n');

    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(betreff)}&body=${encodeURIComponent(body)}`;
    setStatus('Ihr E-Mail-Programm wird geöffnet. Bitte senden Sie die vorbereitete Nachricht dort ab.', 'success');
    window.location.href = mailto;
  });
})();
