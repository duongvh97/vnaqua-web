const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const selector = anchor.getAttribute('href');
    if (!selector || selector === '#') return;
    const target = document.querySelector(selector);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  });
});

const backToTopButton = document.getElementById('backToTop');
if (backToTopButton) {
  const updateBackToTop = () => backToTopButton.classList.toggle('show', window.scrollY > 500);
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();
  backToTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
}

const currentYear = document.getElementById('currentYear');
if (currentYear) currentYear.textContent = new Date().getFullYear();

const lightProducts = [
  {
    name: 'RGBW 80W',
    description: 'LED COB RGBW-UV chất lượng cao, ánh sáng trung thực, tôn màu cây cá. Hợp hồ Biotop, đá suối, cá dĩa và Blue Mahseer.',
    specs: ['80W', 'Hồ 60–80 cm', '4 kênh R/G/B/W độc lập', 'BLE/WiFi', 'BH 6 tháng'],
    images: [
      'img/rgbw80w/rgbw80w_1.jpg',
      'img/rgbw80w/rgbw80w_2.jpg',
      'img/rgbw80w/rgbw80w_3.jpg',
      'img/rgbw80w/rgbw80w_4.jpg',
      'img/rgbw80w/rgbw80w_5.jpg',
      'img/rgbw80w/rgbw80w_6.jpg'
    ]
  },
  {
    name: 'RGBW 120W',
    description: 'LED COB RGBW-UV chất lượng cao, ánh sáng trung thực, tôn màu cây cá. Hợp hồ Biotop, đá suối, cá dĩa và Blue Mahseer.',
    specs: ['120W', 'Hồ 60–80 cm', '4 kênh R/G/B/W độc lập', 'BLE/WiFi', 'BH 6 tháng'],
    images: [
      'img/rgbw120w/rgbw120w_1.jpg',
      'img/rgbw120w/rgbw120w_2.jpg',
      'img/rgbw120w/rgbw120w_3.jpg',
      'img/rgbw120w/rgbw120w_4.jpg',
      'img/rgbw120w/rgbw120w_5.jpg',
      'img/rgbw120w/rgbw120w_6.jpg'
    ]
  },
  {
    name: 'UFO RGBW 80W',
    description: 'LED COB RGBW-UV chất lượng cao, ánh sáng trung thực, tôn màu cây cá. Hợp hồ Biotop, đá suối, cá dĩa và Blue Mahseer.',
    specs: ['80W', 'Hồ 60–80 cm', '4 kênh R/G/B/W độc lập', 'LED viền: màu & hiệu ứng', 'BLE/WiFi', 'BH 6 tháng'],
    images: [
      'img/ufo_rgbw80w/ufo_rgbw80_1.jpg',
      'img/ufo_rgbw80w/ufo_rgbw80_2.jpg',
      'img/ufo_rgbw80w/ufo_rgbw80_3.jpg',
      'img/ufo_rgbw80w/ufo_rgbw80_4.jpg',
      'img/ufo_rgbw80w/ufo_rgbw80_5.jpg',
      'img/ufo_rgbw80w/ufo_rgbw80_6.jpg'
    ]
  },
  {
    name: 'Supper Color 100W',
    description: 'LED COB RGB 100W rọi sâu, tôn màu rực rỡ cho Ranchu, Phi Tần và cá chép.',
    specs: ['100W', 'Hồ 60–90 cm', 'Dimmer 6 mức', 'Không chỉnh màu', 'Hẹn giờ bật: 3/6/12h', 'BH 6 tháng'],
    images: [
      'img/100w/100w_1.jpg',
      'img/100w/100w_2.jpg',
      'img/100w/100w_3.jpg',
      'img/100w/100w_4.jpg',
      'img/100w/100w_5.jpg',
      'img/100w/100w_6.jpg'
    ]
  }
];

