/*
 * Filename: App.jsx
 * Author: Bhuwan Shrestha
 * Project: Front End Assignment
 * Course: Advanced Web Frameworks
 * Description: This is the main application component that integrates Reddit post fetching, favorite management, and UI components for user interaction using the useRedditAPI custom hook.
 */

import React from "react";
import useRedditAPI from "./hooks/useRedditAPI";
import SubredditInput from "./components/SubredditInput";
import PostList from "./components/PostList";
import FavoriteList from "./components/FavoriteList";
import "./App.css"; // Importing CSS for styling

/*
 * Component Name: App
 * Purpose: Serves as the main component that integrates subreddit fetching, favorite management, and UI components for user interaction.
 */

export default function App() {
  const {
    subreddit,
    setSubreddit,
    posts,
    favoriteIds,
    favoritePosts,
    fetchSubredditPosts,
    toggleFavorite,
  } = useRedditAPI();

  return (
    <div className="app-container">
      <h1 className="app-title">Reddit Favorite Posts</h1>
      <SubredditInput
        subreddit={subreddit}
        setSubreddit={setSubreddit}
        fetchSubredditPosts={fetchSubredditPosts}
      />

      <div className="content-container">
        <div className="column posts-column">
          <PostList
            posts={posts}
            toggleFavorite={toggleFavorite}
            favoriteIds={favoriteIds}
            subreddit={subreddit}
          />
        </div>
        <div className="column favorites-column">
          <FavoriteList
            favoritePosts={favoritePosts}
            toggleFavorite={toggleFavorite}
            favoriteIds={favoriteIds}
          />
        </div>
      </div>
    </div>
  );
}
