$(function () {
  // İletişim formundaki giriş alanlarını ve metin alanlarını jqBootstrapValidation eklentisi ile doğrula
  $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {},
    submitSuccess: function ($form, event) {
      event.preventDefault();
      var name = $("input#name").val();
      var email = $("input#email").val();
      var subject = $("input#subject").val();
      var message = $("textarea#message").val();

      $this = $("#sendMessageButton");
      $this.prop("disabled", true);

      // Formspree.io üzerinden AJAX ile verileri gönder
      $.ajax({
        url: "https://formspree.io/f/xknlgvyg",
        type: "POST",
        dataType: "json",
        data: {
          name: name,
          email: email,
          subject: subject,
          message: message,
        },
        cache: false,
        success: function () {
          // Başarılı mesajını ekrana göster
          $("#success").html("<div class='alert alert-success'>");
          $("#success > .alert-success")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
          $("#success > .alert-success").append(
            "<strong>Your message has been sent. </strong>"
          );
          $("#success > .alert-success").append("</div>");
          // Formu sıfırla
          $("#contactForm").trigger("reset");
        },
        error: function () {
          // Hata mesajını ekrana göster
          $("#success").html("<div class='alert alert-danger'>");
          $("#success > .alert-danger")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
          $("#success > .alert-danger").append(
            $("<strong>").text(
              "Sorry " +
                name +
                ", it seems that our mail server is not responding. Please try again later!"
            )
          );
          $("#success > .alert-danger").append("</div>");
          // Formu sıfırla
          $("#contactForm").trigger("reset");
        },
        complete: function () {
          // İşlem tamamlandıktan 1 saniye sonra gönderme düğmesini etkinleştir
          setTimeout(function () {
            $this.prop("disabled", false);
          }, 1000);
        },
      });
    },
    filter: function () {
      // Giriş alanları veya metin alanları görülebilir mi diye kontrol et
      return $(this).is(":visible");
    },
  });

  // Sekme değiştirme bağlantılarına tıklama işlemi
  $('a[data-toggle="tab"]').click(function (e) {
    e.preventDefault();
    // İlgili sekme içeriğini göster
    $(this).tab("show");
  });
});

// "name" alanına odaklanıldığında başarılı mesajını temizle
$("#name").focus(function () {
  $("#success").html("");
});
