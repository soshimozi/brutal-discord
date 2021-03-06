"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = require("../lib/users");
var prefix = '!';
module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5,
    execute: function (message, args) {
        users_1.default(message.author);
        var data = [];
        var commands = message.client.commands.filter(function (command) { return command.name != 'porn'; });
        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(function (command) { return command.name; }).join(', '));
            data.push("\nYou can send `" + prefix + "help [command name]` to get info on a specific command!");
            return message.author.send(data, { split: true })
                .then(function () {
                if (message.channel.type === 'dm')
                    return;
                message.reply('I\'ve sent you a DM with all my commands!');
            })
                .catch(function (error) {
                console.error("Could not send help DM to " + message.author.tag + ".\n", error);
                message.reply('it seems like I can\'t DM you!');
            });
        }
        var name = args[0].toLowerCase();
        var command = commands.get(name) || commands.find(function (c) { return c.aliases && c.aliases.includes(name); });
        if (!command) {
            return message.reply('that\'s not a valid command!');
        }
        data.push("**Name:** " + command.name);
        if (command.aliases)
            data.push("**Aliases:** " + command.aliases.join(', '));
        if (command.description)
            data.push("**Description:** " + command.description);
        if (command.usage)
            data.push("**Usage:** " + prefix + command.name + " " + command.usage);
        data.push("**Cooldown:** " + (command.cooldown || 1) + " second(s)");
        message.channel.send(data, { split: true });
    },
};
