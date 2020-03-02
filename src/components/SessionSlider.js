import React, { useState, useEffect } from "react";
import { Carousel, CarouselItem } from "reactstrap";

const SessionSlider = ({ classList = [], currentClass }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeClass, setActiveClass] = useState(currentClass);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    console.log("activeClass:", activeClass);
    console.log("currentClass: ", currentClass);
  }, [currentClass]);

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === classList.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? classList.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = classList.map(({ node }) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={node.id + node.frontmatter.title}
      >
        {node.id}
        {/* <img src={item.src} alt={item.altText} /> */}
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      interval={false}
    >
      {slides}
    </Carousel>
  );
};

export default SessionSlider;
