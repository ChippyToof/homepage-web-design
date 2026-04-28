// make everything draggable
$(".draggable").draggable({
  containment: ".drag-area",

  start: function () {
    const tape = $(this);

    // detach when user starts dragging
    tape.removeData("corner");
  },

  stop: function () {
    checkTapeState();
  }
});


// positions tape on paper corners
function positionTape() {
  const paper = $(".recipe-paper");
  const parent = $(".drag-area");

  const paperOffset = paper.offset({top:100});
  const parentOffset = parent.offset();

  const paperWidth = paper.outerWidth({width:400});
  const paperHeight = paper.outerHeight({height:515});

  function place(selector, _corner, top, left) {
    const tape = $(selector);

    // only move if still attached
    if (!tape.data("corner")) return;

    tape.css({
      top: top,
      left: left
    });
  }

  // top right
  place(
    ".blue-tape-tr",
    "topRight",
    paperOffset.top - parentOffset.top,
    paperOffset.left - parentOffset.left + paperWidth - 105
  );

  // top left
  place(
    ".blue-tape-tl",
    "topLeft",
    paperOffset.top - parentOffset.top - 40,
    paperOffset.left - parentOffset.left - 105
  );

  // bottom right
  place(
    ".blue-tape-br",
    "bottomRight",
    paperOffset.top - parentOffset.top + paperHeight - 40,
    paperOffset.left - parentOffset.left + paperWidth - 300
  );

  // bottom left
  place(
    ".blue-tape-bl",
    "bottomLeft",
    paperOffset.top - parentOffset.top + paperHeight - 40,
    paperOffset.left - parentOffset.left - 300
  );
}


// checks how many tapes still attached
function checkTapeState() {
  const attached = $(".blue-tape-tr, .blue-tape-tl, .blue-tape-br, .blue-tape-bl")
    .filter(function () {
      return $(this).data("corner");
    }).length;

  // if less than 3 → drop paper
  if (attached < 3) {
    dropPaper();
  }
}


// falling animation
function dropPaper() {
  $(".recipe-paper").animate(
    {
      top: "+=400px"
    },
    800
  );

  
}


// initial setup (attach tape to corners)
$(window).on("load", function () {
  // mark all tapes as attached FIRST
  $(".blue-tape-tr").data("corner", "topRight");
  $(".blue-tape-tl").data("corner", "topLeft");
  $(".blue-tape-br").data("corner", "bottomRight");
  $(".blue-tape-bl").data("corner", "bottomLeft");

  positionTape();
});


// keep attached tape in place on resize
$(window).on("resize", function () {
  positionTape();
});

