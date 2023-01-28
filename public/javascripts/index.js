const socket = io('/')
socket.on('chat-message', (data) => {
	appendMessage(data)
})
document.getElementById('post-button').addEventListener('click', () => {
	const chatInput = document.getElementById('chat-input')
	const newMessage = chatInput.value
	const username = document.getElementById('username').innerText
	const time = new Date()
	const newMessageData = {
		username,
		message: newMessage,
		sentTime: `${time
			.toLocaleDateString()
			.replaceAll('/', '.')} ${time.toLocaleString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
		})}`,
	}
	socket.emit('send-chat-message', newMessageData)
	appendMessage(newMessageData)
	chatInput.value = ''
})
document.getElementById('logout-button').addEventListener('click', async () => {
	const response = await fetch('./logout', {
		method: 'DELETE',
	})
	const data = await response.json()
	if (data.success) {
		window.location.href = '/login'
	}
})
function appendMessage({ username, message, sentTime }) {
	if (username === document.getElementById('username').innerText) {
		username = 'Me'
	}
	const messageBoxHtml = `<div class="chat-person-box"><b>${username}</b><span>${sentTime}<span></div><div class='sent-message-box'><span>${message}</span></div>`
	const wrapperDiv = document.createElement('div')
	wrapperDiv.className = 'message-box'
	wrapperDiv.innerHTML = messageBoxHtml
	document.getElementById('message-container').append(wrapperDiv)
	const objDiv = document.getElementById('message-container')
	objDiv.scrollTop = objDiv.scrollHeight
}
const objDiv = document.getElementById('message-container')
objDiv.scrollTop = objDiv.scrollHeight
