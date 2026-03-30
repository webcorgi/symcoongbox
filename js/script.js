document.addEventListener('DOMContentLoaded', function () {
    textareaCount();
    collapseToggle();
    pwdToggle();
    checkboxToggle();
    initItemsSlider();
    footerToggle();
    popupToggle();
    faqToggle();
    customSelect();
    sortingToggle();
    homeMenuToggle();
})

function textareaCount() {
    const wraps = document.querySelectorAll('.textarea-wrap');

    wraps.forEach(function (wrap) {
        const textarea = wrap.querySelector('textarea');
        const counter = wrap.querySelector('.textarea-count em');
        const maxLength = textarea.getAttribute('maxlength');

        if (!textarea || !counter) return;

        // maxlength 값을 카운터 옆 텍스트에도 반영
        if (maxLength) {
            counter.parentElement.lastChild.textContent = '/' + maxLength;
        }

        textarea.addEventListener('input', function () {
            counter.textContent = this.value.length;
        });
    });
}

function collapseToggle() {
    const headers = document.querySelectorAll('.collapse .collapse-header');

    headers.forEach(function (header) {
        header.addEventListener('click', function () {
            const collapse = header.closest('.collapse');
            collapse.classList.toggle('open');
        });
    });
}

function pwdToggle() {
    const btns = document.querySelectorAll('.btn-pwd-toggle');

    btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const pwdbox = btn.closest('.pwdbox');
            const input = pwdbox.querySelector('input');
            const img = btn.querySelector('img');

            if (input.type === 'password') {
                input.type = 'text';
                img.src = img.src.replace('view-off.png', 'view-on.png');
                img.alt = 'view-on';
            } else {
                input.type = 'password';
                img.src = img.src.replace('view-on.png', 'view-off.png');
                img.alt = 'view-off';
            }
        });
    });
}

function checkboxToggle() {
    const checkboxes = document.querySelectorAll('.checkbox input[type="checkbox"]');

    checkboxes.forEach(function (input) {
        const label = input.closest('.checkbox');

        // 초기 상태 설정
        if (input.checked) {
            label.classList.add('on');
            label.classList.remove('off');
        } else {
            label.classList.add('off');
            label.classList.remove('on');
        }

        input.addEventListener('change', function () {
            if (this.checked) {
                label.classList.add('on');
                label.classList.remove('off');
            } else {
                label.classList.add('off');
                label.classList.remove('on');
            }
        });
    });
}

function initItemsSlider() {
    const slider = document.querySelector('.items01-slider');
    if (slider) {
        var swiper = new Swiper(".items01-slider", {
            slidesPerView: "auto",
            centeredSlides: true,
            spaceBetween: 50,

            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    }
}

function footerToggle() {
    const headers = document.querySelectorAll('.footer__head');

    headers.forEach(function (header) {
        header.addEventListener('click', function () {
            const footer = header.closest('footer');
            if (footer) {
                footer.classList.toggle('open');
            }
        });
    });
}

function popupToggle() {
    // 동의 팝업 열기
    const btnAgrees = document.querySelectorAll('.btn-pop-agree');
    btnAgrees.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const popup = document.querySelector('.popup-agree');
            if (popup) popup.style.display = 'flex';
        });
    });

    // 개인정보 팝업 열기
    const btnPrivacies = document.querySelectorAll('.btn-pop-privacy');
    btnPrivacies.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const popup = document.querySelector('.popup-privacy');
            if (popup) popup.style.display = 'flex';
        });
    });

    // 심쿵마켓 가이드 팝업 열기
    const btnGuide = document.querySelector('.collapse.other2');
    if (btnGuide) {
        btnGuide.addEventListener('click', function (e) {
            e.stopPropagation();
            const popupGuide = document.querySelector('.popup-guide');
            if (popupGuide) popupGuide.style.display = 'flex';
        });
    }

    // 모든 팝업의 닫기 버튼 및 배경 클릭 시 닫기
    const popups = document.querySelectorAll('.popup');
    popups.forEach(function (popup) {
        const closeBtn = popup.querySelector('.btn-close');
        const bg = popup.querySelector('.bg');

        if (closeBtn) {
            closeBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                popup.style.display = 'none';
            });
        }

        if (bg) {
            bg.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                popup.style.display = 'none';
            });
        }
    });
}

