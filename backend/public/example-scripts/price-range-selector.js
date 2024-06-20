/* 
Price Range Selector by MemberStack
Source: https://www.memberstack.com/scripts/price-range-slider-inputs

Hosted Scripts needed:
- https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
- https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.3.1/js/ion.rangeSlider.min.js

Recommended Style Sheets:
- https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.3.1/css/ion.rangeSlider.min.css

*/

// 💙 MEMBERSCRIPT #58 v0.1 💙 RANGE SLIDER INPUT

$(document).ready(function () {
  var rangeSlider = $('[ms-code-input="range-slider"]');
  var priceFromInput = $('[ms-code-input="price-from"]');
  var priceToInput = $('[ms-code-input="price-to"]');

  // Set the default range values
  var defaultFrom = 20000;
  var defaultTo = 50000;

  rangeSlider.ionRangeSlider({
    skin: "round", // You can also try "flat", "big", "modern", "sharp", or "square". Default styles can be overridden with CSS.
    type: "double",
    grid: true,
    min: 0,
    max: 100000,
    from: defaultFrom,
    to: defaultTo,
    prefix: "$",
    onStart: function (data) {
      priceFromInput.val(data.from);
      priceToInput.val(data.to);
    },
    onChange: function (data) {
      priceFromInput.val(data.from);
      priceToInput.val(data.to);
    },
  });

  // Get the initial range values and update the inputs
  var initialRange = rangeSlider.data("ionRangeSlider");
  var initialData = initialRange.result;
  priceFromInput.val(initialData.from);
  priceToInput.val(initialData.to);

  // Update the range slider and inputs when the inputs lose focus
  priceFromInput.on("blur", function () {
    var value = $(this).val();
    var toValue = priceToInput.val();

    // Perform validation
    if (
      value < initialRange.options.min ||
      value > initialRange.options.max ||
      value >= toValue ||
      value > initialData.to // Check if fromValue is higher than the current toValue
    ) {
      value = defaultFrom;
    }

    rangeSlider.data("ionRangeSlider").update({
      from: value,
    });
    priceFromInput.val(value);
  });

  priceToInput.on("blur", function () {
    var value = $(this).val();
    var fromValue = priceFromInput.val();

    // Perform validation
    if (
      value < initialRange.options.min ||
      value > initialRange.options.max ||
      value <= fromValue ||
      value < initialData.from // Check if toValue is lower than the current fromValue
    ) {
      value = defaultTo;
    }

    rangeSlider.data("ionRangeSlider").update({
      to: value,
    });
    priceToInput.val(value);
  });
});
