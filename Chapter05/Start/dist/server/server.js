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

/***/ "./src/schema.graphql":
/*!****************************!*\
  !*** ./src/schema.graphql ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"type Query {\\n  customer(id: ID!): Customer\\n  customers: [Customer]\\n  availableTimeSlots: [Appointment]\\n  appointments(from: String, to: String): [Appointment]\\n}\\n\\ntype Mutation {\\n  addAppointment(appointment: AppointmentInput): Appointment\\n  addCustomer(customer: CustomerInput): Customer\\n}\\n\\ninput CustomerInput {\\n  firstName: String\\n  lastName: String\\n  phoneNumber: String\\n}\\n\\ntype Customer {\\n  id: ID\\n  firstName: String\\n  lastName: String\\n  phoneNumber: String\\n  appointments: [Appointment]\\n}\\n\\ninput AppointmentInput {\\n  startsAt: String\\n  customer: ID\\n}\\n\\ntype Appointment {\\n  startsAt: String\\n  stylist: String\\n  service: String\\n  notes: String\\n}\\n\");\n\n//# sourceURL=webpack://appointments/./src/schema.graphql?");

/***/ }),

/***/ "./server/src/app.js":
/*!***************************!*\
  !*** ./server/src/app.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"buildApp\": () => (/* binding */ buildApp)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var graphql_helix__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! graphql-helix */ \"graphql-helix\");\n/* harmony import */ var graphql_helix__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(graphql_helix__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! graphql */ \"graphql\");\n/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _appointments__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./appointments */ \"./server/src/appointments.js\");\n/* harmony import */ var _customers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./customers */ \"./server/src/customers.js\");\n/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! morgan */ \"morgan\");\n/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(morgan__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _src_schema_graphql__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../src/schema.graphql */ \"./src/schema.graphql\");\n\n\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\n\n\n\n\n\n\n\n\nvar schema = (0,graphql__WEBPACK_IMPORTED_MODULE_5__.buildSchema)(_src_schema_graphql__WEBPACK_IMPORTED_MODULE_9__[\"default\"]);\nfunction buildApp(customerData, appointmentData, timeSlots) {\n  var app = express__WEBPACK_IMPORTED_MODULE_3___default()();\n\n  var _customers = new _customers__WEBPACK_IMPORTED_MODULE_7__.Customers(customerData);\n\n  var _appointments = new _appointments__WEBPACK_IMPORTED_MODULE_6__.Appointments(appointmentData, timeSlots);\n\n  app.use(express__WEBPACK_IMPORTED_MODULE_3___default()[\"static\"](\"dist\"));\n  app.use(express__WEBPACK_IMPORTED_MODULE_3___default().json());\n  app.use(morgan__WEBPACK_IMPORTED_MODULE_8___default()(\"dev\"));\n  app.get(\"/availableTimeSlots\", function (req, res) {\n    res.json(_appointments.getTimeSlots());\n  });\n  app.get(\"/appointments/:from-:to\", function (req, res) {\n    res.json(_appointments.getAppointments(parseInt(req.params.from), parseInt(req.params.to), _customers.all()));\n  });\n  app.post(\"/appointments\", function (req, res) {\n    var appointment = req.body;\n\n    if (_appointments.isValid(appointment)) {\n      _appointments.add(appointment);\n\n      res.sendStatus(201);\n    } else {\n      var errors = _appointments.errors(appointment);\n\n      res.status(422).json({\n        errors: errors\n      });\n    }\n  });\n  app.post(\"/customers\", function (req, res) {\n    var customer = req.body;\n\n    if (_customers.isValid(customer)) {\n      var customerWithId = _customers.add(customer);\n\n      res.status(201).json(customerWithId);\n    } else {\n      var errors = _customers.errors(customer);\n\n      res.status(422).json({\n        errors: errors\n      });\n    }\n  });\n  app.get(\"/customers\", function (req, res) {\n    var results = _customers.search(buildSearchParams(req.query));\n\n    res.json(results);\n  });\n\n  var customerValidation = function customerValidation(context) {\n    return {\n      Argument: function Argument(arg) {\n        if (arg.name.value === \"customer\") {\n          validateObject(context, arg.value.fields, _customers, \"addCustomer\");\n        }\n      }\n    };\n  };\n\n  var validateObject = function validateObject(context, fields, repository, path) {\n    var object = fields.reduce(function (acc, field) {\n      acc[field.name.value] = field.value.value;\n      return acc;\n    });\n\n    if (!repository.isValid(object)) {\n      var errors = repository.errors(object);\n      Object.keys(errors).forEach(function (fieldName) {\n        context.reportError(new graphql__WEBPACK_IMPORTED_MODULE_5__.GraphQLError(errors[fieldName], undefined, undefined, undefined, [path, fieldName]));\n      });\n    }\n  };\n\n  var appointmentValidation = function appointmentValidation(context) {\n    return {\n      Argument: function Argument(arg) {\n        if (arg.name.value === \"appointment\") {\n          validateObject(context, arg.value.fields, _appointments, \"addAppointment\");\n        }\n      }\n    };\n  };\n\n  app.use(\"/graphql\", /*#__PURE__*/function () {\n    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(request, res) {\n      var _getGraphQLParameters, operationName, query, variables, result;\n\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              if (!(0,graphql_helix__WEBPACK_IMPORTED_MODULE_4__.shouldRenderGraphiQL)(request)) {\n                _context.next = 4;\n                break;\n              }\n\n              res.send((0,graphql_helix__WEBPACK_IMPORTED_MODULE_4__.renderGraphiQL)());\n              _context.next = 9;\n              break;\n\n            case 4:\n              // Extract the Graphql parameters from the request\n              _getGraphQLParameters = (0,graphql_helix__WEBPACK_IMPORTED_MODULE_4__.getGraphQLParameters)(request), operationName = _getGraphQLParameters.operationName, query = _getGraphQLParameters.query, variables = _getGraphQLParameters.variables; // Validate and execute the query\n\n              _context.next = 7;\n              return (0,graphql_helix__WEBPACK_IMPORTED_MODULE_4__.processRequest)({\n                operationName: operationName,\n                query: query,\n                variables: variables,\n                request: request,\n                schema: schema,\n                rootValueFactory: function rootValueFactory() {\n                  return {\n                    customer: function customer(_ref2) {\n                      var id = _ref2.id;\n\n                      var customer = _customers.all()[id];\n\n                      return _objectSpread(_objectSpread({}, customer), {}, {\n                        appointments: _appointments.forCustomer(customer.id)\n                      });\n                    },\n                    customers: function customers(query) {\n                      return _customers.search(buildSearchParams(query)).map(function (customer) {\n                        return _objectSpread(_objectSpread({}, customer), {}, {\n                          appointments: function appointments() {\n                            return _appointments.forCustomer(customer.id);\n                          }\n                        });\n                      });\n                    },\n                    availableTimeSlots: function availableTimeSlots() {\n                      return _appointments.getTimeSlots();\n                    },\n                    appointments: function appointments(_ref3) {\n                      var from = _ref3.from,\n                          to = _ref3.to;\n                      return _appointments.getAppointments(parseInt(from), parseInt(to), _customers.all());\n                    },\n                    addAppointment: function addAppointment(_ref4) {\n                      var appointment = _ref4.appointment;\n                      appointment = Object.assign(appointment, {\n                        startsAt: parseInt(appointment.startsAt)\n                      });\n                      return _appointments.add(appointment);\n                    },\n                    addCustomer: function addCustomer(_ref5) {\n                      var customer = _ref5.customer;\n                      return _customers.add(customer);\n                    }\n                  };\n                },\n                validationRules: [customerValidation, appointmentValidation]\n              });\n\n            case 7:\n              result = _context.sent;\n              (0,graphql_helix__WEBPACK_IMPORTED_MODULE_4__.sendResult)(result, res);\n\n            case 9:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n\n    return function (_x, _x2) {\n      return _ref.apply(this, arguments);\n    };\n  }());\n  app.get(\"*\", function (req, res) {\n    res.sendFile(\"dist/index.html\", {\n      root: process.cwd()\n    });\n  });\n  return app;\n}\n\nfunction buildSearchParams(_ref6) {\n  var searchTerm = _ref6.searchTerm,\n      after = _ref6.after,\n      limit = _ref6.limit,\n      orderBy = _ref6.orderBy,\n      orderDirection = _ref6.orderDirection;\n  var searchParams = {};\n  if (searchTerm) searchParams.searchTerms = buildSearchTerms(searchTerm);\n  if (after) searchParams.after = parseInt(after);\n  if (limit) searchParams.limit = parseInt(limit);\n  if (orderBy) searchParams.orderBy = orderBy;\n  if (orderDirection) searchParams.orderDirection = orderDirection;\n  return searchParams;\n}\n\nfunction buildSearchTerms(searchTerm) {\n  if (!searchTerm) return undefined;\n\n  if (Array.isArray(searchTerm)) {\n    return searchTerm;\n  }\n\n  return [searchTerm];\n}\n\n//# sourceURL=webpack://appointments/./server/src/app.js?");

