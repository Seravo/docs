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
      searchResultTemplate: '<li><a href="{url}">{title}</a><small> in <strong>{category}</strong></small<div class="search-content" data-content={content}></div></li>',
      noResultsText: 'No results found, Sorry! Please try again or add an issue <a href="https://github.com/{{site.github.repo}}/issues/">in Github</a>.'
    });
  });

  // Show trainings banner if visitor hasn't dismissed it so far
  if ( localStorage.getItem('dev-training-banner') != 'closed' ) {

    // Show the banner
    $("#dev-training-banner").show();

    if ( jQuery.inArray('fi', window.navigator.languages) > -1 ||
         jQuery.inArray('fi-FI', window.navigator.languages) > -1 ) {

       // Show text in Finnish for Finnish visitors
       $("#dev-training-banner *[lang=fi]").show();

     } else if ( jQuery.inArray('sv', window.navigator.languages) > -1 ||
                 jQuery.inArray('sv-se', window.navigator.languages) > -1 ) {

       // Show text in Swedish for Swedish visitors
       $("#dev-training-banner *[lang=sv]").show();

     } else {

       // Show text in English for other visitors
       $("#dev-training-banner *[lang=en]").show();

     }

  } else {
    $("#dev-training-banner").hide();
  }

  // Enable closing the trainings banner if it annoys
  $('#dev-training-banner .close').click( function (e){
    $("#dev-training-banner").hide();
    // Store selection and never show the banner again
    localStorage.setItem('dev-training-banner', 'closed');
    // Use localStorage.clear(); to reset selection
  });

})(jQuery);
