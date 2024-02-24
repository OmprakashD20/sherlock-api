"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clues = void 0;
var typeorm_1 = require("typeorm");
var models_1 = require("@/models");
var Clues = /** @class */ (function (_super) {
    __extends(Clues, _super);
    function Clues() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.Column)({ default: 0 }),
        __metadata("design:type", Number)
    ], Clues.prototype, "cluesUsedBySherlock", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 0 }),
        __metadata("design:type", Number)
    ], Clues.prototype, "cluesUsedByWatson", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 0 }),
        __metadata("design:type", Number)
    ], Clues.prototype, "cluesUsedInRound2", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 0 }),
        __metadata("design:type", Number)
    ], Clues.prototype, "lastClueUsedBySherlock", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 0 }),
        __metadata("design:type", Number)
    ], Clues.prototype, "lastClueUsedByWatson", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 0 }),
        __metadata("design:type", Number)
    ], Clues.prototype, "lastClueUsedInRound2", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return models_1.Team; }, function (team) { return team.clues; }, {
            onDelete: "CASCADE",
        }),
        (0, typeorm_1.JoinColumn)({ name: "teamId", referencedColumnName: "id" }),
        __metadata("design:type", models_1.Team)
    ], Clues.prototype, "team", void 0);
    Clues = __decorate([
        (0, typeorm_1.Entity)("Clues")
    ], Clues);
    return Clues;
}(models_1.Base));
exports.Clues = Clues;
//# sourceMappingURL=Clues.js.map