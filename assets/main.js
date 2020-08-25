---
---
(function($) {
  $(document).ready(function(){

    // Show search results box when user searchs for something
    $('#search-input').keyup(function () {
      if( $(this).val() ) {
        $("#search-results-box").show();
      } else {
        $("#search-results-box").hide();
      }
    });
    // Allo focusing in search while clicking search
    $('#search-container a').click(function (evt){
      $('#search-container input').focus();
      evt.preventDefault();
    });
    SimpleJekyllSearch({
      searchInput: document.getElementById('search-input'),
      resultsContainer: document.getElementById('results-container'),
      json: '/docs/search.json',
      fuzzy: false,
      searchResultTemplate: '<li><a href="{url}">{title}</a><small> in <strong>{category}</strong></small></li>',
      noResultsText: 'No results found, Sorry! Please try again or add an issue <a href="https://github.com/{{site.github.repo}}/issues/">in Github</a>.'
    });
  });

  // Webinar banner identifier should be updated for each new webinar
  // so visitors will always see a banner for new webinars
  next_webinar_date = $("#webinar-banner").data("date");
  webinar_id = 'webinar-' + next_webinar_date;

  // Check if webinar is today or in future
  next = new Date(next_webinar_date);
  now = new Date();
  if (now <= next) {
    webinar_in_future = true;
  }

  // Show trainings banner if visitor hasn't dismissed it so far
  if ( localStorage.getItem(webinar_id) != 'closed' && webinar_in_future === true ) {

    // Show the banner
    $("#webinar-banner").show();

    if ( jQuery.inArray('fi', window.navigator.languages) > -1 ||
         jQuery.inArray('fi-FI', window.navigator.languages) > -1 ) {

       // Show text in Finnish for Finnish visitors
       $("#webinar-banner *[lang=fi]").show();

     } else if ( jQuery.inArray('sv', window.navigator.languages) > -1 ||
                 jQuery.inArray('sv-se', window.navigator.languages) > -1 ) {

       // Show text in Swedish for Swedish visitors
       $("#webinar-banner *[lang=sv]").show();

     } else {

       // Show text in English for other visitors
       $("#webinar-banner *[lang=en]").show();

     }

  } else {
    $("#webinar-banner").hide();
  }

  // Enable closing the trainings banner if it annoys
  $('#webinar-banner .close').click(function (e){
    $("#webinar-banner").hide();
    // Store selection and never show the banner again
    localStorage.setItem(webinar_id, 'closed');
    // Use localStorage.clear(); to reset selection
  });

})(jQuery);
