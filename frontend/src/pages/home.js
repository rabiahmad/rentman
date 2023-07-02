import React from "react";
import LogoImage from "../components/logo_image";
import LogoWithText from "../components/logo_with_text";
import LargeHomeLogo from "../components/large_home_logo";
import RentmanSpeech from "../components/rentman_speech";
import RentmanComic from "../components/rentman_comic";

const Home = () => {
  return (
    <div>
      <style>{"body { background-color: red; }"}</style>
      <RentmanSpeech />
      {/* <LargeHomeLogo /> */}
      {/* <RentmanComic /> */}
    </div>
  );
};

export default Home;
