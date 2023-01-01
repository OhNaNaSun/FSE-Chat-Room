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
	const username = document.getElementById('username').innerText
	const newMessageData = {
		username,
		message: newMessage,
		sentTime: new Date().toLocaleString(),
	}
	socket.emit('send-chat-message', newMessageData)
	appendMessage(newMessageData)
	chatInput.value = ''
})
function appendMessage({ username, message, sentTime }) {
	const messageBoxHtml = `<div class="chat-person-box"><b>${username}</b>${sentTime}</div><div>${message}</div>`
	const wrapperDiv = document.createElement('div')
	wrapperDiv.className = 'message-box'
	wrapperDiv.innerHTML = messageBoxHtml
	document.getElementById('message-container').append(wrapperDiv)
}
