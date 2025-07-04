// src/services/GithubService.jsx

import axios from "axios";

export const fetchGithubUser = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    const data = response.data;

    return {
      joinedDate: new Date(data.created_at).toDateString(),
      totalRepos: data.public_repos,
      location: data.location || "Location not specified",
    };
  } catch (error) {
    return {
      error:
        error.response?.status === 404
          ? "User not found"
          : "An error occurred while fetching data",
    };
  }
};
