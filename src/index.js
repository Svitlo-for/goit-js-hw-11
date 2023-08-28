import { imgParams } from "./pixabay-api";
import { createMarkup } from "./markup";

import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    form: document.querySelector(".search-form"),
    gallery: document.querySelector(".gallery"),
    loadMore: document.querySelector(".load-more"),
    span: document.querySelector(".span-mode"),    
}

let searchQuery = "";
let page = 1;
let totalImg = 0;

const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });

  refs.form.addEventListener("submit", onSubmit);

  function onSubmit(e) {
    e.preventDefault();
    page = 1;
    clearContent();
    searchQuery = e.currentTarget.elements.searchQuery.value.trim();
    
    if(!searchQuery) {
      return Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
    };
    getImage();
  }

  function clearContent() {
    totalImg = 0;
    refs.span.textContent = '';
    refs.gallery.innerHTML = '';
  }

  async function getImage() {
    try {
      const response = await imgParams(value, page);
      refs.form.reset();

      if (response.totalHits) {
        Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
      };

      if (response.totalHits === 0) {
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      };
      for (let i = 0; i < response.img.length; i++) {
        const nextImage = createMarkup([response.img[i]]);
        refs.gallery.insertAdjacentHTML('beforeend', nextImage);
        lightbox.refresh();
      }
      page +=1;
      totalImg += response.img.length;
      if (totalImg >= response.totalHits) {
        refs.span.textContent = "We're sorry, but you've reached the end of search results."
      }
    } catch (error) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
      getImage();
    };
  });


