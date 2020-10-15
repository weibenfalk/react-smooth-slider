import styled from 'styled-components';
import { StyledSliderItem } from './SliderItemStyles';

type SliderWrapperProps = {
  zoomFactor: number;
  visibleSlides: number;
};

type SliderProps = {
  visibleSlides: number;
  transformValue: string;
  zoomFactor: number;
  slideMargin: number;
  pageTransition: number;
  ref: any;
};

export const StyledSliderWrapper = styled.div<SliderWrapperProps>`
  overflow: hidden;
  position: relative;
  background: #111;
  padding: ${(props) => (props.zoomFactor / props.visibleSlides) * 0.7 + '%'} 0;

  .button-wrapper {
    position: absolute;
    width: 55px;
    height: 100%;
    top: 0;
    padding: ${(props) => props.zoomFactor / 7 + '%'} 0;
    box-sizing: border-box;
  }

  .button {
    display: block;
    background: rgb(0, 0, 0, 0.7);
    border: 0;
    top: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 3rem;
    font-weight: 800;
    cursor: pointer;
    outline: none;
    transition: all 0.7s;
    user-select: none;

    :hover {
      opacity: 0.5;
    }
  }

  .back {
    left: 0;
    border-radius: 0 1.5vw 1.5vw 0;
  }

  .forward {
    right: 0;
    border-radius: 1.5vw 0 0 1.5vw;
  }
`;

export const StyledSlider = styled.div<SliderProps>`
  display: flex;
  padding: 0 55px;
  transition: transform ${(props) => props.pageTransition}ms ease;

  :hover ${StyledSliderItem} {
    transform: translateX(${(props) => props.transformValue});
  }
`;
