async function insertUser(){
    
    let username;

    await fetch('/usuario').then(user=>user.json()).then(json=>username= json)
     
    const response = await fetch('/logIn.hbs')
    const logInPlantilla= await response.text()
    const template = Handlebars.compile(logInPlantilla)
    const filled = template(username)
    document.querySelector('#Login').innerHTML= filled 

}

insertUser()