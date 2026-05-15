document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

function initContactForm() {

    const form = document.getElementById('contact-form');

    if (!form) return;

    form.addEventListener('submit', () => {

        const btn = form.querySelector('button');

        btn.textContent = 'Sending....';
        btn.disabled = true;

    });

}