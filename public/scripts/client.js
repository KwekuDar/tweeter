/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const stop = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

const createTweet = function(tweet) {
    const time = moment(tweet.created_at).fromNow();
    let $tweet = $(` 
    <article>
    <header>
      <span class="user"><img class="user" src="${tweet.user.avatars}" alt="Face Logo Image">
      <p>${tweet.user.name}</p></span>
      <p class="handle">${tweet.user.handle}</p>
    </header>
      <p class="profile-tweet">${stop(tweet.content.text)}</p>
    
    <footer>
      <span class ="time">${time}</span>
      <span class ="buttons"> 
        <i class="fas fa-flag"></i> 
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
        </article>`);
  
    return $tweet;
  };

  const showTweets = function(tweets) {
    for (let tweet of tweets) {
      const newTweet = createTweet(tweet);
      $("#tweets-container").prepend(newTweet);
    }
  };

  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    })
      .done((data) => {
        showTweets(data);
      })
      .fail((err) => {
        console.log(err.message);
      })
      .always(() => console.log('request to API has been fulfilled'));
  };

  $(document).ready(function() {

    $("form").on("submit", function(event) {
      // prevent the default behavior of the form submission
      event.preventDefault();
      console.log("Submit form");
      
      
      const tweetData = $(this).serialize();
      
      const numbChar = $(".new-tweet").find("textarea").val().length;
      
      if (numbChar > 140) {
        $(".error1").text("Character number exceeded").slideDown();
      
      } else if (numbChar === 0) {
        $(".error2").text("Please write a message").slideDown();
    
      } else {
        
        $(".error1").slideUp();
        $(".error2").slideUp();
        //ajax POST
        $.ajax({
          type: "POST",
          url: "/tweets",
          data: tweetData,
        }).then(loadTweets)
          .catch(res => console.log(res));
        //clear form
        $(".new-tweet").find("form").trigger("reset");
        //reset counter
        $(".counter").text(140);
      }
    });
    
    loadTweets();
    
  });