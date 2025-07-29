"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiHeart,
  FiMessageCircle,
  FiShare2,
  FiPlay,
  FiPause,
} from "react-icons/fi";
import { motion } from "framer-motion";

const SearchBags = () => {
  // Sample reels data - in a real app, this would come from an API
  const bagsData = [
    {
      id: 1,
      title: "Travel Essentials for Your Next Adventure",
      videoUrl: "/videos/reels.mp4", // This would be a real video in production
      bgColor: "bg-emerald-500",
      likes: 1245,
      views: 5678,
      comments: 89,
      instagramLink: "https://www.instagram.com/",
      username: "searchbags_official",
    },
    {
      id: 2,
      title: "Packing Tips for Weekend Getaways",
      videoUrl: "/videos/reels.mp4",
      bgColor: "bg-amber-400",
      likes: 987,
      views: 4321,
      comments: 56,
      instagramLink: "https://www.instagram.com/",
      username: "searchbags_official",
    },
    {
      id: 3,
      title: "How to Organize Your Backpack",
      videoUrl: "/videos/reels.mp4",
      bgColor: "bg-blue-500",
      likes: 2345,
      views: 8765,
      comments: 134,
      instagramLink: "https://www.instagram.com/",
      username: "searchbags_official",
    },
    {
      id: 4,
      title: "Travel Light with These Compact Bags",
      videoUrl: "/videos/reels.mp4",
      bgColor: "bg-red-500",
      likes: 876,
      views: 3456,
      comments: 42,
      instagramLink: "https://www.instagram.com/",
      username: "searchbags_official",
    },
    {
      id: 5,
      title: "Staycations with SearchBags",
      videoUrl: "/videos/reels.mp4",
      bgColor: "bg-purple-500",
      likes: 1543,
      views: 6789,
      comments: 98,
      instagramLink: "https://www.instagram.com/",
      username: "searchbags_official",
    },
  ];

  // State to store video thumbnails
  const [videoThumbnails, setVideoThumbnails] = useState({});

  // Format number with K for thousands
  const formatNumber = (num) => {
    return num >= 1000 ? `${(num / 1000).toFixed(1)}K` : num;
  };

  // State for tracking which video is playing
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef({});
  const thumbnailCanvasRef = useRef({});

  // Effect to generate thumbnails from videos
  useEffect(() => {
    // Function to generate thumbnail from video
    const generateThumbnail = async (videoUrl, id) => {
      try {
        // Create a video element
        const video = document.createElement("video");
        video.crossOrigin = "anonymous";
        video.src = videoUrl;
        video.muted = true;

        // When video metadata is loaded, seek to a point and capture frame
        video.onloadedmetadata = () => {
          // Seek to 0.5 seconds or 25% of the video, whichever is less
          const seekTime = Math.min(0.5, video.duration * 0.25);
          video.currentTime = seekTime;

          video.onseeked = () => {
            // Create canvas and draw video frame
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Get data URL from canvas
            const thumbnailUrl = canvas.toDataURL("image/jpeg");

            // Update thumbnails state
            setVideoThumbnails((prev) => ({
              ...prev,
              [id]: thumbnailUrl,
            }));

            // Clean up
            video.remove();
          };
        };

        // Handle errors
        video.onerror = () => {
          console.error(`Error loading video for thumbnail: ${videoUrl}`);
          // Use a fallback image
          setVideoThumbnails((prev) => ({
            ...prev,
            [id]: "/images/search.png",
          }));
        };

        // Start loading the video
        video.load();
      } catch (error) {
        console.error("Error generating thumbnail:", error);
        // Use fallback image on error
        setVideoThumbnails((prev) => ({
          ...prev,
          [id]: "/images/search.png",
        }));
      }
    };

    // Generate thumbnails for all videos
    bagsData.forEach((reel) => {
      generateThumbnail(reel.videoUrl, reel.id);
    });
  }, []);

  // Function to handle video play/pause
  const toggleVideo = (id) => {
    if (playingVideo === id) {
      videoRefs.current[id].pause();
      setPlayingVideo(null);
    } else {
      // Play the new video without pausing others
      videoRefs.current[id].play();
      setPlayingVideo(id);
    }
  };

  // Function to handle like action
  const handleLike = (e, id) => {
    e.stopPropagation(); // Prevent video toggle
    // In a real app, this would call an API to like the reel
    console.log(`Liked reel ${id}`);
  };

  return (
    <div className="overflow-hidden py-16 my-16">
      <div className="mb-12 text-center">
        <div className="inline-flex justify-center items-center mb-4">
          <div className="flex justify-center items-center mr-3 w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-5 h-5 fill-white"
            >
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-stone-900 font-heading">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Search</span>Bags Reels
          </h2>
        </div>
        <p className="mx-auto max-w-xl text-sm md:text-base text-stone-600 font-body">
          Explore our premium collection through immersive video showcases
        </p>
      </div>

      {/* Reels container - horizontal scrolling */}
      <div className="px-4 mx-auto max-w-7xl">
        <div className="relative">
          {/* Canvas-like background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-white to-teal-50 rounded-2xl shadow-lg opacity-60"></div>

          {/* Horizontal scrolling container */}
          <div className="overflow-x-auto relative pt-2 pb-8 hide-scrollbar">
            <div className="flex gap-6 px-4 py-6 min-w-max md:gap-8 md:pr-12 snap-x snap-mandatory">
              {bagsData.map((reel) => (
                <motion.div
                  key={reel.id}
                  className={`flex-shrink-0 overflow-hidden relative bg-white rounded-xl shadow-xl w-[280px] md:w-[320px] cursor-pointer transform transition-all duration-300 hover:scale-[1.03] snap-center border border-stone-100 hover:border-purple-200`}
                  whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  onClick={() => toggleVideo(reel.id)}
                >
                  {/* Instagram-style header */}
                  <div className="flex absolute top-0 right-0 left-0 z-10 justify-between items-center p-4 bg-gradient-to-b to-transparent from-black/80">
                    <div className="flex items-center">
                      <div className="flex justify-center items-center w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full ring-2 shadow-lg ring-white/30">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          className="w-4 h-4 fill-white"
                        >
                          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                        </svg>
                      </div>
                      <div className="ml-2">
                        <span className="text-xs font-medium text-white">
                          {reel.username}
                        </span>
                        <div className="text-[10px] text-white/70">Original Audio</div>
                      </div>
                    </div>
                    <div className="flex justify-center items-center w-6 h-6 rounded-full backdrop-blur-sm bg-black/30">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3.5 h-3.5 text-white">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </div>
                  </div>

                  {/* Video content */}
                  <div className="relative aspect-[9/16] bg-black">
                    {/* Thumbnail image (shown when video is not playing) */}
                    {playingVideo !== reel.id && (
                      <Image
                        src={videoThumbnails[reel.id] || "/images/search.png"}
                        alt={reel.title}
                        fill
                        className="object-cover brightness-90"
                      />
                    )}

                    {/* Video element */}
                    <video
                      ref={(el) => el && (videoRefs.current[reel.id] = el)}
                      src={reel.videoUrl}
                      className={`absolute inset-0 w-full h-full object-cover ${
                        playingVideo === reel.id ? "opacity-100" : "opacity-0"
                      }`}
                      playsInline
                      loop
                      muted
                    />

                    {/* Play/Pause button overlay */}
                    <div className="flex absolute inset-0 justify-center items-center">
                      {playingVideo !== reel.id ? (
                        <div className="flex justify-center items-center w-20 h-20 rounded-full border shadow-xl backdrop-blur-md transition-all duration-300 transform bg-black/30 hover:bg-black/40 hover:scale-105 border-white/20">
                          <FiPlay className="ml-1 w-10 h-10 text-white" />
                        </div>
                      ) : (
                        <div className="flex absolute right-4 bottom-4 justify-center items-center w-12 h-12 rounded-full border shadow-lg backdrop-blur-md bg-black/40 hover:bg-black/50 border-white/10">
                          <FiPause className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Reel info overlay */}
                  <div className="p-4 bg-white border-t border-stone-100">
                    <a
                      href={reel.instagramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="block"
                    >
                      <h3 className="text-sm font-semibold truncate transition-colors duration-200 text-stone-900 hover:text-purple-600">
                        {reel.title}
                      </h3>
                    </a>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex gap-4">
                        <button
                          className="relative group"
                          onClick={(e) => handleLike(e, reel.id)}
                        >
                          <FiHeart className="w-5 h-5 transition-all duration-300 transform text-stone-600 group-hover:text-red-500 group-hover:scale-110" />
                          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                        </button>
                        <button className="relative group">
                          <FiMessageCircle className="w-5 h-5 transition-all duration-300 transform text-stone-600 group-hover:text-blue-500 group-hover:scale-110" />
                          <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                        </button>
                      </div>
                      <div>
                        <a
                          href={reel.instagramLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="relative group"
                        >
                          <FiShare2 className="w-5 h-5 transition-all duration-300 transform text-stone-600 group-hover:text-teal-600 group-hover:scale-110" />
                          <span className="absolute -top-1 -right-1 w-2 h-2 bg-teal-500 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>


        </div>
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SearchBags;
