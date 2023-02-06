const formDOM = document.querySelector('.form')
const usernameInputDOM = document.getElementById('username')
const passwordInputDOM = document.getElementById('password')
const formAlertDOM = document.getElementById('formAlert')
const resultDOM = document.getElementById('apiResponse')
const getDataBtn = document.getElementById('get-btn')
const tokenDOM = document.querySelector('#tokenStatus')
// formAlertDOM.textContent = "HHHHHHHHHHH"
formDOM.addEventListener('submit', async (e) => {
    formAlertDOM.classList.remove('present')
    tokenDOM.classList.remove('present')
    tokenDOM.classList.add('absent')
    e.preventDefault()
    const username = usernameInputDOM.value
    const password = passwordInputDOM.value

    try {
        console.log("helloS")
        const { data } = await axios.post('/api/v1/login',{ username, password })
        console.log("helloSsss")
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = data.msg

        formAlertDOM.classList.add('present')
        usernameInputDOM.value = ''
        passwordInputDOM.value = ''

        localStorage.setItem("token", data.token)
        console.log(data.token)
        resultDOM.innerHTML = ''
        tokenDOM.textContent = 'Token Present'
        tokenDOM.classList.add('present')
        tokenDOM.classList.remove('absent')

    } catch (error) {
        formAlertDOM.style.display = 'block'
        console.log(error)
        formAlertDOM.textContent = error.response.data.msg
        localStorage.removeItem('token')

        tokenDOM.classList.add('absent')
        resultDOM.innerHTML = ''
        tokenDOM.textContent = "No Token Present"
        tokenDOM.classList.remove('present')
    }
    setTimeout(() => {
        formAlertDOM.style.display = 'none'
    }, 2000)
})

getDataBtn.addEventListener('click', async () => {
    const token = localStorage.getItem('token')
    try {
        const { data } = await axios.get('/api/v1/dashboard', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        resultDOM.innerHTML = `<h5>${data.msg}</h5><p>${data.secret}`

        data.secret
    } catch (error) {
        localStorage.removeItem('token')
        resultDOM.innerHTML = `<p>${error.response.data.msg}</p>`
    }
})

const checkToken = () => {
    tokenDOM.classList.remove('present')
    tokenDOM.classList.add('absent')
    const token = localStorage.getItem('token')
    if (token) {
        tokenDOM.textContent = 'Token Present'
        tokenDOM.classList.add('present')
        tokenDOM.classList.remove('absent')
    }
}

checkToken()