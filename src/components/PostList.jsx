/*
 * Filename: PostList.jsx
 * Author: Bhuwan Shrestha
 * Project: Front End Assignment
 * Course: Advanced Web Frameworks
 * Description:This component displays a list of posts from a subreddit, rendering each post using the PostItem component and allowing users to toggle favorites
 */

import React from "react";
import PostItem from "./PostItem";

/*
 * Component Name: PostList
 * Purpose: Displays a list of posts from the selected subreddit and allows users to add/remove favorites.
 */

export default function PostList({
  posts,
  toggleFavorite,
  favoriteIds,
  subreddit,
}) {
  return (
    <div className="posts-section">
      <h2>Posts in r/{subreddit || "[Subreddit]"}</h2>
      {posts.length === 0 ? (
        <p>No posts to display. Try fetching a subreddit.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              toggleFavorite={toggleFavorite}
              favoriteIds={favoriteIds}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
