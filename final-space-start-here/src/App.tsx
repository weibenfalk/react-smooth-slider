import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
// Components
import Slider from './components/Slider';

const Sliderprops = {
  zoomFactor: 30, // How much the image should zoom on hover in percent
  slideMargin: 10, // Margin on each side of slides
  maxVisibleSlides: 5,
  pageTransition: 500 // Transition when flipping pages
};

// Types
type Character = {
  abilities: string[];
  alias: string[];
  gender: string;
  hair: string;
  id: number;
  img_url: string;
  name: string;
  origin: string;
  species: string;
  status: string;
};

const App: React.FC = () => {
  return <div>Final Space App</div>;
};

export default App;
