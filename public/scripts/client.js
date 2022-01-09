/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//escaping a script
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


//create tweets
const createTweetElement = function(tweetObj) {
  const timeStamp = moment(tweetObj.created_at).fromNow();
  let $tweet = $(` 
  <article>
  <header>
    <span class="user"><img class="user" src="${tweetObj.user.avatars}" alt="Face Logo Image">
    <p>${tweetObj.user.name}</p></span>
    <p class="handle">${tweetObj.user.handle}</p>
  </header>
    <p class="profile-tweet">${escape(tweetObj.content.text)}</p>
  
  <footer>
    <span class ="time">${timeStamp}</span>
    <span class ="buttons"> 
      <i class="fas fa-flag"></i> 
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
      </article>`);

  return $tweet;
};

// load tweets with Ajax get request inside
const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
      .then(function(tweets) {
        // render function call for you
        renderTweets(tweets);
      });
};
  
  loadTweets();
  

//render tweets
const renderTweets = function(tweets) {
  // loops through tweets
  for (let tweet of tweets) {
    let newTweet = createTweetElement(tweet);
    $("#tweets-container").prepend(newTweet);
  }
};
const renderRecentTweet = function(tweets) {
  const recentTweet = tweets[tweets.length - 1];
  $('#tweets-container').prepend(createTweetElement(recentTweet));

};


// doc ready
$(document).ready(function() {

  $("#submit").on("submit", function(event) {
    // prevent the default behavior of the form submission
    event.preventDefault();
    
    // Create a string in the format name=value&name=value...
    const tweetData = $(this).serialize();
    // Create a variable that finds the text length
    const numbChar = $(".new-tweet").find("textarea").val().length;
    //conditions if text is over 140 or empty
    if (numbChar > 140) {
      $(".error1").text("Character number exceeded").slideDown();
    
    } else if (numbChar === 0) {
      $(".error2").text("Please write a message").slideDown();
  
    } else {
      //slide up when error corrected
      $(".error1").slideUp();
      $(".error2").slideUp();
      //ajax POST
      $.post("/tweets", tweetData, function(data) {
      })
      // rest everything for when data fetch
        .done(function() {
          $("#submit").trigger("reset");
          $(".counter").html(140);
          $.get('/tweets', renderRecentTweet);
          // function called for get request
        });
    }
  });


});