"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = require("../lib/users");
var mongo_client_1 = require("../lib/mongo-client");
module.exports = {
    name: 'polls',
    description: 'View all the currently available polls for this chat room',
    usage: "",
    execute: function (message, args) {
        return __awaiter(this, void 0, void 0, function () {
            var text, today, yesterday, polls, _loop_1, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        users_1.default(message.author);
                        text = [];
                        today = new Date();
                        yesterday = new Date(today);
                        yesterday.setDate(today.getDate() - 1);
                        return [4, mongo_client_1.default.polls.find({
                                room: message.channel.id,
                                created_at: {
                                    $gte: (yesterday)
                                },
                                deleted: false
                            }).toArray()];
                    case 1:
                        polls = _a.sent();
                        _loop_1 = function (index) {
                            var poll = polls[index];
                            var options = [];
                            poll.voting_options.forEach(function (element) {
                                options.push(element.option);
                            });
                            text.push("ID: " + poll.poll_id + " - Question: \"" + poll.question + "\" - Options: " + options.join(' | '));
                        };
                        for (index in polls) {
                            _loop_1(index);
                        }
                        if (polls.length == 0) {
                            text.push("No polls available");
                        }
                        message.channel.send({
                            embed: {
                                color: 3447003,
                                description: text.join("\n")
                            }
                        });
                        return [2];
                }
            });
        });
    },
};
