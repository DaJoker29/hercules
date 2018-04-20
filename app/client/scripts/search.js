$(function() {
  if ($('.search').length) {
    var keywords = $('.keywords')
      .data('keywords')
      .split(',');
    $('.search').autocomplete({ source: keywords });
  }
});
