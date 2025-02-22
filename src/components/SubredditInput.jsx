/*
 * Filename: SubredditInput.jsx
 * Author: Bhuwan Shrestha
 * Project: Front End Assignment
 * Course: Advanced Web Frameworks
 * Description: This component provides an input field for users to enter a subreddit name and a button to fetch the top 10 hot posts from that subreddit.
 */

import React from "react";

/*
 * Component Name: SubredditInput
 * Purpose: Provides an input field for users to enter a subreddit and a button to fetch the top 10 hot posts.
 */

export default function SubredditInput({
  subreddit,
  setSubreddit,
  fetchSubredditPosts,
}) {
  return (
    <div className="subreddit-input">
      <input
        type="text"
        placeholder="Enter a subreddit"
        value={subreddit}
        onChange={(e) => setSubreddit(e.target.value)}
      />
      <button onClick={fetchSubredditPosts}>Fetch Top 10 (hot)</button>
    </div>
  );
}
