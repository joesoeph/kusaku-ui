/*****************************************
 * MODAL SCRIPT
 *****************************************
 */

const openButtons = document.querySelectorAll('.open');
const closeButtons = document.querySelectorAll('.close');
const dialogEl = document.querySelector('dialog');

openButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const idModalTarget = button.getAttribute('data-modal-target');
    const modalTarget = document.getElementById(idModalTarget);
    modalTarget.classList.remove('animate-slide-bottom');
    modalTarget.classList.add('animate-slide-top');
    modalTarget.showModal();
  });
});

closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const idModalTarget = button.getAttribute('data-modal-target');
    const modalTarget = document.getElementById(idModalTarget);
    closeModalWithAnimation(modalTarget);
  });
});

function closeModalWithAnimation(el) {
  el.classList.remove('animate-slide-top');
  el.classList.add('animate-slide-bottom');
  setTimeout(() => {
    el.close();
  }, 650);
}

/*****************************************
 * MODAL CONTENT TRANSITION SCRIPT
 *****************************************
 */
const modalContent = {
  accountCheck: document.querySelector('#modal-content--account-check'),
  searchContact: document.querySelector('#modal-content--search-contact'),
  inputNominal: document.querySelector('#modal-content--input-nominal'),
};
const buttonBackModalContent = document.querySelector(
  '#button-back-modal-content',
);

/**
 * Utility function to show and hide modal content
 */
const toggleModalContent = (showKey) => {
  Object.keys(modalContent).forEach((key) => {
    if (key === showKey) {
      modalContent[key].classList.add('flex');
      modalContent[key].classList.remove('hidden');
    } else {
      modalContent[key].classList.add('hidden');
      modalContent[key].classList.remove('flex');
    }
  });
};

/**
 * Show specific modal content functions
 */
const showAccountCheck = () => {
  toggleModalContent('accountCheck');
  pushBackHistory('modal-content--account-check');
};

const showSearchContact = () => {
  toggleModalContent('searchContact');
  pushBackHistory('modal-content--search-contact');
};

const showInputNominal = () => {
  toggleModalContent('inputNominal');
  pushBackHistory('modal-content--input-nominal');
};

/**
 * Handle back button functionality
 */
buttonBackModalContent?.addEventListener('click', () => {
  const dataHistory = JSON.parse(
    buttonBackModalContent.getAttribute('data-history-back'),
  );
  const elTarget = dataHistory.pop();

  switch (elTarget) {
    case 'modal-content--input-nominal':
      showSearchContact();
      break;
    case 'modal-content--search-contact':
      showAccountCheck();
      break;
    default:
      break;
  }

  // Update history after popping
  buttonBackModalContent.setAttribute(
    'data-history-back',
    JSON.stringify(dataHistory),
  );

  updateBackButtonVisibility();
});

/**
 * Function to push history for back button
 */
const pushBackHistory = (modalContentKey) => {
  const dataHistory = JSON.parse(
    buttonBackModalContent.getAttribute('data-history-back'),
  );
  dataHistory.push(modalContentKey);

  buttonBackModalContent.setAttribute(
    'data-history-back',
    JSON.stringify(dataHistory),
  );

  updateBackButtonVisibility();
};

/**
 * Update back button visibility based on history length
 */
const updateBackButtonVisibility = () => {
  const dataHistory = JSON.parse(
    buttonBackModalContent.getAttribute('data-history-back') || '[]',
  );
  if (dataHistory.length > 0) {
    buttonBackModalContent.classList.remove('invisible');
  } else {
    buttonBackModalContent.classList.add('invisible');
  }
};

/**
 * BALANCE VISIBILITY SCRIPT
 */

function handleChangeVisibility(elBalance, elBtn) {
  const balanceValue = elBalance.getAttribute('data-balance-value');
  const isShown = elBalance.getAttribute('data-show-balance');

  const currentIsShown = isShown === 'true' ? 'false' : 'true';
  elBalance.setAttribute('data-show-balance', currentIsShown);

  if (currentIsShown !== 'true') {
    elBalance.innerHTML = '*********';
    elBtn.classList.remove('i-material-symbols-visibility');
    elBtn.classList.add('i-material-symbols-visibility-off');
  } else {
    elBalance.innerHTML = balanceValue;
    elBtn.classList.remove('i-material-symbols-visibility-off');
    elBtn.classList.add('i-material-symbols-visibility');
  }
}

document
  .getElementById('visibilityButton')
  .addEventListener('click', function () {
    const elBalance = document.getElementById('balance');

    handleChangeVisibility(elBalance, this);
  });
