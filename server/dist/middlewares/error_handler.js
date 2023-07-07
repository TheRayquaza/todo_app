"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error_handler = void 0;
const error_handler = (err, req, res, next) => {
    if (err instanceof SyntaxError && "body" in err)
        res.status(400).json({ error: "Invalid JSON", status: 400 });
    else
        res.status(500).json({ error: err.message || "Internal Server Error", status: 500 });
};
exports.error_handler = error_handler;
//# sourceMappingURL=error_handler.js.map