/**
 * 
 */
$(function() {
	var bat = $('#bat');
	var hero = $('#player');
	var action = false;
	var batSpeed = 3000;
	var isHit = false;
	var score = 0;
	var lives = 3;
	var bats = 10;
	var items = [ 640, 461, 514 ];

	batMovement(bat, batSpeed);

	function collisionCheck() {
		var batLeft = parseInt($('#bat').css('left'));
		if (batLeft <= 689 && batLeft >= 594) {
			if (parseInt($('#bat').css('top')) >= parseInt($('#player').css(
					'top'))
					&& parseInt($('#bat').css('top')) <= parseInt($('#player')
							.css('top')) + 183) {
				if (!isHit) {
					isHit = true;
					switch (lives) {
					case 3:
						$('#1').css('display', 'none');
						break;
					case 2:
						$('#2').css('display', 'none');
						break;
					case 1:
						$('#3').css('display', 'none');
						break;
					}
					lives--;
					if (!lives) {
						$('#loss').html('You died! Your score is: ' + score);
						$('#result').show();
					}

				}
			}
		}
	}

	function batMovement(target, speed) {
		var item = items[Math.floor(Math.random() * items.length)];
		$(target).css('top', item + 'px');
		$(target).css('left', '1250px');
		bats--;
		$('#batsCounter').html(bats);
		$(target).animate({
			'left' : 0
		}, {
			duration : speed,
			step : function(now, fx) {
				collisionCheck();
			},
			complete : function() {
				if (!isHit) {
					score++;
				}
				isHit = false;
				$('#points').html(score);
				if (lives != 0) {
					if (bats) {
						batMovement(this, speed);
					} else {
						$('#win').html('You won! Your score is: ' + score);
						$('#result').show();
					}
				}
			}

		});
	}
	$('html').on('keydown', function(e) {
		if (e.keyCode != 38) {
			return;
		}
		if (!action) {
			jump(hero);
			action = true;
		}
	})
	$('html').on('keydown', function(e) {
		if (e.keyCode != 40) {
			return;
		}
		if (!action) {
			duck(hero);
			action = true;
		}
	})
	$('html').on('keydown', function(e) {
		if (e.keyCode != 39) {
			return;
		}
		if (!action) {
			lay(hero);
			action = true;
		}
	})
	function jump(hero) {
		hero.animate({
			top : '259px'
		}, 500, function() {
			hero.animate({
				top : '459px'
			}, 500, function() {
				action = false;
			})
		})
	}
	function duck(hero) {
		hero.animate({
			top : '502px'
		}, 500, function() {
			hero.animate({
				top : '459px'
			}, 500, function() {
				action = false;
			})
		})
	}
	function lay(hero) {
		hero.animate({
			top : '558px'
		}, 500, function() {
			hero.animate({
				top : '459px'
			}, 500, function() {
				action = false;
			})
		})
	}
})
