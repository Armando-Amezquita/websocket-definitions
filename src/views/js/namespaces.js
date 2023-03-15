const user = prompt('Write your user');
const profes = [ 'juan dc', 'retax', 'armando' ];

let socketNamespace, group;

const chat = document.querySelector('#chat');
const namespace = document.querySelector('#namespace');

if(profes.includes(user)){
    socketNamespace = io('/teachers');
    group = 'teachers'
}
else{
    socketNamespace = io('/students');
    group = 'students'
}


socketNamespace.on('connect', () => {
    namespace.textContent = group
})

const sendmessage = document.querySelector('#sendMessageNamespace');
sendmessage.addEventListener('click', () => {
    const msg = prompt('white your message');
    socketNamespace.emit('send msg', {
        msg, user
    })
})

socketNamespace.on('msg', data => {
    const {user, msg} = data;

    const li = document.createElement('li');
    li.textContent = `${user}: ${msg}`

    chat.append(li)
})