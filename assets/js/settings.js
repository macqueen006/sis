(function() {

	"use strict";
  
	var app = {
		
		init: function() {
            
			this.setUpListeners();

            this.colors.init();
            this.elements.init();

		},
 
		setUpListeners: function() {

            $(".btn-ps-reset-colors").on("click", app.colors.resetLigntColor);

            $(".btn-ps-reset-elements").on("click", app.elements.resetElements);

        },

        colors: {

            INPUTS: $('.input-color'),

            init: function() {

                var keys = Object.keys(localStorage);
                if(keys.length) {

                    $.each(app.colors.mas, function(index, item) {

                        for(var key of keys) {
                                
                            if(key === item.key) {
                                
                                var color = localStorage.getItem(key);
                                item.el.val(color);
                                $(':root').css(key, color);
    
                            }
    
                        }
    
                    });

                }
                

                $.minicolors.defaults.changeDelay = 20;
                app.colors.INPUTS.each(function() {
                    var _this = $(this);
                    _this.minicolors({
                        control: _this.attr('data-control') || 'hue',
                        defaultValue: _this.attr('data-defaultValue') || '',
                        format: _this.attr('data-format') || 'hex',
                        keywords: _this.attr('data-keywords') || '',
                        inline: _this.attr('data-inline') === 'true',
                        letterCase: _this.attr('data-letterCase') || 'lowercase',
                        opacity: _this.attr('data-opacity'),
                        position: _this.attr('data-position') || 'bottom',
                        swatches: _this.attr('data-swatches') ? _this.attr('data-swatches').split('|') : [],
                        change: function(hex) {
                            var color;
                            try {
                                color = hex ? hex : 'transparent';
                                app.colors.setColor(_this, color);
                            } catch(e) {}
                        },
                        theme: 'default'
                    });
                });
    
            },

            destroy: function() {

                app.colors.INPUTS.minicolors('destroy');

            },

            mas: [
                { class: 'input-main-color', el: $("#input-main-color"), key: '--main-color', valLight: '#2c7ae7' },
                { class: 'input-el-gradient1', el: $("#input-el-gradient1"), key: '--el-gradient1', valLight: '#2876e2' },
                { class: 'input-el-gradient2', el: $("#input-el-gradient2"), key: '--el-gradient2', valLight: '#3f8efc' },
                { class: 'input-primary-color', el: $("#input-primary-color"), key: '--primary-color', valLight: '#ffffff' },
                { class: 'input-primary-bg-color', el: $("#input-primary-bg-color"), key: '--primary-bg-color', valLight: '#F0F4F8' },
                { class: 'input-secondary-color', el: $("#input-secondary-color"), key: '--secondary-color', valLight: '#000000' },
                { class: 'input-secondary-bg-color', el: $("#input-secondary-bg-color"), key: '--secondary-bg-color', valLight: '#303036' },
                { class: 'input-text-primary', el: $("#input-text-primary"), key: '--text-primary', valLight: '#303036' },
                { class: 'input-text-secondary', el: $("#input-text-secondary"), key: '--text-secondary', valLight: '#63636b' },
                { class: 'input-border-color', el: $("#input-border-color"), key: '--border-color', valLight: '#D4D4E1' },
                { class: 'input-placeholder-color', el: $("#input-placeholder-color"), key: '--placeholder-color', valLight: '#B7B7BA' },
                { class: 'input-error-color', el: $("#input-error-color"), key: '--error-color', valLight: '#ff3d0d' },
            ],

            setColor: function(_this, color) {

                $.each(app.colors.mas, function(index, item) {
                    
                    if(_this.hasClass(item.class)) {
                        
                        $(':root').css(item.key, color);
                        localStorage.setItem(item.key, color);

                        return false;

                    }

                });
    
            },

            resetLigntColor: function() {

                $.each(app.colors.mas, function(index, item) {

                    $(':root').css(item.key, item.valLight);
                    item.el.val(item.valLight);
                    localStorage.removeItem(item.key);

                });

                app.colors.destroy();
                app.colors.init();
    
            },

        },

        elements: {

            init: function() {
                
                $.each(app.elements.mas, function(index, item) {

                    var currentVal = item.val;

                    var keys = Object.keys(localStorage);
                    if(keys.length) {

                        for(var key of keys) {
                                    
                            if(key === item.key) {
                                    
                                var value = localStorage.getItem(key);
                                item.elRes.text(value);
                                currentVal = value;
                                if(key === '--font-size' || key === '--el-border-radius' || key === '--el-border-radius-min') {
                                    $(':root').css(key, value + "px");
                                } else {
                                    $(':root').css(key, value);
                                }
                                
    
                            }
    
                        }

                    }
                    
                    item.el.slider({
                        value: currentVal,
                        min: item.min,
                        max: item.max,
                        step: item.step,
                        slide: function( event, ui ) {
                            item.elRes.text(ui.value);
                            app.elements.setElements(ui.value, item.key);
                        }
                    });

                });

            },

            mas: [
                { el: $("#slider-heading-line-height"), elRes: $("#ps-heading-line-height-res"), val: 1.3, min: 1, max: 2, step: 0.1, key: '--heading-line-height' },
                { el: $("#slider-line-height"), elRes: $("#ps-line-height-res"), val: 1.6, min: 1, max: 2, step: 0.1, key: '--line-height' },
                { el: $("#slider-font-size"), elRes: $("#ps-font-size-res"), val: 16, min: 12, max: 20, step: 1, key: '--font-size' },
                { el: $("#slider-border-radius"), elRes: $("#ps-border-radius-res"), val: 10, min: 0, max: 100, step: 1, key: '--el-border-radius' },
                { el: $("#slider-border-radius-min"), elRes: $("#ps-border-radius-min-res"), val: 6, min: 0, max: 100, step: 1, key: '--el-border-radius-min' },
            ],

            setElements: function(value, key) {

                localStorage.setItem(key, value);
                if(key === '--font-size' || key === '--el-border-radius' || key === '--el-border-radius-min') {
                    $(':root').css(key, value + "px");
                } else {
                    $(':root').css(key, value);
                }
               

            },

            resetElements: function() {

                $.each(app.elements.mas, function(index, item) {

                    localStorage.removeItem(item.key);
                    item.elRes.text(item.val);
                    if(item.key === '--font-size' || item.key === '--el-border-radius' || item.key === '--el-border-radius-min') {
                        $(':root').css(item.key, item.val + "px");
                    } else {
                        $(':root').css(item.key, item.val);
                    }

                });

                app.elements.init();
    
            },

        },
		
	}
 
	app.init();
 
}());