"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request_analyzer = void 0;
const request_analyzer = (req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    console.log(`Body: ${JSON.stringify(req.body)}`);
    next();
};
exports.request_analyzer = request_analyzer;
