"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var openai_1 = require("openai");
var blob_service_1 = require("../app/functions/blob-service");
var configuration = new openai_1.Configuration({
    apiKey: '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'
});
var openAi = new openai_1.OpenAIApi(configuration);
function generateImage(prompt, n) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, openAi.createImage({
                        prompt: prompt,
                        n: n,
                        response_format: "b64_json",
                    })
                    // console.log(response)
                ];
                case 1:
                    response = _a.sent();
                    // console.log(response)
                    return [2 /*return*/, Buffer.from(response.data.data[0]['b64_json'], 'base64')];
            }
        });
    });
}
function generateIconRoutes(fastify, _, done) {
    var _this = this;
    // fastify.get('/', function (req, reply) {
    //     // fastify.pg.query(
    //     //     "SELECT * FROM testtable",
    //     //     function onResult (err, result) {
    //     //         reply.send(err || result['rows'])
    //     //     }
    //     // )
    // })
    //
    fastify.get('/', function (req, reply) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var i, containers, _d, containers_1, containers_1_1, container, e_1_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        i = 1;
                        containers = blob_service_1.default.listContainers();
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, 7, 12]);
                        _d = true, containers_1 = __asyncValues(containers);
                        _e.label = 2;
                    case 2: return [4 /*yield*/, containers_1.next()];
                    case 3:
                        if (!(containers_1_1 = _e.sent(), _a = containers_1_1.done, !_a)) return [3 /*break*/, 5];
                        _c = containers_1_1.value;
                        _d = false;
                        container = _c;
                        console.log("Container ".concat(i++, ": ").concat(container.name));
                        _e.label = 4;
                    case 4:
                        _d = true;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _e.trys.push([7, , 10, 11]);
                        if (!(!_d && !_a && (_b = containers_1.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _b.call(containers_1)];
                    case 8:
                        _e.sent();
                        _e.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    });
    fastify.post('/generate', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var prompt, imageUrl, containerName, blobName, containerClient, blockBlobClient, uploadBlobResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prompt = req.body.prompt;
                    return [4 /*yield*/, generateImage(prompt, 2)];
                case 1:
                    imageUrl = _a.sent();
                    containerName = "icons";
                    blobName = "newblob" + new Date().getTime();
                    containerClient = blob_service_1.default.getContainerClient(containerName);
                    blockBlobClient = containerClient.getBlockBlobClient(blobName);
                    return [4 /*yield*/, blockBlobClient.upload(imageUrl, imageUrl.length)];
                case 2:
                    uploadBlobResponse = _a.sent();
                    console.log("Upload block blob ".concat(blobName, " successfully"), uploadBlobResponse.requestId);
                    // await generateImage(prompt,1)
                    res.send("worked");
                    return [2 /*return*/];
            }
        });
    }); });
    done();
}
exports.default = generateIconRoutes;
