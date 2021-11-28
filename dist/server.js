/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/config/index.ts":
/*!************************************!*\
  !*** ./src/server/config/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\ndotenv.config();\nexports[\"default\"] = {\n    mysql: {\n        user: process.env.DB_USER,\n        password: process.env.DB_PASS,\n        host: process.env.DB_HOST,\n        database: process.env.DB_SCHEMA,\n    },\n};\n\n\n//# sourceURL=webpack://barebones-react-typescript-express/./src/server/config/index.ts?");

/***/ }),

/***/ "./src/server/db/index.ts":
/*!********************************!*\
  !*** ./src/server/db/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Query = void 0;\nvar mysql = __webpack_require__(/*! mysql */ \"mysql\");\nvar config_1 = __webpack_require__(/*! ../config */ \"./src/server/config/index.ts\");\nvar pool = mysql.createPool(config_1.default.mysql);\nvar Query = function (query, values) {\n    return new Promise(function (resolve, reject) {\n        var sql = mysql.format(query, values);\n        pool.query(sql, function (err, results) {\n            if (err) {\n                reject(err);\n            }\n            else {\n                resolve(results);\n            }\n        });\n    });\n};\nexports.Query = Query;\nvar blogs_1 = __webpack_require__(/*! ./queries/blogs */ \"./src/server/db/queries/blogs.ts\");\nvar blogtags_1 = __webpack_require__(/*! ./queries/blogtags */ \"./src/server/db/queries/blogtags.ts\");\nexports[\"default\"] = {\n    blogs: blogs_1.default,\n    blogtags: blogtags_1.default,\n};\n\n\n//# sourceURL=webpack://barebones-react-typescript-express/./src/server/db/index.ts?");

/***/ }),

/***/ "./src/server/db/queries/blogs.ts":
/*!****************************************!*\
  !*** ./src/server/db/queries/blogs.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar index_1 = __webpack_require__(/*! ../index */ \"./src/server/db/index.ts\");\nvar all = function () {\n    return (0, index_1.Query)(\"SELECT blogs.*, authors.name FROM blogs JOIN authors ON authors.id = blogs.authorid\");\n};\nvar one = function (id) {\n    return (0, index_1.Query)(\"SELECT blogs.*, authors.name FROM blogs JOIN authors ON authors.id = blogs.authorid WHERE blogs.id = ?\", [id]);\n};\nvar insert = function (newBlog) { return (0, index_1.Query)(\"INSERT INTO blogs SET ?\", newBlog); };\nvar update = function (editedBlog, id) { return (0, index_1.Query)(\"UPDATE blogs SET ? WHERE id = ?\", [editedBlog, id]); };\nvar destroy = function (id) { return (0, index_1.Query)(\"DELETE FROM blogs WHERE id = ?\", [id]); };\nexports[\"default\"] = {\n    all: all,\n    one: one,\n    insert: insert,\n    update: update,\n    destroy: destroy,\n};\n\n\n//# sourceURL=webpack://barebones-react-typescript-express/./src/server/db/queries/blogs.ts?");

/***/ }),

/***/ "./src/server/db/queries/blogtags.ts":
/*!*******************************************!*\
  !*** ./src/server/db/queries/blogtags.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar index_1 = __webpack_require__(/*! ../index */ \"./src/server/db/index.ts\");\nvar retrieve = function (blogid) { return (0, index_1.Query)(\"CALL spBlogTags(?)\", [blogid]); };\nvar insert = function (blogid, tagid) {\n    return (0, index_1.Query)(\"INSERT INTO blogtags (blogid, tagid) VALUES(?, ?)\", [blogid, tagid]);\n};\nexports[\"default\"] = {\n    retrieve: retrieve,\n    insert: insert,\n};\n\n\n//# sourceURL=webpack://barebones-react-typescript-express/./src/server/db/queries/blogtags.ts?");

/***/ }),

