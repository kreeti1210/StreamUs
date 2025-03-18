const searchResults = document.querySelector(".search-results");
const videoDetails = document.querySelector(".video");
const searchBar = document.getElementById("search");
// Function to fetch data from the YouTube API
async function fetchYouTubeData() {
  return await fetch(
    "https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=50&query=javascript&sortBy=keep%2520one%253A%2520mostLiked%2520%257C%2520mostViewed%2520%257C%2520latest%2520%257C%2520oldest"
  ).then((response) => response.json());
}

// Function to update the channel name
function updateChannelName(element) {
  const channelName = document.querySelector(".channelName");
  channelName.innerHTML =
    "<span>" +
    "Welcome to our YouTube channel " +
    "<br>" +
    element.data.data[0].items.snippet.channelTitle +
    "</span>";
}

// Function to display videos on the page
function traverse(element) {
  searchResults.style.display = "none";
  videoDetails.innerHTML = ""; // Clear previous content
  element.data.data.forEach((el) => {
    videoDetails.innerHTML +=
      "<div class='eachvideo'>" +
      "<a target ='_blank' href='https://www.youtube.com/watch?v=" +
      el.items.id +
      "'>" +
      "<img class ='thumbnail' src='" +
      el.items.snippet.thumbnails.medium.url +
      "'/>" +
      "<p class='videoTitle'>" +
      el.items.snippet.title +
      "</p>" +
      "</br>" +
      "</div>";
  });
}

// Function to handle search functionality
function searchVideos(element) {
  const searchTerm = searchBar.value.toLowerCase();
  let foundVideo = false;
  searchResults.style.display = "";
  searchResults.innerHTML = ""; // Clear previous search results

  element.data.data.forEach((el) => {
    const videoTitle = el.items.snippet.title.toString().toLowerCase();
    videoDetails.style.display = "none";

    if (videoTitle.includes(searchTerm)) {
      foundVideo = true;
      searchResults.innerHTML +=
        "<div class='eachvideo'>" +
        "<a target ='_blank' href='https://www.youtube.com/watch?v=" +
        el.items.id +
        "'>" +
        "<img class ='thumbnail' src='" +
        el.items.snippet.thumbnails.medium.url +
        "'/>" +
        "<p class='videoTitle'>" +
        el.items.snippet.title +
        "</p>" +
        "</br>" +
        "</div>";
    }
  });

  if (!foundVideo) {
    searchResults.innerHTML = "<h2 style='color:white'>Video not found</h2>";
  }
}

// Function to clear search results and reset the video list
function clearSearch() {
  searchBar.value = "";
  searchResults.style.display = "none";
  searchResults.innerHTML = ""; // Hide search results
  videoDetails.style.display = ""; // Show all videos
}

// Main function to initialize event listeners and fetch data
function initialize() {
  const searchButton = document.getElementById("search-button");
  const clearButton = document.getElementById("clear-search-button");

  fetchYouTubeData()
    .then((data) => {
      console.log(data);
      updateChannelName(data); // Update channel name
      traverse(data); // Display all videos

      // Add event listener for search button
      searchButton.addEventListener("click", () => searchVideos(data));

      // Add event listener for clear button
      clearButton.addEventListener("click", clearSearch);
    })
    .catch((error) => {
      console.error(error);
      const videoDetails = document.querySelector(".video");
      videoDetails.innerHTML = "<h2>Something went wrong</h2>";
    });
}

// Run the initialize function
initialize();