/***/ }),

/***/ "./server/src/appointments.js":
/*!************************************!*\
  !*** ./server/src/appointments.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"buildTimeSlots\": () => (/* binding */ buildTimeSlots),\n/* harmony export */   \"generateFakeAppointments\": () => (/* binding */ generateFakeAppointments),\n/* harmony export */   \"Appointments\": () => (/* binding */ Appointments)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"@babel/runtime/helpers/slicedToArray\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"@babel/runtime/helpers/createClass\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ \"@babel/runtime/helpers/toConsumableArray\");\n/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nvar stylists = [\"Ashley\", \"Jo\", \"Pat\", \"Sam\"];\nvar stylistServices = {\n  Ashley: [\"Cut\", \"Blow-dry\", \"Extensions\"],\n  Jo: [\"Cut\", \"Blow-dry\", \"Cut & color\"],\n  Pat: [\"Cut\", \"Blow-dry\", \"Beard trim\", \"Cut & beard trim\", \"Extensions\"],\n  Sam: [\"Cut\", \"Blow-dry\", \"Beard trim\", \"Cut & beard trim\"]\n};\n\nvar randomInt = function randomInt(range) {\n  return Math.floor(Math.random() * range);\n};\n\nArray.prototype.pickRandom = function () {\n  return this[randomInt(this.length)];\n};\n\nfunction buildTimeSlots() {\n  var _ref;\n\n  var startDate = new Date();\n  startDate.setFullYear(startDate.getFullYear() - 1);\n  var startTime = startDate.setHours(9, 0, 0, 0);\n\n  var times = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(Array(365 + 30).keys()).map(function (day) {\n    var daysToAdd = day * 24 * 60 * 60 * 1000;\n    return _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(Array(20).keys()).map(function (halfHour) {\n      var halfHoursToAdd = halfHour * 30 * 60 * 1000;\n      return {\n        startsAt: startTime + daysToAdd + halfHoursToAdd,\n        stylists: stylists\n      };\n    });\n  });\n\n  return (_ref = []).concat.apply(_ref, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(times));\n}\n\nfunction shouldFillTimeSlot() {\n  return randomInt(3) < 2;\n}\n\nfunction generateFakeAppointments(customers, timeSlots) {\n  var appointments = [];\n  timeSlots.forEach(function (timeSlot) {\n    var stylist = timeSlot.stylists.pickRandom();\n\n    if (shouldFillTimeSlot()) {\n      appointments.push({\n        customer: customers.pickRandom().id,\n        startsAt: timeSlot.startsAt,\n        stylist: stylist,\n        service: stylistServices[stylist].pickRandom()\n      });\n    }\n  });\n  return appointments;\n}\nvar Appointments = /*#__PURE__*/function () {\n  function Appointments() {\n    var initialAppointments = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n    var initialTimeSlots = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Appointments);\n\n    this.appointments = [];\n    this.timeSlots = initialTimeSlots;\n    this.add = this.add.bind(this);\n    initialAppointments.forEach(this.add);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Appointments, [{\n    key: \"add\",\n    value: function add(appointment) {\n      this.timeSlots = this.timeSlots.filter(function (timeSlot) {\n        return timeSlot.startsAt !== appointment.startsAt;\n      });\n      this.appointments.push(appointment);\n      return appointment;\n    }\n  }, {\n    key: \"deleteAll\",\n    value: function deleteAll() {\n      this.appointments.length = 0;\n    }\n  }, {\n    key: \"getAppointments\",\n    value: function getAppointments(from, to, customers) {\n      return this.appointments.filter(function (appointment) {\n        if (from !== undefined && appointment.startsAt < from) {\n          return false;\n        }\n\n        if (to !== undefined && appointment.startsAt > to) {\n          return false;\n        }\n\n        return true;\n      }).map(function (appointment) {\n        return Object.assign({}, appointment, {\n          customer: customers[appointment.customer]\n        });\n      }).sort(function (a, b) {\n        return a.startsAt - b.startsAt;\n      });\n    }\n  }, {\n    key: \"forCustomer\",\n    value: function forCustomer(customerId) {\n      return this.appointments.filter(function (appointment) {\n        return appointment.customer === customerId;\n      });\n    }\n  }, {\n    key: \"getTimeSlots\",\n    value: function getTimeSlots() {\n      return this.timeSlots;\n    }\n  }, {\n    key: \"isValid\",\n    value: function isValid(appointment) {\n      return Object.keys(this.errors(appointment)).length === 0;\n    }\n  }, {\n    key: \"errors\",\n    value: function errors(appointment) {\n      var errors = {};\n      var key = {\n        startsAt: appointment.startsAt,\n        stylist: appointment.stylist\n      };\n      errors = Object.assign(errors, this.uniqueSetValidation(key, \"Stylist already has an appointment at this time\"));\n      return errors;\n    }\n  }, {\n    key: \"uniqueSetValidation\",\n    value: function uniqueSetValidation(uniqueSet, fieldDescription) {\n      var allValuesMatch = function allValuesMatch(a) {\n        return !Object.entries(uniqueSet).some(function (_ref2) {\n          var _ref3 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_ref2, 2),\n              k = _ref3[0],\n              v = _ref3[1];\n\n          return a[k] !== v;\n        });\n      };\n\n      if (this.appointments.some(allValuesMatch)) {\n        return Object.keys(uniqueSet).reduce(function (acc, field) {\n          return _objectSpread(_objectSpread({}, acc), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, field, fieldDescription));\n        }, {});\n      }\n\n      return {};\n    }\n  }]);\n\n  return Appointments;\n}();\n\n//# sourceURL=webpack://appointments/./server/src/appointments.js?");

