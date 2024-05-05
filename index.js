const { program } = require("commander");
const fs = require("fs");

program
    .name('GitHub-Repos-Tool')
    .description('CLI to get GitHub repos of a single user')
    .version('1.0.0');

program.command('fetch')
    .description('Fetches repos of user')
    .argument('<username>', 'username to fetch')
    .action((username) => {
        fetch(`https://api.github.com/users/${username}/repos`)
        .then((res) => res.json())
        .then((data) => {
            data = data.map(repo => repo.name);
            console.log(data);
            fs.writeFile(username + ".txt", data.join("\n"), () => {
                console.log("DONE");
            })
        })
    });

program.parse();