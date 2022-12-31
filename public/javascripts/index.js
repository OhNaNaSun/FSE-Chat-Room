document.getElementById('logout-button').addEventListener('click', async () => {
	const response = await fetch('./logout', {
		method: 'DELETE',
	})
	const data = await response.json()
	if (data.success) {
		window.location.href = '/login'
	}
})