/***/ }),

/***/ "./server/src/customers.js":
/*!*********************************!*\
  !*** ./server/src/customers.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"generateFakeCustomers\": () => (/* binding */ generateFakeCustomers),\n/* harmony export */   \"Customers\": () => (/* binding */ Customers)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"@babel/runtime/helpers/slicedToArray\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"@babel/runtime/helpers/createClass\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var faker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! faker */ \"faker\");\n/* harmony import */ var faker__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(faker__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\nArray.prototype.unique = function () {\n  return this.filter(function (value, index, self) {\n    return self.indexOf(value) === index;\n  });\n};\n\nArray.prototype.flatMap = function (f) {\n  return Array.prototype.concat.apply([], this.map(f));\n};\n\nfunction generateFakeCustomer(id) {\n  return {\n    id: id,\n    firstName: faker__WEBPACK_IMPORTED_MODULE_4__.name.firstName(),\n    lastName: faker__WEBPACK_IMPORTED_MODULE_4__.name.lastName(),\n    phoneNumber: faker__WEBPACK_IMPORTED_MODULE_4__.phone.phoneNumberFormat(1)\n  };\n}\n\nfunction generateFakeCustomers() {\n  var customers = [];\n\n  for (var i = 0; i < 1500; ++i) {\n    customers.push(generateFakeCustomer(i));\n  }\n\n  return customers;\n}\nvar Customers = /*#__PURE__*/function () {\n  function Customers() {\n    var initialCustomers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Customers);\n\n    this.customers = {};\n    this.nextId = 0;\n    this.add = this.add.bind(this);\n    this.all = this.all.bind(this);\n    this.isValid = this.isValid.bind(this);\n    initialCustomers.forEach(this.add);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Customers, [{\n    key: \"add\",\n    value: function add(customer) {\n      var customerWithId = Object.assign({}, customer, {\n        id: this.nextId++\n      });\n      this.customers[customerWithId.id] = customerWithId;\n      return customerWithId;\n    }\n  }, {\n    key: \"all\",\n    value: function all() {\n      return Object.assign({}, this.customers);\n    }\n  }, {\n    key: \"isValid\",\n    value: function isValid(customer) {\n      return Object.keys(this.errors(customer)).length === 0;\n    }\n  }, {\n    key: \"errors\",\n    value: function errors(customer) {\n      var errors = {};\n      errors = Object.assign(errors, this.requiredValidation(customer, \"firstName\", \"First name\"));\n      errors = Object.assign(errors, this.requiredValidation(customer, \"lastName\", \"Last name\"));\n      errors = Object.assign(errors, this.requiredValidation(customer, \"phoneNumber\", \"Phone number\"));\n      errors = Object.assign(errors, this.uniqueValidation(\"phoneNumber\", customer.phoneNumber, \"Phone number\"));\n      return errors;\n    }\n  }, {\n    key: \"requiredValidation\",\n    value: function requiredValidation(customer, field, fieldDescription) {\n      if (!customer[field] || customer[field].trim() === \"\") {\n        return _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, field, fieldDescription + \" is required\");\n      }\n\n      return {};\n    }\n  }, {\n    key: \"uniqueValidation\",\n    value: function uniqueValidation(field, fieldValue, fieldDescription) {\n      if (Object.entries(this.customers).map(function (_ref2) {\n        var _ref3 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref2, 2),\n            c = _ref3[1];\n\n        return c[field];\n      }).includes(fieldValue)) {\n        return _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, field, fieldDescription + \" already exists in the system\");\n      }\n\n      return {};\n    }\n  }, {\n    key: \"searchForTerm\",\n    value: function searchForTerm(term) {\n      var _this = this;\n\n      var startsWith = new RegExp(\"^\".concat(term), \"i\");\n      return Object.keys(this.customers).filter(function (customerId) {\n        var customer = _this.customers[customerId];\n        return startsWith.test(customer.firstName) || startsWith.test(customer.lastName) || startsWith.test(customer.phoneNumber);\n      });\n    }\n  }, {\n    key: \"search\",\n    value: function search(_ref5) {\n      var _this2 = this;\n\n      var searchTerms = _ref5.searchTerms,\n          limit = _ref5.limit,\n          orderBy = _ref5.orderBy,\n          orderDirection = _ref5.orderDirection,\n          after = _ref5.after;\n      limit = limit || 10;\n      orderBy = orderBy || \"firstName\";\n      searchTerms = searchTerms || [\"\"];\n      var sorted = searchTerms.flatMap(function (term) {\n        return _this2.searchForTerm(term);\n      }).unique().map(function (id) {\n        return _this2.customers[id];\n      }).sort(function (l, r) {\n        return orderDirection === \"desc\" ? r[orderBy].localeCompare(l[orderBy]) : l[orderBy].localeCompare(r[orderBy]);\n      });\n      var afterPosition = after ? sorted.findIndex(function (c) {\n        return c.id === after;\n      }) + 1 : 0;\n      return sorted.slice(afterPosition, afterPosition + limit);\n    }\n  }]);\n\n  return Customers;\n}();\n\n//# sourceURL=webpack://appointments/./server/src/customers.js?");

