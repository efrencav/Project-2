$(function(){
	$(".itemTotalSpan").each(function(index) {
		const id = $(this).data("id");
		const quantity = $(`.vertical-quantity[data-id="${id}"]`).val();
		const price = $(`.itemPriceSpan[data-id="${id}"]`).text();
		$(`.itemTotalSpan[data-id="${id}"]`).text(parseFloat(quantity) * parseFloat(price));
	});
	$(".vertical-quantity").on("change", function(event){
		const id = $(this).data("id");
		const quantity = $(this).val();
		const price = $(`.itemPriceSpan[data-id="${id}"]`).text();
		$(`.itemQuantitySpan[data-id="${id}"]`).text(quantity);
		$(`.itemTotalSpan[data-id="${id}"]`).text(parseFloat(quantity) * parseFloat(price));
	});
	$(".btn-remove").on("click", function () {
		const id = $(this).data("id");
		$.ajax({
			url: `/shop/cartitemremove/${id}`,
			type: "DELETE",
			success: function(result) {
				console.log(result);
			}
		}).then(function() {
			location.reload();
		});
	});
	$(".btn-clear-cart").on("click", function () {
		const id = $(this).data("id");
		$.ajax({
			url: `/shop/clearcart/${id}`,
			type: "DELETE",
			success: function(result) {
				console.log(result);
			}
		}).then(function() {
			location.reload();
		});
    });
    $(".add-cart").on("click", function () {
		const id = $(this).data("id");
		$.ajax({
			url: `/shop/cart/product/${id}`,
			type: "POST",
			success: function(result) {
				console.log(result);
			}
		}).then(function() {
			
		});
	});
});