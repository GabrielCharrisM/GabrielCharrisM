const photos = [...document.querySelectorAll('.gallery figure img')];
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');
let current = 0;

if (photos.length < 2) lightbox.classList.add('single');

const showPhoto = (index) => {
    current = (index + photos.length) % photos.length;
    lightboxImg.src = photos[current].src;
    lightboxImg.alt = photos[current].alt;
};

photos.forEach((photo, index) => {
    photo.parentElement.onclick = () => {
        showPhoto(index);
        lightbox.classList.add('open');
    };
});

const closeLightbox = () => {
    lightbox.classList.remove('open');
};

lightbox.querySelector('.close').onclick = closeLightbox;
lightbox.querySelector('.prev').onclick = (event) => {
    event.stopPropagation();
    showPhoto(current - 1);
};
lightbox.querySelector('.next').onclick = (event) => {
    event.stopPropagation();
    showPhoto(current + 1);
};
lightbox.onclick = (event) => {
    if (event.target === lightbox) closeLightbox();
};

document.onkeydown = (event) => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showPhoto(current - 1);
    if (event.key === 'ArrowRight') showPhoto(current + 1);
};
