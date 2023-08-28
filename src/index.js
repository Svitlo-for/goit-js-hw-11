import { imgParams } from "./pixabay-api";
import { createMarkup } from "./markup";

import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    form: document.querySelector(".search-form"),
    gallery: document.querySelector(".gallery"),
    loadMore: document.querySelector(".load-more"),
    

}

let searchQuery = "";
let page = 1;

const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });

  refs.form.addEventListener("submit", onSubmit);

  async function onSubmit(e) {
    e.preventDefault();
    searchQuery = e.target.elements.searchQuery.value.trim();
    if(!searchQuery) {
      return
    }
  }


