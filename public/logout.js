async function logOut(){
    console.log("HOLAAAAAAAAAAA")
    let username;

    await fetch('/usuario').then(user=>user.json()).then(json=>username= json)
     
    const response = await fetch('/logout.hbs')
    const logInPlantilla= await response.text()
    const template = Handlebars.compile(logInPlantilla)
    const filled = template(username)
    console.log("Username",username)
    document.querySelector('#Logout').innerHTML= filled
}
logOut()