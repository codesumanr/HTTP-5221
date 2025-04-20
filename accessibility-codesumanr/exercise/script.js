document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleModal');
    const modal = document.getElementById('modal');
    const contentToHide = document.getElementById('contentToHideIfModalIsVisible');
  
    toggleButton.addEventListener('click', function () {
      const isModalVisible = modal.getAttribute('aria-hidden') === 'false';

      modal.setAttribute('aria-hidden', isModalVisible ? 'true' : 'false');
      contentToHide.setAttribute('aria-hidden', isModalVisible ? 'false' : 'true');
      toggleButton.textContent = isModalVisible ? 'Open Modal' : 'Close Modal';
    });
  });