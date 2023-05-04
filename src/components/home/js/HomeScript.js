
RomaLanding = {
    addClass: function(element, className) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    },

    removeClass: function(element, className) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    },

    hasClass: function(element, className) {
        if (element.classList)
            return element.classList.contains(className);
        else
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    },

    hideMenu: function() {
        var menu = document.getElementById('landing-menu');
        this.removeClass(menu, 'fadeInDown');
        this.addClass(menu, 'fadeOutUp');
        var $this = this;

        setTimeout(function () {
            $this.removeClass(menu, 'landing-menu-active');
            $this.removeClass(menu, 'fadeOutUp');
            $this.removeClass(document.body, 'landing-body-block-scroll');
        }, 150);
    },

    showMenu: function() {
        var menu = document.getElementById('landing-menu');
        this.addClass(menu, 'landing-menu-active');
        this.addClass(menu, 'fadeInDown');
        this.addClass(document.body, 'landing-body-block-scroll');
    }
}

document.getElementById('landing-menu-button').addEventListener('click', function(e) {
    var menu = document.getElementById('landing-menu');

    if(RomaLanding.hasClass(menu, 'landing-menu-active'))
        RomaLanding.hideMenu();
    else
        RomaLanding.showMenu();

    e.preventDefault();
});

var menuLinks = document.querySelectorAll('#landing-menu a');
for (i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', function(e) {
        RomaLanding.hideMenu();
    });
}
function scrollToDiv(id){
    document.getElementById(id).scrollIntoView({
        behavior: 'smooth'
    });
}