/***/ "./src/server/routes/blogs.ts":
/*!************************************!*\
  !*** ./src/server/routes/blogs.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express_1 = __webpack_require__(/*! express */ \"express\");\nvar db_1 = __webpack_require__(/*! ../db */ \"./src/server/db/index.ts\");\nvar router = (0, express_1.Router)();\n// GET /api/blogs/1?\nrouter.get(\"/:blogid?\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var blogid, blog, blogs, error_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                blogid = Number(req.params.blogid);\n                _a.label = 1;\n            case 1:\n                _a.trys.push([1, 6, , 7]);\n                if (!blogid) return [3 /*break*/, 3];\n                return [4 /*yield*/, db_1.default.blogs.one(blogid)];\n            case 2:\n                blog = (_a.sent())[0];\n                res.json(blog);\n                return [3 /*break*/, 5];\n            case 3: return [4 /*yield*/, db_1.default.blogs.all()];\n            case 4:\n                blogs = _a.sent();\n                res.json(blogs);\n                _a.label = 5;\n            case 5: return [3 /*break*/, 7];\n            case 6:\n                error_1 = _a.sent();\n                console.log(error_1);\n                res.status(500).json({ msg: \"my code sucks!\", error: error_1 });\n                return [3 /*break*/, 7];\n            case 7: return [2 /*return*/];\n        }\n    });\n}); });\n// POST /api/blogs/\n// Request Body { title: string, content: string }\nrouter.post(\"/\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var newBlog, result, error_2;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                newBlog = req.body;\n                newBlog.authorid = 1; // because eventually, whoever is logged in will replace this!\n                _a.label = 1;\n            case 1:\n                _a.trys.push([1, 3, , 4]);\n                return [4 /*yield*/, db_1.default.blogs.insert(newBlog)];\n            case 2:\n                result = _a.sent();\n                res.json({ msg: \"blog created\", id: result.insertId });\n                return [3 /*break*/, 4];\n            case 3:\n                error_2 = _a.sent();\n                console.log(error_2);\n                res.status(500).json({ msg: \"my code sucks!\", error: error_2 });\n                return [3 /*break*/, 4];\n            case 4: return [2 /*return*/];\n        }\n    });\n}); });\n// PUT /api/blogs/1\n// Request Body { title?: string, content?: string }\nrouter.put(\"/:blogid\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var blogid, editedBlog, result, error_3;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                blogid = Number(req.params.blogid);\n                editedBlog = req.body;\n                _a.label = 1;\n            case 1:\n                _a.trys.push([1, 3, , 4]);\n                return [4 /*yield*/, db_1.default.blogs.update(editedBlog, blogid)];\n            case 2:\n                result = _a.sent();\n                res.json({\n                    msg: \"blog \" + blogid + \" edited\",\n                    affectedRows: result.affectedRows,\n                });\n                return [3 /*break*/, 4];\n            case 3:\n                error_3 = _a.sent();\n                console.log(error_3);\n                res.status(500).json({ msg: \"my code sucks!\", error: error_3 });\n                return [3 /*break*/, 4];\n            case 4: return [2 /*return*/];\n        }\n    });\n}); });\n// DELETE /api/blogs/1\nrouter.delete(\"/:blogid\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var blogid, result, error_4;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                blogid = Number(req.params.blogid);\n                _a.label = 1;\n            case 1:\n                _a.trys.push([1, 3, , 4]);\n                return [4 /*yield*/, db_1.default.blogs.destroy(blogid)];\n            case 2:\n                result = _a.sent();\n                res.json({\n                    msg: \"blog \" + blogid + \" destroyed\",\n                    affectedRows: result.affectedRows,\n                });\n                return [3 /*break*/, 4];\n            case 3:\n                error_4 = _a.sent();\n                console.log(error_4);\n                res.status(500).json({ msg: \"my code sucks!\", error: error_4 });\n                return [3 /*break*/, 4];\n            case 4: return [2 /*return*/];\n        }\n    });\n}); });\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://barebones-react-typescript-express/./src/server/routes/blogs.ts?");

/***/ }),

/***/ "./src/server/routes/blogtags.ts":
/*!***************************************!*\
  !*** ./src/server/routes/blogtags.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express_1 = __webpack_require__(/*! express */ \"express\");\nvar db_1 = __webpack_require__(/*! ../db */ \"./src/server/db/index.ts\");\nvar router = (0, express_1.Router)();\nrouter.get(\"/:blogid\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var blogid, blogtags, error_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                blogid = Number(req.params.blogid);\n                _a.label = 1;\n            case 1:\n                _a.trys.push([1, 3, , 4]);\n                return [4 /*yield*/, db_1.default.blogtags.retrieve(blogid)];\n            case 2:\n                blogtags = (_a.sent())[0];\n                res.json(blogtags);\n                return [3 /*break*/, 4];\n            case 3:\n                error_1 = _a.sent();\n                console.log(error_1);\n                res.status(500).json({ msg: \"hey\", error: error_1 });\n                return [3 /*break*/, 4];\n            case 4: return [2 /*return*/];\n        }\n    });\n}); });\nrouter.post(\"/api/blogtags\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var newBlogTag, result, error_2;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                newBlogTag = req.body;\n                _a.label = 1;\n            case 1:\n                _a.trys.push([1, 3, , 4]);\n                return [4 /*yield*/, db_1.default.blogtags.insert(newBlogTag.blogid, newBlogTag.tagid)];\n            case 2:\n                result = _a.sent();\n                res.json(__assign({ msg: \"tag inserted\" }, result));\n                return [3 /*break*/, 4];\n            case 3:\n                error_2 = _a.sent();\n                console.log(error_2);\n                res.status(500).json({ msg: \"hey\", error: error_2 });\n                return [3 /*break*/, 4];\n            case 4: return [2 /*return*/];\n        }\n    });\n}); });\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://barebones-react-typescript-express/./src/server/routes/blogtags.ts?");

/***/ }),

/***/ "./src/server/routes/index.ts":
/*!************************************!*\
  !*** ./src/server/routes/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express_1 = __webpack_require__(/*! express */ \"express\");\nvar blogs_1 = __webpack_require__(/*! ./blogs */ \"./src/server/routes/blogs.ts\");\nvar blogtags_1 = __webpack_require__(/*! ./blogtags */ \"./src/server/routes/blogtags.ts\");\nvar router = (0, express_1.Router)();\nrouter.use(\"/blogs\", blogs_1.default);\nrouter.use(\"/blogtags\", blogtags_1.default);\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://barebones-react-typescript-express/./src/server/routes/index.ts?");

/***/ }),

/***/ "./src/server/server.ts":
/*!******************************!*\
  !*** ./src/server/server.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express = __webpack_require__(/*! express */ \"express\");\nvar morgan = __webpack_require__(/*! morgan */ \"morgan\");\nvar path = __webpack_require__(/*! path */ \"path\");\nvar routes_1 = __webpack_require__(/*! ./routes */ \"./src/server/routes/index.ts\");\nvar app = express();\napp.use(express.static(\"public\"));\napp.use(morgan(\"dev\"));\napp.use(express.json());\napp.use(\"/api\", routes_1.default);\napp.get(\"*\", function (req, res) {\n    return res.sendFile(path.join(__dirname, \"../public/index.html\"));\n});\nvar port = process.env.PORT || 3000;\napp.listen(port, function () { return console.log(\"Server listening on port: \" + port); });\n\n\n//# sourceURL=webpack://barebones-react-typescript-express/./src/server/server.ts?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("morgan");

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/***/ ((module) => {

module.exports = require("mysql");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/server.ts");
/******/ 	
/******/ })()
;