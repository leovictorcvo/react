import React from 'react';
import PropTypes from 'prop-types';

import { VideoCardContainer } from './styles';

function getYouTubeId(youtubeURL) {
  return youtubeURL
    .replace(
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
      '$7',
    );
}

let timer;
let video;
const timeToStartPlayingTheVideo = 2500;

function VideoCard({ videoTitle, videoURL, categoryColor }) {
  const image = `https://img.youtube.com/vi/${getYouTubeId(videoURL)}/hqdefault.jpg`;
  const handleMouseEnter = (evt) => {
    video = evt.target;
    timer = setTimeout(() => {
      video.click();
    }, timeToStartPlayingTheVideo);
  };
  const handleMouseLeave = () => {
    clearTimeout(timer);
  };
  return (
    <VideoCardContainer
      url={image}
      href={videoURL}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      target="_blank"
      style={{ borderColor: categoryColor || 'red' }}
      title={videoTitle}
    >
      <VideoCardContainer.Title backGroundColor={categoryColor}>
        <VideoCardContainer.Title.Text>
          {videoTitle}
        </VideoCardContainer.Title.Text>
      </VideoCardContainer.Title>
    </VideoCardContainer>
  );
}

VideoCard.propTypes = {
  videoTitle: PropTypes.string.isRequired,
  videoURL: PropTypes.string.isRequired,
  categoryColor: PropTypes.string.isRequired,

};

export default VideoCard;
