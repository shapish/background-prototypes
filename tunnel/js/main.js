$(document).ready(() => {
	$('body').click(addSquare)
})

function addSquare() {
	const $square = $('<div></div>')
		.addClass('square')
		.css({
			width: 1000,
			height: 1000,
		})
		.appendTo('#wrap')
	setTimeout(() => {
		$square.addClass('zoom')
	}, 1)
	setTimeout(() => {
		$square.remove()
	}, 6000)
}
