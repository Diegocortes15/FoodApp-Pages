'use strict';
const navigation = document.querySelector('.nav-bar');
const burgerMenuOpen = document.querySelector('.nav-bar__nav-mobile');
const burgerMenuClose = document.querySelector('.mobile-nav__button--close');
const backgroundMobileMenu = document.querySelector('.mobile-nav__background');
const mobileNav = document.querySelector('.mobile-nav__nav');
const mobileNavList = document.querySelector('.mobile-nav__list');
//////////////////////////////////////////////////////////////////////////////////
const carouselLeftBtn = document.querySelector(
	'.section-testimonial__carousel-controller--left'
);
const carouselRightBtn = document.querySelector(
	'.section-testimonial__carousel-controller--right'
);
const testimonialList = document.querySelector('.section-testimonial__list');
const testimonials = document.querySelectorAll('.section-testimonial__item');
//////////////////////////////////////////////////////////////////////////////////

const handlerMobileMenu = function () {
	backgroundMobileMenu.classList.toggle('active');
	mobileNav.classList.toggle('active');
	burgerMenuClose.classList.toggle('active');
};
burgerMenuOpen.addEventListener('click', handlerMobileMenu);
burgerMenuClose.addEventListener('click', handlerMobileMenu);

mobileNavList.addEventListener('click', function (e) {
	const target = e.target.closest('.mobile-nav__link');
	if (!target) return;
	handlerMobileMenu();
});

window.addEventListener('scroll', function () {
	navigation.classList.toggle('sticky', window.scrollY > 0);
});

navigation.addEventListener('click', function (e) {
	e.preventDefault();
	const target = e.target.closest('a');
	if (!target) return;
	// Matching strategy
	if (target.classList.contains('nav-bar__link')) {
		const id = e.target.getAttribute('href');
		if (!id.includes('#')) {
			document.location.href = target;
			return;
		}
		document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
	} else {
		document.location.href = target;
	}
});

mobileNavList.addEventListener('click', function (e) {
	e.preventDefault();
	const target = e.target.closest('a');
	if (!target) return;
	// Matching strategy
	if (e.target.classList.contains('mobile-nav__link')) {
		const id = e.target.getAttribute('href');
		if (!id.includes('#')) {
			document.location.href = e.target;
			return;
		}
		document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
	} else {
		document.location.href = target;
	}
});

//////////////////////////////////////////////////////////////////////////////////

if (testimonialList) {
	let curSlide = 0;
	const maxSlide = testimonials.length;

	const goToSlide = function (slide) {
		testimonials.forEach(
			(s) => (s.style.transform = `translateX(${100 * slide}%)`)
		);
	};

	const setSlides = function () {
		testimonials.forEach((s) => (s.style.transform = `translateX(${0}%)`));
	};

	// Next slide

	const nextSlide = function () {
		curSlide--;
		testimonialList.insertAdjacentElement(
			'beforeend',
			testimonialList.firstElementChild
		);
		curSlide = 0;
		goToSlide(curSlide);
	};

	const prevSlide = function () {
		curSlide++;
		testimonialList.insertAdjacentElement(
			'afterbegin',
			testimonialList.lastElementChild
		);
		curSlide = 0;
		goToSlide(curSlide);
	};

	const init = function () {
		goToSlide(0);
	};
	init();

	// Event handlers
	carouselRightBtn.addEventListener('click', nextSlide);
	carouselLeftBtn.addEventListener('click', prevSlide);
}

//////////////////////////////////////////////////////////////////////////////////
// Reveal sections
const allSections = Array.from(document.querySelectorAll('.section'));

const revealSection = function (entries, observer) {
	const [entry] = entries;

	if (!entry.isIntersecting) return;

	entry.target.classList.remove('section--hidden');
	observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
	root: null,
	threshold: 0.15,
});

allSections.forEach(function (section) {
	sectionObserver.observe(section);
	section.classList.add('section--hidden');
});
