let fhr = 12;
let fmi = 0;
let ampm = 0;
let showpicker = 0;
let elid = "none";
let picker_type = 0;

function showpickers(a, b) {
  if (showpicker) {
    $(".tpicker").hide();
    showpicker = 0;
  } else {
    elid = a;
    picker_type = b;
    let x = $("#" + elid).offset();
    $(".tpicker").show();
    let kk = $("#" + elid).outerHeight();
    $(".tpicker").offset({ top: x.top + kk, left: x.left });
    showpicker = 1;
  }
}

function showdate() {
  $(".pk1").show();
  $(".pk2").hide();
}
function showtime() {
  $(".pk1").hide();
  $(".pk2").show();
}
function updatetime() {
  let gg = "AM";
  if (ampm) gg = "PM";
  if (picker_type == 24) {
    let thr = fhr;
    let tmin = fmi;
    if (ampm) {
      if (fhr < 12) thr = fhr + 12;
    } else {
      if (fhr == 12) thr = 0;
    }
    $("#" + elid).val(("0" + thr).slice(-2) + ":" + ("0" + tmin).slice(-2));
  } else {
    $("#" + elid).val(
      ("0" + fhr).slice(-2) + ":" + ("0" + fmi).slice(-2) + " " + gg
    );
  }
  $(".hrhere").html(("0" + fhr).slice(-2));
  $(".minhere").html(("0" + fmi).slice(-2));
  $(".medchange").html(gg);
}

$(function () {
  let pickerhtml =
    '<div class="tpicker"><div class="pk1"><div class="row"><div class="hr"><i class="fa fa-angle-up hrup"></i><a class="hrhere">12</a><i class="fa fa-angle-down hrdown"></i></div><div class="dot2">:</div><div class="hr">	<i class="fa fa-angle-up minup"></i><a class="minhere">00</a><i class="fa fa-angle-down mindown"></i></div><div class="dot"><button type="button" class="btn btn-primary medchange">AM</button></div></div></div><div class="pk2 mintt"><table class="table table-bordered mintable"><tr><td>00</td><td>05</td><td>10</td><td>15</td></tr><tr><td>20</td><td>25</td><td>30</td><td>35</td></tr><tr><td>40</td><td>45</td><td>50</td><td>55</td></tr></table></div><div class="pk2 hrtt"><table class="table table-bordered hrtable"><tr><td>01</td><td>02</td><td>03</td><td>04</td></tr><tr><td>05</td><td>06</td><td>07</td><td>08</td></tr><tr><td>09</td><td>10</td><td>11</td><td>12</td></tr></table></div></div>';

  $(".timepicker").html(pickerhtml);

  $(".hrup").click(function () {
    if (fhr < 12) {
      fhr++;
      updatetime();
    } else {
      fhr = 1;
      updatetime();
    }
  });
  $(".hrdown").click(function () {
    if (fhr > 1) {
      fhr--;
      updatetime();
    } else {
      fhr = 12;
      updatetime();
    }
  });
  $(".minup").click(function () {
    if (fmi < 59) {
      fmi++;
      updatetime();
    } else {
      fmi = 0;
      updatetime();
    }
  });
  $(".mindown").click(function () {
    if (fmi > 0) {
      fmi--;
      updatetime();
    } else {
      fmi = 59;
      updatetime();
    }
  });
  $(".medchange").click(function () {
    if (ampm) {
      ampm = 0;
      updatetime();
    } else {
      ampm = 1;
      updatetime();
    }
  });
  $(".hrhere").click(function () {
    $(".hrtt").show();
    $(".pk1").hide();
    $(".mintt").hide();
  });
  $(".minhere").click(function () {
    $(".hrtt").hide();
    $(".pk1").hide();
    $(".mintt").show();
  });
  $(".hrtable td").click(function () {
    let vaa = $(this).html();
    $(".hrtt").hide();
    $(".pk1").show();
    $(".mintt").hide();
    fhr = parseInt(vaa);
    updatetime();
  });
  $(".mintable td").click(function () {
    let vaa = $(this).html();
    $(".hrtt").hide();
    $(".pk1").show();
    $(".mintt").hide();
    fmi = parseInt(vaa);
    updatetime();
  });
});

$(document).ready(function () {
  $("#time").click(function () {
    showpickers("time", 24);
  });
});

$(document).on("click", "#date", function () {
  $(this)
    .datetimepicker({
      timepicker: false,
      format: "Y-m-d",
    })
    .focus();
});

$(document).mouseup(function (e) {
  const container = $(".tpicker");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    container.hide();
  }
});
