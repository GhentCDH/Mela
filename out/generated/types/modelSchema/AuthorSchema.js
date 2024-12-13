"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorWithRelationsSchema = exports.AuthorSchema = void 0;
var zod_1 = require("zod");
var TextSchema_1 = require("./TextSchema");
/////////////////////////////////////////
// AUTHOR SCHEMA
/////////////////////////////////////////
exports.AuthorSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
    name: zod_1.z.string(),
});
exports.AuthorWithRelationsSchema = exports.AuthorSchema.merge(zod_1.z.object({
    Text: zod_1.z.lazy(function () { return TextSchema_1.TextWithRelationsSchema; }).array(),
}));
exports.default = exports.AuthorSchema;
