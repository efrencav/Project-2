// This function constructs a todo-item row
function createNewRow(orders) {
	var $newInputRow = $(
		[
			"<td class='product-col'>",
			"<figure class='product-image-container'>",
			"<a href='product.html' class='product-image'>",
			"<img src='/images/products/product-4.jpg' alt='product'>",
			"</a>",
			"</figure>",
			"<h2 class='product-title'>",
			"<a href='/shop/product'>Men Watch</a>",
			"</h2>",
			"</td>",
			"<td>$17.90</td>",
			"<td>",
			"<input class='vertical-quantity form-control' type='text'>",
			"</td>",
			"<td>$17.90</td>",
		].join("")
	);
	$newInputRow.find("button.delete").data("id", orders.id);
	$newInputRow.find("input.edit").css("display", "none");
	$newInputRow.data("orders", orders);
	
	return $newInputRow;
}