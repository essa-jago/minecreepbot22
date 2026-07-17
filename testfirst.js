const mineflayer = require('mineflayer')
const Movements = require('mineflayer-pathfinder').Movements;
const pathfinder = require('mineflayer-pathfinder').pathfinder;
const { GoalFollow } = require('mineflayer-pathfinder').goals;
const readline = require('readline');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Bot has arrived');
});

app.listen(8000, () => {
  console.log('Server started on port 8000');
});

function creabotpls(){

    const bot = mineflayer.createBot({
    host: 'sikmasmp.mcsh.io', // Server IP
    port: 25565,       // Server Port
    username: `oppurtnitybot22`, // igntest${Number(Math.random() * (1000, 9999)).toFixed(0)}
    version: '1.20.1'  // Optional: specify version
    })
    bot.loadPlugin(pathfinder);

    function followplayer(username){
            const target = bot.players[username]?.entity
            if (target) {
            // Follow the player within a 2-block radius
            bot.pathfinder.setGoal(new GoalFollow(target, 2), true)
            }
    }


    bot.once('spawn', () => { //bot.on('chat', (username, message) => {
        setTimeout(() => {
            bot.chat("/register yourpassword yourpassword")
            console.log("registered!")
            bot.setControlState('jump', true);
            bot.setControlState('sneak', true);
        }, 1000);
        setTimeout(() => {
            bot.chat("/login yourpassword")
            console.log("logined!")
            bot.setControlState('jump', true);
            bot.setControlState('sneak', true);
        }, 2000);
        setTimeout(() => {
            bot.chat("hello world!")
            console.log("yo sup!")
        }, 3000);
        setTimeout(() => {
            let counter = 0;

            process.stdin.setEncoding('utf8');
            process.stdout.write('Ketik sesuatu lalu Enter:\n');

            //const interval = setInterval(() => {
            //counter++;
            //process.stdout.write(`[Tick ${counter}] Menunggu input...\n`);
            //}, 3000);

            process.stdin.on('data', (data) => {
            const input = data.trim();
            console.log('Input diterima:', input);
            if (input.includes("/chat")){
                let sigma = input.split("/chat ")
                console.log("chat", sigma[1])
                bot.chat(String(sigma[1]))
                console.log(sigma)
            }else if (input.includes("/follow")){
                let sigma = input.split("/follow ")
                console.log(`following player ${sigma[1]}`)
                followplayer(String(sigma[1]))
            }else if (input.includes("/eval")){
                let sigma = input.split("/eval ")
                console.log(`try running code ${sigma[1]}`)
                eval(String(sigma[1]))
            }

            if (input === 'stop') {
                clearInterval(interval);
                process.exit();
            }
            });
        }, 5000);
        
    //if (username === bot.username) return // Ignore own messages
    //if (message === 'hello') {
        //bot.chat(`Hello ${username}, I am a Mineflayer bot!`)
    //}
    })



    bot.on('chat', (username, message) => {
      console.log(`${username}: ${message}`)
    //if (message === 'follow') {
        //const target = bot.players[username]?.entity
        //if (target) {
        // Follow the player within a 2-block radius
        //bot.pathfinder.setGoal(new GoalFollow(target, 2), true)
        //}
    //}
    })


    bot.on('spawn', () => {
    console.log('Bot has spawned in the world.')
    })

    bot.on('end', () => {
            setTimeout(() => {
                creabotpls();
                console.log("testing ending")
            }, 3000);
    });

    bot.on('kicked', () => {
            setTimeout(() => {
                creabotpls();
                console.log("testing ending kicked")
            }, 3000);
    });
    bot.on('error', () => {
            setTimeout(() => {
                creabotpls();
                console.log("testing ending banned")
            }, 3000);
    });
}

creabotpls()
