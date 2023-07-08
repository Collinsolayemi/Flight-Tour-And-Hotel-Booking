"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomOption = void 0;
const common_1 = require("@nestjs/common");
function CustomOption(options) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)('customOptions', options));
}
exports.CustomOption = CustomOption;
