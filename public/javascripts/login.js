async function sendData(url = '', data = {}) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	return response.json()
}
document
	.getElementById('register-button')
	.addEventListener('click', async () => {
		const postData = {
			username: document.getElementById('username').value,
			password: document.getElementById('password').value,
		}
		const res = await sendData('/register', postData)
		if (res.message) {
			document.getElementById('message').innerHTML = res.message
		}
	})
document.getElementById('login-button').addEventListener('click', async () => {
	const postData = {
		username: document.getElementById('username').value,
		password: document.getElementById('password').value,
	}
	const res = await sendData('/login', postData)
	if (res.message) {
		document.getElementById('message').innerHTML = res.message
	}
	if (res.username) {
		window.location.href = '/'
	}
})
