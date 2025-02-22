/*
 * Filename: storage.jsx
 * Author: Bhuwan Shrestha
 * Project: Front End Assignment
 * Course: Advanced Web Frameworks
 * Description: This file handles retrieving and saving favorite post IDs in localStorage to persist user-selected favorites across sessions.
 */

/*
 * Component Name: getStoredFavorites
 * Purpose: Retrieves the stored favorite post IDs from localStorage and returns them as an array.
 */
export const getStoredFavorites = () => {
  return JSON.parse(localStorage.getItem("favoriteIds")) || [];
};

/*
 * Component Name: saveFavorites
 * Purpose: Saves the given array of favorite post IDs to localStorage for persistence.
 */
export const saveFavorites = (favoriteIds) => {
  localStorage.setItem("favoriteIds", JSON.stringify(favoriteIds));
};
