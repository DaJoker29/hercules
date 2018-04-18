$(function() {
  var tags = $('.tags')
    .data('tags')
    .split(',');
  console.log(tags);
  $('.search').autocomplete({
    source: tags,
  });
});
