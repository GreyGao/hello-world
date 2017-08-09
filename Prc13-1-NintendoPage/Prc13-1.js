let n=1;
let list = document.querySelector('#gameList');
loadMore.onclick = function () {
    let request = new XMLHttpRequest();
    request.open('GET',`./poster-${n+1}.json`);
    request.onload = function () {
        let response = request.responseText;
        let data = JSON.parse(response);
        let li = `
            <div class="poster poster${n+1}">
			<a id="pcpos${n+1}" href=""><img src="${data.content.url1}"></a>
			<a id="mobpos${n+1}" href=""><img src="${data.content.url2}"></a>
			<div class="nsglink nsglink${n+1}">
				<a href="">
					<h2>${data.content.title}</h2></a>
				<hr class="adwhite">
				<p>${data.content.text}</p>
				<a href=""><span class="buybutton buybutton${n+2}">Buy now></span></a>
			</div>
		</div>
                `;
        list.insertAdjacentHTML('beforeend', li);
        if(data.hasNextPage === false){
            loadMore.textContent = "to the end...";
            loadMore.onclick = null;
            loadMore.style.fontSize = "16px";
        }
        n+=1;
    };
    request.send()
    };

window.onscroll = function () {
    var doc =document.documentElement;
    var clientHeight = doc.clientHeight;
    var viewportOffset = loadMore.getBoundingClientRect();
    var endTop = viewportOffset.top;
    if((endTop+140)<clientHeight){
        loadMore.click();
    }
};