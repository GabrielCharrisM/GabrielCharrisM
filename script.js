const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-link');

menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
};

navLinks.querySelectorAll('a').forEach(link => {
    link.onclick = () => {
        navLinks.classList.remove('active');
    };
});

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

if (contactForm) contactForm.onsubmit = async (event) => {
    event.preventDefault();

    if (contactForm.action.includes('YOUR_FORM_ID')) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'The contact form is not connected yet.';
        return;
    }

    const submitBtn = contactForm.querySelector('button');
    submitBtn.disabled = true;
    formStatus.className = 'form-status';
    formStatus.textContent = 'Sending...';

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) throw new Error();

        contactForm.reset();
        formStatus.className = 'form-status success';
        formStatus.textContent = "Thanks! Your message was sent. I'll get back to you soon.";
    } catch {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Something went wrong. Please try again or reach me on LinkedIn.';
    } finally {
        submitBtn.disabled = false;
    }
};