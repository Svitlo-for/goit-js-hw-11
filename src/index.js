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
  refs.loadMore.addEventListener("click", onLoadMore);

  function onSubmit(e) {
    e.preventDefault();
    page = 1;
    searchQuery = e.currentTarget.elements.searchQuery.value.trim();
    
    if(!searchQuery) {
      return Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
    };
    getImage(searchQuery, page);
  }

  async function getImage(value, page) {
    try {
      const response = await imgParams(value, page);
      refs.form.reset();

      if (response.totalHits && page === 1) {
        Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
      };

      if (response.totalHits === 0) {
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      };

      refs.loadMore.style.display = 'block';

      response.hits.map((hit) => {
        return createMarkup(hit);
      })

      lightbox.refresh();

      if (response.hits.length < 40) {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        refs.loadMore.style.display = 'none'
      }
    } catch (error) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
  }

  function onLoadMore() {
    page += 1;
    getImage(searchQuery, page);
  }

  // window.addEventListener('scroll', () => {
  //   if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
  //     getImage(searchQuery, page);
  //   };
  // });


