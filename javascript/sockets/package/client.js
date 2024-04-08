const socket = io("http://localhost:3000");

const pfps = [
    'https://img.icons8.com/clouds/100/spongebob-squarepants.png',
    'https://img.icons8.com/clouds/100/spongebob-squarepants.png',
    'https://img.icons8.com/color/48/scooby-doo.png',
    'https://img.icons8.com/color/48/caterpie.png',
    'https://img.icons8.com/bubbles/50/charmander.png',
    'https://img.icons8.com/bubbles/50/charmander.png',
    'https://img.icons8.com/color/48/tom.png',
    'https://img.icons8.com/clouds/100/homer-simpson.png',
    'https://img.icons8.com/clouds/100/grim-adventures-of-billy-and-mandy.png" alt="grim-adventures-of-billy-and-mandy',
    'https://img.icons8.com/clouds/100/kiss-panda.png'
]

const user = {
    name: "",
    id: 1,
    room: [],
    croom: 0,
    pfp: pfps[3],
}



function getuser() {
    if (!sessionStorage.getItem("name")) {
        const name = prompt("What is your name? : ");
        sessionStorage.setItem("name", name);
        user.name = name;
    } else {
        user.name = sessionStorage.getItem("name");
    }
    user.pfp = pfps[Math.floor(Math.random() * 10)];
    document.getElementById("name").innerText = user.name[0].toUpperCase() + user.name.slice(1);
    socket.emit('register', user);

}


function test(msg) {
    socket.emit('msg', ({ msg: msg, room: user.room, name: user.name }));
}

function joinroom() {
    const room = parseInt(prompt("Enter room id: "));
    user.room = room;
    socket.emit('join-room', user);
}

socket.on('nmsg', function ({ msg, name }) {
    showmessage({ msg: msg, name: name });
})

socket.on('rooms', (rooms) => {
    user.room = rooms
    document.querySelector('#rm').innerText = user.room;
});



function sendmessage() {
    const form = document.querySelector("form");
    let msg = document.querySelector("#message");
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (user.room) {
            socket.emit('msg', ({ msg: msg.value, room: user.room, name: user.name }));
        }
        msg.value = '';
    })
}





// Define the HTML markup as a template literal
// Define the HTML markup as a template literal

function nmsg(name, msg) {
    var pos = (name == user.name) ? "right" : "left";
    var li = `
                     <li class="${pos}">
                    <div class="pfp"></div>
                    $<span id="usrnm">${name}</span>:<p class="mesg">${msg}</p>
                </li>
                `;
    return li;
}

function showmessage({ msg, name }) {
    const msglist = document.querySelector("ul");
    var text = document.createElement('li');
    msglist.innerHTML += (nmsg(name, msg));
    document.querySelectorAll('.pfp').forEach((p) => {
        p.style.backgroundImage = `url('${user.pfp}')`;
    })
}
getuser();