/***/ }),

/***/ "./server/src/server.js":
/*!******************************!*\
  !*** ./server/src/server.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.js */ \"./server/src/app.js\");\n/* harmony import */ var _customers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./customers */ \"./server/src/customers.js\");\n/* harmony import */ var _appointments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./appointments */ \"./server/src/appointments.js\");\n\n\n\nvar port = process.env.PORT || 3000;\nvar customers = (0,_customers__WEBPACK_IMPORTED_MODULE_1__.generateFakeCustomers)();\nvar timeSlots = (0,_appointments__WEBPACK_IMPORTED_MODULE_2__.buildTimeSlots)();\nvar appointments = (0,_appointments__WEBPACK_IMPORTED_MODULE_2__.generateFakeAppointments)(customers, timeSlots);\n(0,_app_js__WEBPACK_IMPORTED_MODULE_0__.buildApp)(customers, appointments, timeSlots).listen(port);\nconsole.log(\"Server listening on port \".concat(port, \".\"));\n\n//# sourceURL=webpack://appointments/./server/src/server.js?");

/***/ }),

/***/ "@babel/runtime/helpers/asyncToGenerator":
/*!**********************************************************!*\
  !*** external "@babel/runtime/helpers/asyncToGenerator" ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = require("@babel/runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "@babel/runtime/helpers/classCallCheck":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/classCallCheck" ***!
  \********************************************************/
