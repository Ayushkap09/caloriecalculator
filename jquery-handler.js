/* eslint-disable no-undef */
const $ = require("jquery") // Declare the $ variable

// jQuery DOM Manipulation & Event Handlers

$(document).ready(() => {
  // Goal Selection Handler
  $('input[name="goal"]').on("change", () => {
    const selected = $('input[name="goal"]:checked')
    $(".goal-label").removeClass("selected")
    selected.next(".goal-label").addClass("selected")
  })

  // Diet Selection Handler
  $('input[name="diet"]').on("change", () => {
    const selected = $('input[name="diet"]:checked')
    $(".diet-label").removeClass("selected")
    selected.next(".diet-label").addClass("selected")
  })

  // Form Validation with jQuery
  $("#weightForm").on("submit", (e) => {
    e.preventDefault()
    return false
  })

  // Add smooth transitions to steps
  $(".step").on("click", () => {
    $(".step").fadeOut(100)
  })

  // Auto-focus on form inputs
  $(".form-input").on("focus", function () {
    $(this).parent().find(".form-label").css("color", "#00a8a8")
  })

  $(".form-input").on("blur", function () {
    $(this).parent().find(".form-label").css("color", "#1a1a1a")
  })

  // Animate meal cards on results display
  $(document).on("click", "button", function () {
    if ($(this).text().includes("Generate Plan")) {
      setTimeout(() => {
        $(".meal-card").hide().fadeIn(400)
      }, 300)
    }
  })

  // Smooth scroll enhancement
  $(window).on("scroll", () => {
    if ($(window).scrollTop() > 100) {
      $(".navbar").addClass("shadow-lg")
    } else {
      $(".navbar").removeClass("shadow-lg")
    }
  })

  $(".navbar-nav a").on("click", () => {
    $(".navbar-collapse").collapse("hide")
  })
})

// Helper function to toggle visibility with jQuery
function toggleStep(hideId, showId) {
  $("#" + hideId)
    .addClass("d-none")
    .fadeOut(200)
  $("#" + showId)
    .removeClass("d-none")
    .fadeIn(200)
}

// Helper to validate form with jQuery
function validateForm() {
  const isValid = $("#weightForm")[0].checkValidity()
  if (!isValid) {
    $(".form-input:invalid").addClass("is-invalid")
    return false
  }
  $(".form-input").removeClass("is-invalid")
  return true
}
