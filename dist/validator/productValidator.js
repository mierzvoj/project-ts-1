"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports.validateProduct = function (product) {
    if (product.name.length > 50) {
        return "Name greater then 50 chars";
    }
    if (product.description.length > 500) {
        return "Description greater than 500 chars";
    }
    if (product.price < 10) {
        return "Price less than $10";
    }
    return null;
};
//# sourceMappingURL=productValidator.js.map