export function createCarousel(initialstate = {}) {
  const state = {
    images: {},
    totalImages: 0,
    currentImage: 1,
    direction: "forward",
    ...initialstate,
  };

  function getDirection() {
    return state.direction;
  }

  function addImageTagId(id) {
    state.images = {
      ...state.images,
      [state.totalImages + 1]: id
    };
    state.totalImages = state.totalImages + 1;
  }

  function getActiveImage() {
    return state.images[state.currentImage];
  }

  function getPrevActiveImage() {
    if (state.direction === "forward") {
      if (state.currentImage === 1) return state.images[state.totalImages];
      return state.images[state.currentImage - 1];
    }

    if (state.direction === "back") {
      if (state.currentImage === state.totalImages) return state.images[1];
      return state.images[state.currentImage + 1];
    }
  }

  function getNextActiveImage() {
    if (state.direction === "back") {
      if (state.currentImage === 1) return state.images[state.totalImages];
      return state.images[state.currentImage - 1];
    }

    if (state.direction === "forward") {
      if (state.currentImage === state.totalImages) return state.images[1];
      return state.images[state.currentImage + 1];
    }
  }

  function next() {
    state.direction = "forward";
    if (state.currentImage < state.totalImages) {
      state.currentImage = state.currentImage + 1;
    } else {
      state.currentImage = 1;
    }
  }

  function prev() {
    state.direction = "back";
    if (state.currentImage > 1) {
      state.currentImage = state.currentImage - 1;
    } else {
      state.currentImage = state.totalImages;
    }
  }

  function slideTo(imageId) {
    if (imageId < state.currentImage) {
      state.direction = "back";
    } else {
      state.direction = "forward";
    }

    state.currentImage =
      imageId > 0 && imageId <= state.totalImages
        ? imageId
        : state.currentImage;
  }

  return {
    prev,
    next,
    getActiveImage,
    getPrevActiveImage,
    getNextActiveImage,
    addImageTagId,
    getDirection,
    slideTo,
    state
  };
}

// interface DOM and Logic of Carousel
function desactiveAllImages(carouselElement) {
  carouselElement.classList.remove("forward");
  carouselElement.classList.remove("back");
  carouselElement.querySelectorAll(".image").forEach(function(img) {
    img.classList.remove("is-active");
    img.classList.remove("is-prev-active");
    img.classList.remove("is-next-active");
  });
}

export function renderCarousel(carouselElement, carousel) {
  desactiveAllImages(carouselElement);
  carouselElement.classList.add(carousel.getDirection());
  carouselElement
    .querySelector(`[data-id=${carousel.getActiveImage()}]`)
    .classList.add("is-active");
  carouselElement
    .querySelector(`[data-id=${carousel.getPrevActiveImage()}]`)
    .classList.add("is-prev-active");
  carouselElement
    .querySelector(`[data-id=${carousel.getNextActiveImage()}]`)
    .classList.add("is-next-active");
}
