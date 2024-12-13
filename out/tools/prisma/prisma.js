"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrismaService = void 0;
var fs = require("fs");
var path = require("path");
var generatePrismaService = function (prismaClientPackage, dir) {
    if (fs.existsSync(dir))
        fs.rmdirSync(dir, { recursive: true });
    fs.mkdirSync(dir, { recursive: true });
    var prismaService = "\n    import { Injectable, OnModuleInit } from '@nestjs/common';\n    import { PrismaClient } from '@prisma/client';\n    \n    @Injectable()\n    export class PrismaService extends PrismaClient implements OnModuleInit {\n      async onModuleInit() {\n        await this.$connect();\n      }\n    }\n  ";
    fs.writeFileSync(path.join(dir, "prisma.service.ts"), prismaService);
    var prismaModule = "\n  import { Module } from '@nestjs/common';\n  import { PrismaService } from './prisma.service';\n  \n  @Module({\n    controllers: [],\n    providers: [PrismaService],\n    exports: [PrismaService],\n  })\n  export class PrismaModule {}\n";
    fs.writeFileSync(path.join(dir, "prisma.module.ts"), prismaModule);
    var index = "\n    export * from './prisma.service';\n    export * from './prisma.module';\n  ";
    fs.writeFileSync(path.join(dir, "index.ts"), index);
};
exports.generatePrismaService = generatePrismaService;
