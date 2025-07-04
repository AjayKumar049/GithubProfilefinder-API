import { useState } from "react";
import { fetchGithubUser } from "../service/GithubService";

const SearchUI = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setUserData(null);

    if (!username.trim()) {
      setError("Please enter a GitHub username.");
      return;
    }

    const result = await fetchGithubUser(username.trim());
    if (result.error) {
      setError("User not found");
    } else {
      setUserData(result);
    }
  };

  return (
    <div className="w-full px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-xl shadow-xl rounded-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-sky-700 mb-6">
          GitHub Profile Finder
        </h1>

        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <label className="text-base sm:text-lg font-medium text-gray-800">
            Enter GitHub ID:
          </label>
          <input
            type="text"
            placeholder="e.g., torvalds"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 border border-sky-400 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="submit"
            className="bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition-colors text-sm sm:text-base"
          >
            Search
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-600 font-medium text-center text-sm sm:text-base">
            {error}
          </div>
        )}

        {userData && (
          <div className="mt-6 space-y-2 text-sm sm:text-base">
            <p className="text-gray-700">
              <span className="font-semibold">Joined Date:</span>{" "}
              {userData.joinedDate}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Total Public Repos:</span>{" "}
              {userData.totalRepos}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Location:</span> {userData.location}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUI;
