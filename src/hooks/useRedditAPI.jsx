/*
 * Filename: useRedditAPI.jsx
 * Author: Bhuwan Shrestha
 * Project: Front End Assignment
 * Course: Advanced Web Frameworks
 * Description: This file manages fetching Reddit posts, handling favorites, and storing them in local storage while ensuring UI updates when favorite posts change.
 */
import { useState, useEffect } from "react";
import { getStoredFavorites, saveFavorites } from "../utils/storage";

/*
 * Component Name: useRedditAPI
 * Purpose: Manages subreddit fetching, favorite posts, and local storage handling for the Reddit API integration.
 */

export default function useRedditAPI() {
  const [subreddit, setSubreddit] = useState(""); //stores the selected subreddit name
  const [posts, setPosts] = useState([]); //array to hold the fetched subreddit posts
  const [favoriteIds, setFavoriteIds] = useState(getStoredFavorites()); //array to store IDs of fav posts which will be retrieved from local browser's storage
  const [favoritePosts, setFavoritePosts] = useState([]); //array to store actual favorite post details

  const fetchSubredditPosts = async () => {
    if (!subreddit) return; //If no subreddit specified, return immediately

    const cachedData = localStorage.getItem(`subreddit-${subreddit}`); //Check local storage for stored posts so that we dont need to make another API calls
    if (cachedData) {
      //if cached data found, use the stored data instead of making new request
      const cachedPosts = JSON.parse(cachedData);
      setPosts(cachedPosts);
      console.log("Cached Detected!");
      return;
    }

    try {
      const response = await fetch(
        `https://corsproxy.io/?https://api.reddit.com/r/${subreddit}/hot?limit=10` //actual call to reddit API. Used CORS to bypass issues
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); //parsing the JSON response
      console.log("Total posts received:", data.data.children.length);

      const filteredPosts = data.data.children
        .map((post) => post.data)
        .filter((post) => !post.stickied) //removing stickied posts to display exactly 10 post in the  UI
        .slice(0, 10);

      console.log(
        `Total posts after filtering stickied posts: ${filteredPosts.length}`
      );

      //Saving fetched posts to local storage for future use
      localStorage.setItem(
        `subreddit-${subreddit}`,
        JSON.stringify(filteredPosts)
      ); // Save to localStorage

      setPosts(filteredPosts); //Update the state to reflect the new posts
    } catch (error) {
      console.error("Error fetching subreddit:", error);
    }
  };

  // Fetch favorite post details
  const fetchFavoritePosts = async () => {
    if (favoriteIds.length === 0) {
      //if no IDs exists, then clear the fav list
      setFavoritePosts([]);
      return;
    }

    try {
      const idsString = favoriteIds.map((id) => `t3_${id}`).join(","); //Convert fav IDs to APU query
      const response = await fetch(
        `https://corsproxy.io/?https://api.reddit.com/api/info.json?id=${idsString}` //fetch full post detauls of fav posts
      );

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      const allFavs = data.data.children.map((post) => ({
        //filtering only the necessary data like ID, title, Score, Permalink
        id: post.data.id,
        title: post.data.title,
        score: post.data.score,
        permalink: post.data.permalink,
      }));

      setFavoritePosts(allFavs);
    } catch (error) {
      console.error("Error fetching favorite posts:", error);
    }
  };

  // Toggle favorite status
  const toggleFavorite = (id) => {
    const updatedFavorites = favoriteIds.includes(id) //if post is already in favorites, then remove it and add it if there is not.
      ? favoriteIds.filter((favId) => favId !== id)
      : [...favoriteIds, id];

    setFavoriteIds(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  //refetch favorite posts whenever fav ID changes
  useEffect(() => {
    fetchFavoritePosts();
  }, [favoriteIds]);

  return {
    subreddit,
    setSubreddit,
    posts,
    favoriteIds,
    favoritePosts,
    fetchSubredditPosts,
    toggleFavorite,
  };
}
