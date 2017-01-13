(function (window) {
  const duckPhrases = [
    "Hmmm.",
    "Okay.",
    "I see.",
    "Alright.",
    "Interesting.",
    "OK",
    "I'm with you.",
    "Following.",
    "Huh.",
    "Got it."
  ];

  const pickMessage = function () {
    return duckPhrases[(Math.floor(Math.random() * duckPhrases.length))];
  };

  window.duck = {
    pickMessage
  };
})(window);
