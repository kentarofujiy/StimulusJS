import {createCarousel} from './carousel';

describe('carousel', () => {
  test('carousel return the current state', () => {
    const carousel = createCarousel()

    expect(carousel.state).toEqual({
        "currentImage": 1,
        "direction": "forward",
        "images": {},
        "totalImages": 0,
      })
  });

  test('carousel should add one image id', () => {
    const carousel = createCarousel()
    carousel.addImageTagId(10);

    expect(carousel.state).toEqual({
      "currentImage": 1,
      "direction": "forward",
      "images": {"1": 10},
      "totalImages": 1
    })
  });

  test('carousel should add many image ids', () => {
    const carousel = createCarousel()
    carousel.addImageTagId(10);
    carousel.addImageTagId(18);
    carousel.addImageTagId(40);

    expect(carousel.state).toEqual({
      "currentImage": 1,
      "direction": "forward",
      "images": {
        "1": 10,
        "2": 18,
        "3": 40
      },
      "totalImages": 3
    })
  });

  test('carousel should go to the right', () => {
    const carousel = createCarousel()
    carousel.addImageTagId(10);
    carousel.addImageTagId(18);
    carousel.addImageTagId(40);
    carousel.next()

    expect(carousel.state).toEqual({
      // just change de curent image
      "currentImage": 2,
      "direction": "forward",
      "images": {
        "1": 10,
        "2": 18,
        "3": 40
      },
      "totalImages": 3
    })
  });

  test('carousel should go to the left', () => {
    const carousel = createCarousel()
    carousel.addImageTagId(10);
    carousel.addImageTagId(18);
    carousel.addImageTagId(40);
    carousel.prev()

    expect(carousel.state).toEqual({
      // just change de curent image and direction
      "currentImage": 3,
      "direction": "back",
      "images": {
        "1": 10,
        "2": 18,
        "3": 40
      },
      "totalImages": 3
    })
  });
});