const lightsGrid = document.getElementById('lights-grid');
const lightDialog = document.getElementById('light-dialog');
if (lightsGrid && lightDialog) {
  const photoTrack = document.getElementById('light-photo-track');
  const photoCount = document.getElementById('light-photo-count');
  const previousPhoto = document.getElementById('light-photo-prev');
  const nextPhoto = document.getElementById('light-photo-next');
  const previousProduct = document.getElementById('light-product-prev');
  const nextProduct = document.getElementById('light-product-next');
  const productCount = document.getElementById('light-product-count');
  let activeProduct = null;
  let galleryTrigger = null;
  let activeCard = null;

  const activateCard = (card, centerCard = true) => {
    if (!card) return;
    activeCard?.classList.remove('is-active');
    activeCard?.removeAttribute('aria-current');
    activeCard = card;
    activeCard.classList.add('is-active');
    activeCard.setAttribute('aria-current', 'true');

    const cards = [...lightsGrid.querySelectorAll('.light-card')];
    const activeIndex = cards.indexOf(activeCard);
    previousProduct.hidden = activeIndex <= 0;
    nextProduct.hidden = activeIndex >= cards.length - 1;
    productCount.textContent = `${activeIndex + 1} / ${cards.length}`;

    if (centerCard) {
      const gridBounds = lightsGrid.getBoundingClientRect();
      const cardBounds = activeCard.getBoundingClientRect();
      const targetLeft = lightsGrid.scrollLeft + cardBounds.left - gridBounds.left - (lightsGrid.clientWidth - cardBounds.width) / 2;
      lightsGrid.scrollTo({ left: targetLeft, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };

  const updatePhotoControls = () => {
    if (!activeProduct || !photoTrack.clientWidth) return;
    const index = Math.max(0, Math.min(activeProduct.images.length - 1, Math.round(photoTrack.scrollLeft / photoTrack.clientWidth)));
    photoCount.textContent = `${index + 1} / ${activeProduct.images.length}`;
    previousPhoto.disabled = index === 0;
    nextPhoto.disabled = index === activeProduct.images.length - 1;
  };

  lightProducts.forEach((product, productIndex) => {
    const productId = `light-product-${productIndex}`;
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'light-card';
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('aria-labelledby', `${productId}-title`);
    card.setAttribute('aria-describedby', `${productId}-description ${productId}-specs ${productId}-price`);
    card.addEventListener('focus', () => activateCard(card));
    card.innerHTML = `
      <span class="light-cover"><img src="${product.images[0]}" alt="Đèn ${product.name}" loading="lazy" decoding="async" width="800" height="600"></span>
      <span class="light-card-body">
        <span class="light-card-title" id="${productId}-title">${product.name}</span>
        <span class="light-card-description" id="${productId}-description">${product.description}</span>
        <span class="light-card-specs" id="${productId}-specs">${product.specs.map((spec) => `<span>${spec}</span>`).join(' ')}</span>
        <span class="light-card-bottom"><strong id="${productId}-price">Giá: Liên hệ</strong><span><i class="fas fa-images" aria-hidden="true"></i> ${product.images.length} ảnh</span></span>
      </span>`;
    card.addEventListener('click', () => {
      activateCard(card);
      activeProduct = product;
      galleryTrigger = card;
      document.getElementById('light-dialog-title').textContent = product.name;
      photoTrack.replaceChildren(...product.images.map((src, index) => {
        const figure = document.createElement('figure');
        figure.className = 'light-photo';
        const imageFrame = document.createElement('div');
        imageFrame.className = 'light-photo-image';
        const image = document.createElement('img');
        image.src = src;
        image.alt = `Đèn ${product.name} - Ảnh ${index + 1}`;
        image.decoding = 'async';
        const caption = document.createElement('figcaption');
        caption.textContent = `${product.name} · Ảnh ${index + 1}`;
        imageFrame.append(image);
        figure.append(imageFrame, caption);
        return figure;
      }));
      lightDialog.showModal();
      document.body.classList.add('light-gallery-open');
      photoTrack.scrollLeft = 0;
      updatePhotoControls();
    });
    lightsGrid.append(card);
  });

  activateCard(lightsGrid.querySelector('.light-card'));
  let cardScrollEndTimer = 0;
  lightsGrid.addEventListener('scroll', () => {
    window.clearTimeout(cardScrollEndTimer);
    cardScrollEndTimer = window.setTimeout(() => {
      const gridCenter = lightsGrid.getBoundingClientRect().left + lightsGrid.clientWidth / 2;
      const centeredCard = [...lightsGrid.querySelectorAll('.light-card')].reduce((closest, card) => {
        const bounds = card.getBoundingClientRect();
        const distance = Math.abs(bounds.left + bounds.width / 2 - gridCenter);
        return !closest || distance < closest.distance ? { card, distance } : closest;
      }, null);
      activateCard(centeredCard?.card, false);
    }, 120);
  }, { passive: true });

  const moveProduct = (direction) => {
    const cards = [...lightsGrid.querySelectorAll('.light-card')];
    const nextIndex = Math.max(0, Math.min(cards.length - 1, cards.indexOf(activeCard) + direction));
    activateCard(cards[nextIndex]);
  };
  previousProduct.addEventListener('click', () => moveProduct(-1));
  nextProduct.addEventListener('click', () => moveProduct(1));
  lightsGrid.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    moveProduct(event.key === 'ArrowRight' ? 1 : -1);
  });
  window.addEventListener('resize', () => activateCard(activeCard));

  const movePhoto = (direction) => {
    const index = Math.round(photoTrack.scrollLeft / photoTrack.clientWidth);
    photoTrack.scrollTo({ left: (index + direction) * photoTrack.clientWidth, behavior: reduceMotion ? 'instant' : 'smooth' });
  };
  previousPhoto.addEventListener('click', () => movePhoto(-1));
  nextPhoto.addEventListener('click', () => movePhoto(1));
  photoTrack.addEventListener('scroll', updatePhotoControls, { passive: true });
  window.addEventListener('resize', updatePhotoControls);
  lightDialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      lightDialog.close();
      return;
    }
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    movePhoto(event.key === 'ArrowRight' ? 1 : -1);
  });
  document.getElementById('light-dialog-close').addEventListener('click', () => lightDialog.close());
  lightDialog.addEventListener('click', (event) => {
    const bounds = lightDialog.getBoundingClientRect();
    if (event.target === lightDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) lightDialog.close();
  });
  lightDialog.addEventListener('close', () => {
    document.body.classList.remove('light-gallery-open');
    galleryTrigger?.focus({ preventScroll: true });
  });
}

document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener('click', () => window.gtag?.('event', 'contact_click', { method: 'phone' }));
});
document.querySelectorAll('a[href*="zalo.me"]').forEach((link) => {
  link.addEventListener('click', () => window.gtag?.('event', 'contact_click', { method: 'zalo' }));
});
