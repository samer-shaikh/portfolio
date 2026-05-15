document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

function initContactForm() {

    const form = document.getElementById('contact-form');

    if (!form) return;

    form.addEventListener('submit', () => {

        const btn = form.querySelector('button');
        const originalText = btn.textContent;

        btn.textContent = 'Sending....';
        btn.disabled = true;

        setTimeout(() => {

            btn.textContent = 'Message Sent! ♥';
            btn.style.background = '#27ae60';

            // Submit form to Netlify
            form.submit();

            setTimeout(() => {

                form.reset();

                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.background = '';

            }, 3000);

        }, 1500);

    });

}