/***/ ((module) => {

module.exports = require("@babel/runtime/helpers/classCallCheck");

/***/ }),

/***/ "@babel/runtime/helpers/createClass":
/*!*****************************************************!*\
  !*** external "@babel/runtime/helpers/createClass" ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = require("@babel/runtime/helpers/createClass");

/***/ }),

/***/ "@babel/runtime/helpers/defineProperty":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/defineProperty" ***!
  \********************************************************/
/***/ ((module) => {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),

/***/ "@babel/runtime/helpers/slicedToArray":
/*!*******************************************************!*\
  !*** external "@babel/runtime/helpers/slicedToArray" ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = require("@babel/runtime/helpers/slicedToArray");

/***/ }),

/***/ "@babel/runtime/helpers/toConsumableArray":
/*!***********************************************************!*\
  !*** external "@babel/runtime/helpers/toConsumableArray" ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = require("@babel/runtime/helpers/toConsumableArray");

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "faker":
/*!************************!*\
  !*** external "faker" ***!
  \************************/
/***/ ((module) => {

module.exports = require("faker");

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("graphql");

/***/ }),

/***/ "graphql-helix":
/*!********************************!*\
  !*** external "graphql-helix" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("graphql-helix");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("morgan");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server/src/server.js");
/******/ 	
/******/ })()
;