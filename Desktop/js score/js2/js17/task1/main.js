const getS = selector => document.querySelector(selector);

$(function () {
    let chose = 1;
    $('.start').on("click", function () {
        $('.start').css('background', "lightcoral");
        $('.check').css('background', "red");
        $('.start').attr("disabled", true);
        $(".check").removeAttr("disabled");
        timer();
    })

    let sec = 60;
    let min = 1;
    let d;

    function timeOut() {
        if (min >= 1) {
            min--
        }
        if (sec > 0) {
            sec--;
        }
        if (sec == 0) {
            $(".modal-box").css({
                backgroundColor: "rgba(46, 44, 44, 0.623)",
                zIndex: 3,
            });
            $(".modal-window-first").css({
                display: "block",
            })
        }
    }

    function add() {
        timeOut();
        timer();
        $('.leftNum').text(min > 9 ? min : "0" + min);
        $('.rightNum').text(sec > 9 ? sec : "0" + sec);
        $('.checkText').text(`You still have time, you sure?00:${sec}`);
    }

    function timer() {
        d = setTimeout(add, 1000);
    }

    $('.close').on("click", function () {
        $(".modal-box").css({
            backgroundColor: "rgba(255, 255, 255)",
            zIndex: -1,
        });
        $(".modal-window-first").css({
            display: "none",
        })
        $(".modal-window-third").css({
            display: "none",
        })
        sec = 60;
        location.reload()
        min = 1;
        clearTimeout(d);
        $(".leftNum").text("01");
        $(".rightNum").text("00");
        $('.check').css('background', "lightcoral");
        $('.start').css('background', "red");
        $(".check").attr("disabled", true);
        $(".start").removeAttr("disabled");
    })
    
    $(".modalClose").on("click", function () {
        $(".modal-window-second").css({
            display: "none",
        })
        $(".modal-box").css({
            backgroundColor: "rgba(255, 255, 255)",
            zIndex: -1,
        });
    })

    $('.check').on("click", function () {
        $(".modal-window-second").css({
            display: "block",
        })
        $(".modal-box").css({
            backgroundColor: "rgba(46, 44, 44, 0.623)",
            zIndex: 3,
        });
    })

    function puzzleFill() {
        let check = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let position;
        for (let i = 0; i < 16; i++) {
            $(".ps>.puz").attr("value", "fill");
            $(".pe>.puz").removeAttr("value");
            do {
                position = Math.round(Math.random() * 15);
            } while (check[position]);
            $(`.puz1:eq(${i})`).attr("value", `${position + 1}`);
            $(`.ps>.puz1:eq(${i})`).append($(`.puz1:eq(${i})`));
            check[position] = 1;
        }
        $(".puz1").css("background-image", "url(images/logo2.png)");
    }

    $(".puz").sortable({
        connectWith: ".puz",
        containment: ".puzzle-box",
        cursor: "move",
        scroll: false,
        start: function (event, ui) {
            if (sec == 60) {
                $(".start").trigger("click");
            }
        },
        receive: function (event, ui) {
            if ($(this).attr("value") == "fill") {
                chose = 1;
            } else {
                $(this).attr("value", "fill");
                chose = 0;
            }
        },
        stop: function (event, ui) {
            if (chose) {
                $(this).sortable("cancel");
            } else {
                $(this).removeAttr("value");
            }
        },
    });

    puzzleFill();

    $(".new").on("click", function () {
        puzzleFill();
        clearTimeout(d);
        sec = 60;
        min = 1;
        $('.check').attr("disabled", true);
        $('.check').css('background', "lightcoral");
        $(".start").removeAttr("disabled");
        $('.start').css('background', "red");
        $(".leftNum").text("01");
        $(".rightNum").text("00");
        location.reload()
    })

    function gameCheck() {
        let checkResult = 0;
        for (let i = 0; i < 16; i++) {
            if ($(`.pe>.puz:eq(${i})>.puz1`).attr("value") == i + 1) {
                checkResult++;
            }
        }
        $(".check").attr("disabled", true);
        return checkResult;
    }

    $(".modalCheck").click(() => {
        if(gameCheck() == 16) {
            $(".modal-window-third").css({
                display: "block",
            });
        }
        else{
            $(".modal-window-first").css({
                display: "block",
            });
        }
        $(".modal-window-second").css({
            display: "none",
        });
    })
})