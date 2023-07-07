"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flow_logger = void 0;
const flow_logger = (req, res, next) => {
    console.log(`REQUEST > ${req.method} ${req.originalUrl} ${res.statusCode}}`);
    res.on('finish', () => console.log(`RESPONSE > ${req.method} ${req.originalUrl} ${res.statusCode}}`));
    next();
};
exports.flow_logger = flow_logger;
//# sourceMappingURL=flow_logger.js.map