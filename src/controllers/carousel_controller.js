import { Controller } from "stimulus"
import {createCarousel, renderCarousel} from '../lib/carousel';

export default class extends Controller {
  static targets = ['imageContainer', 'preview']

  connect() {
    // if you like to access to target elements, type:
    // this.imageContainerTarget
    // and if stimulus found more than one element, you get all target using;
    // this.imageContainerTargets
    console.log('connected')
    this.carousel = createCarousel(this.data.get('state'));

    this.imageContainerTargets.forEach((imageContainer) => {
      this.carousel.addImageTagId(imageContainer.dataset.id)
    })
  }

  // Just add methods to handle elements with actions,
  // internally keep isolated the logic of your UI behavior inside a pure function
  prev = () => {
    this.carousel.prev();
    this.data.set('state', this.carousel.state)
    renderCarousel(this.previewTarget, this.carousel);
  }


  next = () => {
    this.carousel.next();
    this.data.set('state', this.carousel.state)
    renderCarousel(this.previewTarget, this.carousel);
  }

  goto = (ev) => {
    const id = ev.target.dataset.id
    this.carousel.slideTo(id);
    this.data.set('state', this.carousel.state)
    renderCarousel(this.previewTarget, this.carousel);
  }
}
