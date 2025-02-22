/*
 * Filename: SubredditInput.jsx
 * Author: Bhuwan Shrestha
 * Project: Front End Assignment
 * Course: Advanced Web Frameworks
 * Description: This component displays a list of favorite posts, rendering each post using the PostItem component and allowing users to toggle favorites.
 */

import React from "react";
import PostItem from "./PostItem";

/*
 * Component Name: FavoriteList
 * Purpose: Displays the list of favorite posts and allows users to remove them.
 */
export default function FavoriteList({
  favoritePosts, //array for favorite posts
  toggleFavorite, //function to add/remove favorites
  favoriteIds, //array of IDs of fav posts
}) {
  return (
    <div className="favourites-section">
      <h2>Your Favourites</h2>
      {favoritePosts.length === 0 ? (
        <p>No favourite posts yet. Add some to your list! 💖💖</p>
      ) : (
        <ul>
          {favoritePosts.map((fav) => (
            <PostItem
              key={fav.id}
              post={fav}
              toggleFavorite={toggleFavorite}
              favoriteIds={favoriteIds}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
