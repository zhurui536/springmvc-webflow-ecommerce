var ProductDetail = function () {
    
    return {
        //main function to initiate the module
        init: function () {
            ProductDetail.initAddProductToCart();
            ProductDetail.initReview();
        },
        initAddProductToCart: function(){
            var $addProductToCart = $("#addProductToCart");
            var url = $addProductToCart.get(0).dataset.source;
            $.get(url, function (response) {
                $addProductToCart.html(response);
                Layout.initTouchspin();
                $("#addProductToCartForm").on("submit", function (e) {
                    e.preventDefault();
                    var $this = $(this);
                    var data = $this.serializeArray();
                    $.post($this.attr("action"), data, function(response){
                        $addProductToCart.html(response);
                        Layout.initTouchspin();
                    });
                });
            });
        },
        initReview: function () {
            
            var $createReviewContainer = $("#createReviewContainer");
            var reviewUrl = $createReviewContainer.get(0).dataset.source;
            $.get(reviewUrl, function (response) {
                $createReviewContainer.html(response);
                $("#reviews-form").on("submit", function (e) {
                    e.preventDefault();
                    var $this = $(this);
                    var data = $this.serializeArray();
                    $.post($this.attr("action"), data, function(response){
                        $createReviewContainer.html(response);
                    });
                });
            });
        }
    };
}();


