"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateForm = void 0;
var zod_to_json_schema_1 = require("zod-to-json-schema");
var model = require("../../generated/types/modelSchema");
var fs = require("fs");
var path = require("path");
var generateForm = function (dir) {
    var dtoDir = path.join(dir, 'dtos');
    var formDir = path.join(dir, 'forms');
    if (fs.existsSync(dtoDir))
        fs.rmdirSync(dtoDir, { recursive: true });
    if (fs.existsSync(formDir))
        fs.rmdirSync(formDir, { recursive: true });
    fs.mkdirSync(dtoDir, { recursive: true });
    fs.mkdirSync(formDir, { recursive: true });
    var imports = ["import { JsonSchema } from '@jsonforms/core';"];
    var importsDto = ["import { createZodDto } from 'nestjs-zod';"];
    var dtoExports = [];
    var formExports = [];
    Object.keys(model).forEach(function (key) {
        var name = key.replace('Schema', 'Form');
        var nameDto = key.replace('Schema', 'Dto');
        var entry = model[key];
        var jsonSchema = (0, zod_to_json_schema_1.zodToJsonSchema)(entry, 'Schema');
        var schema = jsonSchema.definitions['Schema'];
        Object.entries(schema === null || schema === void 0 ? void 0 : schema.properties).forEach(function (_a) {
            var key = _a[0], prop = _a[1];
            if ('anyOf' in prop) {
                var type = prop.anyOf[0];
                schema.properties[key] = __assign(__assign(__assign({}, prop), { anyOf: undefined }), type);
            }
        });
        var forms = [
            imports,
            '',
            "export const ".concat(name, "Detail = ").concat(JSON.stringify(jsonSchema, null, 2), ";"),
            "export const ".concat(name, " = ").concat(name, "Detail.definitions!['Schema'] as JsonSchema;"),
            '',
        ]
            .flat()
            .join('\n');
        var dtos = [
            importsDto,
            ' ',
            "import { ".concat(key, " } from '../modelSchema';"),
            ' ',
            "export class ".concat(nameDto, " extends createZodDto(").concat(key, ") {}"),
        ]
            .flat()
            .join('\n');
        fs.writeFileSync(path.join(formDir, "".concat(name, ".form.ts")), forms);
        fs.writeFileSync(path.join(dtoDir, "".concat(name, ".dto.ts")), dtos);
        formExports.push("export * from './".concat(name, ".form.ts';"));
        dtoExports.push("export * from './".concat(name, ".dto.ts';"));
    });
    fs.writeFileSync(path.join(formDir, 'index.ts'), formExports.join('\n'));
    fs.writeFileSync(path.join(dtoDir, 'index.ts'), dtoExports.join('\n'));
};
exports.generateForm = generateForm;
