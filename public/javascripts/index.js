document.getElementById('logout-button').addEventListener('click', async () => {
	const response = await fetch('./logout', {
		method: 'DELETE',
	})
	const data = await response.json()
	if (data.success) {
		window.location.href = '/login'
	}
})
const socket = io('/')
socket.on('chat-message', (data) => {
	console.log(data)
	appendMessage(data)
})
document.getElementById('post-button').addEventListener('click', () => {
	const chatInput = document.getElementById('chat-input')
	const newMessage = chatInput.value
	socket.emit('send-chat-message', newMessage)
	appendMessage(newMessage)
	chatInput.value = ''
})
function appendMessage(newMessage) {
	const messageBoxHtml = `<div class="chat-person-box"><b>nana</b></div><div>${newMessage}</div>`
	const wrapperDiv = document.createElement('div')
	wrapperDiv.className = 'message-box'
	wrapperDiv.innerHTML = messageBoxHtml
	document.getElementById('message-container').append(wrapperDiv)
}
