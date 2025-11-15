"use client";

import React from "react";
import YouTube from "react-youtube";
import { notEmpty } from "./setup";

// Helper: Checks for 11-character format
const isValidYouTubeIdFormat = (id: string): boolean => {
  if (!id) return false;
  const ytIdRegex = /^[A-Za-z0-9_-]{11}$/;
  return ytIdRegex.test(id);
};

interface YouTubePlaylistPlayerProps {
  youtubeLinksAndSpare: string[][];
  children?: React.ReactNode;
}
function extractYouTubeId(input: string): string | null {
  if (!input) {
    return null;
  }

  if (isValidYouTubeIdFormat(input)) {
    return input;
  }
  const ytUrlRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

  const match = input.match(ytUrlRegex);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

export default function YouTubePlaylistPlayer({
  youtubeLinksAndSpare,
  children,
}: YouTubePlaylistPlayerProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0);
  const [currentInstanceIndex, setCurrentInstanceIndex] = React.useState(0);
  const playlist = React.useMemo(() => {
    return youtubeLinksAndSpare.map((subArray) => {
      return subArray
        .map(extractYouTubeId)
        .filter(notEmpty)
        .filter(isValidYouTubeIdFormat);
    });
  }, [youtubeLinksAndSpare]);

  const playNextVideo = () => {
    const nextIndex = currentVideoIndex + 1;
    if (nextIndex < playlist.length) {
      setCurrentVideoIndex(nextIndex);
      setCurrentInstanceIndex(0);
    } else {
      console.log("Playlist finished.");
    }
  };
  const handleVideoError = () => {
    if (playlist[currentVideoIndex].length < currentInstanceIndex) {
      playNextVideo();
    }
    setCurrentInstanceIndex((previous) => previous + 1);
  };
  const currentVideoId = playlist[currentVideoIndex][currentInstanceIndex];
  if (!currentVideoId) {
    return children;
  }
  const playerOptions = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1, // Start playing the first video
    },
  };

  return (
    <div>
      <YouTube
        key={currentVideoId} // Force re-render on ID change
        videoId={currentVideoId}
        opts={playerOptions}
        onEnd={playNextVideo} // <-- Go to next on END
        onError={handleVideoError} // <-- Go to next on ERROR
      />
    </div>
  );
}
