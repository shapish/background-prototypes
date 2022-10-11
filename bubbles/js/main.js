class Bubble {
	total = 10
	following = false
}

Bubble.prototype.init = function () {
	this.populate()
	this.activateRipple()
	// this.activateFollow()
}

// Populate DOM with concentric circles
Bubble.prototype.populate = function () {
	let radius = 70
	let grow = 0
	for (let i = 0; i < this.total; i++) {
		radius += grow
		grow += !i ? 100 : i == 1 ? 30 : 50
		$('<div></div>')
			.css({
				width: radius + 'px',
				height: radius + 'px',
				margin: radius / -2 + 'px',
				'z-index': this.total - i,
				opacity: Math.min(0.05 + i / 30, 1),
			})
			.appendTo('#wrap')
	}
}

// Activate ripple interaction
Bubble.prototype.activateRipple = function () {
	$('#wrap').click(() => {
		this.ripple()
	})
}

// Ripple effect
Bubble.prototype.ripple = async function () {
	console.log('ripple')
	const baseWaveSize = 0.3
	let i = 0
	while (i < this.total) {
		const circle = $(`#wrap > div:nth-child(${i})`)
		circle.css({
			transform: `scale(${
				1 +
				baseWaveSize -
				Math.min(baseWaveSize, (baseWaveSize * 12 * i) / 100)
			})`,
			'transition-timing-function': 'ease-out',
		})
		setTimeout(() => {
			circle.css({
				transform: 'scale(1)',
			})
		}, 100)
		i++
		await this.helpers.delay(30)
	}
}

Bubble.prototype.activateFollow = function () {
	this.following = true
	$('body').mousemove(
		_.debounce(async (e) => {
			const { clientX: x, clientY: y } = e
			console.log(x, y)
			let i = 0
			while (i < this.total) {
				const circle = $(`#wrap > div:nth-child(${i})`)
				circle.css({
					left: x,
					top: y,
				})
				i++
				await this.helpers.delay(50 + 20 * i)
			}
		}, 10)
	)
}

Bubble.prototype.deactivateFollow = function () {
	this.following = false
	$('body').unbind('mousemove')
}

Bubble.prototype.toggleFollow = function () {
	if (this.following) {
		this.deactivateFollow()
		$('#wrap > div').css({
			left: '50%',
			top: '50%',
		})
		setTimeout(() => {
			$('#wrap > div').css({
				left: '50%',
				top: '50%',
			})
		}, 2000)
	} else {
		this.activateFollow()
	}
}

//
//
//

// Helper functions
Bubble.prototype.helpers = {
	// Async delay
	delay: async (timer) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve()
			}, timer)
		})
	},
}

//
//
//

const bubble = new Bubble()
$(document).ready(() => {
	bubble.init()

	// Controls
	console.log($('#btn-follow').get(0))
	$('#btn-follow').click(() => {
		console.log(222)
		bubble.toggleFollow()
	})
})
