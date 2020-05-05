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

  // Show trainings banner for Finnish visitors
  if ( localStorage.getItem('dev-training-banner-fi') != 'closed' &&
       (
         jQuery.inArray('fi', window.navigator.languages) > -1 ||
         jQuery.inArray('fi-FI', window.navigator.languages) > -1
       )
     ) {
    $("#dev-training-banner-fi").show();
  } else {
    $("#dev-training-banner-fi").hide();
  }

  // Show trainings banner for Swedish visitors
  if ( localStorage.getItem('dev-training-banner-se') != 'closed' &&
       (
         jQuery.inArray('sv', window.navigator.languages) > -1 ||
         jQuery.inArray('sv-se', window.navigator.languages) > -1
       )
     ) {
    $("#dev-training-banner-se").show();
  } else {
    $("#dev-training-banner-se").hide();
  }

  // Show trainings banner for English visitors
  if ( localStorage.getItem('dev-training-banner-en') != 'closed' &&
       (
         jQuery.inArray('en', window.navigator.languages) > -1 ||
         jQuery.inArray('en-us', window.navigator.languages) > -1 ||
         jQuery.inArray('en-gb', window.navigator.languages) > -1
       )
     ) {
    $("#dev-training-banner-en").show();
  } else {
    $("#dev-training-banner-en").hide();
  }

  // Enable closing the Finnish trainings banner if it annoys
  $('#dev-training-banner-fi .close').click( function (e){
    $("#dev-training-banner-fi").hide();
    // Store selection and never show the banner again
    localStorage.setItem('dev-training-banner-fi', 'closed');
    // Use localStorage.clear(); to reset selection
  });

  // Enable closing the Swedish trainings banner if it annoys
  $('#dev-training-banner-se .close').click( function (e){
    $("#dev-training-banner-se").hide();
    // Store selection and never show the banner again
    localStorage.setItem('dev-training-banner-se', 'closed');
    // Use localStorage.clear(); to reset selection
  });

  // Enable closing the English trainings banner if it annoys
  $('#dev-training-banner-en .close').click( function (e){
    $("#dev-training-banner-en").hide();
    // Store selection and never show the banner again
    localStorage.setItem('dev-training-banner-en', 'closed');
    // Use localStorage.clear(); to reset selection
  });

})(jQuery);