function faqToggle() {
    const faqQs = document.querySelectorAll('.faq-q');
    if (faqQs.length > 0) {
        faqQs.forEach(q => {
            q.addEventListener('click', () => {
                const item = q.parentElement;
                const isActive = item.classList.contains('active');

                // Close all items
                document.querySelectorAll('.faq-item').forEach(i => {
                    i.classList.remove('active');
                    const faqA = i.querySelector('.faq-a');
                    const faqArrow = i.querySelector('.faq-arrow');
                    if (faqA) faqA.style.display = 'none';
                    if (faqArrow) faqArrow.src = '../img/icon-arrow-btm.png';
                });

                // Toggle clicking item
                if (!isActive) {
                    item.classList.add('active');
                    const faqA = item.querySelector('.faq-a');
                    const faqArrow = item.querySelector('.faq-arrow');
                    if (faqA) faqA.style.display = 'block';
                    if (faqArrow) faqArrow.src = '../img/icon-arrow-top.png';
                }
            });
        });
    }
}

function customSelect() {
    const wraps = document.querySelectorAll('.custom-select-wrap');

    wraps.forEach(wrap => {
        const trigger = wrap.querySelector('.custom-select-trigger');
        const options = wrap.querySelectorAll('.custom-options li');
        const hiddenInput = wrap.querySelector('input[type="hidden"]');
        const triggerSpan = trigger.querySelector('span');

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other selects if any
            wraps.forEach(w => {
                if (w !== wrap) w.classList.remove('open');
            });
            wrap.classList.toggle('open');
        });

        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const value = option.getAttribute('data-value');
                const text = option.textContent;

                // Update UI
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                triggerSpan.textContent = text;
                triggerSpan.style.color = 'var(--gray-900)';

                // Update hidden input
                if (hiddenInput) hiddenInput.value = value;

                // Close dropdown
                wrap.classList.remove('open');
            });
        });
    });

    // Close when clicking outside
    document.addEventListener('click', () => {
        wraps.forEach(wrap => wrap.classList.remove('open'));
    });
}

function sortingToggle() {
    const btns = document.querySelectorAll('.btn-sorting');

    btns.forEach(btn => {
        const popup = btn.nextElementSibling;
        if (!popup || !popup.classList.contains('sorting-popup')) return;

        // Toggle popup
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            // Close other popups
            document.querySelectorAll('.sorting-popup').forEach(p => {
                if (p !== popup) p.classList.remove('open');
            });
            popup.classList.toggle('open');
        });

        // Handle item click
        const popupBtns = popup.querySelectorAll('button');
        popupBtns.forEach(pBtn => {
            pBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                const text = pBtn.querySelector('span').textContent;
                const btnSpan = btn.querySelector('span');

                // Update text
                if (btnSpan) btnSpan.textContent = text;

                // Toggle active class in popup
                popupBtns.forEach(b => b.classList.remove('active'));
                pBtn.classList.add('active');

                // Add/Remove check icon if needed
                popupBtns.forEach(b => {
                    const img = b.querySelector('img');
                    if (img) img.remove();
                });
                const checkImg = document.createElement('img');
                checkImg.src = '../img/icon-check-on.png';
                checkImg.alt = 'check';
                pBtn.appendChild(checkImg);

                // Close popup
                popup.classList.remove('open');
            });
        });
    });

    // Close when clicking outside
    document.addEventListener('click', function () {
        document.querySelectorAll('.sorting-popup').forEach(p => {
            p.classList.remove('open');
        });
    });
}

function homeMenuToggle() {
    const btnMenu = document.querySelector('.btn-menu');
    const menuWrap = document.querySelector('.home-menu-wrap');

    if (btnMenu && menuWrap) {
        btnMenu.addEventListener('click', function (e) {
            e.stopPropagation();
            menuWrap.classList.toggle('open');
        });

        // 배경 클릭 시 닫기
        const bg = menuWrap.querySelector('.bg');
        if (bg) {
            bg.addEventListener('click', function (e) {
                e.stopPropagation();
                menuWrap.classList.remove('open');
            });
        }

        // 메뉴 내부 클릭 시 전파 방지
        const menu = menuWrap.querySelector('.home-menu');
        if (menu) {
            menu.addEventListener('click', function (e) {
                e.stopPropagation();
            });
        }
    }
}