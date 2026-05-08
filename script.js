(function(){
  const burger = document.querySelector('[data-burger]');
  const nav = document.querySelector('[data-nav]');
  if (burger && nav){
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close mobile menu when clicking a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Contact form mailto fallback
  const form = document.querySelector('[data-mailto-form]');
  if (form){
    form.addEventListener('submit', (e) => {
      // If the user configured a real endpoint, let it submit normally
      const action = (form.getAttribute('action') || '').trim();
      const hasRealEndpoint = action && !action.startsWith('mailto:') && !action.includes('REPLACE_ME');
      if (hasRealEndpoint) return;

      e.preventDefault();

      const fd = new FormData(form);
      const name = (fd.get('name') || '').toString().trim();
      const email = (fd.get('email') || '').toString().trim();
      const phone = (fd.get('phone') || '').toString().trim();
      const service = (fd.get('service') || '').toString().trim();
      const message = (fd.get('message') || '').toString().trim();

      const to = (form.getAttribute('data-to') || 'getorganized@cluttercritters.com').trim();
      const subject = encodeURIComponent('Clutter Critters – Request');
      const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Service: ${service}\n\n` +
        `${message}`
      );

      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }
})();
