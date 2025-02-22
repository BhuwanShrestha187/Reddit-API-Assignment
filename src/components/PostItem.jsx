/*
 * Filename: PostItem.jsx
 * Author: Bhuwan Shrestha
 * Project: Front End Assignment
 * Course: Advanced Web Frameworks
 * Description: This component represents a single Reddit post, displaying its score, title, and a link to comments, with a button to add or remove it from favorites.
 */

import React from "react";

/*
 * Component Name: PostItem
 * Purpose: Renders a single Reddit post with its score, title, link, and favorite toggle button.
 */

export default function PostItem({ post, toggleFavorite, favoriteIds }) {
  return (
    <li className="post-item">
      <strong>Score:</strong> {post.score}
      <br />
      <strong>Title:</strong> {post.title}
      <br />
      <a
        href={`https://www.reddit.com${post.permalink}`}
        target="_blank"
        rel="noreferrer"
      >
        View Comments
      </a>
      <br />
      <button onClick={() => toggleFavorite(post.id)}>
        {favoriteIds.includes(post.id)
          ? "Remove from Favorites"
          : "Add to Favorites"}
      </button>
    </li>
  );
}
