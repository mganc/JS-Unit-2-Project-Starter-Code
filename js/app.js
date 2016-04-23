/*
  Feedr js
*/

var $article = $("article");
var $dropdownButton = $(".dropdown-button");
var $dropdownMenu = $(".dropdown-menu");
var $popUp = $("#popUp");
var $closePopUp = $(".closePopUp");
var $search = $("#search");
var $nav = $("nav");
var $mashableValue = $("#mashable");
var $redditValue = $("#reddit");
var $diggValue = $("#digg");
var $initialValue = $("#initial-value span");
var $mainContent = $("#main");
var $navItems = $("nav ul ul li");
//Handlebars Template variables
var source = $("#article-template").html();
var template = Handlebars.compile(source);

$dropdownButton.hover(function () {
  $dropdownMenu.addClass("open");
});

$search.click(function(){
  switch ($initialValue.text()) {
    case 'Reddit':
      searchReddit();
      break;
    case 'Digg':
      searchDigg();
      break;
    case 'Mashable':
      searchMashable();
      break;
  }
})

function Article(options) {
  this.title = options.title;
  this.impressions = options.impressions;
  this.tag = options.tag;
  this.image = options.image;
  this.link = options.link;
}

$redditValue.click(function() {
  $dropdownMenu.removeClass("open");
  $initialValue.text("Reddit");
})

// console.log(myArticle);

// REDDIT API
// data.children.data.title
// data.children.data.url //URL to content, add to title link
// data.children.data.thumnail //URL for image
// data.children.data.url //URL to content, add read more link
// data.children.data.subreddit //category
// data.children.data.score

function searchReddit() {
  $mainContent.empty();
  var url = 'https://www.reddit.com/top.json';
  $.get(url, function(response){
      var articleData = response.data.children
      for (i = 0; i < articleData.length; i++) {
        var article = new Article({
          title: articleData[i].data.title,
          impressions: articleData[i].data.score,
          tag: articleData[i].data.subreddit,
          image: articleData[i].data.thumbnail,
          link: articleData[i].data.url
        });

        console.log(article);
        $mainContent.append(template(article));
      }
  })
}


$mashableValue.click(function() {
  $dropdownMenu.removeClass("open");
  $initialValue.text("Mashable");
})

// MASHABLE API
// new.title
// new.link // link to full content
// new.feature_image //URL for image
// new.content
// new.channel // category
// new.shares.total

function searchMashable() {
  $mainContent.empty();
  var url = 'http://feedr-api.wdidc.org/mashable.json';
  $.get(url, function(response){
      var articleData = response.new;
      for (i = 0; i < articleData.length; i++) {
        var article = new Article({
          title: articleData[i].title,
          impressions: articleData[i].shares.total,
          tag: articleData[i].channel,
          image: articleData[i].responsive_images[0].image,
          link: articleData[i].link
        });
        $mainContent.append(template(article));
      }
  })
}

$diggValue.click(function() {
  $dropdownMenu.removeClass("open");
  $initialValue.text("Digg");
})

// DIGG API
// data.feed.content.title
// data.feed.content.url // Link to full content
// data.feed.content.media.images[0].url //URL for image
// data.feed.content.description
// data.feed.content.domain_name // category
// data.feed.diggs.count

function searchDigg() {
  $mainContent.empty();
  var url = 'http://feedr-api.wdidc.org/digg.json';
  $.get(url, function(response){
      var articleData = response.data.feed;
    // console.log(response);
      for (i = 0; i < articleData.length; i++) {
        var article = new Article({
          title: articleData[i].content.title,
          impressions: articleData[i].diggs.count,
          tag: articleData[i].content.domain_name,
          image: articleData[i].content.media.images[0].url,
          link: articleData[i].content.url
        });
        $mainContent.append(template(article));
        // console.log('appended article', $title);
      }

      var $title = $(".article .articleContent h3");
      $title.click(function (e) {
        console.log('title clicked', $title);
      })

      // $title.click(function(e) {
      //   e.preventDefault();
      //   console.log("click");
      // })
  })
}

// On click of article title, display pop-up
// $title.click(function(e) {
//   e.preventDefault();
//   console.log("click");
//   $popUp.removeClass("loader hidden");
// })
$closePopUp.click(function(e) {
  e.preventDefault();
  $popUp.addClass("loader hidden");
})
