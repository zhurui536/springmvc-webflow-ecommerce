var Profile = function() {

    var dashboardMainChart = null;

    return {

        //main function
        init: function() {
            Profile.initTabs();
            Profile.initMiniCharts();
        },

        initMiniCharts: function() {

            // IE8 Fix: function.bind polyfill
            if (Metronic.isIE8() && !Function.prototype.bind) {
                Function.prototype.bind = function(oThis) {
                    if (typeof this !== "function") {
                        // closest thing possible to the ECMAScript 5 internal IsCallable function
                        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                    }

                    var aArgs = Array.prototype.slice.call(arguments, 1),
                        fToBind = this,
                        fNOP = function() {},
                        fBound = function() {
                            return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                                aArgs.concat(Array.prototype.slice.call(arguments)));
                        };

                    fNOP.prototype = this.prototype;
                    fBound.prototype = new fNOP();

                    return fBound;
                };
            }

            $("#sparkline_bar").sparkline([8, 9, 10, 11, 10, 10, 12, 10, 10, 11, 9, 12, 11], {
                type: 'bar',
                width: '100',
                barWidth: 6,
                height: '45',
                barColor: '#F36A5B',
                negBarColor: '#e02222'
            });

            $("#sparkline_bar2").sparkline([9, 11, 12, 13, 12, 13, 10, 14, 13, 11, 11, 12, 11], {
                type: 'bar',
                width: '100',
                barWidth: 6,
                height: '45',
                barColor: '#5C9BD1',
                negBarColor: '#e02222'
            });
        },
        
        initTabs: function(){
            $tabsContent = $("#tabs_content");
            $("#tabs_nav").delegate("a[data-tab]", "click", function(e){
                e.preventDefault();
                console.log("Tab selected", e.target);
                var tab = e.target.dataset.tab;
                $tab = $(e.target);
                $tab.parent().addClass("active").siblings().removeClass("active");
                var url;
                switch(tab){
                    case 'personal':
                        url = "/admin/users/self/profile";
                        break;
                    case 'avatar':
                        url = "/admin/users/self/avatar";
                        break;
                    case 'password':
                        url = "/admin/users/self/change-password";
                        break;
                    
                }
                console.log("url to load: ", url);
                url && $tabsContent.load(url);
                
            });
            
            $("#tabs_nav li.active a[data-tab]").trigger("click");
            
            $tabsContent.delegate("form", "submit", function(e){
                e.preventDefault();
                var $form = $(e.target);
                var action = $form.attr("action");
                if($form.attr("enctype") == "multipart/form-data"){
                    // create form data
                    var data = new FormData($form.get(0));
                    $.ajax({
                        url: action,
                        data: data,
                        cache: false,
                        contentType: false,
                        processData: false,
                        type: 'POST',
                        success: function(response){
                           $tabsContent.html(response);
                        }
                    });
                }else{
                    var data = $form.serializeArray();
                    $.post(action, data, function(response){
                        $tabsContent.html(response);
                    });
                }
               
            });
        }
        

    };

}();