'use strict';

var clickToCards = function(e){

	var arr

	if (e.shiftKey) {

		arr = addCard( e.altKey ? "wide" : "narrow" )
	}
	else {

		arr = removeCard(cards)
	}

	var state = {
		id: history.state.id != ''? ++history.state.id : 1,
		cards: arr
	}

	history.pushState(state,'', state.id)
	updateState(state)
}

var removeCard = function(cards) {

	cards.splice(cards.length - 1, 1)
	return cards
}

var addCard = function(type){

	cards.push({type: type})
	return cards
}

var updateState = function(state) {

	if (!state) return;
	cards = state.cards
	build(cards)
}

var build = function (arr) {

	var source = document.getElementById('cards-template').innerHTML
	var template = Handlebars.compile(source)
	var html = template({arr})
	document.getElementById('cards--list').innerHTML = html
}


document.getElementById('cards--list').addEventListener('click', clickToCards);

var ready = function(){

	build(cards)

	window.addEventListener('popstate', function(e){
		updateState(e.state)
	})

	if (!history.state) {

		var state = {
			id: '',
			cards: cards
		}

		history.replaceState(state, '', state.id )
		updateState(state)
	}
	
}

document.addEventListener("DOMContentLoaded", ready);