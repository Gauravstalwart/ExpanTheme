// const APP_URL = "https://training-booking.lashextend.nl/";
const APP_URL = "https://apps.lashextendpro.com/";
const course_id = window.course_id;
$(document).ready(function () {
  var validator_form = $("#book-now-form").validate({
    rules: {
      firstname: {
        required: true,
        minlength: 2,
      },
      lastname: {
        required: true,
        minlength: 2,
      },
      no_of_people: {
        required: true,
        digits: true,
      },
      email: {
        required: true,
        email: true,
      },
      gender: {
        required: true,
      },
    },
    messages: {
      firstname: "Please enter your First Name",
      lastname: "Please enter your Last Name",
      email: {
        required: "Please enter an Email Address",
        email: "Please enter a valid Email Address",
      },
      no_of_people: {
        required: "Please enter Amount of People",
        digits: "Please enter only digits",
      },
      gender: {
        required: "Please a Gender",
      },
    },
    errorPlacement: function (error, element) {
      error.addClass("invalid-feedback");
      element.closest(".form-group").append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass("is-invalid");
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass("is-invalid");
    },
    submitHandler: function (form) {
      var $formData = $(form).serialize();
      var Custom_header = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      var res = postData(
        `${APP_URL}location/submit_LocationRegister`,
        $formData,
        Custom_header
      );
      $(".btn_submit").text("Submitting...").addClass("disabled");
      res.then(function (r) {
        var data = JSON.parse(r);
        // console.log(data);
        $(".pro_book_row, .card-footer").hide();
        $("#book-now-form").trigger("reset");
        $(".thankx-msg").removeClass("hide");
        $(".btn_submit").text("Submit").removeClass("disabled");
        setTimeout(function () {
          $(".pro_book_row, .card-footer").show();
          $(".thankx-msg").addClass("hide");
        }, 3500);
      });
    },
  });
  if ($("body").hasClass("template-product-academy")) {
    jQuery(document).on(
      "click",
      ".template-product-academy .book-btn .btn",
      function () {
        var opened_txt = $(this).attr("opened_txt");
        var opened_location_area = $(this)
          .parent()
          .parent()
          .find(".kit-title")
          .text();
        var opened_location_city = $(this)
          .parent()
          .parent()
          .find(".kit-size")
          .html();
        var opened_txt_date_number = $(this)
          .parent()
          .parent()
          .parent()
          .find(".left-date .number")
          .text();
        var opened_txt_date = $(this)
          .parent()
          .parent()
          .parent()
          .find(".left-date .date")
          .text();
        var opened_txt_date_time = $(this)
          .parent()
          .parent()
          .parent()
          .find(".left-date .time")
          .text();
        var location_id = $(this)
          .parents(".kit-block")
          .find(".left-date")
          .attr("data-location-id");
        var course_id = $(this)
          .parents(".kit-block")
          .find(".left-date")
          .attr("data-course-id");
        var training_id = $(this)
          .parents(".kit-block")
          .find(".left-date")
          .attr("data-training_id");
        console.log(course_id, location_id);
        $("form#book-now-form input[name='location_id']").val(location_id);
        $("form#book-now-form input[name='course_id']").val(course_id);
        $("form#book-now-form input[name='training_id']").val(training_id);
        $(
          ".template-product-academy .pro_book_text .pro_book_text_item .date"
        ).text(opened_txt_date_number + " " + opened_txt_date);
        $(
          ".template-product-academy .pro_book_text .pro_book_text_item .time"
        ).text(opened_txt_date_time);
        $(
          ".template-product-academy .pro_book_text .pro_book_text_item .location"
        ).html(opened_location_area + " - " + opened_location_city);
        $(".template-product-academy .sidebar-book").addClass(
          "sidebar_form_open"
        );
      }
    );

    jQuery(document).on(
      "click",
      ".template-product-academy .pro_book_now_form .pro_book_back svg",
      function () {
        $(".template-product-academy .sidebar-book").removeClass(
          "sidebar_form_open"
        );
      }
    );
    jQuery(document).on("click", ".btn_cancel", function (e) {
      e.preventDefault();
      validator_form.resetForm();
      $(".template-product-academy .sidebar-book").removeClass(
        "sidebar_form_open"
      );
    });
    // jQuery("[data-inputmask-mask]").inputmask();

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const course_html = `<div class="kit-block">
        <div class="left-date" data-location-id="{{course_location_id}}" data-course-id="{{course_id}}" data-training_id="{{training_id}}">
          <h2 class="number">{{course_date}}</h2>
          <small class="date">{{course_date_month_year}}</small>
          <span class="time">{{course_time}}</span>
          <span class="currency-flag currency-flag--small currency-flag--{{countryCode}}" data-flag="{{countryCode}}" aria-hidden="true"></span>
        </div>
        <div class="kit-info">
          <div class="kit-title">{{course_location_name}}</div>
          <div class="kit-size">{{course_address}}</div>
          <p class="kit-text">There are <b>{{course_seats_available}}</b> places available</p>
          <span class="kit-remark">{{remarks}}</span>
          <div class="book-btn">
            <button class="btn" {{disabled}}>Sign-up</button>
          </div>
        </div>
      </div>`;

    // Example POST method implementation:
    var Custom_header = {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    };
    window.getData = async function (url = "", data = {}, header = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: header,
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
      return response.json(); // parses JSON response into native JavaScript objects
    };
    window.postData = async function (url = "", data = {}, header = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: header,
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: data, // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    };

    jQuery.validator.addMethod(
      "phoneUS",
      function (phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return (
          this.optional(element) ||
          (phone_number.length > 9 &&
            phone_number.match(
              /^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/
            ))
        );
      },
      "Please specify a valid phone number"
    );
    // PDP Book now form validation start

    window
      .getData(
        `${APP_URL}location/get_locationsByCourse?course_id=${course_id}`
      )
      .then(function (res) {
        var data = JSON.parse(res);
        var $kitWrapper = $("[data-training-schedules-list]");
        $kitWrapper.empty();
        console.log(data);
        if (data.message.length == 0) {
          $(".book-now-btn")
            .attr("disabled", "disabled")
            .addClass("disabled")
            .css({ "pointer-events": "none" })
            .text(theme.settings.date_unavailable_msg);
        }
        for (let location of data.message) {
          var d = new Date(location.training_date);
          var month = months[d.getMonth()];
          var year = d.getFullYear();
          var locations_html = course_html
            .replaceAll("{{course_location_id}}", location.location_id)
            .replaceAll("{{course_id}}", location.course_id)
            .replaceAll("{{training_id}}", location.training_id)
            .replaceAll("{{course_date}}", d.getDate())
            .replaceAll("{{course_date_month_year}}", month + ", " + year)
            .replaceAll("{{course_time}}", location.training_time)
            .replaceAll(
              "{{course_address}}",
              location.training_address + "<br>" + location.countryName
            )
            .replaceAll("{{course_location_name}}", location.training_name)
            .replaceAll("{{remarks}}", location.remarks ? location.remarks : "")
            .replaceAll("{{countryCode}}", location.countryCode.toLowerCase())
            .replaceAll("{{course_seats_available}}", location.total_seats)
            .replaceAll(
              "{{disabled}}",
              location.total_seats > 0 ? "" : "disabled"
            );

          // console.log(location);
          $kitWrapper.append(locations_html);
        }
      });
  }
  // PDP Book now form validation end
});
