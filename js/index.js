let sec = document.querySelector('.section');
let heading = document.querySelector('.main__heading');
let counter = 0;
document.querySelector(".title").addEventListener("click", () => {
	if (counter == 10) {
		if (window.localStorage.getItem("questions")) {
			window.localStorage.removeItem("questions");
		}
		else
			window.localStorage.setItem("questions", true)
		window.location.reload();
	}
	console.log(counter);
	counter++;
})

let details = [
	{
		heading: 'Stack',
		image: `imgs/stack.png`,
		link: 'pages/stack.html',
		sub_topics: [
			"push",
			"pop",
			"peek",
		]
	},
	{
		heading: 'Queue',
		image: 'imgs/queue.png',
		link: 'pages/queue.html',
		sub_topics: [
			"enqueue",
			"dequeue",
			"bfs",
		]
	},
	{
		heading: 'Linked List',
		image: 'imgs/linked_list.png',
		link: 'pages/linkedlist.html',
		sub_topics: [
			"singly",
			"doubly",
			"circular",
			"stack",
			"queue"
		]
	},
]

if (!localStorage.getItem("counter"))
	pop_up();


details.forEach((detail, index) => {
	let temp = window.localStorage.getItem("questions");
	if (detail.heading == "Questions" && temp == null) {
		// Do Nothing
	}
	else
		add_card(detail, index);
})

function add_card(details, index) {
	let card = document.createElement('div');
	['col', 'col-12', 'col-md-6', 'col-lg-4'].forEach((el) => card.classList.add(el));
	card.style.borderRadius = '10px';
	card.style.transform = 'scale(.9)';
	let card_html = `
		<div class="card" style="">
		  <div class="card__heading">${details.heading}</div>
		  <a href="${details.link}" target="_self" class="card-img-top-parent">
			   <img src="${details.image}" class="card-img-top" alt="${details.heading}">
		  </a>
		  <div class="card-body">
		  </div>
		</div>
	 `
	card.innerHTML = card_html;
	sec.appendChild(card);

	details.sub_topics.forEach((e) => {
		let card_span = document.createElement('button');
		card_span.classList.add('badge');
		card_span.classList.add('badge-primary');
		card_span.innerText = e.toUpperCase();

		document.querySelectorAll('.card-body')[index].appendChild(card_span);
	})
}


function pop_up() {
	if (+localStorage.getItem("counter") == 1) return;

	if (+localStorage.getItem("first_time") == 1) {
		localStorage.setItem("counter", 1);
	}
	else
		localStorage.setItem('first_time', 1)

	if (true && +localStorage.getItem('first_time') == 1) {
		let cross;
		let slider;
		let info;
		cross = document.createElement("span");
		slider = document.createElement("div");
		// debugger

		info = document.createElement("div");
		info.innerHTML = html();

		document.querySelector('.body__bin').appendChild(slider);
		localStorage.setItem('first_time', 1)
		document.querySelector('.cross').addEventListener("click", () => {
			document.querySelector('.body__bin').innerHTML = '';
		})

	}
}