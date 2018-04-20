$(function() {
  if ($('.word-count').length) {
    // Once initially
    renderWordCount();

    // Then on every keypress
    $('.editor-content').on('keyup', renderWordCount);
  }

  function countWords() {
    return $('.editor-content')
      .val()
      .trim()
      .split(/\s+/)
      .filter(function(e) {
        return e.length > 0;
      }).length;
  }

  function renderWordCount() {
    var target = $('.word-target').html();
    var count = countWords();

    if (count >= target) {
      $('.word-counter').addClass('target-hit');
    } else {
      $('.word-counter').removeClass('target-hit');
    }

    return $('.word-count').html(count);
  }
});
