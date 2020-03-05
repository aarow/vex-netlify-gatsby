import React, { useState, useEffect } from "react";
import { Carousel, CarouselItem } from "reactstrap";

const SessionSlider = ({ classList = [], currentClass }) => {
  const findClassIndex = () => classList.indexOf(currentClass);
  const [activeIndex, setActiveIndex] = useState(findClassIndex);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    goToIndex(findClassIndex);
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

  const slides = classList.map(({ id, header, publicURL }) => {
    const style = {
      width: "100%",
      // background: `
      //   linear-gradient(115deg, transparent 75%, white 75.1%),
      //   url("${publicURL}") no-repeat center center
      // `,
      background: `
        url("${publicURL}") no-repeat center center
      `,
      backgroundSize: "cover",
      // padding: "66.66% 0 0 0"
      padding: "100% 0 0 0 "
    };
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={id}
      >
        {/* {header} */}
        <span className="d-block" style={style}></span>
        {/* <img src={publicURL} alt={header} width="200px" /> */}
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
