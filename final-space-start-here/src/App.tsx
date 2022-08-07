import React, { useState, useEffect } from "react";
import "../src/App.css";
import Dialog from "@material-ui/core/Dialog";
// Components
import Slider from "./components/Slider";
import CharacterCard from "./components/CharacterCard";
import * as IoIcons from "react-icons/io";

const SliderProps = {
  zoomFactor: 25, // How much the image should zoom on hover in percent
  slideMargin: 8, // Margin on each side of slides
  maxVisibleSlides: 5,
  pageTransition: 500, // Transition when flipping pages
};

// Types
export type Character = {
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
  const [data, setData] = useState<Character[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [listings, setListingsActive] = useState(true);
  const [collections, setCollectionsActive] = useState(false);
  const [releases, setReleasesActive] = useState(false);
  const [charData, setCharData] = useState(
    "https://finalspaceapi.com/api/v0/character/"
  );
  const [activeCharacter, setActiveCharacter] = useState<Character>(
    {} as Character
  );
  const [arrowUp, setArrowUp] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [isFilterActive, setIsFilterActive] = useState(false);

  const handleDialogOpen = (character: Character) => {
    setIsDialogOpen(true);
    setActiveCharacter(character);
  };

  const activateListings = () => {
    setListingsActive(true);
    setCollectionsActive(false);
    setReleasesActive(false);
  };

  const activateCollections = () => {
    setListingsActive(false);
    setCollectionsActive(true);
    setReleasesActive(false);
  };

  const activateReleases = () => {
    setListingsActive(false);
    setCollectionsActive(false);
    setReleasesActive(true);
  };

  const renderTitle = () => {
    return listings ? (
      <h1>Listings</h1>
    ) : collections ? (
      <h1>Collections</h1>
    ) : (
      <h1>Releases</h1>
    );
  };

  const handleDropdown = () => {
    setArrowUp(!arrowUp);
    setDropdownVisible(!dropdownVisible);
  };

  const handleFilterClick = () => {
    setListingsActive(!listings);
    setIsFilterActive(!isFilterActive);
  };

  const renderDropDownMenu = () => {
    return (
      <div className="dd-menu">
        <ul className="dd-list">
          {!isFilterActive ? (
            <li onClick={handleFilterClick}>Show Active</li>
          ) : (
            <li onClick={handleFilterClick} style={{ color: "#00b1ff" }}>
              Show All
            </li>
          )}
          <li>Filter 2</li>
          <li>Filter 3</li>
        </ul>
      </div>
    );
  };

  useEffect(() => {
    const getData = async () => {
      const data = await (await fetch(charData)).json();
      setData(data);
    };

    getData();
  }, []);

  const earthlings = data.filter((c) => c.origin === "Earth");
  const living = data.filter((c) => c.status === "Alive");
  const dead = data.filter((c) => c.status === "Deceased");

  const filterActive = () => {
    return (
      <Slider {...SliderProps}>
        {dead.map((character) => (
          <div key={character.id} onClick={() => handleDialogOpen(character)}>
            <img src={character.img_url} alt="character" />
          </div>
        ))}
      </Slider>
    );
  };

  const renderListings = () => {
    return (
      <Slider {...SliderProps}>
        {data.map((character) => (
          <div key={character.id} onClick={() => handleDialogOpen(character)}>
            <img src={character.img_url} alt="character" />
          </div>
        ))}
      </Slider>
    );
  };

  const renderCollections = () => {
    return (
      <Slider {...SliderProps}>
        {earthlings.map((character) => (
          <div key={character.id} onClick={() => handleDialogOpen(character)}>
            <img src={character.img_url} alt="character" />
          </div>
        ))}
      </Slider>
    );
  };

  const renderReleases = () => {
    return (
      <Slider {...SliderProps}>
        {living.map((character) => (
          <div key={character.id} onClick={() => handleDialogOpen(character)}>
            <img src={character.img_url} alt="character" />
          </div>
        ))}
      </Slider>
    );
  };

  if (data.length < 1) return <div>Loading ...</div>;

  return (
    <>
      <Dialog onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
        <CharacterCard character={activeCharacter} />
      </Dialog>
      <div className="page-wrapper">
        <div className="menu-container">
          <button
            className={listings ? "menu-title-active" : "menu-title"}
            onClick={activateListings}
          >
            Listings
          </button>
          <button
            className={collections ? "menu-title-active" : "menu-title"}
            onClick={activateCollections}
          >
            Collections
          </button>
          <button
            className={releases ? "menu-title-active" : "menu-title"}
            onClick={activateReleases}
          >
            Releases
          </button>
        </div>
        <div className="title-and-menu">
          <div className="section-title-container">
            {renderTitle()}{" "}
            {!arrowUp ? (
              <IoIcons.IoIosArrowDown
                onClick={handleDropdown}
                className="down-arrow"
              />
            ) : (
              <IoIcons.IoIosArrowUp
                onClick={handleDropdown}
                className="up-arrow"
              />
            )}
          </div>
          {dropdownVisible ? renderDropDownMenu() : null}
        </div>
      </div>
      {listings ? (
        renderListings()
      ) : collections ? (
        renderCollections()
      ) : releases ? (
        renderReleases()
      ) : isFilterActive ? (
        filterActive()
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default App;
