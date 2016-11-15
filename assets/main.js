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
      noResultsText: 'No results found, Sorry! Please try again or add an issue <a href="{{site.github_url}}/issues/">in Github</a>.'
    });
  });
})(jQuery);
