const { query } = require("./db")


//Get all users
exports.getallUsers = async (req, res) => {
    try {
        const data = await query("select * from users;");
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};


// ?? Add users
exports.addUser = async (req, res) => {
    let { name, password, username } = req.body;
    let uid = name[0] + Math.floor(Math.random() + new Date().getSeconds()) + password[2] + username[1];
    try {
        const isuser = await query(`select * from users where username='${username}';`);
        if (isuser.length>0) {
            res.json({message: "User exists"});
        }
        else {
            await query(`insert into users(name,username,password,uid) values('${name}','${username}','${password}','${uid}');`);
            const user = await query(`select * from users where uid='${uid}'`)
            res.cookie("id" , uid);
            res.json({ message: "User added successfully", data: user });
        }
    } catch (error) {
        console.log(error);
    }
};


//?? Login
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        username.trim()
        password.trim()
        const uid = (await query(`select uid from users where username='${username}' and password='${password}'`));
        if (uid.length>0) {   
            const user = await query(`select username,name,uid from users where username='${username}' and password='${password}'`);
            res.json(user)
        } else {
            res.json({message:"Invalid credentials"})
        }
            res.json(user);
    } catch (error) {
        console.error(error);
    }
}