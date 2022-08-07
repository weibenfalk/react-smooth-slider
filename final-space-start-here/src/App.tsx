import React, { useState, useEffect } from "react";
import "../src/App.css";
import Dialog from "@material-ui/core/Dialog";
// Components
import Slider from "./components/Slider";
import CharacterCard from "./components/CharacterCard";
import { getAllJSDocTags } from "typescript";

const SliderProps = {
  zoomFactor: 30, // How much the image should zoom on hover in percent
  slideMargin: 10, // Margin on each side of slides
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
    if (listings) {
      return <h1>Listings</h1>;
    } else if (collections) {
      return <h1>Collections</h1>;
    } else {
      return <h1>Releases</h1>;
    }
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
        <div className="section-title-container">{renderTitle()}</div>
      </div>
      {listings ? (
        renderListings()
      ) : collections ? (
        renderCollections()
      ) : releases ? (
        renderReleases()
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default App;
