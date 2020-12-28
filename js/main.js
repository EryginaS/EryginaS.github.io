$(function () {

    // Динамическая подгрузка страниц с помощью jQuery-PJAX //

    // $(document).pjax('.services__inner-item , header__logo , .menu__link', '.pjax-container');

    // mobile menu //
    // обработка события нажатий на кнопку подробнее 
    $('.services__inner-item').on('click', function () {
        $($(this).attr('href')).children('.section-price__drop').addClass('section-price__drop--active');
        $($(this).attr('href')).children('.section-price__drop-box').addClass('section-price__drop-box--active');
    });

    $('.menu__burger').on("click", function () {
        $('.mobile-menu').addClass('mobile-menu--active');
        $('html, body').css('overflow', 'hidden');
    });

    $('.mobile-menu__close , .mobile-menu__btn , .mobile-menu__link').on("click", function () {
        $('.mobile-menu').removeClass('mobile-menu--active');
        $('html, body').css('overflow', '');
    });
    
    
    // Слайдер с отзывами //

    $('.reviews__slider').slick({
        centerMode: true,
        slidesToShow: 1,
        variableWidth: true,
        appendArrows: '.arrows',
        nextArrow: '<button type="button" class="slick-next right-arrow"></button>',
        prevArrow: '<button type="button" class="slick-prev left-arrow"></button>',
        infinite: false,
    });


    // Кнопка "НАВЕРХ" //

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 200) {
            $('.scroll-top').addClass('show');
        } else {
            $('.scroll-top').removeClass('show');
        }
    });
    $('.scroll-top__link').on('click', function (e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 0);
        return false;
    });

    // Выпадающий список услуг на странице PRICE.HTML //

    $('.section-price__drop').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('section-price__drop--active');
        $('section-price__drop-box--hidden').not($(this).next());
        $(this).next().toggleClass("section-price__drop-box--active");
    });

    // Popup Callback с валидацией формы отправки //

    $('.section-top__btn-callback , .footer__contacts-callbacklink').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#username',
        showCloseBtn: false,
        closeOnBgClick: true,
        mainClass: 'mfp-fade',
        callbacks: {
            open: function () {
                $("#phone").mask("+7(999) 999-99-99");

                const form = document.querySelector("form");
                const regExpName = /^[а-яёА-яЁ_-]/;
                const regExpPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/;
                let isName = false;
                let isPhone = false;
                let isSubmit = false;

                const submit = () => {
                    console.log(isSubmit);
                    alert('Данные отправлены');
                }

                const validateElem = (elem) => {
                    if (elem.id === "name") {
                        if (!regExpName.test(elem.value) && elem.value !== "") {
                            elem.nextElementSibling.textContent = "Введите корректное имя";
                            isName = false;
                        } else {
                            elem.nextElementSibling.textContent = "";
                            isName = true;
                        }
                    }
                    if (elem.id === "phone") {
                        if (!regExpPhone.test(elem.value) && elem.value !== "") {
                            elem.nextElementSibling.textContent = "Введите номер телефона";
                            isPhone = false;
                        } else {
                            elem.nextElementSibling.textContent = "";
                            isPhone = true;
                        }
                    }
                }
                for (let elem of form.elements) {
                    if (elem.tagName != "BUTTON" && elem.tagName != "TEXTAREA") {
                        elem.addEventListener('blur', () => {
                            validateElem(elem);
                        });
                        console.log(elem);
                    }
                }


                form.addEventListener("submit", (even) => {
                    even.preventDefault();
                    for (let elem of form.elements) {
                        if (elem.tagName !== "BUTTON" && elem.tagName != "TEXTAREA") {
                            if (elem.value === "") {
                                elem.nextElementSibling.textContent = "Поле не заполнено!";
                                isSubmit = false;
                            } else {
                                elem.nextElementSibling.textContent = "";
                                isSubmit = true;
                            }
                        }
                    }
                    if (isName && isPhone && isSubmit) {
                        submit();
                        form.reset();
                        $.magnificPopup.close();
                    }
                });
            }
        }
    });
    $('.popup-callback__close').on('click', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

    // Плагин для даты, вызов календаря //

    $('#calendar').datepicker({
        position: "bottom right",
    })

    // Маска для телефона //
    $("#reg-phone").mask("+7(999) 999-99-99");

    $("form").submit(function(e) {
        e.preventDefault();
        alert("hello");
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");

            alert('hello');
            $("form").trigger('reset');

        });
        return false;
    });

    // Валидация формы //

    const form = document.querySelector("form");
    const regExpName = /^[а-яёА-яЁ_-]/;
    const regExpPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/;
    const regExpDate = /^((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1])).((0[1-9])|(1[0-2])).(\d{4})$/;
    let isSubmit = false;
    let isName = false;
    let isSecondName = false;
    let isPhone = false;
    let isComment= false;
    let isDate = false;

    const submit = () => {
        console.log(isSubmit);
        alert('Данные отправлены');
    }

    const validateElem = (elem) => {
        if (elem.name === "firstName") {
            if (!regExpName.test(elem.value) && elem.value !== "") {
                elem.nextElementSibling.textContent = "Введите корректное имя";
                isName = false;
            } else {
                elem.nextElementSibling.textContent = "";
                isName = true;
            }
            return isName
        }
        if (elem.name === "secondName") {
            if (!regExpName.test(elem.value) && elem.value !== "") {
                elem.nextElementSibling.textContent = "Введите корректную фамилию";
                isSecondName = false;
            } else {
                elem.nextElementSibling.textContent = "";
                isSecondName = true;
            }
            return isSecondName
        }
        if (elem.name === "phone") {
            if (!regExpPhone.test(elem.value) && elem.value !== "") {
                elem.nextElementSibling.textContent = "Введите номер телефона";
                isPhone = false;
            } else {
                elem.nextElementSibling.textContent = "";
                isPhone = true;
            }
        }
        if (elem.name === "comment") {
            if (elem.value == "") {
                elem.nextElementSibling.textContent = "Выберите специализацию";
                isComment = false;
            } else {
                elem.nextElementSibling.textContent = "";
                isComment= true;
            }
        }
        if (elem.name === "date") {
            if (!regExpDate.test(elem.value) && elem.value !== "") {
                elem.nextElementSibling.textContent = "Выберите дату";
                isDate = false;
            } else {
                elem.nextElementSibling.textContent = "";
                isDate = true;
            }
        }
    }

    for (let elem of form.elements) {
        if (elem.tagName != "BUTTON") {
            elem.addEventListener('blur', () => {
                validateElem(elem);
            });
        }
    }

    form.addEventListener("submit", (even) => {
        even.preventDefault();
        for (let elem of form.elements) {
            if (elem.tagName !== "BUTTON") {
                if (elem.value === "") {
                    elem.nextElementSibling.textContent = "Поле не заполнено!";
                    isSubmit = false;
                } else {
                    elem.nextElementSibling.textContent = "";
                    isSubmit = true;
                }
            }
        }
        if (isSubmit && isName && isSecondName && isPhone && isDate && isComment) {
            submit();
            form.reset();
        } else {
            alert('Заполните форму');
        }
    });

});
