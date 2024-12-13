"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextWithRelationsSchema = exports.TextSchema = void 0;
var zod_1 = require("zod");
var AuthorSchema_1 = require("./AuthorSchema");
/////////////////////////////////////////
// TEXT SCHEMA
/////////////////////////////////////////
exports.TextSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
    mela_id: zod_1.z.string(),
    name: zod_1.z.string(),
    authorId: zod_1.z.number().int(),
    year: zod_1.z.number().int(),
});
exports.TextWithRelationsSchema = exports.TextSchema.merge(zod_1.z.object({
    author: zod_1.z.lazy(function () { return AuthorSchema_1.AuthorWithRelationsSchema; }),
}));
exports.default = exports.TextSchema;
