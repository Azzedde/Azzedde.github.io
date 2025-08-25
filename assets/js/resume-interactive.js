document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('resume-modal');
  if (!modal) return;

  // make sure it's a direct child of <body>
  if (modal.parentElement !== document.body) document.body.appendChild(modal);

  const closeButton = modal.querySelector('.resume-modal__close');
  const modalTitle = modal.querySelector('#modal-title');
  const modalDate  = modal.querySelector('#modal-date');
  const modalBody  = modal.querySelector('#modal-body');

  function openModal() {
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    modal.classList.add('is-active');
  }

  function closeModal() {
    modal.classList.remove('is-active');
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('.logo-card').forEach(card => {
    card.addEventListener('click', function () {
      modalTitle.textContent = this.dataset.title || '';
      modalDate.textContent  = this.dataset.date || '';
      modalBody.innerHTML    = this.querySelector('.modal-hidden-content').innerHTML;
      openModal();
    });
  });

  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('is-active')) closeModal(); });
});
