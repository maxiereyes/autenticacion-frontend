let boton = document.getElementsByClassName('btnEntrar')[0]

boton.addEventListener('click', async (e)=>{
    e.preventDefault()
    let email = document.querySelector("input[name='email']").value
    let pass = document.querySelector("input[name='password']").value
    let data = {
        email: email,
        password: pass
    }
    const resp = await loggedIn(data)
    if ( !resp.hasOwnProperty('token')){
        renderError(resp.message)
    } else { 
        sessionStorage.setItem('token', resp.token)
        window.location.href = "home.html"
    }
})

async function renderError(mens){
    const htmlError = document.createElement('div')
    htmlError.className = 'alert alert-danger text-center'
    htmlError.innerHTML = mens
    const container = document.getElementsByClassName('container')[0]
    container.insertAdjacentElement('afterbegin', htmlError)
    await setTimeout(() => {
        htmlError.style.display = "none"
    }, 5000)
}


async function loggedIn(datos){
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(datos),
        headers:{
            'Content-Type': 'application/json'
          }
    })
    const mensaje = await response.json()
    return mensaje
}