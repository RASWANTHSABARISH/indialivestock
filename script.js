/* India Livestock Show 2027 — Scroll & Interaction JS */

// === NAV SCROLL EFFECT ===
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// === REVEAL ON SCROLL (Intersection Observer) ===
const revealEls = document.querySelectorAll(
  '.stats__card, .participate__card, .testimonials__card, .media__cell, .promos__item, .about__img-card, .timeline__item, .credibility__item'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = entry.target.style.transform.replace('translateY(24px)', 'translateY(0)') || '';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.05}s, transform 0.55s ease ${i * 0.05}s`;
  observer.observe(el);
});

// === SMOOTH ANCHOR SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// === COUNTDOWN TIMER ===
function updateCountdown() {
  const targetDate = new Date('January 28, 2027 10:00:00').getTime();
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const daysEl = document.getElementById('days');
    if (daysEl) {
      daysEl.innerText = days.toString().padStart(3, '0');
    }
  }
}

// Update every 24 hours (since we only show days)
updateCountdown();
setInterval(updateCountdown, 1000 * 60 * 60 * 24);

// === SUCCESS TOAST INJECTION ===
const toastHTML = `
  <div class="success-toast" id="successToast">
    <div class="success-toast__icon">✓</div>
    <div class="success-toast__content">
      <h5>Thank You!</h5>
      <p>Your message has been received. We'll contact you shortly.</p>
    </div>
  </div>
`;
document.body.insertAdjacentHTML('beforeend', toastHTML);

function showSuccessToast() {
  const toast = document.getElementById('successToast');
  if (toast) {
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 4000);
  }
}

// === MODAL LOGIC ===
function openModal(e) {
  if (e) e.preventDefault();
  const modal = document.getElementById('contactModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('contactModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// === FORM VALIDATION ===
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateMobile(mobile) {
  return /^[0-9]{10}$/.test(mobile);
}

function submitForm(e) {
  e.preventDefault();
  let isValid = true;
  const fields = ['name', 'mobile', 'email', 'company', 'message'];
  const form = document.getElementById('enquiryForm');
  
  fields.forEach(field => {
    const input = document.getElementById(field);
    const error = document.getElementById(field + 'Error');
    if (!input) return;

    const value = input.value.trim();
    let fieldValid = true;
    let errorMessage = "This field is required.";

    if (!value) {
      fieldValid = false;
    } else if (field === 'email' && !validateEmail(value)) {
      fieldValid = false;
      errorMessage = "Please enter a valid email address.";
    } else if (field === 'mobile' && !validateMobile(value.replace(/\s/g, ''))) {
      fieldValid = false;
      errorMessage = "Please enter a valid 10-digit mobile number.";
    }

    if (!fieldValid) {
      input.classList.add('error');
      if (error) {
        error.textContent = errorMessage;
        error.style.display = 'block';
      }
      isValid = false;
    } else {
      input.classList.remove('error');
      if (error) error.style.display = 'none';
    }
  });

  if (isValid) {
    showSuccessToast();
    closeModal();
    if (form) form.reset();
  }
}

// Shared burger menu and scroll logic (already in script.js but ensured here)
const burger = document.querySelector('.nav__burger');
const navLinks = document.querySelector('.nav__links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinks.classList.toggle('mobile-open');
    
    // Explicitly handle display for mobile menu if needed
    if (window.innerWidth <= 768) {
      navLinks.style.display = navLinks.classList.contains('mobile-open') ? 'flex' : 'none';
    }
  });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav__links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('mobile-open')) {
      navLinks.classList.remove('mobile-open');
      burger.classList.remove('active');
      if (window.innerWidth <= 768) navLinks.style.display = 'none';
    }
  });
}
);

// Dropdown handling for mobile
document.querySelectorAll('.nav__item-link').forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const parent = link.parentElement;
      parent.classList.toggle('open');
      const dropdown = parent.querySelector('.nav__dropdown');
      if (dropdown) {
        dropdown.style.display = parent.classList.contains('open') ? 'flex' : 'none';
      }
    }
  });
});

// === MEDIA GALLERY LOGIC ===

// Video Hover Play
const videoItems = document.querySelectorAll('.video-item');
videoItems.forEach(item => {
  const video = item.querySelector('video');
  if (video) {
    item.addEventListener('mouseenter', () => video.play());
    item.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
    
    // Click to open modal
    item.addEventListener('click', () => {
      const videoSrc = item.getAttribute('data-video');
      openVideoModal(videoSrc);
    });
  }
});

function openVideoModal(src) {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  if (modal && modalVideo) {
    modalVideo.src = src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  if (modal && modalVideo) {
    modal.classList.remove('active');
    modalVideo.pause();
    modalVideo.src = "";
    document.body.style.overflow = '';
  }
}

// Photo Gallery Modal
const photoItems = document.querySelectorAll('.photo-item');
photoItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (img) {
      openPhotoModal(img.src);
    }
  });
});

function openPhotoModal(src) {
  const modal = document.getElementById('photoModal');
  const modalPhoto = document.getElementById('modalPhoto');
  if (modal && modalPhoto) {
    modalPhoto.src = src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closePhotoModal() {
  const modal = document.getElementById('photoModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
