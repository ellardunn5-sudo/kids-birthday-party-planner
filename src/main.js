const icons = {
  clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M9 11h6m-6 4h6"/>',
  wand: '<path d="m4 20 12-12 3 3L7 23zM14 10l3 3m2-11v4m-2-2h4M6 3v4M4 5h4m12 11v4m-2-2h4"/>',
  party: '<path d="m5 11-3 11 11-3L5 11zm3-4 1-3m8 12 3-1M13 9l3-3m1-4h.01M21 8h.01m0 12h.01M12 2h.01"/>',
};

for (const icon of document.querySelectorAll('[data-icon]')) {
  icon.innerHTML = `<svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${icons[icon.dataset.icon]}</svg>`;
}

const form = document.querySelector('#party-form');
const confirmation = document.querySelector('#confirmation');
const confirmationTitle = document.querySelector('#confirmation-title');
const summary = document.querySelector('#party-details');
const parentName = form.elements.parentName;
const packageChoice = document.querySelector('#package-choice');
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' });
const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' });
let selectedPackage = '';
let selectedPackagePrice = '';

function showForm() {
  confirmation.hidden = true;
  form.hidden = false;
}

for (const link of document.querySelectorAll('[data-package]')) {
  link.addEventListener('click', () => {
    selectedPackage = link.closest('.package').querySelector('h3').textContent;
    selectedPackagePrice = link.dataset.package;
    packageChoice.textContent = `Selected package: ${selectedPackage} · ${currency.format(selectedPackagePrice)}`;
    packageChoice.hidden = false;
    showForm();
  });
}

parentName.addEventListener('input', () => parentName.setCustomValidity(''));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const details = new FormData(form);
  const get = (name) => details.get(name).trim();
  if (!get('parentName')) {
    parentName.setCustomValidity('Enter your name.');
    parentName.reportValidity();
    return;
  }

  const fields = [
    ['Parent name', get('parentName')],
    ['Child’s age', get('age')],
    ['Birthday date', dateFormatter.format(form.elements.date.valueAsDate)],
    ['Theme', get('theme')],
    ['Estimated total party budget', currency.format(get('budget'))],
    ['Guest count', get('guestCount')],
    ['Location preference', get('location')],
    ['Food preferences', get('food')],
    ['Entertainment preferences', get('entertainment')],
    ['Additional notes', get('notes')],
  ];

  if (selectedPackage) fields.unshift(['Package', `${selectedPackage} · ${currency.format(selectedPackagePrice)}`]);
  summary.replaceChildren(...fields.map(([label, value]) => {
    const row = document.createElement('div');
    const term = document.createElement('dt');
    const description = document.createElement('dd');
    term.textContent = label;
    description.textContent = value || 'Not specified';
    row.append(term, description);
    return row;
  }));

  form.hidden = true;
  confirmation.hidden = false;
  confirmationTitle.focus();
  confirmation.scrollIntoView({ block: 'start' });
});

document.querySelector('#edit-details').addEventListener('click', () => {
  showForm();
  parentName.focus();
});
