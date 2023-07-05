/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

var _langs_payment_client_library_cs_json__WEBPACK_IMPORTED_MODULE_7___namespace_cache;
var _langs_payment_client_library_de_json__WEBPACK_IMPORTED_MODULE_8___namespace_cache;
var _langs_payment_client_library_en_json__WEBPACK_IMPORTED_MODULE_9___namespace_cache;
var _langs_payment_client_library_fr_json__WEBPACK_IMPORTED_MODULE_10___namespace_cache;
var _langs_payment_client_library_hr_json__WEBPACK_IMPORTED_MODULE_11___namespace_cache;
var _langs_payment_client_library_it_json__WEBPACK_IMPORTED_MODULE_12___namespace_cache;
var _langs_payment_client_library_sl_json__WEBPACK_IMPORTED_MODULE_13___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LangService": () => (/* binding */ LangService)
/* harmony export */ });
/* harmony import */ var _plural_configs_cs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _plural_configs_de__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _plural_configs_en__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _plural_configs_fr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _plural_configs_hr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _plural_configs_it__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _plural_configs_sl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9);
/* harmony import */ var _langs_payment_client_library_cs_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(10);
/* harmony import */ var _langs_payment_client_library_de_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(11);
/* harmony import */ var _langs_payment_client_library_en_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(12);
/* harmony import */ var _langs_payment_client_library_fr_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(13);
/* harmony import */ var _langs_payment_client_library_hr_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(14);
/* harmony import */ var _langs_payment_client_library_it_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(15);
/* harmony import */ var _langs_payment_client_library_sl_json__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(16);
/* harmony import */ var _plural_configs_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(3);















/**
 * How to use i18n
 *
 * In your class use <code>private lang = LangService.getInstance();</code>
 * You can then use <code>this.lang.get( 'some.wti.string');</code> as usual!
 * Note: Make sure to call the variable <code>lang</code> or <code>langService</code> for it to work.
 */
// TODO This is mostly a clone of @kognitiv/angular-i18n with some adaptions to keep the languages locally.
// We should move the common part to a common library ...
class LangService {
    static getInstance() {
        return this.INSTANCE;
    }
    getCurrentLanguage() {
        return LangService.CURRENT_LANGUAGE;
    }
    changeLanguage(lang) {
        LangService.CURRENT_LANGUAGE = lang ? lang.toLowerCase() : 'en';
    }
    get(key, ...args) {
        return this.getWithFallback(key, `[${key}]`, ...args);
    }
    getWithFallback(key, fallback, ...args) {
        try {
            if (typeof LangService.STRINGS[LangService.CURRENT_LANGUAGE] === 'undefined') {
                return fallback;
            }
            let label;
            for (let i = 0; typeof label !== 'string' && i < LangService.STRINGS[LangService.CURRENT_LANGUAGE].length; i++) {
                label = this.getPropOf(LangService.STRINGS[LangService.CURRENT_LANGUAGE][i], key);
                if (typeof label === 'function') {
                    label = null; // built in function, move on
                    continue;
                }
                if (typeof label === 'object' && typeof label['@value'] !== 'undefined') {
                    label = label['@value'];
                }
                while (typeof label === 'object' && typeof label['@type'] !== 'undefined') {
                    label = this.resolveType(label, args.splice(0, 1)[0]);
                }
            }
            if (typeof label !== 'string') {
                return fallback;
            }
            return this.replaceString(label, ...args);
        }
        catch (err) {
            return fallback;
        }
    }
    getCodelist(key) {
        const codelist = this.get(key);
        const result = {};
        codelist
            .split(',')
            .map(val => {
            const parts = val.split('=');
            return {
                key: parts[0].trim(),
                value: parts[1].trim(),
            };
        })
            .forEach(item => {
            result[item.key] = item.value;
        });
        return result;
    }
    resolveType(obj, decider) {
        const type = obj['@type'];
        switch (type) {
            case 'plural':
                return this.getPlural(obj, decider);
            default:
                this.assertNever(type);
        }
        return '';
    }
    getPlural(obj, decider) {
        if (decider === 0 && obj['zero']) {
            return obj['zero'];
        }
        const dataMap = (0,_plural_configs_common__WEBPACK_IMPORTED_MODULE_14__.pluralParts)(decider);
        const pluralFct = LangService.PLURAL_CONFIGS[LangService.CURRENT_LANGUAGE];
        const pluralKey = pluralFct ? pluralFct(dataMap) : 'other';
        return obj[pluralKey];
    }
    replaceString(label, ...args) {
        args.forEach((val, idx) => {
            const regex = new RegExp('\\{' + idx + '\\}', 'ig');
            if (val === undefined || val === null) {
                val = '';
            }
            // JS does not like $& in the regex (replaces it with first match) so we escape it with $$&
            // eslint-disable-next-line no-useless-escape
            val = val.toString().replace(/\$&/g, '$$$\&');
            label = label.replace(regex, val);
        });
        return label;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getPropOf(obj, key) {
        if (!obj || !key) {
            return;
        }
        let keyParts = key ? key.split('.') : [];
        keyParts = keyParts.reverse();
        while (keyParts.length > 0) {
            const curKey = keyParts.pop();
            if (typeof curKey !== 'undefined') {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                obj = obj[curKey];
                if (!obj && (obj !== 0)) {
                    return;
                }
            }
        }
        return obj;
    }
    assertNever(_x) {
        console.error('x should be never!');
    }
}
LangService.INSTANCE = new LangService();
LangService.CURRENT_LANGUAGE = 'en';
// Plural configs can be found at http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html
LangService.PLURAL_CONFIGS = {
    cs: _plural_configs_cs__WEBPACK_IMPORTED_MODULE_0__.pluralConfigCS,
    de: _plural_configs_de__WEBPACK_IMPORTED_MODULE_1__.pluralConfigDE,
    en: _plural_configs_en__WEBPACK_IMPORTED_MODULE_2__.pluralConfigEN,
    fr: _plural_configs_fr__WEBPACK_IMPORTED_MODULE_3__.pluralConfigFR,
    hr: _plural_configs_hr__WEBPACK_IMPORTED_MODULE_4__.pluralConfigHR,
    it: _plural_configs_it__WEBPACK_IMPORTED_MODULE_5__.pluralConfigIT,
    sl: _plural_configs_sl__WEBPACK_IMPORTED_MODULE_6__.pluralConfigSL,
};
// TODO This is a bit ugly, but I don't want to do extra requests.
// Payment lib is sufficiently small and hence the performance hit is neglectible
// if we load all languages at once, but we might want to optimize this in the future.
LangService.STRINGS = {
    cs: [/*#__PURE__*/ (_langs_payment_client_library_cs_json__WEBPACK_IMPORTED_MODULE_7___namespace_cache || (_langs_payment_client_library_cs_json__WEBPACK_IMPORTED_MODULE_7___namespace_cache = __webpack_require__.t(_langs_payment_client_library_cs_json__WEBPACK_IMPORTED_MODULE_7__, 2)))],
    de: [/*#__PURE__*/ (_langs_payment_client_library_de_json__WEBPACK_IMPORTED_MODULE_8___namespace_cache || (_langs_payment_client_library_de_json__WEBPACK_IMPORTED_MODULE_8___namespace_cache = __webpack_require__.t(_langs_payment_client_library_de_json__WEBPACK_IMPORTED_MODULE_8__, 2)))],
    en: [/*#__PURE__*/ (_langs_payment_client_library_en_json__WEBPACK_IMPORTED_MODULE_9___namespace_cache || (_langs_payment_client_library_en_json__WEBPACK_IMPORTED_MODULE_9___namespace_cache = __webpack_require__.t(_langs_payment_client_library_en_json__WEBPACK_IMPORTED_MODULE_9__, 2)))],
    fr: [/*#__PURE__*/ (_langs_payment_client_library_fr_json__WEBPACK_IMPORTED_MODULE_10___namespace_cache || (_langs_payment_client_library_fr_json__WEBPACK_IMPORTED_MODULE_10___namespace_cache = __webpack_require__.t(_langs_payment_client_library_fr_json__WEBPACK_IMPORTED_MODULE_10__, 2)))],
    hr: [/*#__PURE__*/ (_langs_payment_client_library_hr_json__WEBPACK_IMPORTED_MODULE_11___namespace_cache || (_langs_payment_client_library_hr_json__WEBPACK_IMPORTED_MODULE_11___namespace_cache = __webpack_require__.t(_langs_payment_client_library_hr_json__WEBPACK_IMPORTED_MODULE_11__, 2)))],
    it: [/*#__PURE__*/ (_langs_payment_client_library_it_json__WEBPACK_IMPORTED_MODULE_12___namespace_cache || (_langs_payment_client_library_it_json__WEBPACK_IMPORTED_MODULE_12___namespace_cache = __webpack_require__.t(_langs_payment_client_library_it_json__WEBPACK_IMPORTED_MODULE_12__, 2)))],
    sl: [/*#__PURE__*/ (_langs_payment_client_library_sl_json__WEBPACK_IMPORTED_MODULE_13___namespace_cache || (_langs_payment_client_library_sl_json__WEBPACK_IMPORTED_MODULE_13___namespace_cache = __webpack_require__.t(_langs_payment_client_library_sl_json__WEBPACK_IMPORTED_MODULE_13__, 2)))],
};


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pluralConfigCS": () => (/* binding */ pluralConfigCS)
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

function pluralConfigCS(params) {
    if (params.v !== 0) {
        return 'many';
    }
    if (params.i === 1) {
        return 'one';
    }
    if ((0,_common__WEBPACK_IMPORTED_MODULE_0__.between)(params.i, 2, 4)) {
        return 'few';
    }
    return 'other';
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "between": () => (/* binding */ between),
/* harmony export */   "pluralParts": () => (/* binding */ pluralParts)
/* harmony export */ });
function between(value, min, max) {
    return value >= min && value <= max;
}
// Using the official definition of unicode
// http://unicode.org/reports/tr35/tr35-numbers.html#Operands
function pluralParts(num) {
    num = num.toString();
    const parts = num.split('.');
    let absoluteValue;
    let fractionalDigits;
    let fractionalDigitsTrimmed;
    let fractionalDigitsLength;
    let fractionalDigitsTrimmedLength;
    if (num[0] === '+' || num[0] === '-') {
        absoluteValue = num.substr(1);
    }
    else {
        absoluteValue = num;
    }
    const integerDigits = parts[0];
    if (parts.length > 1) {
        const decimals = parts[1];
        fractionalDigitsLength = decimals.length;
        fractionalDigits = +decimals;
        const trimmedDecimals = decimals.replace(/0*$/, '');
        fractionalDigitsTrimmedLength = trimmedDecimals.length;
        fractionalDigitsTrimmed = +trimmedDecimals;
    }
    return {
        num,
        n: absoluteValue,
        i: +integerDigits,
        v: fractionalDigitsLength || 0,
        w: fractionalDigitsTrimmedLength || 0,
        f: fractionalDigits || 0,
        t: fractionalDigitsTrimmed || 0,
    };
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pluralConfigDE": () => (/* binding */ pluralConfigDE)
/* harmony export */ });
function pluralConfigDE(params) {
    if (params.i === 1 && params.v === 0) {
        return 'one';
    }
    return 'other';
}


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pluralConfigEN": () => (/* binding */ pluralConfigEN)
/* harmony export */ });
function pluralConfigEN(params) {
    if (params.i === 1 && params.v === 0) {
        return 'one';
    }
    return 'other';
}


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pluralConfigFR": () => (/* binding */ pluralConfigFR)
/* harmony export */ });
function pluralConfigFR(params) {
    if (params.i === 0 || params.i === 1) {
        return 'one';
    }
    return 'other';
}


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pluralConfigHR": () => (/* binding */ pluralConfigHR)
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

function pluralConfigHR(params) {
    const iMod10 = params.i % 10;
    const iMod100 = params.i % 100;
    const fMod10 = params.f % 10;
    const fMod100 = params.f % 100;
    if ((params.v === 0 && iMod10 === 1 && iMod100 !== 11) || (fMod10 === 1 && fMod100 !== 11)) {
        return 'one';
    }
    if ((params.v === 0 && (0,_common__WEBPACK_IMPORTED_MODULE_0__.between)(iMod10, 2, 4) && !(0,_common__WEBPACK_IMPORTED_MODULE_0__.between)(iMod100, 12, 14)) || ((0,_common__WEBPACK_IMPORTED_MODULE_0__.between)(fMod10, 2, 4) && !(0,_common__WEBPACK_IMPORTED_MODULE_0__.between)(fMod100, 12, 14))) {
        return 'few';
    }
    return 'other';
}


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pluralConfigIT": () => (/* binding */ pluralConfigIT)
/* harmony export */ });
function pluralConfigIT(params) {
    if (params.i === 1 && params.v === 0) {
        return 'one';
    }
    return 'other';
}


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pluralConfigSL": () => (/* binding */ pluralConfigSL)
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

function pluralConfigSL(params) {
    if (params.v === 0 && params.i % 100 === 1) {
        return 'one';
    }
    if (params.v === 0 && params.i % 100 === 2) {
        return 'two';
    }
    if ((params.v === 0 && (0,_common__WEBPACK_IMPORTED_MODULE_0__.between)(params.i % 100, 3, 4)) || params.v !== 0) {
        return 'few';
    }
    return 'other';
}


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = JSON.parse('{"cc":{"reservation":{"booker":{"cardholder":"Držitel karty"}}},"accounts":{"cc":{"payment":{"ccNumber":"Číslo kreditní karty","cvv":"CVV"}}},"cup":{"coupon":{"createCoupon":{"lbl":{"expiryDate":"Expiry date"}}}},"common":{"month":{"abbreviation":"MM"},"year":{"abbreviation":"YY"},"cc":{"number":{"notValid":"Invalid credit card number"},"cvv":{"notValid":"Incorrect credit card CVV code."}}},"payment":{"client":{"pci":{"proxy":{"modal":{"title":"Payment"},"sub":{"title":"Secure payments by Datatrans"},"holder":{"notValid":"Invalid card holder"}}}},"button":{"validate":{"cc":"Pay"}},"invalid":{"expiry":"Invalid expiry date"}}}');

/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = JSON.parse('{"cc":{"reservation":{"booker":{"cardholder":"Karteninhaber"}}},"accounts":{"cc":{"payment":{"ccNumber":"Kartennummer","cvv":"CVV"}}},"cup":{"coupon":{"createCoupon":{"lbl":{"expiryDate":"Verfallsdatum"}}}},"common":{"month":{"abbreviation":"MM"},"year":{"abbreviation":"JJ"},"cc":{"number":{"notValid":"Ungültige Kreditkartennummer"},"cvv":{"notValid":"Falscher Kreditkarten-CVV-Code."}}},"payment":{"client":{"pci":{"proxy":{"modal":{"title":"Zahlung"},"sub":{"title":"Sicherer Zahlungsverkehr durch Datatrans"},"holder":{"notValid":"Invalid card holder"}}}},"button":{"validate":{"cc":"Bezahlen"}},"invalid":{"expiry":"Ungültiges Ablaufdatum"}}}');

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = JSON.parse('{"cc":{"reservation":{"booker":{"cardholder":"Card Holder"}}},"accounts":{"cc":{"payment":{"ccNumber":"Card Number","cvv":"CVV"}}},"cup":{"coupon":{"createCoupon":{"lbl":{"expiryDate":"Expiry date"}}}},"common":{"month":{"abbreviation":"MM"},"year":{"abbreviation":"YY"},"cc":{"number":{"notValid":"Invalid credit card number"},"cvv":{"notValid":"Incorrect credit card CVV code."}}},"payment":{"client":{"pci":{"proxy":{"modal":{"title":"Payment"},"sub":{"title":"Secure payments by Datatrans"},"holder":{"notValid":"Invalid card holder"}}}},"button":{"validate":{"cc":"Pay"}},"invalid":{"expiry":"Invalid expiry date"}}}');

/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = JSON.parse('{"cc":{"reservation":{"booker":{"cardholder":"Propriétaire de la carte"}}},"accounts":{"cc":{"payment":{"ccNumber":"Numéro de carte de crédit","cvv":"CVV"}}},"cup":{"coupon":{"createCoupon":{"lbl":{"expiryDate":"Date d\'expiration"}}}},"common":{"month":{"abbreviation":"MM"},"year":{"abbreviation":"AA"},"cc":{"number":{"notValid":"Numéro de carte de crédit invalide"},"cvv":{"notValid":"Code CVV de la carte de crédit erroné."}}},"payment":{"client":{"pci":{"proxy":{"modal":{"title":"Paiement"},"sub":{"title":"Paiements sécurisés par Datatrans"},"holder":{"notValid":"Invalid card holder"}}}},"button":{"validate":{"cc":"Payer"}},"invalid":{"expiry":"Date d\'expiration non valide"}}}');

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = JSON.parse('{"cc":{"reservation":{"booker":{"cardholder":"Ime vlasnika kreditne kartice"}}},"accounts":{"cc":{"payment":{"ccNumber":"Card Number","cvv":"CVV"}}},"cup":{"coupon":{"createCoupon":{"lbl":{"expiryDate":"Expiry date"}}}},"common":{"month":{"abbreviation":"MM"},"year":{"abbreviation":"YY"},"cc":{"number":{"notValid":"Invalid credit card number"},"cvv":{"notValid":"Incorrect credit card CVV code."}}},"payment":{"client":{"pci":{"proxy":{"modal":{"title":"Payment"},"sub":{"title":"Secure payments by Datatrans"},"holder":{"notValid":"Invalid card holder"}}}},"button":{"validate":{"cc":"Pay"}},"invalid":{"expiry":"Invalid expiry date"}}}');

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = JSON.parse('{"cc":{"reservation":{"booker":{"cardholder":"Titolare della carta"}}},"accounts":{"cc":{"payment":{"ccNumber":"Numero di carta","cvv":"CVV"}}},"cup":{"coupon":{"createCoupon":{"lbl":{"expiryDate":"Data di scadenza"}}}},"common":{"month":{"abbreviation":"MM"},"year":{"abbreviation":"AA"},"cc":{"number":{"notValid":"Numero di carta di credito non valido"},"cvv":{"notValid":"Codice CVV della carta di credito errato."}}},"payment":{"client":{"pci":{"proxy":{"modal":{"title":"Pagamento"},"sub":{"title":"Pagamenti sicuri con Datatrans"},"holder":{"notValid":"Invalid card holder"}}}},"button":{"validate":{"cc":"Paga"}},"invalid":{"expiry":"Data di scadenza non valida"}}}');

/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = JSON.parse('{"cc":{"reservation":{"booker":{"cardholder":"Imetnik kartice"}}},"accounts":{"cc":{"payment":{"ccNumber":"Številka kreditne kartice","cvv":"CVV"}}},"cup":{"coupon":{"createCoupon":{"lbl":{"expiryDate":"Expiry date"}}}},"common":{"month":{"abbreviation":"MM"},"year":{"abbreviation":"YY"},"cc":{"number":{"notValid":"Invalid credit card number"},"cvv":{"notValid":"Incorrect credit card CVV code."}}},"payment":{"client":{"pci":{"proxy":{"modal":{"title":"Payment"},"sub":{"title":"Secure payments by Datatrans"},"holder":{"notValid":"Invalid card holder"}}}},"button":{"validate":{"cc":"Pay"}},"invalid":{"expiry":"Invalid expiry date"}}}');

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Helpers": () => (/* binding */ Helpers)
/* harmony export */ });
var _a;
/**
 * Class with helper methods.
 */
class Helpers {
}
_a = Helpers;
/**
 * Converts all properties (also in inner objects and arrays) from snake_property_name to camelPropertyName.
 * @param providerSettings setting object, which is typed as any, as it may come with different format. Checking whether
 *  settings object is correct and contains all values required by concrete provider is done later.
 * @returns ProviderSettings object.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Helpers.snakePropertiesToCamel = (providerSettings) => {
    let convertedSettings = providerSettings;
    if (!convertedSettings) {
        return convertedSettings;
    }
    else if (typeof (providerSettings) === 'object') {
        if (providerSettings instanceof Array) {
            convertedSettings = providerSettings.map(_a.snakePropertiesToCamel);
        }
        else {
            convertedSettings = {};
            for (const propertyName in providerSettings) {
                if (Object.prototype.hasOwnProperty.call(providerSettings, propertyName)) {
                    const newPropertyName = propertyName.replace(/(_\w)/g, k => k[1].toUpperCase());
                    convertedSettings[newPropertyName] = _a.snakePropertiesToCamel(providerSettings[propertyName]);
                }
            }
        }
    }
    return convertedSettings;
};


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Logger": () => (/* binding */ Logger)
/* harmony export */ });
/**
 * Class used for logging information to browser console.
 */
class Logger {
    /**
     * Logs information as an error.
     * @param error information to be displayed.
     */
    static error(error) {
        console.error(`*** Kognitiv Payment ***`);
        if (error instanceof Error) {
            console.error(`Message: ${error.message}`);
            console.error(`Stack: ${error.stack}`);
        }
        else {
            console.error(`Message: ${error}`);
        }
        console.error(`*** Kognitiv Payment ***`);
    }
    /**
     * Logs information as an info (if isDebugFlag property is set to true).
     * @param message
     */
    static info(...message) {
        if (!Logger.isDebugMode) {
            return;
        }
        console.log.call(console, message);
    }
}
/**
 * Flag determining whether information will be written in console or not (errors are logged in either case).
 */
Logger.isDebugMode = false;


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProviderFactory": () => (/* binding */ ProviderFactory)
/* harmony export */ });
/* harmony import */ var _datatrans_lightbox_datatrans_lightbox_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _pciproxy_pci_proxy_secure_fields_js_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25);
/* harmony import */ var _shift4_shift4_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26);



/**
 * Factory used for creating concrete Kognitiv Provider.
 */
class ProviderFactory {
    /**
     * Creates instance of concrete Kognitiv Provider, based on supplied provider code.
     * @param providerCode Internal Kognitiv Provider code.
     * @returns {KognitivProvider} Concrete implementation of KognitivProvider or undefined.
     */
    static createProvider(providerSettings) {
        for (const creator of ProviderFactory.creators) {
            if (creator.providerCodes.some(code => ProviderFactory.isEqual(code, providerSettings.provider))) {
                return creator.create();
            }
        }
        return undefined;
    }
    static isEqual(name1, name2) {
        if (!name1 || !name2) {
            return false;
        }
        return name1.toLowerCase() === name2.toLowerCase();
    }
}
ProviderFactory.creators = [
    {
        providerCodes: ['datatransPay', 'datatrans'],
        create: () => new _datatrans_lightbox_datatrans_lightbox_provider__WEBPACK_IMPORTED_MODULE_0__.DatatransLightBoxProvider(),
    },
    {
        providerCodes: ['pciproxy'],
        create: () => new _pciproxy_pci_proxy_secure_fields_js_provider__WEBPACK_IMPORTED_MODULE_1__.PciProxySecureFieldsJSProvider(),
    },
    {
        providerCodes: ['shift4'],
        create: () => new _shift4_shift4_provider__WEBPACK_IMPORTED_MODULE_2__.Shift4Provider(),
    },
];


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatatransLightBoxProvider": () => (/* binding */ DatatransLightBoxProvider)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _infrastructure_provider_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);


/**
 * Datatrans Kognitiv provider.
 * @extends KognitivProvider
 */
class DatatransLightBoxProvider extends _infrastructure_provider_class__WEBPACK_IMPORTED_MODULE_1__.KognitivProvider {
    /**
     * Instantiates Datatrans Kognitiv Provider class.
     */
    constructor() {
        super();
        this.datatransScriptUrl = '';
    }
    /**
     * Prepares and initializes Datatrans Kognitiv Provider.
     * During initialization, custom payment provider javascript files are loaded.
     * @param providerSettings configuration data for provider.
     * @param settings configuration data for Kognitiv Payment Library.
     * @override
     */
    init(providerSettings, settings) {
        this.datatransScriptUrl = providerSettings.isTestMode
            ? _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.datatransDevLibUrl
            : _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.datatransProdLibUrl;
        this.fillScriptsToBeLoaded();
        this.providerSettings = providerSettings;
        this.settings = settings;
        this.setDefaults();
        this.notify('init', 'start');
        // check required settings
        const settingErrors = this.checkSettings(this.providerSettings);
        if (settingErrors.length > 0) {
            this.notify('init', 'error', settingErrors);
            this.reset();
            return;
        }
        // load datatrans scripts
        this.loadScripts()
            .then(_ => this.clientScriptsLoadSuccess(), (errorMessage) => this.clientScriptsLoadFail(errorMessage));
    }
    /**
     * Closes the modal popup. Modal dialog is completely managed by Datatrans (creating DOM and
     * injecting into document), so calling its method 'close' to remove it. As this method is
     * not documented, the check whether exists or not is necessary.
     * @override
     */
    closeModal() {
        var _a, _b;
        if (typeof ((_a = window.Datatrans) === null || _a === void 0 ? void 0 : _a.close) === 'function') {
            (_b = window.Datatrans) === null || _b === void 0 ? void 0 : _b.close();
        }
    }
    /**
     * Removes and resets settings, callback and loaded scripts.
     * @override
     */
    reset(orig) {
        if (!this.settings && !this.providerSettings) {
            // if we were already reset, we don't do it again. Could cause issues.
            return;
        }
        this.settings = undefined;
        this.providerSettings = undefined;
        // if the user closes the popup, Datatrans takes care about removing it.
        if (!(orig === null || orig === void 0 ? void 0 : orig.trigger) || (orig.trigger.operation !== 'popup' && orig.trigger.status !== 'closed')) {
            this.cleanupDom();
        }
        this.unloadScripts();
        this.scripts = [];
    }
    // ***************
    // Protected methods
    // ***************
    /**
     * Sets default value for configuration entries which were not specified.
     */
    setDefaults() {
        super.setDefaults();
    }
    /**
     * Displays error in console and notifies parent by callback method.
     * @param operation type of operation (init, payment)
     * @param status status of operation (start, success, error)
     * @param data data related to operation.
     */
    notify(operation, status, data) {
        super.notify(operation, status, data);
    }
    // ***************
    // Private methods
    // ***************
    /**
     * Removes DOM elements which were create by Datatrans
     */
    cleanupDom() {
        const $element = document.querySelector('div#paymentFrameWrapper');
        if ($element) {
            $element.parentElement.removeChild($element);
        }
    }
    /**
     * Initializes Datatrans provider, which causes rendering its UI in html.
     */
    initializeDatatrans() {
        if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.isDev) {
            // the entry in local storage is used only in testing application, for generation
            // curl, which can be used for getting results of payment
            localStorage.setItem('datatransTransactionId', this.providerSettings.transaction.id);
        }
        const datatransSettings = {
            transactionId: this.providerSettings.transaction.id,
            'loaded': () => { this.notify('init', 'success'); },
            'closed': () => { this.notify('popup', 'closed'); this.reset(); },
            'error': () => { this.notify('payment', 'error', ['TODO - error during payment']); this.reset(); },
        };
        window.Datatrans.startPayment(datatransSettings);
    }
    /**
     * Checks whether all required setting values were supplied
     * @param providerSettings setting values for provider.
     * @returns string array, filled by error messages (or empty if no error was found).
     */
    checkSettings(providerSettings) {
        var _a;
        const errors = [];
        if (!providerSettings) {
            errors.push('No settings for Datatrans were found');
        }
        else {
            const transactionId = (_a = this.providerSettings.transaction) === null || _a === void 0 ? void 0 : _a.id;
            if (!transactionId) {
                errors.push('Transaction id must be specified for Datatrans');
            }
        }
        return errors;
    }
    /**
     * Initializes Datatrans, after scripts were successfully loaded.
     */
    clientScriptsLoadSuccess() {
        this.initializeDatatrans();
    }
    /**
     * Displays error, which occurred during script loading.
     * @param err error message.
     */
    clientScriptsLoadFail(err) {
        this.notify('init', 'error', [err]);
    }
    /**
     * Prepares array of scripts, which needs to be loaded.
     */
    fillScriptsToBeLoaded() {
        this.scripts = [];
        if (!this.isDatatransScriptLoaded()) {
            this.scripts.push({
                src: this.datatransScriptUrl,
            });
        }
    }
    /**
     * Tests whether Datatrans script was already loaded.
     * @returns true, if Datatrans script was already loaded, otherwise false.
     */
    isDatatransScriptLoaded() {
        const scripts = document.getElementsByTagName('script');
        for (const element of scripts) {
            if (element.src === this.datatransScriptUrl) {
                return true;
            }
        }
        return false;
    }
}


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
/* harmony import */ var _dev_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _prod_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);


const environment =  false
    ? 0
    : _dev_environment__WEBPACK_IMPORTED_MODULE_0__.devEnvironment;


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "devEnvironment": () => (/* binding */ devEnvironment)
/* harmony export */ });
const devEnvironment = {
    // prod or dev version ob url is determined during runtime
    datatransProdLibUrl: 'https://pay.datatrans.com/upp/payment/js/datatrans-2.0.0.js',
    datatransDevLibUrl: 'https://pay.sandbox.datatrans.com/upp/payment/js/datatrans-2.0.0.js',
    pciProxySfProdLibUrl: 'https://pay.sandbox.datatrans.com/upp/payment/js/secure-fields-2.0.0.min.js',
    pciProxySfDevLibUrl: 'https://pay.sandbox.datatrans.com/upp/payment/js/secure-fields-2.0.0.min.js',
    shift4JQueryUrl: 'https://code.jquery.com/jquery-3.6.0.min.js',
    shift4LibUrl: 'https://i4m.i4go.com/js/jquery.i4goTrueToken.js',
    paymentUrl: 'https://payment-dev.kognitiv.com',
    isDev: true,
};


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prodEnvironment": () => (/* binding */ prodEnvironment)
/* harmony export */ });
const prodEnvironment = {
    // prod or dev version ob url is determined during runtime
    datatransProdLibUrl: 'https://pay.datatrans.com/upp/payment/js/datatrans-2.0.0.js',
    datatransDevLibUrl: 'https://pay.sandbox.datatrans.com/upp/payment/js/datatrans-2.0.0.js',
    pciProxySfProdLibUrl: 'https://pay.datatrans.com/upp/payment/js/secure-fields-2.0.0.min.js',
    pciProxySfDevLibUrl: 'https://pay.sandbox.datatrans.com/upp/payment/js/secure-fields-2.0.0.min.js',
    shift4JQueryUrl: 'https://static.seekda.com/assets/js/jquery-3.6.0.min.js',
    shift4LibUrl: 'https://i4m.i4go.com/js/jquery.i4goTrueToken.js',
    paymentUrl: 'https://payment.kognitiv.com',
    isDev: false,
};


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KognitivProvider": () => (/* binding */ KognitivProvider)
/* harmony export */ });
/* harmony import */ var _logger_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/**
 * Generic Kognitiv Provider. The abstract class is helping to implement various payment providers,
 * by loading its scripts, styles, injecting html elements, calling external API, sending notifications...
 */
class KognitivProvider {
    constructor() {
        /**
         * Scripts, needed by provider, to be loaded by Kognitiv Provider.
         */
        this.scripts = [];
        /**
         * Scripts which were loaded by Kognitiv Provider.
         */
        this.loadedScripts = [];
    }
    /**
     * Displays error in console and notifies parent by callback method.
     * @param operation type of operation (init, payment)
     * @param status status of operation (start, success, error)
     * @param data data related to operation.
     * @param rawData data returned from payment provider.
     */
    notify(operation, status, data, rawData) {
        var _a;
        if (status === 'error' && ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.debug)) {
            _logger_class__WEBPACK_IMPORTED_MODULE_0__.Logger.error(`Operation: ${operation}; status: ${status}; data: ${data === null || data === void 0 ? void 0 : data.toString()}; raw data: ${rawData === null || rawData === void 0 ? void 0 : rawData.toString()}`);
        }
        if (typeof this.settings.callbackMethod === 'function') {
            this.settings.callbackMethod({ operation, status, data, rawData });
        }
    }
    /**
     * Loads scripts needed for Kognitiv Provider.
     * @returns Promise containing string with result of scripts loading.
     */
    loadScripts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.scripts.reduce((promise, script) => promise.then(() => this.loadScript(script)), Promise.resolve(''));
        });
    }
    /**
     * Removes client script, needed for provider (in case they were loaded by this class).
     */
    unloadScripts() {
        const scripts = document.getElementsByTagName('script');
        this.loadedScripts.forEach(s => {
            for (const script of scripts) {
                if (script.src === s) {
                    script.parentNode.removeChild(script);
                }
            }
        });
        this.loadedScripts = [];
    }
    /**
     * Sets default values to setting object.
     */
    setDefaults() {
        var _a, _b;
        this.settings = (_a = this.settings) !== null && _a !== void 0 ? _a : {
            debug: false,
            extra: {},
            styling: {},
        };
        this.settings.debug = (_b = this.settings.debug) !== null && _b !== void 0 ? _b : false;
        this.settings.extra = this.settings.extra || {};
        this.settings.styling = this.settings.styling || {};
    }
    /**
     * Loads script.
     * @param scriptDefinition Script definition (url, other attributes).
     * @returns Promise containing string result of script loading.
     */
    loadScript(scriptDefinition) {
        return new Promise((resolve, reject) => {
            var _a;
            const scriptElement = document.createElement('script');
            scriptElement.src = scriptDefinition.src;
            if (((_a = scriptDefinition.attributes) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                scriptDefinition.attributes.forEach(attribute => scriptElement.setAttribute(attribute.key, attribute.value));
            }
            scriptElement.setAttribute('type', 'text/javascript');
            scriptElement.async = false;
            scriptElement.onload = () => { this.loadedScripts.push(scriptDefinition.src); resolve(''); };
            scriptElement.onerror = () => { reject(`Script ${scriptDefinition.src} failed to load`); };
            document.body.appendChild(scriptElement);
        });
    }
}


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PciProxySecureFieldsJSProvider": () => (/* binding */ PciProxySecureFieldsJSProvider)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _lang_service_lang_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _infrastructure_provider_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);



const getInputFontSize = () => {
    const currentWidth = window.outerWidth;
    if (currentWidth < 300) {
        return '12px';
    }
    return currentWidth < 400
        ? '14px'
        : '17px';
};
/**
 * Pci Proxy Secure Fields JS Kognitiv provider.
 * @extends KognitivProvider
 */
class PciProxySecureFieldsJSProvider extends _infrastructure_provider_class__WEBPACK_IMPORTED_MODULE_2__.KognitivProvider {
    /**
     * Instantiates Pci Proxy secure fields Kognitiv Provider class.
     */
    constructor() {
        super();
        this.pciProxySfScriptUrl = '';
        this.lang = _lang_service_lang_service__WEBPACK_IMPORTED_MODULE_1__.LangService.getInstance();
    }
    /**
     * Prepares and initializes Pci Proxy Secure Fields Kognitiv Provider.
     * During initialization, custom payment provider javascript files are loaded.
     * @param providerSettings configuration data for provider.
     * @param settings configuration data for Kognitiv Payment Library.
     * @override
     */
    init(providerSettings, settings) {
        this.pciProxySfScriptUrl = providerSettings.isTestMode
            ? _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.pciProxySfDevLibUrl
            : _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.pciProxySfProdLibUrl;
        this.fillScriptsToBeLoaded();
        this.providerSettings = providerSettings;
        this.settings = settings;
        this.setDefaults();
        this.notify('init', 'start');
        // create elements needed by Pci Proxy Secure Field
        this.createHtmlElements();
        // must be called after creating html elements, as it works with loading bar
        this.displayLoadingBar(true);
        // check required settings
        const settingErrors = this.checkSettings(this.providerSettings);
        if (settingErrors.length > 0) {
            this.displayLoadingBar(false);
            this.notify('init', 'error', settingErrors);
            this.reset();
            return;
        }
        // load pciproxy secure scripts
        this.loadScripts()
            .then(() => this.clientScriptsLoadSuccess(), (errorMessage) => this.clientScriptsLoadFail(errorMessage));
    }
    /**
     * Closes modal dialog by removing previously created HTML elements.
     * @override
     */
    closeModal() {
        this.deleteHtmlElements();
    }
    /**
     * Removes and resets settings, callback, created Html elements and loaded scripts.
     * @override
     */
    reset() {
        this.settings = undefined;
        this.providerSettings = undefined;
        this.unloadScripts();
        this.deleteHtmlElements();
        this.scripts = [];
    }
    // ***************
    // Protected  methods
    // ***************
    /**
     * Display error in console and notifies parent by callback method.
     * @param operation type of operation (init, payment)
     * @param status status of operation (start, success, error)
     * @param data string array with additional information.
     */
    notify(operation, status, data) {
        let rawData;
        if (operation === 'payment' && status === 'success' && data) {
            rawData = data;
            data = this.translate(data);
        }
        super.notify(operation, status, data, rawData);
    }
    /**
     * Set default value for configuration entries which were not specified.
    */
    setDefaults() {
        super.setDefaults();
        this.settings.language = this.settings.language || 'en';
    }
    // ***************
    // Private methods
    // ***************
    /**
    * Checks whether all required setting values were supplied
    * @param providerSettings setting values for provider.
    * @returns string array, filled by error messages (or empty if no error was found).
    */
    checkSettings(providerSettings) {
        const errors = [];
        if (!providerSettings) {
            errors.push('No settings for Pci Proxy Secure Fields were found');
        }
        return errors;
    }
    /**
     * Displays error, which occurred during script loading.
     * @param err error message.
     */
    clientScriptsLoadFail(err) {
        this.displayLoadingBar(false);
        this.notify('init', 'error', [err]);
    }
    /**
     * Initializes pciproxy secure fields provider, after scripts were successfully loaded.
     */
    clientScriptsLoadSuccess() {
        this.initializePciProxySf();
    }
    /**
     * Creates and injects html elements (especially div, where Pci Proxy secure fields will render its UI), needed for
     * Pci Proxy secure fields provider, into html document.
     */
    createHtmlElements() {
        var _a, _b;
        // get default style values
        const backDropColor = (_a = this.settings.styling.backdropColor) !== null && _a !== void 0 ? _a : '#303038b3';
        const loadingIndicatorColor = (_b = this.settings.styling.loadingIndicatorColor) !== null && _b !== void 0 ? _b : 'silver';
        const borderRadius = '10px';
        const validationStyling = 'color: #f9776d; font-size: 12px; padding-top: 5px;';
        const strings = this.getStrings();
        // Kognitiv Provider will need to be rendered in modal
        if (!this.isHtmlElementsCreated()) {
            const style = document.createElement('style');
            // main overlay
            style.innerHTML = `.kognitiv-payment-main-overlay { position: fixed; top: 0; bottom: 0; left: 0; right: 0; background: ${backDropColor}; z-index: 1000; }`;
            // popup
            style.innerHTML += `.kognitiv-payment-main-popup { margin: 70px auto; background: white; border-radius: ${borderRadius}; font-family: sans-serif; padding-top: 10px;`;
            style.innerHTML += `width: 500px; max-width: 90%; min-height: 420px; position: relative; }`;
            // header panel
            style.innerHTML += `.kognitiv-payment-header-panel { border-radius: ${borderRadius}; padding-top: 4px; margin-top: 0; margin-left: 10px; margin-right: 10px;`;
            style.innerHTML += `margin-bottom: 10px; height:64px; background-color: #f0f0f0; color: black; }`;
            // header
            style.innerHTML += `.kognitiv-payment-header-panel h2 { margin-top: 15px; margin-left: 24px; font-size: 20px; color: black; `;
            style.innerHTML += `font-family: sans-serif; letter-spacing: 0.1px; font-weight: 500; }`;
            // header close button
            style.innerHTML += `.kognitiv-payment-header-panel .kognitiv-payment-header-close-button { float: right; margin-top: 10px; margin-right: 20px; `;
            style.innerHTML += `font-size: 30px; cursor: pointer; color: darkgrey; text-decoration: none; line-height: normal; }`;
            style.innerHTML += `.kognitiv-payment-header-panel .kognitiv-payment-header-close-button:hover { font-weight: bold; } `;
            // loading indicator
            style.innerHTML += `.kognitiv-payment-loading-indicator { width: 48px; height: 48px; border-radius: 50%; position: relative; `;
            style.innerHTML += `animation: rotate 1s linear infinite; margin: 30px auto;z-index: 1; }`;
            style.innerHTML += `.kognitiv-payment-loading-indicator::before { content: ""; box-sizing: border-box; position: absolute; inset: 0px; `;
            style.innerHTML += `border-radius: 50%; border: 5px solid ${loadingIndicatorColor}; animation: prixClipFix 2s linear infinite; }`;
            style.innerHTML += `@keyframes rotate { 100% { transform: rotate(360deg); }}`;
            style.innerHTML += `@keyframes prixClipFix { `;
            style.innerHTML += `0% { clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0) } `;
            style.innerHTML += `25% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0) } `;
            style.innerHTML += `50% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%) } `;
            style.innerHTML += `75% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%) } `;
            style.innerHTML += `100% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0) }} `;
            // subtitle
            style.innerHTML += `.kognitiv-payment-subtitle { font-size: 13px; line-height: 15px; font-weight: 400; text-align: center; margin-bottom: 20px; color: #595959; }`;
            style.innerHTML += `.kognitiv-payment-subtitle-icon { display: inline-block; height: 15px; margin-bottom: -2px; margin-right: 2px; }`;
            // input labels
            style.innerHTML += `.kognitiv-payment-input-label { display: block; margin-bottom: 12px; font-size: 15px; line-height: 12px; font-weight: 500; }`;
            // panel for pciproxy frame 
            style.innerHTML += `.kognitiv-payment-pciproxy-sf-form { z-index: 1000; position: relative; display: none; padding: 12px 20px 32px 20px; overflow: auto; border: none;}`;
            // placeholder panels
            style.innerHTML += `.kognitiv-payment-placeholder-panel { height: 62px;}`;
            // panel for inputs (number, expiry and cvv)
            style.innerHTML += '.kognitiv-payment-expiry-label { display: block; }';
            style.innerHTML += '.kognitiv-payment-expiry-panel { width: 50%; display: inline-block; vertical-align: top; position: relative; }';
            style.innerHTML += `.kognitiv-payment-expiry-validation-panel { ${validationStyling} }`;
            style.innerHTML += `.kognitiv-payment-cc-validation-panel { ${validationStyling} }`;
            style.innerHTML += '.kognitiv-payment-no-display {display: none; }';
            // input panels
            style.innerHTML += '.kognitiv-payment-input-panel { margin-bottom: 24px; position: relative; }';
            // holder
            style.innerHTML += '.kognitiv-payment-card-holder-input { height: 62px; border: 1px solid #D9D9D9; padding: 12px; padding-left: 16px; border-radius: 10px; background-color: white;'
                + ' box-sizing: border-box; width: 100%; outline: none; font-size: 17px; font-family: sans-serif; font-weight: 400; line-height: 20px;letter-spacing: 0.05em; }';
            // expiry inputs (months, year)
            style.innerHTML += `.kognitiv-payment-card-expiry-input { height: 62px; border: 1px solid #D9D9D9; padding: 12px; padding-left: 16px; border-radius: ${borderRadius};` +
                `background-color: white; box-sizing: border-box; width: 95%; outline: none; font-size: 17px; font-family: sans-serif; font-height: 400; line-height: 20px; letter-spacing: 0.05em; }`;
            style.innerHTML += '@media (max-width: 400px) { .kognitiv-payment-card-expiry-input { font-size: 14px; } .kognitiv-payment-marker-image { display: none !important; } }';
            style.innerHTML += '@media (max-width: 300px) { .kognitiv-payment-card-expiry-input { font-size: 12px; } }';
            style.innerHTML += '@media (max-width: 320px) { .kognitiv-payment-image { height: 15px !important; border-radius: 5px !important; top: 30px !important; right: 10px !important; } }';
            // ccv placeholder
            style.innerHTML += '.kognitiv-payment-card-ccv-placeholder { position: relative; }';
            // submit button
            style.innerHTML += '.kognitiv-payment-submit-button-panel { width: 100%; margin-top: 32px; text-align: center; }';
            style.innerHTML += '.kognitiv-payment-submit-button { width: 100%; height: 64px; cursor: pointer; ' +
                'background: linear-gradient(90.08deg, #389E0D 0.06%, #8DC01E 99.93%); box-shadow: 0px 3px 0px #298104;' +
                'border: none; border-radius: 16px; color:white; font-weight: 500; padding: 0.375rem 0.75rem; ' +
                `font-size: 22px; line-height: 26px; font-family: sans-serif; }`;
            style.innerHTML += '.kognitiv-payment-submit-button:active { background: linear-gradient(; 90.08deg, #4CBA1D 0.06%, #A7D547 99.93%); box-shadow: 0px 2px 0px #298104; }';
            // card icons
            style.innerHTML += `.kognitiv-payment-image { position: absolute; top: 34px; height: 40px; right: 16px; border: 1px solid #D9D9D9; border-radius: ${borderRadius}; }`;
            style.innerHTML += `.kognitiv-payment-marker-image { height: 24px; position: absolute; top: 44px; right: 85px; display: none; }`;
            style.innerHTML += '.kognitiv-payment-marker-image.no-cc-image { right: 24px; }';
            style.innerHTML += `.kognitiv-input-valid .kognitiv-payment-marker-image { display: inline; }`;
            style.setAttribute('id', 'pciProxySfStyles');
            document.getElementsByTagName('head')[0].appendChild(style);
            // header
            const header = document.createElement('h2');
            header.setAttribute('id', 'kognitiv-payment-header');
            header.innerText = strings['modalTitle'];
            // close button
            const closeButton = document.createElement('a');
            closeButton.setAttribute('id', 'kognitiv-payment-header-close-button');
            closeButton.setAttribute('class', 'kognitiv-payment-header-close-button');
            closeButton.innerHTML = '&times;';
            closeButton.onclick = () => {
                document.getElementById('kognitiv-payment-main-overlay').style.visibility = 'hidden';
                this.notify('popup', 'closed');
                this.reset();
            };
            // header panel
            const headerPanel = document.createElement('div');
            headerPanel.setAttribute('id', 'kognitiv-payment-header-panel');
            headerPanel.setAttribute('class', 'kognitiv-payment-header-panel');
            headerPanel.appendChild(closeButton);
            headerPanel.appendChild(header);
            // loading bar
            const loading = document.createElement('span');
            loading.setAttribute('class', 'kognitiv-payment-loading-indicator');
            loading.setAttribute('id', 'kognitiv-payment-loading-indicator');
            // subtitle
            const subtitlePanel = document.createElement('div');
            subtitlePanel.setAttribute('class', 'kognitiv-payment-subtitle');
            subtitlePanel.innerHTML =
                `<img class="kognitiv-payment-subtitle-icon" src="${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.paymentUrl}/lib/assets/lock-closed.svg" alt="lock icon">`
                    + strings['subTitle'];
            // inputs
            // card holder
            const cardHolderLabel = document.createElement('label');
            cardHolderLabel.setAttribute('for', 'cardHolderInput');
            cardHolderLabel.setAttribute('class', 'kognitiv-payment-input-label');
            cardHolderLabel.innerHTML = strings['cardHolder'];
            const cardHolderInput = document.createElement('input');
            cardHolderInput.setAttribute('id', 'cardHolderInput');
            cardHolderInput.setAttribute('name', 'cardHolderInput');
            cardHolderInput.setAttribute('class', 'kognitiv-payment-card-holder-input');
            cardHolderInput.onkeyup = () => this.validateCardHolder();
            const cardHolderValidMarker = document.createElement('img');
            cardHolderValidMarker.setAttribute('id', 'cardHolderValidMarker');
            cardHolderValidMarker.setAttribute('class', 'kognitiv-payment-card-valid-marker kognitiv-payment-marker-image');
            cardHolderValidMarker.setAttribute('style', 'right: 16px;');
            cardHolderValidMarker.setAttribute('src', `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.paymentUrl}/lib/assets/check.svg`);
            const cardHolderValidation = document.createElement('div');
            cardHolderValidation.setAttribute('id', 'cardHolderValidation');
            cardHolderValidation.setAttribute('class', 'kognitiv-payment-expiry-validation-panel kognitiv-payment-no-display');
            cardHolderValidation.innerHTML = strings['cardHolderValidation'];
            const cardHolderPanel = document.createElement('div');
            cardHolderPanel.setAttribute('class', 'kognitiv-payment-input-panel kognitiv-payment-cardholder-panel');
            cardHolderPanel.appendChild(cardHolderLabel);
            cardHolderPanel.appendChild(cardHolderInput);
            cardHolderPanel.appendChild(cardHolderValidMarker);
            cardHolderPanel.appendChild(cardHolderValidation);
            // card number
            const cardNumberLabel = document.createElement('label');
            cardNumberLabel.setAttribute('for', 'cardNumberPlaceholder');
            cardNumberLabel.setAttribute('class', 'kognitiv-payment-input-label');
            cardNumberLabel.innerHTML = strings['cardNumber'];
            const cardNumberPlaceholder = document.createElement('div');
            cardNumberPlaceholder.setAttribute('id', 'cardNumberPlaceholder');
            cardNumberPlaceholder.setAttribute('class', 'kognitiv-payment-placeholder-panel');
            const cardNumberValidation = document.createElement('div');
            cardNumberValidation.setAttribute('id', 'cardNumberValidation');
            cardNumberValidation.setAttribute('class', 'kognitiv-payment-cc-validation-panel kognitiv-payment-no-display');
            cardNumberValidation.innerHTML = strings['ccNumberValidation'];
            const cardNumberImage = document.createElement('img');
            cardNumberImage.setAttribute('id', 'cardImage');
            cardNumberImage.setAttribute('class', 'kognitiv-payment-card-image kognitiv-payment-image');
            cardNumberImage.setAttribute('src', `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.paymentUrl}/lib/assets/card-empty.svg`);
            const cardNumberValidMarker = document.createElement('img');
            cardNumberValidMarker.setAttribute('id', 'cardNumberValidMarker');
            cardNumberValidMarker.setAttribute('class', 'kognitiv-payment-card-valid-marker kognitiv-payment-marker-image');
            cardNumberValidMarker.setAttribute('src', `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.paymentUrl}/lib/assets/check.svg`);
            const cardNumberPanel = document.createElement('div');
            cardNumberPanel.setAttribute('class', 'kognitiv-payment-input-panel kognitiv-payment-cc-input-panel kognitiv-payment-card-panel-cardNumber');
            cardNumberPanel.appendChild(cardNumberLabel);
            cardNumberPanel.appendChild(cardNumberPlaceholder);
            cardNumberPanel.appendChild(cardNumberImage);
            cardNumberPanel.appendChild(cardNumberValidMarker);
            cardNumberPanel.appendChild(cardNumberValidation);
            // card expiration
            const cardExpiryMonthYearLabel = document.createElement('label');
            cardExpiryMonthYearLabel.setAttribute('for', 'cardExpiryMonthYearInput');
            cardExpiryMonthYearLabel.setAttribute('class', 'kognitiv-payment-expiry-label kognitiv-payment-input-label');
            cardExpiryMonthYearLabel.innerHTML = strings['expiryDate'];
            const cardExpiryMonthYearInput = document.createElement('input');
            cardExpiryMonthYearInput.setAttribute('id', 'cardExpiryMonthYearInput');
            cardExpiryMonthYearInput.setAttribute('name', 'cardExpiryMonthYearInput');
            cardExpiryMonthYearInput.setAttribute('placeholder', strings['expiryDatePlaceholder']);
            cardExpiryMonthYearInput.setAttribute('type', 'tel');
            cardExpiryMonthYearInput.setAttribute('maxlength', '7');
            cardExpiryMonthYearInput.setAttribute('class', 'kognitiv-payment-card-expiry-input');
            const cardExpiryMonthYearValidation = document.createElement('div');
            cardExpiryMonthYearValidation.setAttribute('id', 'cardExpiryMonthYearValidation');
            cardExpiryMonthYearValidation.setAttribute('class', 'kognitiv-payment-expiry-validation-panel kognitiv-payment-no-display');
            cardExpiryMonthYearValidation.innerHTML = strings['expiryValidationMsg'];
            const cardExpiryMonthYearValidMarker = document.createElement('img');
            cardExpiryMonthYearValidMarker.setAttribute('id', 'cardCvvValidMarker');
            cardExpiryMonthYearValidMarker.setAttribute('class', 'kognitiv-payment-card-valid-marker kognitiv-payment-marker-image no-cc-image');
            cardExpiryMonthYearValidMarker.setAttribute('src', `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.paymentUrl}/lib/assets/check.svg`);
            const cardExpiryMonthYearPanel = document.createElement('div');
            cardExpiryMonthYearPanel.setAttribute('class', 'kognitiv-payment-expiry-panel');
            cardExpiryMonthYearPanel.appendChild(cardExpiryMonthYearLabel);
            cardExpiryMonthYearPanel.appendChild(cardExpiryMonthYearInput);
            cardExpiryMonthYearPanel.appendChild(cardExpiryMonthYearValidMarker);
            cardExpiryMonthYearPanel.appendChild(cardExpiryMonthYearValidation);
            // cvv
            const cardCvvLabel = document.createElement('label');
            cardCvvLabel.setAttribute('for', 'cardCvvPlaceholder');
            cardCvvLabel.setAttribute('class', 'kognitiv-payment-expiry-label kognitiv-payment-input-label');
            cardCvvLabel.innerHTML = strings['cvv'];
            const cardCvvPlaceholder = document.createElement('div');
            cardCvvPlaceholder.setAttribute('id', 'cardCvvPlaceholder');
            cardCvvPlaceholder.setAttribute('class', 'kognitiv-payment-placeholder-panel');
            const cardCvvValidation = document.createElement('div');
            cardCvvValidation.setAttribute('id', 'cardCvvValidation');
            cardCvvValidation.setAttribute('class', 'kognitiv-payment-cc-validation-panel kognitiv-payment-no-display');
            cardCvvValidation.innerHTML = strings['ccCvvValidation'];
            const cardCvvImage = document.createElement('img');
            cardCvvImage.setAttribute('id', 'cardCvvImage');
            cardCvvImage.setAttribute('class', 'kognitiv-payment-card-cvv-image kognitiv-payment-image');
            cardCvvImage.setAttribute('src', `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.paymentUrl}/lib/assets/cvc-empty.svg`);
            const cardCvvValidMarker = document.createElement('img');
            cardCvvValidMarker.setAttribute('id', 'cardCvvValidMarker');
            cardCvvValidMarker.setAttribute('class', 'kognitiv-payment-card-valid-marker kognitiv-payment-marker-image');
            cardCvvValidMarker.setAttribute('src', `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.paymentUrl}/lib/assets/check.svg`);
            const cardCvvPanel = document.createElement('div');
            cardCvvPanel.setAttribute('class', 'kognitiv-payment-expiry-panel kognitiv-payment-card-ccv-placeholder kognitiv-payment-card-panel-cvv');
            cardCvvPanel.appendChild(cardCvvLabel);
            cardCvvPanel.appendChild(cardCvvPlaceholder);
            cardCvvPanel.appendChild(cardCvvImage);
            cardCvvPanel.appendChild(cardCvvValidMarker);
            cardCvvPanel.appendChild(cardCvvValidation);
            const cardExpirePanel = document.createElement('div');
            cardExpirePanel.setAttribute('class', 'kognitiv-payment-input-panel');
            cardExpirePanel.appendChild(cardExpiryMonthYearPanel);
            cardExpirePanel.appendChild(cardCvvPanel);
            // submit button
            const submitPanel = document.createElement('div');
            submitPanel.setAttribute('class', 'kognitiv-payment-submit-button-panel');
            const submitButton = document.createElement('button');
            submitButton.setAttribute('type', 'button');
            submitButton.setAttribute('id', 'go');
            submitButton.setAttribute('class', 'kognitiv-payment-submit-button');
            submitButton.innerHTML = strings['pay'];
            cardExpiryMonthYearInput.addEventListener('input', () => {
                this.validateExpiry();
            });
            submitButton.onclick = () => {
                this.notify('init', '');
                const validCardHolder = this.validateCardHolder();
                const validExpiry = this.validateExpiry();
                if (validCardHolder && validExpiry) {
                    const monthYearString = document.getElementById('cardExpiryMonthYearInput').value;
                    const monthYearArray = monthYearString.split('/');
                    const monthString = monthYearArray[0].trim();
                    const yearString = monthYearArray[1].trim();
                    this.secureFields.submit({
                        expm: monthString,
                        expy: yearString,
                    });
                }
            };
            submitPanel.appendChild(submitButton);
            const cardPanel = document.createElement('div');
            cardPanel.appendChild(subtitlePanel);
            cardPanel.appendChild(cardHolderPanel);
            cardPanel.appendChild(cardNumberPanel);
            cardPanel.appendChild(cardExpirePanel);
            cardPanel.appendChild(submitPanel);
            const cardForm = document.createElement('form');
            cardForm.setAttribute('id', 'kognitiv-payment-pciproxy-sf-form');
            cardForm.setAttribute('class', 'kognitiv-payment-pciproxy-sf-form');
            cardForm.appendChild(cardPanel);
            // popup
            const modal = document.createElement('div');
            modal.setAttribute('id', 'kognitiv-payment-main-popup');
            modal.setAttribute('class', 'kognitiv-payment-main-popup');
            modal.appendChild(headerPanel);
            modal.appendChild(loading);
            modal.appendChild(cardForm);
            // main page overlay
            const overlay = document.createElement('div');
            overlay.setAttribute('id', 'kognitiv-payment-main-overlay');
            overlay.setAttribute('class', 'kognitiv-payment-main-overlay');
            overlay.appendChild(modal);
            // main div
            this.kognitivPaymentElement = document.createElement('div');
            this.kognitivPaymentElement.setAttribute('id', 'kognitiv-payment');
            this.kognitivPaymentElement.appendChild(overlay);
            document.body.appendChild(this.kognitivPaymentElement);
            this.setInputFilter(document.getElementById('cardExpiryMonthYearInput'), 
            // eslint-disable-next-line no-useless-escape
            (value) => /^\d{0,2}[\/]?\d{0,2}/.test(value));
        }
    }
    /**
     * Removes all html elements which were created by pciproxy secure fields provider.
     */
    deleteHtmlElements() {
        if (this.kognitivPaymentElement) {
            document.body.removeChild(this.kognitivPaymentElement);
            const links = document.getElementsByTagName('head')[0];
            for (const element of links.children) {
                if (element.id === 'pciProxySfStyles') {
                    element.parentElement.removeChild(element);
                }
            }
            this.kognitivPaymentElement = null;
        }
    }
    /**
     * Displays loading bar or Pci Proxy secure fields form, based on parameter.
     * @param display when true, loading bar is displayed, otherwise Pci Proxy secure fields form is displayed.
     */
    displayLoadingBar(display) {
        const loadingIndicator = document.getElementById('kognitiv-payment-loading-indicator');
        const sfForm = document.getElementById('kognitiv-payment-pciproxy-sf-form');
        if (loadingIndicator) {
            loadingIndicator.style.display = display ? 'block' : 'none';
        }
        if (sfForm) {
            sfForm.style.display = display ? 'none' : 'block';
        }
    }
    /**
     * Prepares array of scripts, which needs to be loaded.
     */
    fillScriptsToBeLoaded() {
        this.scripts = [];
        if (!this.isPciProxySfScriptLoaded()) {
            this.scripts.push({
                src: this.pciProxySfScriptUrl,
            });
        }
    }
    /**
     * Prepares strings used in UI, based on supplied language code.
     * @returns strings for requested languages.
     */
    getStrings() {
        return {
            modalTitle: this.lang.get('payment.client.pci.proxy.modal.title'),
            subTitle: this.lang.get('payment.client.pci.proxy.sub.title'),
            cardHolder: this.lang.get('cc.reservation.booker.cardholder'),
            cardHolderValidation: this.lang.get('payment.client.pci.proxy.holder.notValid'),
            cardNumber: this.lang.get('accounts.cc.payment.ccNumber'),
            ccNumberValidation: this.lang.get('common.cc.number.notValid'),
            expiryDate: this.lang.get('cup.coupon.createCoupon.lbl.expiryDate'),
            expiryDatePlaceholder: `${this.lang.get('common.month.abbreviation')}/${this.lang.get('common.year.abbreviation')}`,
            expiryValidationMsg: this.lang.get('payment.invalid.expiry'),
            cvv: this.lang.get('accounts.cc.payment.cvv'),
            ccCvvValidation: this.lang.get('common.cc.cvv.notValid'),
            pay: this.lang.get('payment.button.validate.cc'),
        };
    }
    getSupportedCardBrands() {
        var _a, _b;
        if (!((_b = (_a = this.providerSettings) === null || _a === void 0 ? void 0 : _a.allowedCcTypeCodes) === null || _b === void 0 ? void 0 : _b.length)) {
            return undefined;
        }
        return this.providerSettings.allowedCcTypeCodes
            .map(code => PciProxySecureFieldsJSProvider.SEEKDA_PCI_PROXY_BRAND_MAP.has(code)
            ? PciProxySecureFieldsJSProvider.SEEKDA_PCI_PROXY_BRAND_MAP.get(code)
            : code);
    }
    /**
    * Initializes pciproxy secure fields provider, which causes rendering its UI in html.
    */
    initializePciProxySf() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.secureFields = new window.SecureFields();
        const styles = {
            '*': `border: 1px solid #D9D9D9; padding: 12px; padding-left: 16px; padding-right: 16px; border-radius: 10px; background-color: white;`,
            'input': 'height: 64px; font-family: sans-serif; letter-spacing: 0.05em;'
        };
        const paymentMethods = this.getSupportedCardBrands();
        this.secureFields.initTokenize(this.providerSettings.merchantId, {
            cardNumber: {
                placeholderElementId: 'cardNumberPlaceholder',
                inputType: 'tel',
            },
            cvv: {
                placeholderElementId: 'cardCvvPlaceholder',
                inputType: 'tel',
            }
        }, {
            styles,
            paymentMethods,
        });
        this.secureFields.on('ready', () => {
            const inputStyle = `font-size: ${getInputFontSize()}; font-family: sans-serif; font-height: 400; line-height: 20px; letter-spacing: 0.05em; margin-left: 2px; height: 62px; outline: none; width: calc(100% - 3px);`;
            window.addEventListener('resize', () => {
                const inputStyle = `font-size: ${getInputFontSize()}; font-family: sans-serif; font-height: 400; line-height: 20px; letter-spacing: 0.05em; margin-left: 0; height: 62px; outline: none; width: calc(100% - 3px);`;
                this.secureFields.setStyle('cardNumber', inputStyle);
                this.secureFields.setStyle('cvv', `${inputStyle} width: 99%;`);
            });
            this.displayLoadingBar(false);
            this.secureFields.setStyle('cardNumber', inputStyle);
            this.secureFields.setStyle('cvv', `${inputStyle} width: 99%;`);
            this.secureFields.setPlaceholder('cardNumber', 'XXXX XXXX XXXX XXXX');
            this.secureFields.setPlaceholder('cvv', 'XXX');
            this.secureFields.focus('cardNumber');
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
        this.secureFields.on('change', (data) => {
            var _a, _b;
            const cardImage = document.querySelector('.kognitiv-payment-card-image');
            if (!((_b = (_a = data === null || data === void 0 ? void 0 : data.fields) === null || _a === void 0 ? void 0 : _a.cardNumber) === null || _b === void 0 ? void 0 : _b.paymentMethod)) {
                cardImage.src = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.paymentUrl}/lib/assets/card-empty.svg`;
            }
            else {
                cardImage.src = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.paymentUrl}/lib/assets/brands/` + data.fields.cardNumber.paymentMethod + '.svg';
            }
            const attributes = ['cardNumber', 'cvv'];
            const fields = (data === null || data === void 0 ? void 0 : data.fields) || {};
            attributes.forEach(attr => {
                const selector = `.kognitiv-payment-card-panel-${attr}`;
                const fieldDescriptor = fields[attr] || {};
                const isValid = fieldDescriptor.valid;
                const $elem = document.querySelector(selector);
                if (isValid) {
                    $elem.classList.add('kognitiv-input-valid');
                }
                else {
                    $elem.classList.remove('kognitiv-input-valid');
                }
            });
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.secureFields.on('success', (data) => {
            if (data === null || data === void 0 ? void 0 : data.transactionId) {
                const cardHolder = document.getElementById('cardHolderInput').value;
                data.cardHolder = cardHolder;
                this.notify('payment', 'success', data);
            }
            else {
                this.notify('payment', 'error', data);
            }
            this.displayLoadingBar(true);
            this.secureFields.destroy();
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.secureFields.on('error', (data) => {
            this.displayLoadingBar(false);
            this.notify('payment', 'error', data);
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.secureFields.on('validate', (data) => {
            this.displayLoadingBar(false);
            this.displayCcDataErrors(data);
        });
    }
    /**
     * Tests whether html element for Pci Proxy secure fields was created.
     * @returns true, if element for  Pci Proxy secure fields was already created, otherwise false.
     */
    isHtmlElementsCreated() {
        const paymentFrame = document.getElementById('pciproxy-sf-payment');
        return !!paymentFrame;
    }
    /**
     * Tests whether Pci Proxy secure fields script was already loaded.
     * @returns true, if Pci Proxy secure fields script was already loaded, otherwise false.
     */
    isPciProxySfScriptLoaded() {
        const scripts = document.getElementsByTagName('script');
        for (const element of scripts) {
            if (element.src === this.pciProxySfScriptUrl) {
                return true;
            }
        }
        return false;
    }
    /**
    * Validates cardholder field.
    * @returns true, if field is valid, otherwise false.
    */
    validateCardHolder() {
        const $panel = document.querySelector('.kognitiv-payment-cardholder-panel');
        const cardHolderString = document.getElementById('cardHolderInput').value;
        const cardHolderValidation = document.getElementById('cardHolderValidation');
        cardHolderValidation.classList.add('kognitiv-payment-no-display');
        const isCardHolderValid = !!cardHolderString;
        if (!isCardHolderValid) {
            cardHolderValidation.classList.remove('kognitiv-payment-no-display');
            $panel.classList.remove('kognitiv-input-valid');
        }
        else {
            $panel.classList.add('kognitiv-input-valid');
        }
        return isCardHolderValid;
    }
    /**
     * Validates month and year expiry fields.
     * @returns true, if both fields are valid, otherwise false.
     */
    validateExpiry() {
        const $panel = document.querySelector('.kognitiv-payment-expiry-panel');
        const monthYearString = document.getElementById('cardExpiryMonthYearInput').value;
        const monthYearValidation = document.getElementById('cardExpiryMonthYearValidation');
        monthYearValidation.classList.add('kognitiv-payment-no-display');
        let isMonthValueCorrect = false;
        let isYearValueCorrect = false;
        if (monthYearString && monthYearString.length > 3 && monthYearString.length < 8) {
            const monthYearArray = monthYearString.split('/');
            if (monthYearArray.length === 2) {
                const monthNumber = Number(monthYearArray[0]);
                const yearNumber = Number(monthYearArray[1]);
                if (monthNumber && !isNaN(monthNumber) && monthNumber > 0 && monthNumber < 13) {
                    isMonthValueCorrect = true;
                }
                if (yearNumber && !isNaN(yearNumber) && yearNumber > 22 && yearNumber < 50) {
                    isYearValueCorrect = true;
                }
            }
        }
        if (!isMonthValueCorrect || !isYearValueCorrect) {
            monthYearValidation.classList.remove('kognitiv-payment-no-display');
        }
        if (isMonthValueCorrect && isYearValueCorrect) {
            $panel.classList.add('kognitiv-input-valid');
        }
        else {
            $panel.classList.remove('kognitiv-input-valid');
        }
        return isMonthValueCorrect && isYearValueCorrect;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    displayCcDataErrors(data) {
        const cardNumberValidation = document.getElementById('cardNumberValidation');
        const cardCvvValidation = document.getElementById('cardCvvValidation');
        cardNumberValidation.classList.add('kognitiv-payment-no-display');
        cardCvvValidation.classList.add('kognitiv-payment-no-display');
        if (!data.fields.cardNumber.valid) {
            cardNumberValidation.classList.remove('kognitiv-payment-no-display');
        }
        if (!data.fields.cvv.valid) {
            cardCvvValidation.classList.remove('kognitiv-payment-no-display');
        }
    }
    setInputFilter(cvvInputElement, inputFilter) {
        ['input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop']
            .forEach((key) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cvvInputElement.addEventListener(key, (e) => {
                if (/^\d+$/.test(e.key)) {
                    cvvInputElement.value = this.formatExpiry(cvvInputElement.value);
                }
                if (inputFilter(cvvInputElement.value)) {
                    this.oldValue = cvvInputElement.value;
                    this.oldSelectionStart = cvvInputElement.selectionStart;
                    this.oldSelectionEnd = cvvInputElement.selectionEnd;
                }
                else if (this.oldValue == null) {
                    cvvInputElement.value = '';
                }
                else {
                    cvvInputElement.value = this.oldValue;
                    cvvInputElement.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                }
                if (this.oldSelectionEnd === 7 && key === 'keyup' && e.key.match(/^[0-9]$/)) {
                    this.secureFields.focus('cvv');
                }
            });
        });
    }
    formatExpiry(val) {
        const p1 = parseInt(val[0], 10);
        const p2 = parseInt(val[1], 10);
        return /^\d$/.test(val) && '0' !== val && '1' !== val
            ? `0${val} / `
            : /^\d\d$/.test(val)
                ? p2 > 2 && 0 !== p1 ? `0${p1} / ${p2}` : `${val} / `
                : val;
    }
    /**
     * Transforms the received raw data to a checkout compatible request. This only returns something else then rawData
     * in case it's a successful payment operation event.
     * @param rawData
     * @returns
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    translate(rawData) {
        return {
            transaction: {
                id: rawData.transactionId,
                cardHolder: rawData.cardHolder,
            },
        };
    }
}
PciProxySecureFieldsJSProvider.SEEKDA_PCI_PROXY_BRAND_MAP = new Map([
    ['visa', 'VIS'],
    ['amex', 'AMX'],
    ['mastercard', 'ECA'],
    ['diners', 'DIN'],
    ['discover', 'DIS'],
    ['jcb', 'JCB'],
]);


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Shift4Provider": () => (/* binding */ Shift4Provider)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _infrastructure_provider_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);


/**
 * Shift4 Kognitiv provider.
 * @extends KognitivProvider
 */
class Shift4Provider extends _infrastructure_provider_class__WEBPACK_IMPORTED_MODULE_1__.KognitivProvider {
    /**
     * Instantiates Shift4 Kognitiv Provider class.
     */
    constructor() {
        super();
        this.shift4ScriptUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.shift4LibUrl;
        this.jQueryScriptUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.shift4JQueryUrl;
        this.kognitivPaymentElementName = 'kognitiv-payment';
        this.fillScriptsToBeLoaded();
    }
    /**
     * Prepares and initializes Shift4 Kognitiv Provider.
     * During initialization, HTML element for displaying SHift4 user interface is created, custom payment
     * provider javascript files are loaded (jQuery and jquery.i4goTrueToken.js)
     * @param providerSettings configuration data for provider.
     * @param settings configuration data for Kognitiv Payment Library.
     * @override
     */
    init(providerSettings, settings) {
        this.providerSettings = providerSettings;
        this.settings = settings;
        this.setDefaults();
        this.notify('init', 'start');
        // create elements needed by Shift4
        this.createHtmlElements();
        // must be called after creating html elements, as it works with loading bar
        this.displayLoadingBar(true);
        // check required settings
        const settingErrors = this.checkSettings(this.providerSettings);
        if (settingErrors.length > 0) {
            this.displayLoadingBar(false);
            this.notify('init', 'error', settingErrors);
            this.reset();
            return;
        }
        // load Shift4 scripts
        this.loadScripts()
            .then(() => this.clientScriptsLoadSuccess(), (errorMessage) => this.clientScriptsLoadFail(errorMessage));
    }
    /**
     * Closes modal dialog by removing previously created HTML elements.
     * @override
     */
    closeModal() {
        this.deleteHtmlElements();
    }
    /**
     * Removes and resets settings, callback, created Html elements and loaded scripts.
     * @override
     */
    reset() {
        this.settings = undefined;
        this.providerSettings = undefined;
        this.unloadScripts();
        this.deleteHtmlElements();
        this.scripts = [];
    }
    // ***************
    // Protected  methods
    // ***************
    /**
     * Set default value for configuration entries which were not specified.
    */
    setDefaults() {
        super.setDefaults();
        this.settings.language = this.settings.language || 'en';
    }
    /**
     * Display error in console and notifies parent by callback method.
     * @param operation type of operation (init, payment)
     * @param status status of operation (start, success, error)
     * @param data string array with additional information.
     */
    notify(operation, status, data) {
        let rawData;
        if (operation === 'payment' && status === 'success' && data) {
            rawData = data;
            data = this.translate(data);
        }
        super.notify(operation, status, data, rawData);
    }
    // ***************
    // Private methods
    // ***************
    /**
     * Displays loading bar or Shift4 form, based on parameter.
     * @param display when true, loading bar is displayed, otherwise Shift4 form is displayed.
     */
    displayLoadingBar(display) {
        document.getElementById('kognitiv-payment-loading-indicator').style.display =
            display ? 'block' : 'none';
        document.getElementById('i4goFrame-panel').style.display =
            display ? 'none' : 'block';
    }
    /**
     * Initializes Shift4 provider, which causes rendering its UI in html.
     */
    initializeShift4() {
        var _a;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const jQueryKognitivPaymentElement = $(`#${this.kognitivPaymentElementName}`);
        if (jQueryKognitivPaymentElement === null || jQueryKognitivPaymentElement === void 0 ? void 0 : jQueryKognitivPaymentElement.i4goTrueToken) {
            const shift4Setting = {
                debug: this.settings.debug,
                remoteDebug: false,
                url: ((_a = this.providerSettings.transaction.extra['i4goUrl']) !== null && _a !== void 0 ? _a : this.providerSettings.isTestMode) ? 'https://i4m.shift4test.com' : 'https://i4m.i4go.com',
                server: this.providerSettings.transaction.extra['i4goServer'],
                accessBlock: this.providerSettings.transaction.extra['i4goAccessblock'],
                self: document.location,
                template: 'shift4shop',
                language: this.settings.language,
                frameAutoResize: true,
                encryptedOnlySwipe: false,
                i4goInfo: { classes: '', label: '', visible: false },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSuccess: (_form, data) => this.notify('payment', 'success', data),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onFailure: (_form, data) => this.notify('payment', 'error', data),
            };
            // make cardholder name visible and required
            shift4Setting.cardholderName = { visible: true, required: true };
            // convert Kognitiv credit cards codes to Shift4
            this.prepareCreditCards(shift4Setting);
            // supply translations, if language is not supported by Shift4
            this.prepareLanguageForShift4(shift4Setting);
            // prepare styles
            this.prepareStyles(shift4Setting);
            // initialize Shift4 plugin
            const i4goTrueTokenObj = jQueryKognitivPaymentElement.i4goTrueToken(shift4Setting);
            // iFrame url change handler
            const iFrame = document.getElementById(i4goTrueTokenObj.frameName);
            iFrame.onload = () => {
                this.displayLoadingBar(false);
                this.notify('init', 'success');
            };
            iFrame.onerror = () => {
                this.displayLoadingBar(false);
                this.notify('init', 'error', ['Shift4 iFrame could not load the content']);
            };
        }
    }
    /**
     * Checks whether all required setting values were supplied
     * @param providerSettings setting values.
     * @returns string array, filled by error messages (or empty if no error was found).
     */
    checkSettings(providerSettings) {
        var _a;
        const errors = [];
        if (!((_a = providerSettings === null || providerSettings === void 0 ? void 0 : providerSettings.transaction) === null || _a === void 0 ? void 0 : _a.extra)) {
            errors.push('No settings for Shift4 were found');
        }
        else {
            if (!providerSettings.transaction.extra['i4goAccessblock']) {
                errors.push('AccessBlock must be specified for Shift4');
            }
            if (!providerSettings.transaction.extra['i4goServer']) {
                errors.push('Server must be specified for Shift4');
            }
        }
        return errors;
    }
    /**
     * Creates and injects html elements (especially div, where Shift4 will render its UI), needed for
     * Shift4 provider, into html document.
     */
    createHtmlElements() {
        var _a, _b, _c, _d, _e;
        // get default style values
        const backDropColor = (_a = this.settings.styling.backdropColor) !== null && _a !== void 0 ? _a : '#303038b3';
        const modalBackgroundColor = (_b = this.settings.styling.modalBackgroundColor) !== null && _b !== void 0 ? _b : '#efeff1';
        const branchBackgroundColor = (_c = this.settings.styling.branchBackgroundColor) !== null && _c !== void 0 ? _c : '#01669f';
        const branchColor = (_d = this.settings.styling.branchColor) !== null && _d !== void 0 ? _d : '#fff';
        const loadingIndicatorColor = (_e = this.settings.styling.loadingIndicatorColor) !== null && _e !== void 0 ? _e : 'silver';
        // TODO - move this (at least common part (background, modal...) also to base class, especially if other
        // Kognitiv Provider will need to be rendered in modal
        if (!this.isHtmlElementsCreated()) {
            const style = document.createElement('style');
            // main overlay
            style.innerHTML = `.kognitiv-payment-main-overlay { position: fixed; top: 0; bottom: 0; left: 0; right: 0; background: ${backDropColor}; z-index: 1000; }`;
            // popup
            style.innerHTML += `.kognitiv-payment-main-popup { margin: 70px auto; background: ${modalBackgroundColor}; border-radius: 6px; `;
            style.innerHTML += `width: 500px; min-height: 420px; position: relative; }`;
            // header panel
            style.innerHTML += `.kognitiv-payment-header-panel { border-radius: 6px 6px 1px 1px; padding-top: 4px; `;
            style.innerHTML += `margin-bottom: 10px; height:64px; background-color: ${branchBackgroundColor}; color: ${branchColor}; }`;
            // header
            style.innerHTML += `.kognitiv-payment-header-panel h2 { margin-top: 18px; margin-left: 24px; font-size: 16px; `;
            style.innerHTML += `font-family: 'Open Sans', sans-serif, serif; letter-spacing: 0.1px; font-weight: 700; }`;
            // header close button
            style.innerHTML += `.kognitiv-payment-header-panel .kognitiv-payment-header-close-button { float: right; margin-top: 10px; margin-right: 20px; `;
            style.innerHTML += `font-size: 30px; cursor: pointer; }`;
            style.innerHTML += `.kognitiv-payment-header-panel .kognitiv-payment-header-close-button:hover { font-weight: bold; } `;
            // loading indicator
            style.innerHTML += `.kognitiv-payment-loading-indicator { width: 48px; height: 48px; border-radius: 50%; position: relative; `;
            style.innerHTML += `animation: rotate 1s linear infinite; margin: 30px auto;z-index: 1; }`;
            style.innerHTML += `.kognitiv-payment-loading-indicator::before { content: ""; box-sizing: border-box; position: absolute; inset: 0px; `;
            style.innerHTML += `border-radius: 50%; border: 5px solid ${loadingIndicatorColor}; animation: prixClipFix 2s linear infinite; }`;
            style.innerHTML += `@keyframes rotate { 100% { transform: rotate(360deg); }}`;
            style.innerHTML += `@keyframes prixClipFix { `;
            style.innerHTML += `0% { clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0) } `;
            style.innerHTML += `25% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0) } `;
            style.innerHTML += `50% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%) } `;
            style.innerHTML += `75% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%) } `;
            style.innerHTML += `100% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0) }} `;
            // panel for Shift4 frame 
            style.innerHTML += `.i4goFrame-panel{ z-index: 1000; position: relative; display: none; padding: 20px; overflow: auto; }`;
            // Shift4 frame 
            style.innerHTML += `.i4goFrame{ }`;
            style.setAttribute('id', 'shift4Styles');
            document.getElementsByTagName('head')[0].appendChild(style);
            // header
            const header = document.createElement('h2');
            header.setAttribute('id', 'kognitiv-payment-header');
            header.innerText = 'Shift 4';
            // close button
            const closeButton = document.createElement('a');
            closeButton.setAttribute('id', 'kognitiv-payment-header-close-button');
            closeButton.setAttribute('class', 'kognitiv-payment-header-close-button');
            closeButton.innerHTML = '&times;';
            closeButton.onclick = () => {
                document.getElementById('kognitiv-payment-main-overlay').style.visibility = 'hidden';
                this.notify('popup', 'closed');
                this.reset();
            };
            // header panel
            const headerPanel = document.createElement('div');
            headerPanel.setAttribute('id', 'kognitiv-payment-header-panel');
            headerPanel.setAttribute('class', 'kognitiv-payment-header-panel');
            headerPanel.appendChild(closeButton);
            headerPanel.appendChild(header);
            // loading bar
            const loading = document.createElement('span');
            loading.setAttribute('class', 'kognitiv-payment-loading-indicator');
            loading.setAttribute('id', 'kognitiv-payment-loading-indicator');
            // frame for Shift4
            const i4goFrame = document.createElement('div');
            i4goFrame.setAttribute('class', 'i4goFrame');
            i4goFrame.setAttribute('id', 'i4goFrame');
            // panel for Shift4 frame
            const i4goFramePanel = document.createElement('div');
            i4goFramePanel.setAttribute('id', 'i4goFrame-panel');
            i4goFramePanel.setAttribute('class', 'i4goFrame-panel');
            i4goFramePanel.appendChild(i4goFrame);
            // popup
            const modal = document.createElement('div');
            modal.setAttribute('id', 'kognitiv-payment-main-popup');
            modal.setAttribute('class', 'kognitiv-payment-main-popup');
            modal.appendChild(headerPanel);
            modal.appendChild(loading);
            modal.appendChild(i4goFramePanel);
            // main page overlay
            const overlay = document.createElement('div');
            overlay.setAttribute('id', 'kognitiv-payment-main-overlay');
            overlay.setAttribute('class', 'kognitiv-payment-main-overlay');
            overlay.appendChild(modal);
            // main div
            this.kognitivPaymentElement = document.createElement('div');
            this.kognitivPaymentElement.setAttribute('id', 'kognitiv-payment');
            this.kognitivPaymentElement.appendChild(overlay);
            document.body.appendChild(this.kognitivPaymentElement);
        }
    }
    /**
     * Removes all html elements which were created by Shift4 provider.
     */
    deleteHtmlElements() {
        if (this.kognitivPaymentElement) {
            document.body.removeChild(this.kognitivPaymentElement);
            const links = document.getElementsByTagName('head')[0];
            for (const element of links.children) {
                if (element.id === 'shift4Styles') {
                    element.parentElement.removeChild(element);
                }
            }
            this.kognitivPaymentElement = null;
        }
    }
    /**
     * Initializes Shift4, after scripts were successfully loaded.
     */
    clientScriptsLoadSuccess() {
        this.initializeShift4();
    }
    /**
     * Displays error, which occurred during script loading.
     * @param err error message.
     */
    clientScriptsLoadFail(err) {
        this.displayLoadingBar(false);
        this.notify('init', 'error', [err]);
    }
    /**
     * Prepares array of scripts, which needs to be loaded.
     */
    fillScriptsToBeLoaded() {
        this.scripts = [];
        if (typeof $ !== 'function') {
            this.scripts.push({
                src: this.jQueryScriptUrl,
                attributes: [
                    { key: 'crossorigin', value: 'anonymous' }
                ]
            });
        }
        if (!this.isShift4ScriptLoaded()) {
            this.scripts.push({
                src: this.shift4ScriptUrl,
            });
        }
    }
    /**
     * Tests whether html element for Shift4 was created.
     * @returns true, if element for Shift4 was already created, otherwise false.
     */
    isHtmlElementsCreated() {
        const paymentFrame = document.getElementById('kognitiv-payment');
        return !!paymentFrame;
    }
    /**
     * Tests whether Shift4 script was already loaded.
     * @returns true, if Shift4 script was already loaded, otherwise false.
     */
    isShift4ScriptLoaded() {
        const scripts = document.getElementsByTagName('script');
        for (const element of scripts) {
            if (element.src === this.shift4ScriptUrl) {
                return true;
            }
        }
        return false;
    }
    /**
     * Converts all allowed credit cards from Kognitiv format and assigns it to
     * Shift4 configuration.
     * @param shift4Setting Shift4 setting values.
     */
    prepareCreditCards(shift4Setting) {
        var _a;
        // TODO - get all Kognitiv cc codes
        // TODO - if kognitiv cc array is falsy, allow all CC?
        const kognitivCcToShift4Map = {
            discover: 'NS',
            amex: 'AX',
            visa: 'VS',
            mastercard: 'MC',
        };
        const acceptedPayments = [];
        (_a = this.providerSettings.allowedCcTypeCodes) === null || _a === void 0 ? void 0 : _a.forEach(kognitivCode => {
            if (kognitivCcToShift4Map[kognitivCode]) {
                acceptedPayments.push(kognitivCcToShift4Map[kognitivCode]);
            }
        });
        if (acceptedPayments.length > 0) {
            shift4Setting.acceptedPayments = acceptedPayments.join(',');
        }
    }
    /**
     * Translates strings for languages non supported natively by Shift4.
     * @param shift4Setting Shift4 setting values.
     */
    prepareLanguageForShift4(shift4Setting) {
        if (['en', 'es', 'fr', 'pt', 'lt'].some(code => code === shift4Setting.language)) {
            return;
        }
        // support for other languages
        if (shift4Setting.language === 'de') {
            shift4Setting.cardholderName = Object.assign(Object.assign({}, shift4Setting.cardholderName), {
                label: 'Name des Karteninhabers', placeholder: 'Name des Karteninhabers',
                message: 'Der Name des Karteninhabers ist erforderlich.'
            });
            shift4Setting.cardType = { label: 'Karte auswählen', placeholder: 'Karte auswählen', message: 'Der Kartentyp ist erforderlich.' };
            shift4Setting.cardNumber = { label: 'Kartennummer', placeholder: 'Kartennummer', message: 'Die Kartennummer ist erforderlich.' };
            shift4Setting.expirationMonth = { label: 'MM', placeholder: 'MM', message: 'Das Verfallsdatum ist erforderlich.' };
            shift4Setting.expirationYear = { label: 'YYYY', placeholder: 'YYYY', message: 'Das Verfallsdatum ist erforderlich.' };
            shift4Setting.cvv2Code = { label: 'CVV', placeholder: 'CVV', message: 'Der Sicherheitscode der Karte ist erforderlich.', required: true };
            shift4Setting.submitButton = { label: 'Meine Zahlungsinformationen sichern' };
        }
        // fallback to english, in case some strings were not translated
        shift4Setting.language = 'en';
    }
    /**
     * Prepares styles, either default or overridden.
     * @param shift4Setting Shift4 setting values.
     */
    prepareStyles(shift4Setting) {
        var _a, _b, _c;
        const modalBackgroundColor = (_a = this.settings.styling.modalBackgroundColor) !== null && _a !== void 0 ? _a : '#efeff1';
        const branchColor = (_b = this.settings.styling.branchColor) !== null && _b !== void 0 ? _b : '#fff';
        const branchBackgroundColor = (_c = this.settings.styling.branchBackgroundColor) !== null && _c !== void 0 ? _c : '#01669f';
        shift4Setting.cssRules = [
            `body{ background-color: ${modalBackgroundColor} }`,
            `#i4go_submit{background-color: ${branchBackgroundColor};}`,
            `#i4go_submit{color: ${branchColor};}`,
            `.cvv2info {font-size: 12px; line-height: 1.2;}`,
        ];
    }
    /**
     * Transforms the received raw data to a checkout compatible request. This only returns something else then rawData
     * in case it's a successful payment operation event.
     * @param rawData
     * @returns
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    translate(rawData) {
        const expiryMonth = (rawData.i4go_expirationmonth || '').length === 1
            ? `0${rawData.i4go_expirationmonth}`
            : rawData.i4go_expirationmonth;
        const expiryYear = (rawData.i4go_expirationyear || '').length === 2
            ? `20${rawData.i4go_expirationyear}`
            : rawData.i4go_expirationyear;
        return {
            transaction: {
                id: this.providerSettings.transaction.id,
                account: rawData.i4go_uniqueid,
                cardExpiration: `${expiryYear}-${expiryMonth}`,
                cardHolder: rawData.i4go_cardholdername,
            },
        };
    }
}


/***/ })
/******/ 	]);
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
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KognitivPayment": () => (/* binding */ KognitivPayment)
/* harmony export */ });
/* harmony import */ var _lang_service_lang_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _providers_infrastructure_helper_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _providers_infrastructure_logger_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var _providers_infrastructure_provider_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);




/**
 * Kognitiv Payment Library.
 */
class KognitivPayment {
    /**
     * Initializes KognitivPayment for using given provider.
     * @param providerSettings configuration data for provider.
     * @param settings configuration data for Kognitiv Payment Library.
     */
    init(providerSettings, settings) {
        var _a;
        _lang_service_lang_service__WEBPACK_IMPORTED_MODULE_0__.LangService.getInstance().changeLanguage((_a = settings.language) !== null && _a !== void 0 ? _a : 'EN');
        providerSettings = _providers_infrastructure_helper_class__WEBPACK_IMPORTED_MODULE_1__.Helpers.snakePropertiesToCamel(providerSettings);
        this.provider = _providers_infrastructure_provider_factory__WEBPACK_IMPORTED_MODULE_3__.ProviderFactory.createProvider(providerSettings);
        _providers_infrastructure_logger_class__WEBPACK_IMPORTED_MODULE_2__.Logger.isDebugMode = !!settings.debug;
        if (this.provider) {
            this.setupMessageListener(settings);
            this.provider.init(providerSettings, settings);
            return;
        }
        const message = 'Missing or unsupported provider code';
        if (settings.debug) {
            _providers_infrastructure_logger_class__WEBPACK_IMPORTED_MODULE_2__.Logger.error(message);
        }
        if (settings === null || settings === void 0 ? void 0 : settings.callbackMethod) {
            settings.callbackMethod({
                operation: 'init',
                status: 'error',
                data: message,
            });
        }
    }
    /**
     * Closes modal box, if it exists.
     */
    closeModal() {
        if (this.provider) {
            this.provider.closeModal();
        }
    }
    /**
     * Removes and resets all dependencies, which were created by the provider.
     */
    reset(orig) {
        if (this.provider) {
            this.provider.reset(orig);
        }
        this.provider = undefined;
        if (this.messageListener) {
            window.removeEventListener('message', this.messageListener);
            this.messageListener = null;
        }
    }
    // ***************
    // Private methods
    // ***************
    /**
     * Configures message listener for getting information from iFrame. Used just for some
     * providers (Datatrans). This information is sent to hosting application through callback method.
     * @param settings configuration data for Kognitiv Payment Library.
     */
    setupMessageListener(settings) {
        if (!(settings === null || settings === void 0 ? void 0 : settings.messagingMiddleware)) {
            return;
        }
        const { domain } = settings.messagingMiddleware;
        this.messageListener = (event) => {
            _providers_infrastructure_logger_class__WEBPACK_IMPORTED_MODULE_2__.Logger.info(`Received message from ${event === null || event === void 0 ? void 0 : event.origin} frame`, event);
            if (event.origin !== domain && domain !== '*') {
                _providers_infrastructure_logger_class__WEBPACK_IMPORTED_MODULE_2__.Logger.info(`Ignoring message. Continue to wait for message from ${domain}.`);
                return;
            }
            const { data } = event;
            if (typeof (settings === null || settings === void 0 ? void 0 : settings.callbackMethod) === 'function') {
                const operation = (data === null || data === void 0 ? void 0 : data.eventType) === 'cancel' ? 'popup' : 'payment';
                const status = operation === 'popup'
                    ? 'closed'
                    : ((data === null || data === void 0 ? void 0 : data.success) ? 'success' : 'error');
                settings.callbackMethod({
                    operation,
                    status,
                    data: { transaction: { id: data === null || data === void 0 ? void 0 : data.txId, } },
                });
            }
        };
        window.addEventListener('message', this.messageListener);
    }
}
window.KognitivPayment = KognitivPayment;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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c3JjL2xhbmctc2VydmljZS9sYW5nLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8va29nbml0aXYtcGF5bWVudC8uL3NyYy9sYW5nLXNlcnZpY2UvcGx1cmFsLWNvbmZpZ3MvY3MudHMiLCJ3ZWJwYWNrOi8va29nbml0aXYtcGF5bWVudC8uL3NyYy9sYW5nLXNlcnZpY2UvcGx1cmFsLWNvbmZpZ3MvX2NvbW1vbi50cyIsIndlYnBhY2s6Ly9rb2duaXRpdi1wYXltZW50Ly4vc3JjL2xhbmctc2VydmljZS9wbHVyYWwtY29uZmlncy9kZS50cyIsIndlYnBhY2s6Ly9rb2duaXRpdi1wYXltZW50Ly4vc3JjL2xhbmctc2VydmljZS9wbHVyYWwtY29uZmlncy9lbi50cyIsIndlYnBhY2s6Ly9rb2duaXRpdi1wYXltZW50Ly4vc3JjL2xhbmctc2VydmljZS9wbHVyYWwtY29uZmlncy9mci50cyIsIndlYnBhY2s6Ly9rb2duaXRpdi1wYXltZW50Ly4vc3JjL2xhbmctc2VydmljZS9wbHVyYWwtY29uZmlncy9oci50cyIsIndlYnBhY2s6Ly9rb2duaXRpdi1wYXltZW50Ly4vc3JjL2xhbmctc2VydmljZS9wbHVyYWwtY29uZmlncy9pdC50cyIsIndlYnBhY2s6Ly9rb2duaXRpdi1wYXltZW50Ly4vc3JjL2xhbmctc2VydmljZS9wbHVyYWwtY29uZmlncy9zbC50cyIsIndlYnBhY2s6Ly9rb2duaXRpdi1wYXltZW50Ly4vc3JjL3Byb3ZpZGVycy9pbmZyYXN0cnVjdHVyZS9oZWxwZXIuY2xhc3MudHMiLCJ3ZWJwYWNrOi8va29nbml0aXYtcGF5bWVudC8uL3NyYy9wcm92aWRlcnMvaW5mcmFzdHJ1Y3R1cmUvbG9nZ2VyLmNsYXNzLnRzIiwid2VicGFjazovL2tvZ25pdGl2LXBheW1lbnQvLi9zcmMvcHJvdmlkZXJzL2luZnJhc3RydWN0dXJlL3Byb3ZpZGVyLmZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8va29nbml0aXYtcGF5bWVudC8uL3NyYy9wcm92aWRlcnMvZGF0YXRyYW5zL2xpZ2h0Ym94L2RhdGF0cmFucy1saWdodGJveC1wcm92aWRlci50cyIsIndlYnBhY2s6Ly9rb2duaXRpdi1wYXltZW50Ly4vc3JjL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudC50cyIsIndlYnBhY2s6Ly9rb2duaXRpdi1wYXltZW50Ly4vc3JjL2Vudmlyb25tZW50cy9kZXYtZW52aXJvbm1lbnQudHMiLCJ3ZWJwYWNrOi8va29nbml0aXYtcGF5bWVudC8uL3NyYy9lbnZpcm9ubWVudHMvcHJvZC1lbnZpcm9ubWVudC50cyIsIndlYnBhY2s6Ly9rb2duaXRpdi1wYXltZW50Ly4vc3JjL3Byb3ZpZGVycy9pbmZyYXN0cnVjdHVyZS9wcm92aWRlci5jbGFzcy50cyIsIndlYnBhY2s6Ly9rb2duaXRpdi1wYXltZW50Ly4vc3JjL3Byb3ZpZGVycy9wY2lwcm94eS9wY2ktcHJveHktc2VjdXJlLWZpZWxkcy1qcy1wcm92aWRlci50cyIsIndlYnBhY2s6Ly9rb2duaXRpdi1wYXltZW50Ly4vc3JjL3Byb3ZpZGVycy9zaGlmdDQvc2hpZnQ0LXByb3ZpZGVyLnRzIiwid2VicGFjazovL2tvZ25pdGl2LXBheW1lbnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va29nbml0aXYtcGF5bWVudC93ZWJwYWNrL3J1bnRpbWUvY3JlYXRlIGZha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9rb2duaXRpdi1wYXltZW50L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9rb2duaXRpdi1wYXltZW50L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8va29nbml0aXYtcGF5bWVudC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2tvZ25pdGl2LXBheW1lbnQvLi9zcmMva29nbml0aXYtcGF5bWVudC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwbHVyYWxDb25maWdDUyB9IGZyb20gJy4vcGx1cmFsLWNvbmZpZ3MvY3MnO1xyXG5pbXBvcnQgeyBwbHVyYWxDb25maWdERSB9IGZyb20gJy4vcGx1cmFsLWNvbmZpZ3MvZGUnO1xyXG5pbXBvcnQgeyBwbHVyYWxDb25maWdFTiB9IGZyb20gJy4vcGx1cmFsLWNvbmZpZ3MvZW4nO1xyXG5pbXBvcnQgeyBwbHVyYWxDb25maWdGUiB9IGZyb20gJy4vcGx1cmFsLWNvbmZpZ3MvZnInO1xyXG5pbXBvcnQgeyBwbHVyYWxDb25maWdIUiB9IGZyb20gJy4vcGx1cmFsLWNvbmZpZ3MvaHInO1xyXG5pbXBvcnQgeyBwbHVyYWxDb25maWdJVCB9IGZyb20gJy4vcGx1cmFsLWNvbmZpZ3MvaXQnO1xyXG5pbXBvcnQgeyBwbHVyYWxDb25maWdTTCB9IGZyb20gJy4vcGx1cmFsLWNvbmZpZ3Mvc2wnO1xyXG5pbXBvcnQgKiBhcyBsYW5ndWFnZUNTIGZyb20gJy4vbGFuZ3MvcGF5bWVudC1jbGllbnQtbGlicmFyeV9jcy5qc29uJztcclxuaW1wb3J0ICogYXMgbGFuZ3VhZ2VERSBmcm9tICcuL2xhbmdzL3BheW1lbnQtY2xpZW50LWxpYnJhcnlfZGUuanNvbic7XHJcbmltcG9ydCAqIGFzIGxhbmd1YWdlRU4gZnJvbSAnLi9sYW5ncy9wYXltZW50LWNsaWVudC1saWJyYXJ5X2VuLmpzb24nO1xyXG5pbXBvcnQgKiBhcyBsYW5ndWFnZUZSIGZyb20gJy4vbGFuZ3MvcGF5bWVudC1jbGllbnQtbGlicmFyeV9mci5qc29uJztcclxuaW1wb3J0ICogYXMgbGFuZ3VhZ2VIUiBmcm9tICcuL2xhbmdzL3BheW1lbnQtY2xpZW50LWxpYnJhcnlfaHIuanNvbic7XHJcbmltcG9ydCAqIGFzIGxhbmd1YWdlSVQgZnJvbSAnLi9sYW5ncy9wYXltZW50LWNsaWVudC1saWJyYXJ5X2l0Lmpzb24nO1xyXG5pbXBvcnQgKiBhcyBsYW5ndWFnZVNMIGZyb20gJy4vbGFuZ3MvcGF5bWVudC1jbGllbnQtbGlicmFyeV9zbC5qc29uJztcclxuaW1wb3J0IHsgcGx1cmFsUGFydHMgfSBmcm9tICcuL3BsdXJhbC1jb25maWdzL19jb21tb24nO1xyXG4vKipcclxuICogSG93IHRvIHVzZSBpMThuXHJcbiAqXHJcbiAqIEluIHlvdXIgY2xhc3MgdXNlIDxjb2RlPnByaXZhdGUgbGFuZyA9IExhbmdTZXJ2aWNlLmdldEluc3RhbmNlKCk7PC9jb2RlPlxyXG4gKiBZb3UgY2FuIHRoZW4gdXNlIDxjb2RlPnRoaXMubGFuZy5nZXQoICdzb21lLnd0aS5zdHJpbmcnKTs8L2NvZGU+IGFzIHVzdWFsIVxyXG4gKiBOb3RlOiBNYWtlIHN1cmUgdG8gY2FsbCB0aGUgdmFyaWFibGUgPGNvZGU+bGFuZzwvY29kZT4gb3IgPGNvZGU+bGFuZ1NlcnZpY2U8L2NvZGU+IGZvciBpdCB0byB3b3JrLlxyXG4gKi9cclxuLy8gVE9ETyBUaGlzIGlzIG1vc3RseSBhIGNsb25lIG9mIEBrb2duaXRpdi9hbmd1bGFyLWkxOG4gd2l0aCBzb21lIGFkYXB0aW9ucyB0byBrZWVwIHRoZSBsYW5ndWFnZXMgbG9jYWxseS5cclxuLy8gV2Ugc2hvdWxkIG1vdmUgdGhlIGNvbW1vbiBwYXJ0IHRvIGEgY29tbW9uIGxpYnJhcnkgLi4uXHJcbmV4cG9ydCBjbGFzcyBMYW5nU2VydmljZSB7XHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuSU5TVEFOQ0U7XHJcbiAgICB9XHJcbiAgICBnZXRDdXJyZW50TGFuZ3VhZ2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIExhbmdTZXJ2aWNlLkNVUlJFTlRfTEFOR1VBR0U7XHJcbiAgICB9XHJcbiAgICBjaGFuZ2VMYW5ndWFnZShsYW5nKSB7XHJcbiAgICAgICAgTGFuZ1NlcnZpY2UuQ1VSUkVOVF9MQU5HVUFHRSA9IGxhbmcgPyBsYW5nLnRvTG93ZXJDYXNlKCkgOiAnZW4nO1xyXG4gICAgfVxyXG4gICAgZ2V0KGtleSwgLi4uYXJncykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFdpdGhGYWxsYmFjayhrZXksIGBbJHtrZXl9XWAsIC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gICAgZ2V0V2l0aEZhbGxiYWNrKGtleSwgZmFsbGJhY2ssIC4uLmFyZ3MpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIExhbmdTZXJ2aWNlLlNUUklOR1NbTGFuZ1NlcnZpY2UuQ1VSUkVOVF9MQU5HVUFHRV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsbGJhY2s7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGxhYmVsO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgdHlwZW9mIGxhYmVsICE9PSAnc3RyaW5nJyAmJiBpIDwgTGFuZ1NlcnZpY2UuU1RSSU5HU1tMYW5nU2VydmljZS5DVVJSRU5UX0xBTkdVQUdFXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGFiZWwgPSB0aGlzLmdldFByb3BPZihMYW5nU2VydmljZS5TVFJJTkdTW0xhbmdTZXJ2aWNlLkNVUlJFTlRfTEFOR1VBR0VdW2ldLCBrZXkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBsYWJlbCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsID0gbnVsbDsgLy8gYnVpbHQgaW4gZnVuY3Rpb24sIG1vdmUgb25cclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbGFiZWwgPT09ICdvYmplY3QnICYmIHR5cGVvZiBsYWJlbFsnQHZhbHVlJ10gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSBsYWJlbFsnQHZhbHVlJ107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAodHlwZW9mIGxhYmVsID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbGFiZWxbJ0B0eXBlJ10gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSB0aGlzLnJlc29sdmVUeXBlKGxhYmVsLCBhcmdzLnNwbGljZSgwLCAxKVswXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBsYWJlbCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxsYmFjaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlU3RyaW5nKGxhYmVsLCAuLi5hcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsbGJhY2s7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0Q29kZWxpc3Qoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgY29kZWxpc3QgPSB0aGlzLmdldChrZXkpO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xyXG4gICAgICAgIGNvZGVsaXN0XHJcbiAgICAgICAgICAgIC5zcGxpdCgnLCcpXHJcbiAgICAgICAgICAgIC5tYXAodmFsID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcGFydHMgPSB2YWwuc3BsaXQoJz0nKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGtleTogcGFydHNbMF0udHJpbSgpLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHBhcnRzWzFdLnRyaW0oKSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgcmVzdWx0W2l0ZW0ua2V5XSA9IGl0ZW0udmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHJlc29sdmVUeXBlKG9iaiwgZGVjaWRlcikge1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBvYmpbJ0B0eXBlJ107XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BsdXJhbCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRQbHVyYWwob2JqLCBkZWNpZGVyKTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRoaXMuYXNzZXJ0TmV2ZXIodHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGdldFBsdXJhbChvYmosIGRlY2lkZXIpIHtcclxuICAgICAgICBpZiAoZGVjaWRlciA9PT0gMCAmJiBvYmpbJ3plcm8nXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqWyd6ZXJvJ107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRhdGFNYXAgPSBwbHVyYWxQYXJ0cyhkZWNpZGVyKTtcclxuICAgICAgICBjb25zdCBwbHVyYWxGY3QgPSBMYW5nU2VydmljZS5QTFVSQUxfQ09ORklHU1tMYW5nU2VydmljZS5DVVJSRU5UX0xBTkdVQUdFXTtcclxuICAgICAgICBjb25zdCBwbHVyYWxLZXkgPSBwbHVyYWxGY3QgPyBwbHVyYWxGY3QoZGF0YU1hcCkgOiAnb3RoZXInO1xyXG4gICAgICAgIHJldHVybiBvYmpbcGx1cmFsS2V5XTtcclxuICAgIH1cclxuICAgIHJlcGxhY2VTdHJpbmcobGFiZWwsIC4uLmFyZ3MpIHtcclxuICAgICAgICBhcmdzLmZvckVhY2goKHZhbCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCgnXFxcXHsnICsgaWR4ICsgJ1xcXFx9JywgJ2lnJyk7XHJcbiAgICAgICAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHZhbCA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEpTIGRvZXMgbm90IGxpa2UgJCYgaW4gdGhlIHJlZ2V4IChyZXBsYWNlcyBpdCB3aXRoIGZpcnN0IG1hdGNoKSBzbyB3ZSBlc2NhcGUgaXQgd2l0aCAkJCZcclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXHJcbiAgICAgICAgICAgIHZhbCA9IHZhbC50b1N0cmluZygpLnJlcGxhY2UoL1xcJCYvZywgJyQkJFxcJicpO1xyXG4gICAgICAgICAgICBsYWJlbCA9IGxhYmVsLnJlcGxhY2UocmVnZXgsIHZhbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGxhYmVsO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIGdldFByb3BPZihvYmosIGtleSkge1xyXG4gICAgICAgIGlmICghb2JqIHx8ICFrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQga2V5UGFydHMgPSBrZXkgPyBrZXkuc3BsaXQoJy4nKSA6IFtdO1xyXG4gICAgICAgIGtleVBhcnRzID0ga2V5UGFydHMucmV2ZXJzZSgpO1xyXG4gICAgICAgIHdoaWxlIChrZXlQYXJ0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cktleSA9IGtleVBhcnRzLnBvcCgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGN1cktleSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgICAgICAgICBvYmogPSBvYmpbY3VyS2V5XTtcclxuICAgICAgICAgICAgICAgIGlmICghb2JqICYmIChvYmogIT09IDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICBhc3NlcnROZXZlcihfeCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3ggc2hvdWxkIGJlIG5ldmVyIScpO1xyXG4gICAgfVxyXG59XHJcbkxhbmdTZXJ2aWNlLklOU1RBTkNFID0gbmV3IExhbmdTZXJ2aWNlKCk7XHJcbkxhbmdTZXJ2aWNlLkNVUlJFTlRfTEFOR1VBR0UgPSAnZW4nO1xyXG4vLyBQbHVyYWwgY29uZmlncyBjYW4gYmUgZm91bmQgYXQgaHR0cDovL3d3dy51bmljb2RlLm9yZy9jbGRyL2NoYXJ0cy9sYXRlc3Qvc3VwcGxlbWVudGFsL2xhbmd1YWdlX3BsdXJhbF9ydWxlcy5odG1sXHJcbkxhbmdTZXJ2aWNlLlBMVVJBTF9DT05GSUdTID0ge1xyXG4gICAgY3M6IHBsdXJhbENvbmZpZ0NTLFxyXG4gICAgZGU6IHBsdXJhbENvbmZpZ0RFLFxyXG4gICAgZW46IHBsdXJhbENvbmZpZ0VOLFxyXG4gICAgZnI6IHBsdXJhbENvbmZpZ0ZSLFxyXG4gICAgaHI6IHBsdXJhbENvbmZpZ0hSLFxyXG4gICAgaXQ6IHBsdXJhbENvbmZpZ0lULFxyXG4gICAgc2w6IHBsdXJhbENvbmZpZ1NMLFxyXG59O1xyXG4vLyBUT0RPIFRoaXMgaXMgYSBiaXQgdWdseSwgYnV0IEkgZG9uJ3Qgd2FudCB0byBkbyBleHRyYSByZXF1ZXN0cy5cclxuLy8gUGF5bWVudCBsaWIgaXMgc3VmZmljaWVudGx5IHNtYWxsIGFuZCBoZW5jZSB0aGUgcGVyZm9ybWFuY2UgaGl0IGlzIG5lZ2xlY3RpYmxlXHJcbi8vIGlmIHdlIGxvYWQgYWxsIGxhbmd1YWdlcyBhdCBvbmNlLCBidXQgd2UgbWlnaHQgd2FudCB0byBvcHRpbWl6ZSB0aGlzIGluIHRoZSBmdXR1cmUuXHJcbkxhbmdTZXJ2aWNlLlNUUklOR1MgPSB7XHJcbiAgICBjczogW2xhbmd1YWdlQ1NdLFxyXG4gICAgZGU6IFtsYW5ndWFnZURFXSxcclxuICAgIGVuOiBbbGFuZ3VhZ2VFTl0sXHJcbiAgICBmcjogW2xhbmd1YWdlRlJdLFxyXG4gICAgaHI6IFtsYW5ndWFnZUhSXSxcclxuICAgIGl0OiBbbGFuZ3VhZ2VJVF0sXHJcbiAgICBzbDogW2xhbmd1YWdlU0xdLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBiZXR3ZWVuIH0gZnJvbSAnLi9fY29tbW9uJztcclxuZXhwb3J0IGZ1bmN0aW9uIHBsdXJhbENvbmZpZ0NTKHBhcmFtcykge1xyXG4gICAgaWYgKHBhcmFtcy52ICE9PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuICdtYW55JztcclxuICAgIH1cclxuICAgIGlmIChwYXJhbXMuaSA9PT0gMSkge1xyXG4gICAgICAgIHJldHVybiAnb25lJztcclxuICAgIH1cclxuICAgIGlmIChiZXR3ZWVuKHBhcmFtcy5pLCAyLCA0KSkge1xyXG4gICAgICAgIHJldHVybiAnZmV3JztcclxuICAgIH1cclxuICAgIHJldHVybiAnb3RoZXInO1xyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBiZXR3ZWVuKHZhbHVlLCBtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIHZhbHVlID49IG1pbiAmJiB2YWx1ZSA8PSBtYXg7XHJcbn1cclxuLy8gVXNpbmcgdGhlIG9mZmljaWFsIGRlZmluaXRpb24gb2YgdW5pY29kZVxyXG4vLyBodHRwOi8vdW5pY29kZS5vcmcvcmVwb3J0cy90cjM1L3RyMzUtbnVtYmVycy5odG1sI09wZXJhbmRzXHJcbmV4cG9ydCBmdW5jdGlvbiBwbHVyYWxQYXJ0cyhudW0pIHtcclxuICAgIG51bSA9IG51bS50b1N0cmluZygpO1xyXG4gICAgY29uc3QgcGFydHMgPSBudW0uc3BsaXQoJy4nKTtcclxuICAgIGxldCBhYnNvbHV0ZVZhbHVlO1xyXG4gICAgbGV0IGZyYWN0aW9uYWxEaWdpdHM7XHJcbiAgICBsZXQgZnJhY3Rpb25hbERpZ2l0c1RyaW1tZWQ7XHJcbiAgICBsZXQgZnJhY3Rpb25hbERpZ2l0c0xlbmd0aDtcclxuICAgIGxldCBmcmFjdGlvbmFsRGlnaXRzVHJpbW1lZExlbmd0aDtcclxuICAgIGlmIChudW1bMF0gPT09ICcrJyB8fCBudW1bMF0gPT09ICctJykge1xyXG4gICAgICAgIGFic29sdXRlVmFsdWUgPSBudW0uc3Vic3RyKDEpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgYWJzb2x1dGVWYWx1ZSA9IG51bTtcclxuICAgIH1cclxuICAgIGNvbnN0IGludGVnZXJEaWdpdHMgPSBwYXJ0c1swXTtcclxuICAgIGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgY29uc3QgZGVjaW1hbHMgPSBwYXJ0c1sxXTtcclxuICAgICAgICBmcmFjdGlvbmFsRGlnaXRzTGVuZ3RoID0gZGVjaW1hbHMubGVuZ3RoO1xyXG4gICAgICAgIGZyYWN0aW9uYWxEaWdpdHMgPSArZGVjaW1hbHM7XHJcbiAgICAgICAgY29uc3QgdHJpbW1lZERlY2ltYWxzID0gZGVjaW1hbHMucmVwbGFjZSgvMCokLywgJycpO1xyXG4gICAgICAgIGZyYWN0aW9uYWxEaWdpdHNUcmltbWVkTGVuZ3RoID0gdHJpbW1lZERlY2ltYWxzLmxlbmd0aDtcclxuICAgICAgICBmcmFjdGlvbmFsRGlnaXRzVHJpbW1lZCA9ICt0cmltbWVkRGVjaW1hbHM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG51bSxcclxuICAgICAgICBuOiBhYnNvbHV0ZVZhbHVlLFxyXG4gICAgICAgIGk6ICtpbnRlZ2VyRGlnaXRzLFxyXG4gICAgICAgIHY6IGZyYWN0aW9uYWxEaWdpdHNMZW5ndGggfHwgMCxcclxuICAgICAgICB3OiBmcmFjdGlvbmFsRGlnaXRzVHJpbW1lZExlbmd0aCB8fCAwLFxyXG4gICAgICAgIGY6IGZyYWN0aW9uYWxEaWdpdHMgfHwgMCxcclxuICAgICAgICB0OiBmcmFjdGlvbmFsRGlnaXRzVHJpbW1lZCB8fCAwLFxyXG4gICAgfTtcclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gcGx1cmFsQ29uZmlnREUocGFyYW1zKSB7XHJcbiAgICBpZiAocGFyYW1zLmkgPT09IDEgJiYgcGFyYW1zLnYgPT09IDApIHtcclxuICAgICAgICByZXR1cm4gJ29uZSc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJ290aGVyJztcclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gcGx1cmFsQ29uZmlnRU4ocGFyYW1zKSB7XHJcbiAgICBpZiAocGFyYW1zLmkgPT09IDEgJiYgcGFyYW1zLnYgPT09IDApIHtcclxuICAgICAgICByZXR1cm4gJ29uZSc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJ290aGVyJztcclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gcGx1cmFsQ29uZmlnRlIocGFyYW1zKSB7XHJcbiAgICBpZiAocGFyYW1zLmkgPT09IDAgfHwgcGFyYW1zLmkgPT09IDEpIHtcclxuICAgICAgICByZXR1cm4gJ29uZSc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJ290aGVyJztcclxufVxyXG4iLCJpbXBvcnQgeyBiZXR3ZWVuIH0gZnJvbSAnLi9fY29tbW9uJztcclxuZXhwb3J0IGZ1bmN0aW9uIHBsdXJhbENvbmZpZ0hSKHBhcmFtcykge1xyXG4gICAgY29uc3QgaU1vZDEwID0gcGFyYW1zLmkgJSAxMDtcclxuICAgIGNvbnN0IGlNb2QxMDAgPSBwYXJhbXMuaSAlIDEwMDtcclxuICAgIGNvbnN0IGZNb2QxMCA9IHBhcmFtcy5mICUgMTA7XHJcbiAgICBjb25zdCBmTW9kMTAwID0gcGFyYW1zLmYgJSAxMDA7XHJcbiAgICBpZiAoKHBhcmFtcy52ID09PSAwICYmIGlNb2QxMCA9PT0gMSAmJiBpTW9kMTAwICE9PSAxMSkgfHwgKGZNb2QxMCA9PT0gMSAmJiBmTW9kMTAwICE9PSAxMSkpIHtcclxuICAgICAgICByZXR1cm4gJ29uZSc7XHJcbiAgICB9XHJcbiAgICBpZiAoKHBhcmFtcy52ID09PSAwICYmIGJldHdlZW4oaU1vZDEwLCAyLCA0KSAmJiAhYmV0d2VlbihpTW9kMTAwLCAxMiwgMTQpKSB8fCAoYmV0d2VlbihmTW9kMTAsIDIsIDQpICYmICFiZXR3ZWVuKGZNb2QxMDAsIDEyLCAxNCkpKSB7XHJcbiAgICAgICAgcmV0dXJuICdmZXcnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICdvdGhlcic7XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHBsdXJhbENvbmZpZ0lUKHBhcmFtcykge1xyXG4gICAgaWYgKHBhcmFtcy5pID09PSAxICYmIHBhcmFtcy52ID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuICdvbmUnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICdvdGhlcic7XHJcbn1cclxuIiwiaW1wb3J0IHsgYmV0d2VlbiB9IGZyb20gJy4vX2NvbW1vbic7XHJcbmV4cG9ydCBmdW5jdGlvbiBwbHVyYWxDb25maWdTTChwYXJhbXMpIHtcclxuICAgIGlmIChwYXJhbXMudiA9PT0gMCAmJiBwYXJhbXMuaSAlIDEwMCA9PT0gMSkge1xyXG4gICAgICAgIHJldHVybiAnb25lJztcclxuICAgIH1cclxuICAgIGlmIChwYXJhbXMudiA9PT0gMCAmJiBwYXJhbXMuaSAlIDEwMCA9PT0gMikge1xyXG4gICAgICAgIHJldHVybiAndHdvJztcclxuICAgIH1cclxuICAgIGlmICgocGFyYW1zLnYgPT09IDAgJiYgYmV0d2VlbihwYXJhbXMuaSAlIDEwMCwgMywgNCkpIHx8IHBhcmFtcy52ICE9PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuICdmZXcnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICdvdGhlcic7XHJcbn1cclxuIiwidmFyIF9hO1xyXG4vKipcclxuICogQ2xhc3Mgd2l0aCBoZWxwZXIgbWV0aG9kcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBIZWxwZXJzIHtcclxufVxyXG5fYSA9IEhlbHBlcnM7XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhbGwgcHJvcGVydGllcyAoYWxzbyBpbiBpbm5lciBvYmplY3RzIGFuZCBhcnJheXMpIGZyb20gc25ha2VfcHJvcGVydHlfbmFtZSB0byBjYW1lbFByb3BlcnR5TmFtZS5cclxuICogQHBhcmFtIHByb3ZpZGVyU2V0dGluZ3Mgc2V0dGluZyBvYmplY3QsIHdoaWNoIGlzIHR5cGVkIGFzIGFueSwgYXMgaXQgbWF5IGNvbWUgd2l0aCBkaWZmZXJlbnQgZm9ybWF0LiBDaGVja2luZyB3aGV0aGVyXHJcbiAqICBzZXR0aW5ncyBvYmplY3QgaXMgY29ycmVjdCBhbmQgY29udGFpbnMgYWxsIHZhbHVlcyByZXF1aXJlZCBieSBjb25jcmV0ZSBwcm92aWRlciBpcyBkb25lIGxhdGVyLlxyXG4gKiBAcmV0dXJucyBQcm92aWRlclNldHRpbmdzIG9iamVjdC5cclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbkhlbHBlcnMuc25ha2VQcm9wZXJ0aWVzVG9DYW1lbCA9IChwcm92aWRlclNldHRpbmdzKSA9PiB7XHJcbiAgICBsZXQgY29udmVydGVkU2V0dGluZ3MgPSBwcm92aWRlclNldHRpbmdzO1xyXG4gICAgaWYgKCFjb252ZXJ0ZWRTZXR0aW5ncykge1xyXG4gICAgICAgIHJldHVybiBjb252ZXJ0ZWRTZXR0aW5ncztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGVvZiAocHJvdmlkZXJTZXR0aW5ncykgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgaWYgKHByb3ZpZGVyU2V0dGluZ3MgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICBjb252ZXJ0ZWRTZXR0aW5ncyA9IHByb3ZpZGVyU2V0dGluZ3MubWFwKF9hLnNuYWtlUHJvcGVydGllc1RvQ2FtZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29udmVydGVkU2V0dGluZ3MgPSB7fTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eU5hbWUgaW4gcHJvdmlkZXJTZXR0aW5ncykge1xyXG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChwcm92aWRlclNldHRpbmdzLCBwcm9wZXJ0eU5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lLnJlcGxhY2UoLyhfXFx3KS9nLCBrID0+IGtbMV0udG9VcHBlckNhc2UoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udmVydGVkU2V0dGluZ3NbbmV3UHJvcGVydHlOYW1lXSA9IF9hLnNuYWtlUHJvcGVydGllc1RvQ2FtZWwocHJvdmlkZXJTZXR0aW5nc1twcm9wZXJ0eU5hbWVdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjb252ZXJ0ZWRTZXR0aW5ncztcclxufTtcclxuIiwiLyoqXHJcbiAqIENsYXNzIHVzZWQgZm9yIGxvZ2dpbmcgaW5mb3JtYXRpb24gdG8gYnJvd3NlciBjb25zb2xlLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExvZ2dlciB7XHJcbiAgICAvKipcclxuICAgICAqIExvZ3MgaW5mb3JtYXRpb24gYXMgYW4gZXJyb3IuXHJcbiAgICAgKiBAcGFyYW0gZXJyb3IgaW5mb3JtYXRpb24gdG8gYmUgZGlzcGxheWVkLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZXJyb3IoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGAqKiogS29nbml0aXYgUGF5bWVudCAqKipgKTtcclxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBNZXNzYWdlOiAke2Vycm9yLm1lc3NhZ2V9YCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFN0YWNrOiAke2Vycm9yLnN0YWNrfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgTWVzc2FnZTogJHtlcnJvcn1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgKioqIEtvZ25pdGl2IFBheW1lbnQgKioqYCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIExvZ3MgaW5mb3JtYXRpb24gYXMgYW4gaW5mbyAoaWYgaXNEZWJ1Z0ZsYWcgcHJvcGVydHkgaXMgc2V0IHRvIHRydWUpLlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGluZm8oLi4ubWVzc2FnZSkge1xyXG4gICAgICAgIGlmICghTG9nZ2VyLmlzRGVidWdNb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2cuY2FsbChjb25zb2xlLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICogRmxhZyBkZXRlcm1pbmluZyB3aGV0aGVyIGluZm9ybWF0aW9uIHdpbGwgYmUgd3JpdHRlbiBpbiBjb25zb2xlIG9yIG5vdCAoZXJyb3JzIGFyZSBsb2dnZWQgaW4gZWl0aGVyIGNhc2UpLlxyXG4gKi9cclxuTG9nZ2VyLmlzRGVidWdNb2RlID0gZmFsc2U7XHJcbiIsImltcG9ydCB7IERhdGF0cmFuc0xpZ2h0Qm94UHJvdmlkZXIgfSBmcm9tICcuLi9kYXRhdHJhbnMvbGlnaHRib3gvZGF0YXRyYW5zLWxpZ2h0Ym94LXByb3ZpZGVyJztcclxuaW1wb3J0IHsgUGNpUHJveHlTZWN1cmVGaWVsZHNKU1Byb3ZpZGVyIH0gZnJvbSAnLi4vcGNpcHJveHkvcGNpLXByb3h5LXNlY3VyZS1maWVsZHMtanMtcHJvdmlkZXInO1xyXG5pbXBvcnQgeyBTaGlmdDRQcm92aWRlciB9IGZyb20gJy4uL3NoaWZ0NC9zaGlmdDQtcHJvdmlkZXInO1xyXG4vKipcclxuICogRmFjdG9yeSB1c2VkIGZvciBjcmVhdGluZyBjb25jcmV0ZSBLb2duaXRpdiBQcm92aWRlci5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBQcm92aWRlckZhY3Rvcnkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGluc3RhbmNlIG9mIGNvbmNyZXRlIEtvZ25pdGl2IFByb3ZpZGVyLCBiYXNlZCBvbiBzdXBwbGllZCBwcm92aWRlciBjb2RlLlxyXG4gICAgICogQHBhcmFtIHByb3ZpZGVyQ29kZSBJbnRlcm5hbCBLb2duaXRpdiBQcm92aWRlciBjb2RlLlxyXG4gICAgICogQHJldHVybnMge0tvZ25pdGl2UHJvdmlkZXJ9IENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIEtvZ25pdGl2UHJvdmlkZXIgb3IgdW5kZWZpbmVkLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlUHJvdmlkZXIocHJvdmlkZXJTZXR0aW5ncykge1xyXG4gICAgICAgIGZvciAoY29uc3QgY3JlYXRvciBvZiBQcm92aWRlckZhY3RvcnkuY3JlYXRvcnMpIHtcclxuICAgICAgICAgICAgaWYgKGNyZWF0b3IucHJvdmlkZXJDb2Rlcy5zb21lKGNvZGUgPT4gUHJvdmlkZXJGYWN0b3J5LmlzRXF1YWwoY29kZSwgcHJvdmlkZXJTZXR0aW5ncy5wcm92aWRlcikpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRvci5jcmVhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGlzRXF1YWwobmFtZTEsIG5hbWUyKSB7XHJcbiAgICAgICAgaWYgKCFuYW1lMSB8fCAhbmFtZTIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmFtZTEudG9Mb3dlckNhc2UoKSA9PT0gbmFtZTIudG9Mb3dlckNhc2UoKTtcclxuICAgIH1cclxufVxyXG5Qcm92aWRlckZhY3RvcnkuY3JlYXRvcnMgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdmlkZXJDb2RlczogWydkYXRhdHJhbnNQYXknLCAnZGF0YXRyYW5zJ10sXHJcbiAgICAgICAgY3JlYXRlOiAoKSA9PiBuZXcgRGF0YXRyYW5zTGlnaHRCb3hQcm92aWRlcigpLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwcm92aWRlckNvZGVzOiBbJ3BjaXByb3h5J10sXHJcbiAgICAgICAgY3JlYXRlOiAoKSA9PiBuZXcgUGNpUHJveHlTZWN1cmVGaWVsZHNKU1Byb3ZpZGVyKCksXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHByb3ZpZGVyQ29kZXM6IFsnc2hpZnQ0J10sXHJcbiAgICAgICAgY3JlYXRlOiAoKSA9PiBuZXcgU2hpZnQ0UHJvdmlkZXIoKSxcclxuICAgIH0sXHJcbl07XHJcbiIsImltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcclxuaW1wb3J0IHsgS29nbml0aXZQcm92aWRlciB9IGZyb20gJy4uLy4uL2luZnJhc3RydWN0dXJlL3Byb3ZpZGVyLmNsYXNzJztcclxuLyoqXHJcbiAqIERhdGF0cmFucyBLb2duaXRpdiBwcm92aWRlci5cclxuICogQGV4dGVuZHMgS29nbml0aXZQcm92aWRlclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERhdGF0cmFuc0xpZ2h0Qm94UHJvdmlkZXIgZXh0ZW5kcyBLb2duaXRpdlByb3ZpZGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogSW5zdGFudGlhdGVzIERhdGF0cmFucyBLb2duaXRpdiBQcm92aWRlciBjbGFzcy5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmRhdGF0cmFuc1NjcmlwdFVybCA9ICcnO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBQcmVwYXJlcyBhbmQgaW5pdGlhbGl6ZXMgRGF0YXRyYW5zIEtvZ25pdGl2IFByb3ZpZGVyLlxyXG4gICAgICogRHVyaW5nIGluaXRpYWxpemF0aW9uLCBjdXN0b20gcGF5bWVudCBwcm92aWRlciBqYXZhc2NyaXB0IGZpbGVzIGFyZSBsb2FkZWQuXHJcbiAgICAgKiBAcGFyYW0gcHJvdmlkZXJTZXR0aW5ncyBjb25maWd1cmF0aW9uIGRhdGEgZm9yIHByb3ZpZGVyLlxyXG4gICAgICogQHBhcmFtIHNldHRpbmdzIGNvbmZpZ3VyYXRpb24gZGF0YSBmb3IgS29nbml0aXYgUGF5bWVudCBMaWJyYXJ5LlxyXG4gICAgICogQG92ZXJyaWRlXHJcbiAgICAgKi9cclxuICAgIGluaXQocHJvdmlkZXJTZXR0aW5ncywgc2V0dGluZ3MpIHtcclxuICAgICAgICB0aGlzLmRhdGF0cmFuc1NjcmlwdFVybCA9IHByb3ZpZGVyU2V0dGluZ3MuaXNUZXN0TW9kZVxyXG4gICAgICAgICAgICA/IGVudmlyb25tZW50LmRhdGF0cmFuc0RldkxpYlVybFxyXG4gICAgICAgICAgICA6IGVudmlyb25tZW50LmRhdGF0cmFuc1Byb2RMaWJVcmw7XHJcbiAgICAgICAgdGhpcy5maWxsU2NyaXB0c1RvQmVMb2FkZWQoKTtcclxuICAgICAgICB0aGlzLnByb3ZpZGVyU2V0dGluZ3MgPSBwcm92aWRlclNldHRpbmdzO1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB0aGlzLnNldERlZmF1bHRzKCk7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkoJ2luaXQnLCAnc3RhcnQnKTtcclxuICAgICAgICAvLyBjaGVjayByZXF1aXJlZCBzZXR0aW5nc1xyXG4gICAgICAgIGNvbnN0IHNldHRpbmdFcnJvcnMgPSB0aGlzLmNoZWNrU2V0dGluZ3ModGhpcy5wcm92aWRlclNldHRpbmdzKTtcclxuICAgICAgICBpZiAoc2V0dGluZ0Vycm9ycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5KCdpbml0JywgJ2Vycm9yJywgc2V0dGluZ0Vycm9ycyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBsb2FkIGRhdGF0cmFucyBzY3JpcHRzXHJcbiAgICAgICAgdGhpcy5sb2FkU2NyaXB0cygpXHJcbiAgICAgICAgICAgIC50aGVuKF8gPT4gdGhpcy5jbGllbnRTY3JpcHRzTG9hZFN1Y2Nlc3MoKSwgKGVycm9yTWVzc2FnZSkgPT4gdGhpcy5jbGllbnRTY3JpcHRzTG9hZEZhaWwoZXJyb3JNZXNzYWdlKSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENsb3NlcyB0aGUgbW9kYWwgcG9wdXAuIE1vZGFsIGRpYWxvZyBpcyBjb21wbGV0ZWx5IG1hbmFnZWQgYnkgRGF0YXRyYW5zIChjcmVhdGluZyBET00gYW5kXHJcbiAgICAgKiBpbmplY3RpbmcgaW50byBkb2N1bWVudCksIHNvIGNhbGxpbmcgaXRzIG1ldGhvZCAnY2xvc2UnIHRvIHJlbW92ZSBpdC4gQXMgdGhpcyBtZXRob2QgaXNcclxuICAgICAqIG5vdCBkb2N1bWVudGVkLCB0aGUgY2hlY2sgd2hldGhlciBleGlzdHMgb3Igbm90IGlzIG5lY2Vzc2FyeS5cclxuICAgICAqIEBvdmVycmlkZVxyXG4gICAgICovXHJcbiAgICBjbG9zZU1vZGFsKCkge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAoKF9hID0gd2luZG93LkRhdGF0cmFucykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNsb3NlKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAoX2IgPSB3aW5kb3cuRGF0YXRyYW5zKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYW5kIHJlc2V0cyBzZXR0aW5ncywgY2FsbGJhY2sgYW5kIGxvYWRlZCBzY3JpcHRzLlxyXG4gICAgICogQG92ZXJyaWRlXHJcbiAgICAgKi9cclxuICAgIHJlc2V0KG9yaWcpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MgJiYgIXRoaXMucHJvdmlkZXJTZXR0aW5ncykge1xyXG4gICAgICAgICAgICAvLyBpZiB3ZSB3ZXJlIGFscmVhZHkgcmVzZXQsIHdlIGRvbid0IGRvIGl0IGFnYWluLiBDb3VsZCBjYXVzZSBpc3N1ZXMuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnByb3ZpZGVyU2V0dGluZ3MgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgLy8gaWYgdGhlIHVzZXIgY2xvc2VzIHRoZSBwb3B1cCwgRGF0YXRyYW5zIHRha2VzIGNhcmUgYWJvdXQgcmVtb3ZpbmcgaXQuXHJcbiAgICAgICAgaWYgKCEob3JpZyA9PT0gbnVsbCB8fCBvcmlnID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcmlnLnRyaWdnZXIpIHx8IChvcmlnLnRyaWdnZXIub3BlcmF0aW9uICE9PSAncG9wdXAnICYmIG9yaWcudHJpZ2dlci5zdGF0dXMgIT09ICdjbG9zZWQnKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFudXBEb20oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51bmxvYWRTY3JpcHRzKCk7XHJcbiAgICAgICAgdGhpcy5zY3JpcHRzID0gW107XHJcbiAgICB9XHJcbiAgICAvLyAqKioqKioqKioqKioqKipcclxuICAgIC8vIFByb3RlY3RlZCBtZXRob2RzXHJcbiAgICAvLyAqKioqKioqKioqKioqKipcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBkZWZhdWx0IHZhbHVlIGZvciBjb25maWd1cmF0aW9uIGVudHJpZXMgd2hpY2ggd2VyZSBub3Qgc3BlY2lmaWVkLlxyXG4gICAgICovXHJcbiAgICBzZXREZWZhdWx0cygpIHtcclxuICAgICAgICBzdXBlci5zZXREZWZhdWx0cygpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwbGF5cyBlcnJvciBpbiBjb25zb2xlIGFuZCBub3RpZmllcyBwYXJlbnQgYnkgY2FsbGJhY2sgbWV0aG9kLlxyXG4gICAgICogQHBhcmFtIG9wZXJhdGlvbiB0eXBlIG9mIG9wZXJhdGlvbiAoaW5pdCwgcGF5bWVudClcclxuICAgICAqIEBwYXJhbSBzdGF0dXMgc3RhdHVzIG9mIG9wZXJhdGlvbiAoc3RhcnQsIHN1Y2Nlc3MsIGVycm9yKVxyXG4gICAgICogQHBhcmFtIGRhdGEgZGF0YSByZWxhdGVkIHRvIG9wZXJhdGlvbi5cclxuICAgICAqL1xyXG4gICAgbm90aWZ5KG9wZXJhdGlvbiwgc3RhdHVzLCBkYXRhKSB7XHJcbiAgICAgICAgc3VwZXIubm90aWZ5KG9wZXJhdGlvbiwgc3RhdHVzLCBkYXRhKTtcclxuICAgIH1cclxuICAgIC8vICoqKioqKioqKioqKioqKlxyXG4gICAgLy8gUHJpdmF0ZSBtZXRob2RzXHJcbiAgICAvLyAqKioqKioqKioqKioqKipcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBET00gZWxlbWVudHMgd2hpY2ggd2VyZSBjcmVhdGUgYnkgRGF0YXRyYW5zXHJcbiAgICAgKi9cclxuICAgIGNsZWFudXBEb20oKSB7XHJcbiAgICAgICAgY29uc3QgJGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYjcGF5bWVudEZyYW1lV3JhcHBlcicpO1xyXG4gICAgICAgIGlmICgkZWxlbWVudCkge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKCRlbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIERhdGF0cmFucyBwcm92aWRlciwgd2hpY2ggY2F1c2VzIHJlbmRlcmluZyBpdHMgVUkgaW4gaHRtbC5cclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZURhdGF0cmFucygpIHtcclxuICAgICAgICBpZiAoZW52aXJvbm1lbnQuaXNEZXYpIHtcclxuICAgICAgICAgICAgLy8gdGhlIGVudHJ5IGluIGxvY2FsIHN0b3JhZ2UgaXMgdXNlZCBvbmx5IGluIHRlc3RpbmcgYXBwbGljYXRpb24sIGZvciBnZW5lcmF0aW9uXHJcbiAgICAgICAgICAgIC8vIGN1cmwsIHdoaWNoIGNhbiBiZSB1c2VkIGZvciBnZXR0aW5nIHJlc3VsdHMgb2YgcGF5bWVudFxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGF0YXRyYW5zVHJhbnNhY3Rpb25JZCcsIHRoaXMucHJvdmlkZXJTZXR0aW5ncy50cmFuc2FjdGlvbi5pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRhdGF0cmFuc1NldHRpbmdzID0ge1xyXG4gICAgICAgICAgICB0cmFuc2FjdGlvbklkOiB0aGlzLnByb3ZpZGVyU2V0dGluZ3MudHJhbnNhY3Rpb24uaWQsXHJcbiAgICAgICAgICAgICdsb2FkZWQnOiAoKSA9PiB7IHRoaXMubm90aWZ5KCdpbml0JywgJ3N1Y2Nlc3MnKTsgfSxcclxuICAgICAgICAgICAgJ2Nsb3NlZCc6ICgpID0+IHsgdGhpcy5ub3RpZnkoJ3BvcHVwJywgJ2Nsb3NlZCcpOyB0aGlzLnJlc2V0KCk7IH0sXHJcbiAgICAgICAgICAgICdlcnJvcic6ICgpID0+IHsgdGhpcy5ub3RpZnkoJ3BheW1lbnQnLCAnZXJyb3InLCBbJ1RPRE8gLSBlcnJvciBkdXJpbmcgcGF5bWVudCddKTsgdGhpcy5yZXNldCgpOyB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgd2luZG93LkRhdGF0cmFucy5zdGFydFBheW1lbnQoZGF0YXRyYW5zU2V0dGluZ3MpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3Mgd2hldGhlciBhbGwgcmVxdWlyZWQgc2V0dGluZyB2YWx1ZXMgd2VyZSBzdXBwbGllZFxyXG4gICAgICogQHBhcmFtIHByb3ZpZGVyU2V0dGluZ3Mgc2V0dGluZyB2YWx1ZXMgZm9yIHByb3ZpZGVyLlxyXG4gICAgICogQHJldHVybnMgc3RyaW5nIGFycmF5LCBmaWxsZWQgYnkgZXJyb3IgbWVzc2FnZXMgKG9yIGVtcHR5IGlmIG5vIGVycm9yIHdhcyBmb3VuZCkuXHJcbiAgICAgKi9cclxuICAgIGNoZWNrU2V0dGluZ3MocHJvdmlkZXJTZXR0aW5ncykge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSBbXTtcclxuICAgICAgICBpZiAoIXByb3ZpZGVyU2V0dGluZ3MpIHtcclxuICAgICAgICAgICAgZXJyb3JzLnB1c2goJ05vIHNldHRpbmdzIGZvciBEYXRhdHJhbnMgd2VyZSBmb3VuZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNhY3Rpb25JZCA9IChfYSA9IHRoaXMucHJvdmlkZXJTZXR0aW5ncy50cmFuc2FjdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlkO1xyXG4gICAgICAgICAgICBpZiAoIXRyYW5zYWN0aW9uSWQpIHtcclxuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKCdUcmFuc2FjdGlvbiBpZCBtdXN0IGJlIHNwZWNpZmllZCBmb3IgRGF0YXRyYW5zJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVycm9ycztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgRGF0YXRyYW5zLCBhZnRlciBzY3JpcHRzIHdlcmUgc3VjY2Vzc2Z1bGx5IGxvYWRlZC5cclxuICAgICAqL1xyXG4gICAgY2xpZW50U2NyaXB0c0xvYWRTdWNjZXNzKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZURhdGF0cmFucygpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwbGF5cyBlcnJvciwgd2hpY2ggb2NjdXJyZWQgZHVyaW5nIHNjcmlwdCBsb2FkaW5nLlxyXG4gICAgICogQHBhcmFtIGVyciBlcnJvciBtZXNzYWdlLlxyXG4gICAgICovXHJcbiAgICBjbGllbnRTY3JpcHRzTG9hZEZhaWwoZXJyKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkoJ2luaXQnLCAnZXJyb3InLCBbZXJyXSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFByZXBhcmVzIGFycmF5IG9mIHNjcmlwdHMsIHdoaWNoIG5lZWRzIHRvIGJlIGxvYWRlZC5cclxuICAgICAqL1xyXG4gICAgZmlsbFNjcmlwdHNUb0JlTG9hZGVkKCkge1xyXG4gICAgICAgIHRoaXMuc2NyaXB0cyA9IFtdO1xyXG4gICAgICAgIGlmICghdGhpcy5pc0RhdGF0cmFuc1NjcmlwdExvYWRlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NyaXB0cy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHNyYzogdGhpcy5kYXRhdHJhbnNTY3JpcHRVcmwsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVGVzdHMgd2hldGhlciBEYXRhdHJhbnMgc2NyaXB0IHdhcyBhbHJlYWR5IGxvYWRlZC5cclxuICAgICAqIEByZXR1cm5zIHRydWUsIGlmIERhdGF0cmFucyBzY3JpcHQgd2FzIGFscmVhZHkgbG9hZGVkLCBvdGhlcndpc2UgZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIGlzRGF0YXRyYW5zU2NyaXB0TG9hZGVkKCkge1xyXG4gICAgICAgIGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XHJcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHNjcmlwdHMpIHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuc3JjID09PSB0aGlzLmRhdGF0cmFuc1NjcmlwdFVybCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IGRldkVudmlyb25tZW50IH0gZnJvbSAnLi9kZXYtZW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBwcm9kRW52aXJvbm1lbnQgfSBmcm9tICcuL3Byb2QtZW52aXJvbm1lbnQnO1xyXG5leHBvcnQgY29uc3QgZW52aXJvbm1lbnQgPSBwcm9jZXNzLmVudlsnaXNfcHJvZHVjdGlvbiddXHJcbiAgICA/IHByb2RFbnZpcm9ubWVudFxyXG4gICAgOiBkZXZFbnZpcm9ubWVudDtcclxuIiwiZXhwb3J0IGNvbnN0IGRldkVudmlyb25tZW50ID0ge1xyXG4gICAgLy8gcHJvZCBvciBkZXYgdmVyc2lvbiBvYiB1cmwgaXMgZGV0ZXJtaW5lZCBkdXJpbmcgcnVudGltZVxyXG4gICAgZGF0YXRyYW5zUHJvZExpYlVybDogJ2h0dHBzOi8vcGF5LmRhdGF0cmFucy5jb20vdXBwL3BheW1lbnQvanMvZGF0YXRyYW5zLTIuMC4wLmpzJyxcclxuICAgIGRhdGF0cmFuc0RldkxpYlVybDogJ2h0dHBzOi8vcGF5LnNhbmRib3guZGF0YXRyYW5zLmNvbS91cHAvcGF5bWVudC9qcy9kYXRhdHJhbnMtMi4wLjAuanMnLFxyXG4gICAgcGNpUHJveHlTZlByb2RMaWJVcmw6ICdodHRwczovL3BheS5zYW5kYm94LmRhdGF0cmFucy5jb20vdXBwL3BheW1lbnQvanMvc2VjdXJlLWZpZWxkcy0yLjAuMC5taW4uanMnLFxyXG4gICAgcGNpUHJveHlTZkRldkxpYlVybDogJ2h0dHBzOi8vcGF5LnNhbmRib3guZGF0YXRyYW5zLmNvbS91cHAvcGF5bWVudC9qcy9zZWN1cmUtZmllbGRzLTIuMC4wLm1pbi5qcycsXHJcbiAgICBzaGlmdDRKUXVlcnlVcmw6ICdodHRwczovL2NvZGUuanF1ZXJ5LmNvbS9qcXVlcnktMy42LjAubWluLmpzJyxcclxuICAgIHNoaWZ0NExpYlVybDogJ2h0dHBzOi8vaTRtLmk0Z28uY29tL2pzL2pxdWVyeS5pNGdvVHJ1ZVRva2VuLmpzJyxcclxuICAgIHBheW1lbnRVcmw6ICdodHRwczovL3BheW1lbnQtZGV2LmtvZ25pdGl2LmNvbScsXHJcbiAgICBpc0RldjogdHJ1ZSxcclxufTtcclxuIiwiZXhwb3J0IGNvbnN0IHByb2RFbnZpcm9ubWVudCA9IHtcclxuICAgIC8vIHByb2Qgb3IgZGV2IHZlcnNpb24gb2IgdXJsIGlzIGRldGVybWluZWQgZHVyaW5nIHJ1bnRpbWVcclxuICAgIGRhdGF0cmFuc1Byb2RMaWJVcmw6ICdodHRwczovL3BheS5kYXRhdHJhbnMuY29tL3VwcC9wYXltZW50L2pzL2RhdGF0cmFucy0yLjAuMC5qcycsXHJcbiAgICBkYXRhdHJhbnNEZXZMaWJVcmw6ICdodHRwczovL3BheS5zYW5kYm94LmRhdGF0cmFucy5jb20vdXBwL3BheW1lbnQvanMvZGF0YXRyYW5zLTIuMC4wLmpzJyxcclxuICAgIHBjaVByb3h5U2ZQcm9kTGliVXJsOiAnaHR0cHM6Ly9wYXkuZGF0YXRyYW5zLmNvbS91cHAvcGF5bWVudC9qcy9zZWN1cmUtZmllbGRzLTIuMC4wLm1pbi5qcycsXHJcbiAgICBwY2lQcm94eVNmRGV2TGliVXJsOiAnaHR0cHM6Ly9wYXkuc2FuZGJveC5kYXRhdHJhbnMuY29tL3VwcC9wYXltZW50L2pzL3NlY3VyZS1maWVsZHMtMi4wLjAubWluLmpzJyxcclxuICAgIHNoaWZ0NEpRdWVyeVVybDogJ2h0dHBzOi8vc3RhdGljLnNlZWtkYS5jb20vYXNzZXRzL2pzL2pxdWVyeS0zLjYuMC5taW4uanMnLFxyXG4gICAgc2hpZnQ0TGliVXJsOiAnaHR0cHM6Ly9pNG0uaTRnby5jb20vanMvanF1ZXJ5Lmk0Z29UcnVlVG9rZW4uanMnLFxyXG4gICAgcGF5bWVudFVybDogJ2h0dHBzOi8vcGF5bWVudC5rb2duaXRpdi5jb20nLFxyXG4gICAgaXNEZXY6IGZhbHNlLFxyXG59O1xyXG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4vbG9nZ2VyLmNsYXNzJztcclxuLyoqXHJcbiAqIEdlbmVyaWMgS29nbml0aXYgUHJvdmlkZXIuIFRoZSBhYnN0cmFjdCBjbGFzcyBpcyBoZWxwaW5nIHRvIGltcGxlbWVudCB2YXJpb3VzIHBheW1lbnQgcHJvdmlkZXJzLFxyXG4gKiBieSBsb2FkaW5nIGl0cyBzY3JpcHRzLCBzdHlsZXMsIGluamVjdGluZyBodG1sIGVsZW1lbnRzLCBjYWxsaW5nIGV4dGVybmFsIEFQSSwgc2VuZGluZyBub3RpZmljYXRpb25zLi4uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgS29nbml0aXZQcm92aWRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTY3JpcHRzLCBuZWVkZWQgYnkgcHJvdmlkZXIsIHRvIGJlIGxvYWRlZCBieSBLb2duaXRpdiBQcm92aWRlci5cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNjcmlwdHMgPSBbXTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTY3JpcHRzIHdoaWNoIHdlcmUgbG9hZGVkIGJ5IEtvZ25pdGl2IFByb3ZpZGVyLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubG9hZGVkU2NyaXB0cyA9IFtdO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwbGF5cyBlcnJvciBpbiBjb25zb2xlIGFuZCBub3RpZmllcyBwYXJlbnQgYnkgY2FsbGJhY2sgbWV0aG9kLlxyXG4gICAgICogQHBhcmFtIG9wZXJhdGlvbiB0eXBlIG9mIG9wZXJhdGlvbiAoaW5pdCwgcGF5bWVudClcclxuICAgICAqIEBwYXJhbSBzdGF0dXMgc3RhdHVzIG9mIG9wZXJhdGlvbiAoc3RhcnQsIHN1Y2Nlc3MsIGVycm9yKVxyXG4gICAgICogQHBhcmFtIGRhdGEgZGF0YSByZWxhdGVkIHRvIG9wZXJhdGlvbi5cclxuICAgICAqIEBwYXJhbSByYXdEYXRhIGRhdGEgcmV0dXJuZWQgZnJvbSBwYXltZW50IHByb3ZpZGVyLlxyXG4gICAgICovXHJcbiAgICBub3RpZnkob3BlcmF0aW9uLCBzdGF0dXMsIGRhdGEsIHJhd0RhdGEpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2Vycm9yJyAmJiAoKF9hID0gdGhpcy5zZXR0aW5ncykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmRlYnVnKSkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYE9wZXJhdGlvbjogJHtvcGVyYXRpb259OyBzdGF0dXM6ICR7c3RhdHVzfTsgZGF0YTogJHtkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRhdGEudG9TdHJpbmcoKX07IHJhdyBkYXRhOiAke3Jhd0RhdGEgPT09IG51bGwgfHwgcmF3RGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmF3RGF0YS50b1N0cmluZygpfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3MuY2FsbGJhY2tNZXRob2QgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5jYWxsYmFja01ldGhvZCh7IG9wZXJhdGlvbiwgc3RhdHVzLCBkYXRhLCByYXdEYXRhIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgc2NyaXB0cyBuZWVkZWQgZm9yIEtvZ25pdGl2IFByb3ZpZGVyLlxyXG4gICAgICogQHJldHVybnMgUHJvbWlzZSBjb250YWluaW5nIHN0cmluZyB3aXRoIHJlc3VsdCBvZiBzY3JpcHRzIGxvYWRpbmcuXHJcbiAgICAgKi9cclxuICAgIGxvYWRTY3JpcHRzKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNjcmlwdHMucmVkdWNlKChwcm9taXNlLCBzY3JpcHQpID0+IHByb21pc2UudGhlbigoKSA9PiB0aGlzLmxvYWRTY3JpcHQoc2NyaXB0KSksIFByb21pc2UucmVzb2x2ZSgnJykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGNsaWVudCBzY3JpcHQsIG5lZWRlZCBmb3IgcHJvdmlkZXIgKGluIGNhc2UgdGhleSB3ZXJlIGxvYWRlZCBieSB0aGlzIGNsYXNzKS5cclxuICAgICAqL1xyXG4gICAgdW5sb2FkU2NyaXB0cygpIHtcclxuICAgICAgICBjb25zdCBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xyXG4gICAgICAgIHRoaXMubG9hZGVkU2NyaXB0cy5mb3JFYWNoKHMgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNjcmlwdCBvZiBzY3JpcHRzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2NyaXB0LnNyYyA9PT0gcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmxvYWRlZFNjcmlwdHMgPSBbXTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBkZWZhdWx0IHZhbHVlcyB0byBzZXR0aW5nIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgc2V0RGVmYXVsdHMoKSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gKF9hID0gdGhpcy5zZXR0aW5ncykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDoge1xyXG4gICAgICAgICAgICBkZWJ1ZzogZmFsc2UsXHJcbiAgICAgICAgICAgIGV4dHJhOiB7fSxcclxuICAgICAgICAgICAgc3R5bGluZzoge30sXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLmRlYnVnID0gKF9iID0gdGhpcy5zZXR0aW5ncy5kZWJ1ZykgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5leHRyYSA9IHRoaXMuc2V0dGluZ3MuZXh0cmEgfHwge307XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5zdHlsaW5nID0gdGhpcy5zZXR0aW5ncy5zdHlsaW5nIHx8IHt9O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyBzY3JpcHQuXHJcbiAgICAgKiBAcGFyYW0gc2NyaXB0RGVmaW5pdGlvbiBTY3JpcHQgZGVmaW5pdGlvbiAodXJsLCBvdGhlciBhdHRyaWJ1dGVzKS5cclxuICAgICAqIEByZXR1cm5zIFByb21pc2UgY29udGFpbmluZyBzdHJpbmcgcmVzdWx0IG9mIHNjcmlwdCBsb2FkaW5nLlxyXG4gICAgICovXHJcbiAgICBsb2FkU2NyaXB0KHNjcmlwdERlZmluaXRpb24pIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcmlwdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICAgICAgc2NyaXB0RWxlbWVudC5zcmMgPSBzY3JpcHREZWZpbml0aW9uLnNyYztcclxuICAgICAgICAgICAgaWYgKCgoX2EgPSBzY3JpcHREZWZpbml0aW9uLmF0dHJpYnV0ZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc2NyaXB0RGVmaW5pdGlvbi5hdHRyaWJ1dGVzLmZvckVhY2goYXR0cmlidXRlID0+IHNjcmlwdEVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZS5rZXksIGF0dHJpYnV0ZS52YWx1ZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNjcmlwdEVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvamF2YXNjcmlwdCcpO1xyXG4gICAgICAgICAgICBzY3JpcHRFbGVtZW50LmFzeW5jID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNjcmlwdEVsZW1lbnQub25sb2FkID0gKCkgPT4geyB0aGlzLmxvYWRlZFNjcmlwdHMucHVzaChzY3JpcHREZWZpbml0aW9uLnNyYyk7IHJlc29sdmUoJycpOyB9O1xyXG4gICAgICAgICAgICBzY3JpcHRFbGVtZW50Lm9uZXJyb3IgPSAoKSA9PiB7IHJlamVjdChgU2NyaXB0ICR7c2NyaXB0RGVmaW5pdGlvbi5zcmN9IGZhaWxlZCB0byBsb2FkYCk7IH07XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0RWxlbWVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBMYW5nU2VydmljZSB9IGZyb20gJy4uLy4uL2xhbmctc2VydmljZS9sYW5nLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBLb2duaXRpdlByb3ZpZGVyIH0gZnJvbSAnLi4vaW5mcmFzdHJ1Y3R1cmUvcHJvdmlkZXIuY2xhc3MnO1xyXG5jb25zdCBnZXRJbnB1dEZvbnRTaXplID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY3VycmVudFdpZHRoID0gd2luZG93Lm91dGVyV2lkdGg7XHJcbiAgICBpZiAoY3VycmVudFdpZHRoIDwgMzAwKSB7XHJcbiAgICAgICAgcmV0dXJuICcxMnB4JztcclxuICAgIH1cclxuICAgIHJldHVybiBjdXJyZW50V2lkdGggPCA0MDBcclxuICAgICAgICA/ICcxNHB4J1xyXG4gICAgICAgIDogJzE3cHgnO1xyXG59O1xyXG4vKipcclxuICogUGNpIFByb3h5IFNlY3VyZSBGaWVsZHMgSlMgS29nbml0aXYgcHJvdmlkZXIuXHJcbiAqIEBleHRlbmRzIEtvZ25pdGl2UHJvdmlkZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBQY2lQcm94eVNlY3VyZUZpZWxkc0pTUHJvdmlkZXIgZXh0ZW5kcyBLb2duaXRpdlByb3ZpZGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogSW5zdGFudGlhdGVzIFBjaSBQcm94eSBzZWN1cmUgZmllbGRzIEtvZ25pdGl2IFByb3ZpZGVyIGNsYXNzLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMucGNpUHJveHlTZlNjcmlwdFVybCA9ICcnO1xyXG4gICAgICAgIHRoaXMubGFuZyA9IExhbmdTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFByZXBhcmVzIGFuZCBpbml0aWFsaXplcyBQY2kgUHJveHkgU2VjdXJlIEZpZWxkcyBLb2duaXRpdiBQcm92aWRlci5cclxuICAgICAqIER1cmluZyBpbml0aWFsaXphdGlvbiwgY3VzdG9tIHBheW1lbnQgcHJvdmlkZXIgamF2YXNjcmlwdCBmaWxlcyBhcmUgbG9hZGVkLlxyXG4gICAgICogQHBhcmFtIHByb3ZpZGVyU2V0dGluZ3MgY29uZmlndXJhdGlvbiBkYXRhIGZvciBwcm92aWRlci5cclxuICAgICAqIEBwYXJhbSBzZXR0aW5ncyBjb25maWd1cmF0aW9uIGRhdGEgZm9yIEtvZ25pdGl2IFBheW1lbnQgTGlicmFyeS5cclxuICAgICAqIEBvdmVycmlkZVxyXG4gICAgICovXHJcbiAgICBpbml0KHByb3ZpZGVyU2V0dGluZ3MsIHNldHRpbmdzKSB7XHJcbiAgICAgICAgdGhpcy5wY2lQcm94eVNmU2NyaXB0VXJsID0gcHJvdmlkZXJTZXR0aW5ncy5pc1Rlc3RNb2RlXHJcbiAgICAgICAgICAgID8gZW52aXJvbm1lbnQucGNpUHJveHlTZkRldkxpYlVybFxyXG4gICAgICAgICAgICA6IGVudmlyb25tZW50LnBjaVByb3h5U2ZQcm9kTGliVXJsO1xyXG4gICAgICAgIHRoaXMuZmlsbFNjcmlwdHNUb0JlTG9hZGVkKCk7XHJcbiAgICAgICAgdGhpcy5wcm92aWRlclNldHRpbmdzID0gcHJvdmlkZXJTZXR0aW5ncztcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgdGhpcy5zZXREZWZhdWx0cygpO1xyXG4gICAgICAgIHRoaXMubm90aWZ5KCdpbml0JywgJ3N0YXJ0Jyk7XHJcbiAgICAgICAgLy8gY3JlYXRlIGVsZW1lbnRzIG5lZWRlZCBieSBQY2kgUHJveHkgU2VjdXJlIEZpZWxkXHJcbiAgICAgICAgdGhpcy5jcmVhdGVIdG1sRWxlbWVudHMoKTtcclxuICAgICAgICAvLyBtdXN0IGJlIGNhbGxlZCBhZnRlciBjcmVhdGluZyBodG1sIGVsZW1lbnRzLCBhcyBpdCB3b3JrcyB3aXRoIGxvYWRpbmcgYmFyXHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TG9hZGluZ0Jhcih0cnVlKTtcclxuICAgICAgICAvLyBjaGVjayByZXF1aXJlZCBzZXR0aW5nc1xyXG4gICAgICAgIGNvbnN0IHNldHRpbmdFcnJvcnMgPSB0aGlzLmNoZWNrU2V0dGluZ3ModGhpcy5wcm92aWRlclNldHRpbmdzKTtcclxuICAgICAgICBpZiAoc2V0dGluZ0Vycm9ycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUxvYWRpbmdCYXIoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLm5vdGlmeSgnaW5pdCcsICdlcnJvcicsIHNldHRpbmdFcnJvcnMpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbG9hZCBwY2lwcm94eSBzZWN1cmUgc2NyaXB0c1xyXG4gICAgICAgIHRoaXMubG9hZFNjcmlwdHMoKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmNsaWVudFNjcmlwdHNMb2FkU3VjY2VzcygpLCAoZXJyb3JNZXNzYWdlKSA9PiB0aGlzLmNsaWVudFNjcmlwdHNMb2FkRmFpbChlcnJvck1lc3NhZ2UpKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQ2xvc2VzIG1vZGFsIGRpYWxvZyBieSByZW1vdmluZyBwcmV2aW91c2x5IGNyZWF0ZWQgSFRNTCBlbGVtZW50cy5cclxuICAgICAqIEBvdmVycmlkZVxyXG4gICAgICovXHJcbiAgICBjbG9zZU1vZGFsKCkge1xyXG4gICAgICAgIHRoaXMuZGVsZXRlSHRtbEVsZW1lbnRzKCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYW5kIHJlc2V0cyBzZXR0aW5ncywgY2FsbGJhY2ssIGNyZWF0ZWQgSHRtbCBlbGVtZW50cyBhbmQgbG9hZGVkIHNjcmlwdHMuXHJcbiAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAqL1xyXG4gICAgcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnByb3ZpZGVyU2V0dGluZ3MgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy51bmxvYWRTY3JpcHRzKCk7XHJcbiAgICAgICAgdGhpcy5kZWxldGVIdG1sRWxlbWVudHMoKTtcclxuICAgICAgICB0aGlzLnNjcmlwdHMgPSBbXTtcclxuICAgIH1cclxuICAgIC8vICoqKioqKioqKioqKioqKlxyXG4gICAgLy8gUHJvdGVjdGVkICBtZXRob2RzXHJcbiAgICAvLyAqKioqKioqKioqKioqKipcclxuICAgIC8qKlxyXG4gICAgICogRGlzcGxheSBlcnJvciBpbiBjb25zb2xlIGFuZCBub3RpZmllcyBwYXJlbnQgYnkgY2FsbGJhY2sgbWV0aG9kLlxyXG4gICAgICogQHBhcmFtIG9wZXJhdGlvbiB0eXBlIG9mIG9wZXJhdGlvbiAoaW5pdCwgcGF5bWVudClcclxuICAgICAqIEBwYXJhbSBzdGF0dXMgc3RhdHVzIG9mIG9wZXJhdGlvbiAoc3RhcnQsIHN1Y2Nlc3MsIGVycm9yKVxyXG4gICAgICogQHBhcmFtIGRhdGEgc3RyaW5nIGFycmF5IHdpdGggYWRkaXRpb25hbCBpbmZvcm1hdGlvbi5cclxuICAgICAqL1xyXG4gICAgbm90aWZ5KG9wZXJhdGlvbiwgc3RhdHVzLCBkYXRhKSB7XHJcbiAgICAgICAgbGV0IHJhd0RhdGE7XHJcbiAgICAgICAgaWYgKG9wZXJhdGlvbiA9PT0gJ3BheW1lbnQnICYmIHN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIGRhdGEpIHtcclxuICAgICAgICAgICAgcmF3RGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLnRyYW5zbGF0ZShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIubm90aWZ5KG9wZXJhdGlvbiwgc3RhdHVzLCBkYXRhLCByYXdEYXRhKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGRlZmF1bHQgdmFsdWUgZm9yIGNvbmZpZ3VyYXRpb24gZW50cmllcyB3aGljaCB3ZXJlIG5vdCBzcGVjaWZpZWQuXHJcbiAgICAqL1xyXG4gICAgc2V0RGVmYXVsdHMoKSB7XHJcbiAgICAgICAgc3VwZXIuc2V0RGVmYXVsdHMoKTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLmxhbmd1YWdlID0gdGhpcy5zZXR0aW5ncy5sYW5ndWFnZSB8fCAnZW4nO1xyXG4gICAgfVxyXG4gICAgLy8gKioqKioqKioqKioqKioqXHJcbiAgICAvLyBQcml2YXRlIG1ldGhvZHNcclxuICAgIC8vICoqKioqKioqKioqKioqKlxyXG4gICAgLyoqXHJcbiAgICAqIENoZWNrcyB3aGV0aGVyIGFsbCByZXF1aXJlZCBzZXR0aW5nIHZhbHVlcyB3ZXJlIHN1cHBsaWVkXHJcbiAgICAqIEBwYXJhbSBwcm92aWRlclNldHRpbmdzIHNldHRpbmcgdmFsdWVzIGZvciBwcm92aWRlci5cclxuICAgICogQHJldHVybnMgc3RyaW5nIGFycmF5LCBmaWxsZWQgYnkgZXJyb3IgbWVzc2FnZXMgKG9yIGVtcHR5IGlmIG5vIGVycm9yIHdhcyBmb3VuZCkuXHJcbiAgICAqL1xyXG4gICAgY2hlY2tTZXR0aW5ncyhwcm92aWRlclNldHRpbmdzKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gW107XHJcbiAgICAgICAgaWYgKCFwcm92aWRlclNldHRpbmdzKSB7XHJcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKCdObyBzZXR0aW5ncyBmb3IgUGNpIFByb3h5IFNlY3VyZSBGaWVsZHMgd2VyZSBmb3VuZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZXJyb3JzO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwbGF5cyBlcnJvciwgd2hpY2ggb2NjdXJyZWQgZHVyaW5nIHNjcmlwdCBsb2FkaW5nLlxyXG4gICAgICogQHBhcmFtIGVyciBlcnJvciBtZXNzYWdlLlxyXG4gICAgICovXHJcbiAgICBjbGllbnRTY3JpcHRzTG9hZEZhaWwoZXJyKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TG9hZGluZ0JhcihmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkoJ2luaXQnLCAnZXJyb3InLCBbZXJyXSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHBjaXByb3h5IHNlY3VyZSBmaWVsZHMgcHJvdmlkZXIsIGFmdGVyIHNjcmlwdHMgd2VyZSBzdWNjZXNzZnVsbHkgbG9hZGVkLlxyXG4gICAgICovXHJcbiAgICBjbGllbnRTY3JpcHRzTG9hZFN1Y2Nlc3MoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplUGNpUHJveHlTZigpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuZCBpbmplY3RzIGh0bWwgZWxlbWVudHMgKGVzcGVjaWFsbHkgZGl2LCB3aGVyZSBQY2kgUHJveHkgc2VjdXJlIGZpZWxkcyB3aWxsIHJlbmRlciBpdHMgVUkpLCBuZWVkZWQgZm9yXHJcbiAgICAgKiBQY2kgUHJveHkgc2VjdXJlIGZpZWxkcyBwcm92aWRlciwgaW50byBodG1sIGRvY3VtZW50LlxyXG4gICAgICovXHJcbiAgICBjcmVhdGVIdG1sRWxlbWVudHMoKSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICAvLyBnZXQgZGVmYXVsdCBzdHlsZSB2YWx1ZXNcclxuICAgICAgICBjb25zdCBiYWNrRHJvcENvbG9yID0gKF9hID0gdGhpcy5zZXR0aW5ncy5zdHlsaW5nLmJhY2tkcm9wQ29sb3IpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICcjMzAzMDM4YjMnO1xyXG4gICAgICAgIGNvbnN0IGxvYWRpbmdJbmRpY2F0b3JDb2xvciA9IChfYiA9IHRoaXMuc2V0dGluZ3Muc3R5bGluZy5sb2FkaW5nSW5kaWNhdG9yQ29sb3IpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6ICdzaWx2ZXInO1xyXG4gICAgICAgIGNvbnN0IGJvcmRlclJhZGl1cyA9ICcxMHB4JztcclxuICAgICAgICBjb25zdCB2YWxpZGF0aW9uU3R5bGluZyA9ICdjb2xvcjogI2Y5Nzc2ZDsgZm9udC1zaXplOiAxMnB4OyBwYWRkaW5nLXRvcDogNXB4Oyc7XHJcbiAgICAgICAgY29uc3Qgc3RyaW5ncyA9IHRoaXMuZ2V0U3RyaW5ncygpO1xyXG4gICAgICAgIC8vIEtvZ25pdGl2IFByb3ZpZGVyIHdpbGwgbmVlZCB0byBiZSByZW5kZXJlZCBpbiBtb2RhbFxyXG4gICAgICAgIGlmICghdGhpcy5pc0h0bWxFbGVtZW50c0NyZWF0ZWQoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIC8vIG1haW4gb3ZlcmxheVxyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgPSBgLmtvZ25pdGl2LXBheW1lbnQtbWFpbi1vdmVybGF5IHsgcG9zaXRpb246IGZpeGVkOyB0b3A6IDA7IGJvdHRvbTogMDsgbGVmdDogMDsgcmlnaHQ6IDA7IGJhY2tncm91bmQ6ICR7YmFja0Ryb3BDb2xvcn07IHotaW5kZXg6IDEwMDA7IH1gO1xyXG4gICAgICAgICAgICAvLyBwb3B1cFxyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gYC5rb2duaXRpdi1wYXltZW50LW1haW4tcG9wdXAgeyBtYXJnaW46IDcwcHggYXV0bzsgYmFja2dyb3VuZDogd2hpdGU7IGJvcmRlci1yYWRpdXM6ICR7Ym9yZGVyUmFkaXVzfTsgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7IHBhZGRpbmctdG9wOiAxMHB4O2A7XHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSBgd2lkdGg6IDUwMHB4OyBtYXgtd2lkdGg6IDkwJTsgbWluLWhlaWdodDogNDIwcHg7IHBvc2l0aW9uOiByZWxhdGl2ZTsgfWA7XHJcbiAgICAgICAgICAgIC8vIGhlYWRlciBwYW5lbFxyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gYC5rb2duaXRpdi1wYXltZW50LWhlYWRlci1wYW5lbCB7IGJvcmRlci1yYWRpdXM6ICR7Ym9yZGVyUmFkaXVzfTsgcGFkZGluZy10b3A6IDRweDsgbWFyZ2luLXRvcDogMDsgbWFyZ2luLWxlZnQ6IDEwcHg7IG1hcmdpbi1yaWdodDogMTBweDtgO1xyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gYG1hcmdpbi1ib3R0b206IDEwcHg7IGhlaWdodDo2NHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmMGYwOyBjb2xvcjogYmxhY2s7IH1gO1xyXG4gICAgICAgICAgICAvLyBoZWFkZXJcclxuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MICs9IGAua29nbml0aXYtcGF5bWVudC1oZWFkZXItcGFuZWwgaDIgeyBtYXJnaW4tdG9wOiAxNXB4OyBtYXJnaW4tbGVmdDogMjRweDsgZm9udC1zaXplOiAyMHB4OyBjb2xvcjogYmxhY2s7IGA7XHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSBgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7IGxldHRlci1zcGFjaW5nOiAwLjFweDsgZm9udC13ZWlnaHQ6IDUwMDsgfWA7XHJcbiAgICAgICAgICAgIC8vIGhlYWRlciBjbG9zZSBidXR0b25cclxuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MICs9IGAua29nbml0aXYtcGF5bWVudC1oZWFkZXItcGFuZWwgLmtvZ25pdGl2LXBheW1lbnQtaGVhZGVyLWNsb3NlLWJ1dHRvbiB7IGZsb2F0OiByaWdodDsgbWFyZ2luLXRvcDogMTBweDsgbWFyZ2luLXJpZ2h0OiAyMHB4OyBgO1xyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gYGZvbnQtc2l6ZTogMzBweDsgY3Vyc29yOiBwb2ludGVyOyBjb2xvcjogZGFya2dyZXk7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgbGluZS1oZWlnaHQ6IG5vcm1hbDsgfWA7XHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSBgLmtvZ25pdGl2LXBheW1lbnQtaGVhZGVyLXBhbmVsIC5rb2duaXRpdi1wYXltZW50LWhlYWRlci1jbG9zZS1idXR0b246aG92ZXIgeyBmb250LXdlaWdodDogYm9sZDsgfSBgO1xyXG4gICAgICAgICAgICAvLyBsb2FkaW5nIGluZGljYXRvclxyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gYC5rb2duaXRpdi1wYXltZW50LWxvYWRpbmctaW5kaWNhdG9yIHsgd2lkdGg6IDQ4cHg7IGhlaWdodDogNDhweDsgYm9yZGVyLXJhZGl1czogNTAlOyBwb3NpdGlvbjogcmVsYXRpdmU7IGA7XHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSBgYW5pbWF0aW9uOiByb3RhdGUgMXMgbGluZWFyIGluZmluaXRlOyBtYXJnaW46IDMwcHggYXV0bzt6LWluZGV4OiAxOyB9YDtcclxuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MICs9IGAua29nbml0aXYtcGF5bWVudC1sb2FkaW5nLWluZGljYXRvcjo6YmVmb3JlIHsgY29udGVudDogXCJcIjsgYm94LXNpemluZzogYm9yZGVyLWJveDsgcG9zaXRpb246IGFic29sdXRlOyBpbnNldDogMHB4OyBgO1xyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gYGJvcmRlci1yYWRpdXM6IDUwJTsgYm9yZGVyOiA1cHggc29saWQgJHtsb2FkaW5nSW5kaWNhdG9yQ29sb3J9OyBhbmltYXRpb246IHByaXhDbGlwRml4IDJzIGxpbmVhciBpbmZpbml0ZTsgfWA7XHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSBgQGtleWZyYW1lcyByb3RhdGUgeyAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfX1gO1xyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gYEBrZXlmcmFtZXMgcHJpeENsaXBGaXggeyBgO1xyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gYDAlIHsgY2xpcC1wYXRoOiBwb2x5Z29uKDUwJSA1MCUsIDAgMCwgMCAwLCAwIDAsIDAgMCwgMCAwKSB9IGA7XHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSBgMjUlIHsgY2xpcC1wYXRoOiBwb2x5Z29uKDUwJSA1MCUsIDAgMCwgMTAwJSAwLCAxMDAlIDAsIDEwMCUgMCwgMTAwJSAwKSB9IGA7XHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSBgNTAlIHsgY2xpcC1wYXRoOiBwb2x5Z29uKDUwJSA1MCUsIDAgMCwgMTAwJSAwLCAxMDAlIDEwMCUsIDEwMCUgMTAwJSwgMTAwJSAxMDAlKSB9IGA7XHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSBgNzUlIHsgY2xpcC1wYXRoOiBwb2x5Z29uKDUwJSA1MCUsIDAgMCwgMTAwJSAwLCAxMDAlIDEwMCUsIDAgMTAwJSwgMCAxMDAlKSB9IGA7XHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSBgMTAwJSB7IGNsaXAtcGF0aDogcG9seWdvbig1MCUgNTAlLCAwIDAsIDEwMCUgMCwgMTAwJSAxMDAlLCAwIDEwMCUsIDAgMCkgfX0gYDtcclxuICAgICAgICAgICAgLy8gc3VidGl0bGVcclxuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MICs9IGAua29nbml0aXYtcGF5bWVudC1zdWJ0aXRsZSB7IGZvbnQtc2l6ZTogMTNweDsgbGluZS1oZWlnaHQ6IDE1cHg7IGZvbnQtd2VpZ2h0OiA0MDA7IHRleHQtYWxpZ246IGNlbnRlcjsgbWFyZ2luLWJvdHRvbTogMjBweDsgY29sb3I6ICM1OTU5NTk7IH1gO1xyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gYC5rb2duaXRpdi1wYXltZW50LXN1YnRpdGxlLWljb24geyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IGhlaWdodDogMTVweDsgbWFyZ2luLWJvdHRvbTogLTJweDsgbWFyZ2luLXJpZ2h0OiAycHg7IH1gO1xyXG4gICAgICAgICAgICAvLyBpbnB1dCBsYWJlbHNcclxuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MICs9IGAua29nbml0aXYtcGF5bWVudC1pbnB1dC1sYWJlbCB7IGRpc3BsYXk6IGJsb2NrOyBtYXJnaW4tYm90dG9tOiAxMnB4OyBmb250LXNpemU6IDE1cHg7IGxpbmUtaGVpZ2h0OiAxMnB4OyBmb250LXdlaWdodDogNTAwOyB9YDtcclxuICAgICAgICAgICAgLy8gcGFuZWwgZm9yIHBjaXByb3h5IGZyYW1lIFxyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gYC5rb2duaXRpdi1wYXltZW50LXBjaXByb3h5LXNmLWZvcm0geyB6LWluZGV4OiAxMDAwOyBwb3NpdGlvbjogcmVsYXRpdmU7IGRpc3BsYXk6IG5vbmU7IHBhZGRpbmc6IDEycHggMjBweCAzMnB4IDIwcHg7IG92ZXJmbG93OiBhdXRvOyBib3JkZXI6IG5vbmU7fWA7XHJcbiAgICAgICAgICAgIC8vIHBsYWNlaG9sZGVyIHBhbmVsc1xyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gYC5rb2duaXRpdi1wYXltZW50LXBsYWNlaG9sZGVyLXBhbmVsIHsgaGVpZ2h0OiA2MnB4O31gO1xyXG4gICAgICAgICAgICAvLyBwYW5lbCBmb3IgaW5wdXRzIChudW1iZXIsIGV4cGlyeSBhbmQgY3Z2KVxyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gJy5rb2duaXRpdi1wYXltZW50LWV4cGlyeS1sYWJlbCB7IGRpc3BsYXk6IGJsb2NrOyB9JztcclxuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MICs9ICcua29nbml0aXYtcGF5bWVudC1leHBpcnktcGFuZWwgeyB3aWR0aDogNTAlOyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHZlcnRpY2FsLWFsaWduOiB0b3A7IHBvc2l0aW9uOiByZWxhdGl2ZTsgfSc7XHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSBgLmtvZ25pdGl2LXBheW1lbnQtZXhwaXJ5LXZhbGlkYXRpb24tcGFuZWwgeyAke3ZhbGlkYXRpb25TdHlsaW5nfSB9YDtcclxuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MICs9IGAua29nbml0aXYtcGF5bWVudC1jYy12YWxpZGF0aW9uLXBhbmVsIHsgJHt2YWxpZGF0aW9uU3R5bGluZ30gfWA7XHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSAnLmtvZ25pdGl2LXBheW1lbnQtbm8tZGlzcGxheSB7ZGlzcGxheTogbm9uZTsgfSc7XHJcbiAgICAgICAgICAgIC8vIGlucHV0IHBhbmVsc1xyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gJy5rb2duaXRpdi1wYXltZW50LWlucHV0LXBhbmVsIHsgbWFyZ2luLWJvdHRvbTogMjRweDsgcG9zaXRpb246IHJlbGF0aXZlOyB9JztcclxuICAgICAgICAgICAgLy8gaG9sZGVyXHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSAnLmtvZ25pdGl2LXBheW1lbnQtY2FyZC1ob2xkZXItaW5wdXQgeyBoZWlnaHQ6IDYycHg7IGJvcmRlcjogMXB4IHNvbGlkICNEOUQ5RDk7IHBhZGRpbmc6IDEycHg7IHBhZGRpbmctbGVmdDogMTZweDsgYm9yZGVyLXJhZGl1czogMTBweDsgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7J1xyXG4gICAgICAgICAgICAgICAgKyAnIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IHdpZHRoOiAxMDAlOyBvdXRsaW5lOiBub25lOyBmb250LXNpemU6IDE3cHg7IGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmOyBmb250LXdlaWdodDogNDAwOyBsaW5lLWhlaWdodDogMjBweDtsZXR0ZXItc3BhY2luZzogMC4wNWVtOyB9JztcclxuICAgICAgICAgICAgLy8gZXhwaXJ5IGlucHV0cyAobW9udGhzLCB5ZWFyKVxyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gYC5rb2duaXRpdi1wYXltZW50LWNhcmQtZXhwaXJ5LWlucHV0IHsgaGVpZ2h0OiA2MnB4OyBib3JkZXI6IDFweCBzb2xpZCAjRDlEOUQ5OyBwYWRkaW5nOiAxMnB4OyBwYWRkaW5nLWxlZnQ6IDE2cHg7IGJvcmRlci1yYWRpdXM6ICR7Ym9yZGVyUmFkaXVzfTtgICtcclxuICAgICAgICAgICAgICAgIGBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgYm94LXNpemluZzogYm9yZGVyLWJveDsgd2lkdGg6IDk1JTsgb3V0bGluZTogbm9uZTsgZm9udC1zaXplOiAxN3B4OyBmb250LWZhbWlseTogc2Fucy1zZXJpZjsgZm9udC1oZWlnaHQ6IDQwMDsgbGluZS1oZWlnaHQ6IDIwcHg7IGxldHRlci1zcGFjaW5nOiAwLjA1ZW07IH1gO1xyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gJ0BtZWRpYSAobWF4LXdpZHRoOiA0MDBweCkgeyAua29nbml0aXYtcGF5bWVudC1jYXJkLWV4cGlyeS1pbnB1dCB7IGZvbnQtc2l6ZTogMTRweDsgfSAua29nbml0aXYtcGF5bWVudC1tYXJrZXItaW1hZ2UgeyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH0gfSc7XHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSAnQG1lZGlhIChtYXgtd2lkdGg6IDMwMHB4KSB7IC5rb2duaXRpdi1wYXltZW50LWNhcmQtZXhwaXJ5LWlucHV0IHsgZm9udC1zaXplOiAxMnB4OyB9IH0nO1xyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gJ0BtZWRpYSAobWF4LXdpZHRoOiAzMjBweCkgeyAua29nbml0aXYtcGF5bWVudC1pbWFnZSB7IGhlaWdodDogMTVweCAhaW1wb3J0YW50OyBib3JkZXItcmFkaXVzOiA1cHggIWltcG9ydGFudDsgdG9wOiAzMHB4ICFpbXBvcnRhbnQ7IHJpZ2h0OiAxMHB4ICFpbXBvcnRhbnQ7IH0gfSc7XHJcbiAgICAgICAgICAgIC8vIGNjdiBwbGFjZWhvbGRlclxyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gJy5rb2duaXRpdi1wYXltZW50LWNhcmQtY2N2LXBsYWNlaG9sZGVyIHsgcG9zaXRpb246IHJlbGF0aXZlOyB9JztcclxuICAgICAgICAgICAgLy8gc3VibWl0IGJ1dHRvblxyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gJy5rb2duaXRpdi1wYXltZW50LXN1Ym1pdC1idXR0b24tcGFuZWwgeyB3aWR0aDogMTAwJTsgbWFyZ2luLXRvcDogMzJweDsgdGV4dC1hbGlnbjogY2VudGVyOyB9JztcclxuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MICs9ICcua29nbml0aXYtcGF5bWVudC1zdWJtaXQtYnV0dG9uIHsgd2lkdGg6IDEwMCU7IGhlaWdodDogNjRweDsgY3Vyc29yOiBwb2ludGVyOyAnICtcclxuICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTAuMDhkZWcsICMzODlFMEQgMC4wNiUsICM4REMwMUUgOTkuOTMlKTsgYm94LXNoYWRvdzogMHB4IDNweCAwcHggIzI5ODEwNDsnICtcclxuICAgICAgICAgICAgICAgICdib3JkZXI6IG5vbmU7IGJvcmRlci1yYWRpdXM6IDE2cHg7IGNvbG9yOndoaXRlOyBmb250LXdlaWdodDogNTAwOyBwYWRkaW5nOiAwLjM3NXJlbSAwLjc1cmVtOyAnICtcclxuICAgICAgICAgICAgICAgIGBmb250LXNpemU6IDIycHg7IGxpbmUtaGVpZ2h0OiAyNnB4OyBmb250LWZhbWlseTogc2Fucy1zZXJpZjsgfWA7XHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSAnLmtvZ25pdGl2LXBheW1lbnQtc3VibWl0LWJ1dHRvbjphY3RpdmUgeyBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOyA5MC4wOGRlZywgIzRDQkExRCAwLjA2JSwgI0E3RDU0NyA5OS45MyUpOyBib3gtc2hhZG93OiAwcHggMnB4IDBweCAjMjk4MTA0OyB9JztcclxuICAgICAgICAgICAgLy8gY2FyZCBpY29uc1xyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gYC5rb2duaXRpdi1wYXltZW50LWltYWdlIHsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDM0cHg7IGhlaWdodDogNDBweDsgcmlnaHQ6IDE2cHg7IGJvcmRlcjogMXB4IHNvbGlkICNEOUQ5RDk7IGJvcmRlci1yYWRpdXM6ICR7Ym9yZGVyUmFkaXVzfTsgfWA7XHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSBgLmtvZ25pdGl2LXBheW1lbnQtbWFya2VyLWltYWdlIHsgaGVpZ2h0OiAyNHB4OyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogNDRweDsgcmlnaHQ6IDg1cHg7IGRpc3BsYXk6IG5vbmU7IH1gO1xyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gJy5rb2duaXRpdi1wYXltZW50LW1hcmtlci1pbWFnZS5uby1jYy1pbWFnZSB7IHJpZ2h0OiAyNHB4OyB9JztcclxuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MICs9IGAua29nbml0aXYtaW5wdXQtdmFsaWQgLmtvZ25pdGl2LXBheW1lbnQtbWFya2VyLWltYWdlIHsgZGlzcGxheTogaW5saW5lOyB9YDtcclxuICAgICAgICAgICAgc3R5bGUuc2V0QXR0cmlidXRlKCdpZCcsICdwY2lQcm94eVNmU3R5bGVzJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG4gICAgICAgICAgICAvLyBoZWFkZXJcclxuICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcclxuICAgICAgICAgICAgaGVhZGVyLnNldEF0dHJpYnV0ZSgnaWQnLCAna29nbml0aXYtcGF5bWVudC1oZWFkZXInKTtcclxuICAgICAgICAgICAgaGVhZGVyLmlubmVyVGV4dCA9IHN0cmluZ3NbJ21vZGFsVGl0bGUnXTtcclxuICAgICAgICAgICAgLy8gY2xvc2UgYnV0dG9uXHJcbiAgICAgICAgICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgICAgICBjbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2tvZ25pdGl2LXBheW1lbnQtaGVhZGVyLWNsb3NlLWJ1dHRvbicpO1xyXG4gICAgICAgICAgICBjbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2tvZ25pdGl2LXBheW1lbnQtaGVhZGVyLWNsb3NlLWJ1dHRvbicpO1xyXG4gICAgICAgICAgICBjbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSAnJnRpbWVzOyc7XHJcbiAgICAgICAgICAgIGNsb3NlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna29nbml0aXYtcGF5bWVudC1tYWluLW92ZXJsYXknKS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeSgncG9wdXAnLCAnY2xvc2VkJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIC8vIGhlYWRlciBwYW5lbFxyXG4gICAgICAgICAgICBjb25zdCBoZWFkZXJQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBoZWFkZXJQYW5lbC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2tvZ25pdGl2LXBheW1lbnQtaGVhZGVyLXBhbmVsJyk7XHJcbiAgICAgICAgICAgIGhlYWRlclBhbmVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAna29nbml0aXYtcGF5bWVudC1oZWFkZXItcGFuZWwnKTtcclxuICAgICAgICAgICAgaGVhZGVyUGFuZWwuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xyXG4gICAgICAgICAgICBoZWFkZXJQYW5lbC5hcHBlbmRDaGlsZChoZWFkZXIpO1xyXG4gICAgICAgICAgICAvLyBsb2FkaW5nIGJhclxyXG4gICAgICAgICAgICBjb25zdCBsb2FkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICBsb2FkaW5nLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAna29nbml0aXYtcGF5bWVudC1sb2FkaW5nLWluZGljYXRvcicpO1xyXG4gICAgICAgICAgICBsb2FkaW5nLnNldEF0dHJpYnV0ZSgnaWQnLCAna29nbml0aXYtcGF5bWVudC1sb2FkaW5nLWluZGljYXRvcicpO1xyXG4gICAgICAgICAgICAvLyBzdWJ0aXRsZVxyXG4gICAgICAgICAgICBjb25zdCBzdWJ0aXRsZVBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHN1YnRpdGxlUGFuZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsICdrb2duaXRpdi1wYXltZW50LXN1YnRpdGxlJyk7XHJcbiAgICAgICAgICAgIHN1YnRpdGxlUGFuZWwuaW5uZXJIVE1MID1cclxuICAgICAgICAgICAgICAgIGA8aW1nIGNsYXNzPVwia29nbml0aXYtcGF5bWVudC1zdWJ0aXRsZS1pY29uXCIgc3JjPVwiJHtlbnZpcm9ubWVudC5wYXltZW50VXJsfS9saWIvYXNzZXRzL2xvY2stY2xvc2VkLnN2Z1wiIGFsdD1cImxvY2sgaWNvblwiPmBcclxuICAgICAgICAgICAgICAgICAgICArIHN0cmluZ3NbJ3N1YlRpdGxlJ107XHJcbiAgICAgICAgICAgIC8vIGlucHV0c1xyXG4gICAgICAgICAgICAvLyBjYXJkIGhvbGRlclxyXG4gICAgICAgICAgICBjb25zdCBjYXJkSG9sZGVyTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgICAgICAgICBjYXJkSG9sZGVyTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCAnY2FyZEhvbGRlcklucHV0Jyk7XHJcbiAgICAgICAgICAgIGNhcmRIb2xkZXJMYWJlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2tvZ25pdGl2LXBheW1lbnQtaW5wdXQtbGFiZWwnKTtcclxuICAgICAgICAgICAgY2FyZEhvbGRlckxhYmVsLmlubmVySFRNTCA9IHN0cmluZ3NbJ2NhcmRIb2xkZXInXTtcclxuICAgICAgICAgICAgY29uc3QgY2FyZEhvbGRlcklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICAgICAgY2FyZEhvbGRlcklucHV0LnNldEF0dHJpYnV0ZSgnaWQnLCAnY2FyZEhvbGRlcklucHV0Jyk7XHJcbiAgICAgICAgICAgIGNhcmRIb2xkZXJJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnY2FyZEhvbGRlcklucHV0Jyk7XHJcbiAgICAgICAgICAgIGNhcmRIb2xkZXJJbnB1dC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2tvZ25pdGl2LXBheW1lbnQtY2FyZC1ob2xkZXItaW5wdXQnKTtcclxuICAgICAgICAgICAgY2FyZEhvbGRlcklucHV0Lm9ua2V5dXAgPSAoKSA9PiB0aGlzLnZhbGlkYXRlQ2FyZEhvbGRlcigpO1xyXG4gICAgICAgICAgICBjb25zdCBjYXJkSG9sZGVyVmFsaWRNYXJrZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICAgICAgY2FyZEhvbGRlclZhbGlkTWFya2VyLnNldEF0dHJpYnV0ZSgnaWQnLCAnY2FyZEhvbGRlclZhbGlkTWFya2VyJyk7XHJcbiAgICAgICAgICAgIGNhcmRIb2xkZXJWYWxpZE1hcmtlci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2tvZ25pdGl2LXBheW1lbnQtY2FyZC12YWxpZC1tYXJrZXIga29nbml0aXYtcGF5bWVudC1tYXJrZXItaW1hZ2UnKTtcclxuICAgICAgICAgICAgY2FyZEhvbGRlclZhbGlkTWFya2VyLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAncmlnaHQ6IDE2cHg7Jyk7XHJcbiAgICAgICAgICAgIGNhcmRIb2xkZXJWYWxpZE1hcmtlci5zZXRBdHRyaWJ1dGUoJ3NyYycsIGAke2Vudmlyb25tZW50LnBheW1lbnRVcmx9L2xpYi9hc3NldHMvY2hlY2suc3ZnYCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhcmRIb2xkZXJWYWxpZGF0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNhcmRIb2xkZXJWYWxpZGF0aW9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnY2FyZEhvbGRlclZhbGlkYXRpb24nKTtcclxuICAgICAgICAgICAgY2FyZEhvbGRlclZhbGlkYXRpb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdrb2duaXRpdi1wYXltZW50LWV4cGlyeS12YWxpZGF0aW9uLXBhbmVsIGtvZ25pdGl2LXBheW1lbnQtbm8tZGlzcGxheScpO1xyXG4gICAgICAgICAgICBjYXJkSG9sZGVyVmFsaWRhdGlvbi5pbm5lckhUTUwgPSBzdHJpbmdzWydjYXJkSG9sZGVyVmFsaWRhdGlvbiddO1xyXG4gICAgICAgICAgICBjb25zdCBjYXJkSG9sZGVyUGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY2FyZEhvbGRlclBhbmVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAna29nbml0aXYtcGF5bWVudC1pbnB1dC1wYW5lbCBrb2duaXRpdi1wYXltZW50LWNhcmRob2xkZXItcGFuZWwnKTtcclxuICAgICAgICAgICAgY2FyZEhvbGRlclBhbmVsLmFwcGVuZENoaWxkKGNhcmRIb2xkZXJMYWJlbCk7XHJcbiAgICAgICAgICAgIGNhcmRIb2xkZXJQYW5lbC5hcHBlbmRDaGlsZChjYXJkSG9sZGVySW5wdXQpO1xyXG4gICAgICAgICAgICBjYXJkSG9sZGVyUGFuZWwuYXBwZW5kQ2hpbGQoY2FyZEhvbGRlclZhbGlkTWFya2VyKTtcclxuICAgICAgICAgICAgY2FyZEhvbGRlclBhbmVsLmFwcGVuZENoaWxkKGNhcmRIb2xkZXJWYWxpZGF0aW9uKTtcclxuICAgICAgICAgICAgLy8gY2FyZCBudW1iZXJcclxuICAgICAgICAgICAgY29uc3QgY2FyZE51bWJlckxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgICAgICAgICAgY2FyZE51bWJlckxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgJ2NhcmROdW1iZXJQbGFjZWhvbGRlcicpO1xyXG4gICAgICAgICAgICBjYXJkTnVtYmVyTGFiZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsICdrb2duaXRpdi1wYXltZW50LWlucHV0LWxhYmVsJyk7XHJcbiAgICAgICAgICAgIGNhcmROdW1iZXJMYWJlbC5pbm5lckhUTUwgPSBzdHJpbmdzWydjYXJkTnVtYmVyJ107XHJcbiAgICAgICAgICAgIGNvbnN0IGNhcmROdW1iZXJQbGFjZWhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjYXJkTnVtYmVyUGxhY2Vob2xkZXIuc2V0QXR0cmlidXRlKCdpZCcsICdjYXJkTnVtYmVyUGxhY2Vob2xkZXInKTtcclxuICAgICAgICAgICAgY2FyZE51bWJlclBsYWNlaG9sZGVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAna29nbml0aXYtcGF5bWVudC1wbGFjZWhvbGRlci1wYW5lbCcpO1xyXG4gICAgICAgICAgICBjb25zdCBjYXJkTnVtYmVyVmFsaWRhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjYXJkTnVtYmVyVmFsaWRhdGlvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NhcmROdW1iZXJWYWxpZGF0aW9uJyk7XHJcbiAgICAgICAgICAgIGNhcmROdW1iZXJWYWxpZGF0aW9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAna29nbml0aXYtcGF5bWVudC1jYy12YWxpZGF0aW9uLXBhbmVsIGtvZ25pdGl2LXBheW1lbnQtbm8tZGlzcGxheScpO1xyXG4gICAgICAgICAgICBjYXJkTnVtYmVyVmFsaWRhdGlvbi5pbm5lckhUTUwgPSBzdHJpbmdzWydjY051bWJlclZhbGlkYXRpb24nXTtcclxuICAgICAgICAgICAgY29uc3QgY2FyZE51bWJlckltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgICAgIGNhcmROdW1iZXJJbWFnZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NhcmRJbWFnZScpO1xyXG4gICAgICAgICAgICBjYXJkTnVtYmVySW1hZ2Uuc2V0QXR0cmlidXRlKCdjbGFzcycsICdrb2duaXRpdi1wYXltZW50LWNhcmQtaW1hZ2Uga29nbml0aXYtcGF5bWVudC1pbWFnZScpO1xyXG4gICAgICAgICAgICBjYXJkTnVtYmVySW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBgJHtlbnZpcm9ubWVudC5wYXltZW50VXJsfS9saWIvYXNzZXRzL2NhcmQtZW1wdHkuc3ZnYCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhcmROdW1iZXJWYWxpZE1hcmtlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgICAgICBjYXJkTnVtYmVyVmFsaWRNYXJrZXIuc2V0QXR0cmlidXRlKCdpZCcsICdjYXJkTnVtYmVyVmFsaWRNYXJrZXInKTtcclxuICAgICAgICAgICAgY2FyZE51bWJlclZhbGlkTWFya2VyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAna29nbml0aXYtcGF5bWVudC1jYXJkLXZhbGlkLW1hcmtlciBrb2duaXRpdi1wYXltZW50LW1hcmtlci1pbWFnZScpO1xyXG4gICAgICAgICAgICBjYXJkTnVtYmVyVmFsaWRNYXJrZXIuc2V0QXR0cmlidXRlKCdzcmMnLCBgJHtlbnZpcm9ubWVudC5wYXltZW50VXJsfS9saWIvYXNzZXRzL2NoZWNrLnN2Z2ApO1xyXG4gICAgICAgICAgICBjb25zdCBjYXJkTnVtYmVyUGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY2FyZE51bWJlclBhbmVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAna29nbml0aXYtcGF5bWVudC1pbnB1dC1wYW5lbCBrb2duaXRpdi1wYXltZW50LWNjLWlucHV0LXBhbmVsIGtvZ25pdGl2LXBheW1lbnQtY2FyZC1wYW5lbC1jYXJkTnVtYmVyJyk7XHJcbiAgICAgICAgICAgIGNhcmROdW1iZXJQYW5lbC5hcHBlbmRDaGlsZChjYXJkTnVtYmVyTGFiZWwpO1xyXG4gICAgICAgICAgICBjYXJkTnVtYmVyUGFuZWwuYXBwZW5kQ2hpbGQoY2FyZE51bWJlclBsYWNlaG9sZGVyKTtcclxuICAgICAgICAgICAgY2FyZE51bWJlclBhbmVsLmFwcGVuZENoaWxkKGNhcmROdW1iZXJJbWFnZSk7XHJcbiAgICAgICAgICAgIGNhcmROdW1iZXJQYW5lbC5hcHBlbmRDaGlsZChjYXJkTnVtYmVyVmFsaWRNYXJrZXIpO1xyXG4gICAgICAgICAgICBjYXJkTnVtYmVyUGFuZWwuYXBwZW5kQ2hpbGQoY2FyZE51bWJlclZhbGlkYXRpb24pO1xyXG4gICAgICAgICAgICAvLyBjYXJkIGV4cGlyYXRpb25cclxuICAgICAgICAgICAgY29uc3QgY2FyZEV4cGlyeU1vbnRoWWVhckxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgICAgICAgICAgY2FyZEV4cGlyeU1vbnRoWWVhckxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgJ2NhcmRFeHBpcnlNb250aFllYXJJbnB1dCcpO1xyXG4gICAgICAgICAgICBjYXJkRXhwaXJ5TW9udGhZZWFyTGFiZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsICdrb2duaXRpdi1wYXltZW50LWV4cGlyeS1sYWJlbCBrb2duaXRpdi1wYXltZW50LWlucHV0LWxhYmVsJyk7XHJcbiAgICAgICAgICAgIGNhcmRFeHBpcnlNb250aFllYXJMYWJlbC5pbm5lckhUTUwgPSBzdHJpbmdzWydleHBpcnlEYXRlJ107XHJcbiAgICAgICAgICAgIGNvbnN0IGNhcmRFeHBpcnlNb250aFllYXJJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgICAgIGNhcmRFeHBpcnlNb250aFllYXJJbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NhcmRFeHBpcnlNb250aFllYXJJbnB1dCcpO1xyXG4gICAgICAgICAgICBjYXJkRXhwaXJ5TW9udGhZZWFySW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywgJ2NhcmRFeHBpcnlNb250aFllYXJJbnB1dCcpO1xyXG4gICAgICAgICAgICBjYXJkRXhwaXJ5TW9udGhZZWFySW5wdXQuc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsIHN0cmluZ3NbJ2V4cGlyeURhdGVQbGFjZWhvbGRlciddKTtcclxuICAgICAgICAgICAgY2FyZEV4cGlyeU1vbnRoWWVhcklucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZWwnKTtcclxuICAgICAgICAgICAgY2FyZEV4cGlyeU1vbnRoWWVhcklucHV0LnNldEF0dHJpYnV0ZSgnbWF4bGVuZ3RoJywgJzcnKTtcclxuICAgICAgICAgICAgY2FyZEV4cGlyeU1vbnRoWWVhcklucHV0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAna29nbml0aXYtcGF5bWVudC1jYXJkLWV4cGlyeS1pbnB1dCcpO1xyXG4gICAgICAgICAgICBjb25zdCBjYXJkRXhwaXJ5TW9udGhZZWFyVmFsaWRhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjYXJkRXhwaXJ5TW9udGhZZWFyVmFsaWRhdGlvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NhcmRFeHBpcnlNb250aFllYXJWYWxpZGF0aW9uJyk7XHJcbiAgICAgICAgICAgIGNhcmRFeHBpcnlNb250aFllYXJWYWxpZGF0aW9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAna29nbml0aXYtcGF5bWVudC1leHBpcnktdmFsaWRhdGlvbi1wYW5lbCBrb2duaXRpdi1wYXltZW50LW5vLWRpc3BsYXknKTtcclxuICAgICAgICAgICAgY2FyZEV4cGlyeU1vbnRoWWVhclZhbGlkYXRpb24uaW5uZXJIVE1MID0gc3RyaW5nc1snZXhwaXJ5VmFsaWRhdGlvbk1zZyddO1xyXG4gICAgICAgICAgICBjb25zdCBjYXJkRXhwaXJ5TW9udGhZZWFyVmFsaWRNYXJrZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICAgICAgY2FyZEV4cGlyeU1vbnRoWWVhclZhbGlkTWFya2VyLnNldEF0dHJpYnV0ZSgnaWQnLCAnY2FyZEN2dlZhbGlkTWFya2VyJyk7XHJcbiAgICAgICAgICAgIGNhcmRFeHBpcnlNb250aFllYXJWYWxpZE1hcmtlci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2tvZ25pdGl2LXBheW1lbnQtY2FyZC12YWxpZC1tYXJrZXIga29nbml0aXYtcGF5bWVudC1tYXJrZXItaW1hZ2Ugbm8tY2MtaW1hZ2UnKTtcclxuICAgICAgICAgICAgY2FyZEV4cGlyeU1vbnRoWWVhclZhbGlkTWFya2VyLnNldEF0dHJpYnV0ZSgnc3JjJywgYCR7ZW52aXJvbm1lbnQucGF5bWVudFVybH0vbGliL2Fzc2V0cy9jaGVjay5zdmdgKTtcclxuICAgICAgICAgICAgY29uc3QgY2FyZEV4cGlyeU1vbnRoWWVhclBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNhcmRFeHBpcnlNb250aFllYXJQYW5lbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2tvZ25pdGl2LXBheW1lbnQtZXhwaXJ5LXBhbmVsJyk7XHJcbiAgICAgICAgICAgIGNhcmRFeHBpcnlNb250aFllYXJQYW5lbC5hcHBlbmRDaGlsZChjYXJkRXhwaXJ5TW9udGhZZWFyTGFiZWwpO1xyXG4gICAgICAgICAgICBjYXJkRXhwaXJ5TW9udGhZZWFyUGFuZWwuYXBwZW5kQ2hpbGQoY2FyZEV4cGlyeU1vbnRoWWVhcklucHV0KTtcclxuICAgICAgICAgICAgY2FyZEV4cGlyeU1vbnRoWWVhclBhbmVsLmFwcGVuZENoaWxkKGNhcmRFeHBpcnlNb250aFllYXJWYWxpZE1hcmtlcik7XHJcbiAgICAgICAgICAgIGNhcmRFeHBpcnlNb250aFllYXJQYW5lbC5hcHBlbmRDaGlsZChjYXJkRXhwaXJ5TW9udGhZZWFyVmFsaWRhdGlvbik7XHJcbiAgICAgICAgICAgIC8vIGN2dlxyXG4gICAgICAgICAgICBjb25zdCBjYXJkQ3Z2TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgICAgICAgICBjYXJkQ3Z2TGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCAnY2FyZEN2dlBsYWNlaG9sZGVyJyk7XHJcbiAgICAgICAgICAgIGNhcmRDdnZMYWJlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2tvZ25pdGl2LXBheW1lbnQtZXhwaXJ5LWxhYmVsIGtvZ25pdGl2LXBheW1lbnQtaW5wdXQtbGFiZWwnKTtcclxuICAgICAgICAgICAgY2FyZEN2dkxhYmVsLmlubmVySFRNTCA9IHN0cmluZ3NbJ2N2diddO1xyXG4gICAgICAgICAgICBjb25zdCBjYXJkQ3Z2UGxhY2Vob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY2FyZEN2dlBsYWNlaG9sZGVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnY2FyZEN2dlBsYWNlaG9sZGVyJyk7XHJcbiAgICAgICAgICAgIGNhcmRDdnZQbGFjZWhvbGRlci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2tvZ25pdGl2LXBheW1lbnQtcGxhY2Vob2xkZXItcGFuZWwnKTtcclxuICAgICAgICAgICAgY29uc3QgY2FyZEN2dlZhbGlkYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY2FyZEN2dlZhbGlkYXRpb24uc2V0QXR0cmlidXRlKCdpZCcsICdjYXJkQ3Z2VmFsaWRhdGlvbicpO1xyXG4gICAgICAgICAgICBjYXJkQ3Z2VmFsaWRhdGlvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2tvZ25pdGl2LXBheW1lbnQtY2MtdmFsaWRhdGlvbi1wYW5lbCBrb2duaXRpdi1wYXltZW50LW5vLWRpc3BsYXknKTtcclxuICAgICAgICAgICAgY2FyZEN2dlZhbGlkYXRpb24uaW5uZXJIVE1MID0gc3RyaW5nc1snY2NDdnZWYWxpZGF0aW9uJ107XHJcbiAgICAgICAgICAgIGNvbnN0IGNhcmRDdnZJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgICAgICBjYXJkQ3Z2SW1hZ2Uuc2V0QXR0cmlidXRlKCdpZCcsICdjYXJkQ3Z2SW1hZ2UnKTtcclxuICAgICAgICAgICAgY2FyZEN2dkltYWdlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAna29nbml0aXYtcGF5bWVudC1jYXJkLWN2di1pbWFnZSBrb2duaXRpdi1wYXltZW50LWltYWdlJyk7XHJcbiAgICAgICAgICAgIGNhcmRDdnZJbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGAke2Vudmlyb25tZW50LnBheW1lbnRVcmx9L2xpYi9hc3NldHMvY3ZjLWVtcHR5LnN2Z2ApO1xyXG4gICAgICAgICAgICBjb25zdCBjYXJkQ3Z2VmFsaWRNYXJrZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICAgICAgY2FyZEN2dlZhbGlkTWFya2VyLnNldEF0dHJpYnV0ZSgnaWQnLCAnY2FyZEN2dlZhbGlkTWFya2VyJyk7XHJcbiAgICAgICAgICAgIGNhcmRDdnZWYWxpZE1hcmtlci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2tvZ25pdGl2LXBheW1lbnQtY2FyZC12YWxpZC1tYXJrZXIga29nbml0aXYtcGF5bWVudC1tYXJrZXItaW1hZ2UnKTtcclxuICAgICAgICAgICAgY2FyZEN2dlZhbGlkTWFya2VyLnNldEF0dHJpYnV0ZSgnc3JjJywgYCR7ZW52aXJvbm1lbnQucGF5bWVudFVybH0vbGliL2Fzc2V0cy9jaGVjay5zdmdgKTtcclxuICAgICAgICAgICAgY29uc3QgY2FyZEN2dlBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNhcmRDdnZQYW5lbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2tvZ25pdGl2LXBheW1lbnQtZXhwaXJ5LXBhbmVsIGtvZ25pdGl2LXBheW1lbnQtY2FyZC1jY3YtcGxhY2Vob2xkZXIga29nbml0aXYtcGF5bWVudC1jYXJkLXBhbmVsLWN2dicpO1xyXG4gICAgICAgICAgICBjYXJkQ3Z2UGFuZWwuYXBwZW5kQ2hpbGQoY2FyZEN2dkxhYmVsKTtcclxuICAgICAgICAgICAgY2FyZEN2dlBhbmVsLmFwcGVuZENoaWxkKGNhcmRDdnZQbGFjZWhvbGRlcik7XHJcbiAgICAgICAgICAgIGNhcmRDdnZQYW5lbC5hcHBlbmRDaGlsZChjYXJkQ3Z2SW1hZ2UpO1xyXG4gICAgICAgICAgICBjYXJkQ3Z2UGFuZWwuYXBwZW5kQ2hpbGQoY2FyZEN2dlZhbGlkTWFya2VyKTtcclxuICAgICAgICAgICAgY2FyZEN2dlBhbmVsLmFwcGVuZENoaWxkKGNhcmRDdnZWYWxpZGF0aW9uKTtcclxuICAgICAgICAgICAgY29uc3QgY2FyZEV4cGlyZVBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNhcmRFeHBpcmVQYW5lbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2tvZ25pdGl2LXBheW1lbnQtaW5wdXQtcGFuZWwnKTtcclxuICAgICAgICAgICAgY2FyZEV4cGlyZVBhbmVsLmFwcGVuZENoaWxkKGNhcmRFeHBpcnlNb250aFllYXJQYW5lbCk7XHJcbiAgICAgICAgICAgIGNhcmRFeHBpcmVQYW5lbC5hcHBlbmRDaGlsZChjYXJkQ3Z2UGFuZWwpO1xyXG4gICAgICAgICAgICAvLyBzdWJtaXQgYnV0dG9uXHJcbiAgICAgICAgICAgIGNvbnN0IHN1Ym1pdFBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHN1Ym1pdFBhbmVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAna29nbml0aXYtcGF5bWVudC1zdWJtaXQtYnV0dG9uLXBhbmVsJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uc2V0QXR0cmlidXRlKCdpZCcsICdnbycpO1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdrb2duaXRpdi1wYXltZW50LXN1Ym1pdC1idXR0b24nKTtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmlubmVySFRNTCA9IHN0cmluZ3NbJ3BheSddO1xyXG4gICAgICAgICAgICBjYXJkRXhwaXJ5TW9udGhZZWFySW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlRXhwaXJ5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KCdpbml0JywgJycpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRDYXJkSG9sZGVyID0gdGhpcy52YWxpZGF0ZUNhcmRIb2xkZXIoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkRXhwaXJ5ID0gdGhpcy52YWxpZGF0ZUV4cGlyeSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkQ2FyZEhvbGRlciAmJiB2YWxpZEV4cGlyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vbnRoWWVhclN0cmluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJkRXhwaXJ5TW9udGhZZWFySW5wdXQnKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtb250aFllYXJBcnJheSA9IG1vbnRoWWVhclN0cmluZy5zcGxpdCgnLycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vbnRoU3RyaW5nID0gbW9udGhZZWFyQXJyYXlbMF0udHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHllYXJTdHJpbmcgPSBtb250aFllYXJBcnJheVsxXS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWN1cmVGaWVsZHMuc3VibWl0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwbTogbW9udGhTdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cHk6IHllYXJTdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHN1Ym1pdFBhbmVsLmFwcGVuZENoaWxkKHN1Ym1pdEJ1dHRvbik7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhcmRQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjYXJkUGFuZWwuYXBwZW5kQ2hpbGQoc3VidGl0bGVQYW5lbCk7XHJcbiAgICAgICAgICAgIGNhcmRQYW5lbC5hcHBlbmRDaGlsZChjYXJkSG9sZGVyUGFuZWwpO1xyXG4gICAgICAgICAgICBjYXJkUGFuZWwuYXBwZW5kQ2hpbGQoY2FyZE51bWJlclBhbmVsKTtcclxuICAgICAgICAgICAgY2FyZFBhbmVsLmFwcGVuZENoaWxkKGNhcmRFeHBpcmVQYW5lbCk7XHJcbiAgICAgICAgICAgIGNhcmRQYW5lbC5hcHBlbmRDaGlsZChzdWJtaXRQYW5lbCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhcmRGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG4gICAgICAgICAgICBjYXJkRm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2tvZ25pdGl2LXBheW1lbnQtcGNpcHJveHktc2YtZm9ybScpO1xyXG4gICAgICAgICAgICBjYXJkRm9ybS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2tvZ25pdGl2LXBheW1lbnQtcGNpcHJveHktc2YtZm9ybScpO1xyXG4gICAgICAgICAgICBjYXJkRm9ybS5hcHBlbmRDaGlsZChjYXJkUGFuZWwpO1xyXG4gICAgICAgICAgICAvLyBwb3B1cFxyXG4gICAgICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2tvZ25pdGl2LXBheW1lbnQtbWFpbi1wb3B1cCcpO1xyXG4gICAgICAgICAgICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2tvZ25pdGl2LXBheW1lbnQtbWFpbi1wb3B1cCcpO1xyXG4gICAgICAgICAgICBtb2RhbC5hcHBlbmRDaGlsZChoZWFkZXJQYW5lbCk7XHJcbiAgICAgICAgICAgIG1vZGFsLmFwcGVuZENoaWxkKGxvYWRpbmcpO1xyXG4gICAgICAgICAgICBtb2RhbC5hcHBlbmRDaGlsZChjYXJkRm9ybSk7XHJcbiAgICAgICAgICAgIC8vIG1haW4gcGFnZSBvdmVybGF5XHJcbiAgICAgICAgICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgb3ZlcmxheS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2tvZ25pdGl2LXBheW1lbnQtbWFpbi1vdmVybGF5Jyk7XHJcbiAgICAgICAgICAgIG92ZXJsYXkuc2V0QXR0cmlidXRlKCdjbGFzcycsICdrb2duaXRpdi1wYXltZW50LW1haW4tb3ZlcmxheScpO1xyXG4gICAgICAgICAgICBvdmVybGF5LmFwcGVuZENoaWxkKG1vZGFsKTtcclxuICAgICAgICAgICAgLy8gbWFpbiBkaXZcclxuICAgICAgICAgICAgdGhpcy5rb2duaXRpdlBheW1lbnRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHRoaXMua29nbml0aXZQYXltZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2tvZ25pdGl2LXBheW1lbnQnKTtcclxuICAgICAgICAgICAgdGhpcy5rb2duaXRpdlBheW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMua29nbml0aXZQYXltZW50RWxlbWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SW5wdXRGaWx0ZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcmRFeHBpcnlNb250aFllYXJJbnB1dCcpLCBcclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXHJcbiAgICAgICAgICAgICh2YWx1ZSkgPT4gL15cXGR7MCwyfVtcXC9dP1xcZHswLDJ9Ly50ZXN0KHZhbHVlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFsbCBodG1sIGVsZW1lbnRzIHdoaWNoIHdlcmUgY3JlYXRlZCBieSBwY2lwcm94eSBzZWN1cmUgZmllbGRzIHByb3ZpZGVyLlxyXG4gICAgICovXHJcbiAgICBkZWxldGVIdG1sRWxlbWVudHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMua29nbml0aXZQYXltZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMua29nbml0aXZQYXltZW50RWxlbWVudCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGxpbmtzLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5pZCA9PT0gJ3BjaVByb3h5U2ZTdHlsZXMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMua29nbml0aXZQYXltZW50RWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwbGF5cyBsb2FkaW5nIGJhciBvciBQY2kgUHJveHkgc2VjdXJlIGZpZWxkcyBmb3JtLCBiYXNlZCBvbiBwYXJhbWV0ZXIuXHJcbiAgICAgKiBAcGFyYW0gZGlzcGxheSB3aGVuIHRydWUsIGxvYWRpbmcgYmFyIGlzIGRpc3BsYXllZCwgb3RoZXJ3aXNlIFBjaSBQcm94eSBzZWN1cmUgZmllbGRzIGZvcm0gaXMgZGlzcGxheWVkLlxyXG4gICAgICovXHJcbiAgICBkaXNwbGF5TG9hZGluZ0JhcihkaXNwbGF5KSB7XHJcbiAgICAgICAgY29uc3QgbG9hZGluZ0luZGljYXRvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrb2duaXRpdi1wYXltZW50LWxvYWRpbmctaW5kaWNhdG9yJyk7XHJcbiAgICAgICAgY29uc3Qgc2ZGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2tvZ25pdGl2LXBheW1lbnQtcGNpcHJveHktc2YtZm9ybScpO1xyXG4gICAgICAgIGlmIChsb2FkaW5nSW5kaWNhdG9yKSB7XHJcbiAgICAgICAgICAgIGxvYWRpbmdJbmRpY2F0b3Iuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXkgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2ZGb3JtKSB7XHJcbiAgICAgICAgICAgIHNmRm9ybS5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheSA/ICdub25lJyA6ICdibG9jayc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBQcmVwYXJlcyBhcnJheSBvZiBzY3JpcHRzLCB3aGljaCBuZWVkcyB0byBiZSBsb2FkZWQuXHJcbiAgICAgKi9cclxuICAgIGZpbGxTY3JpcHRzVG9CZUxvYWRlZCgpIHtcclxuICAgICAgICB0aGlzLnNjcmlwdHMgPSBbXTtcclxuICAgICAgICBpZiAoIXRoaXMuaXNQY2lQcm94eVNmU2NyaXB0TG9hZGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JpcHRzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgc3JjOiB0aGlzLnBjaVByb3h5U2ZTY3JpcHRVcmwsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUHJlcGFyZXMgc3RyaW5ncyB1c2VkIGluIFVJLCBiYXNlZCBvbiBzdXBwbGllZCBsYW5ndWFnZSBjb2RlLlxyXG4gICAgICogQHJldHVybnMgc3RyaW5ncyBmb3IgcmVxdWVzdGVkIGxhbmd1YWdlcy5cclxuICAgICAqL1xyXG4gICAgZ2V0U3RyaW5ncygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtb2RhbFRpdGxlOiB0aGlzLmxhbmcuZ2V0KCdwYXltZW50LmNsaWVudC5wY2kucHJveHkubW9kYWwudGl0bGUnKSxcclxuICAgICAgICAgICAgc3ViVGl0bGU6IHRoaXMubGFuZy5nZXQoJ3BheW1lbnQuY2xpZW50LnBjaS5wcm94eS5zdWIudGl0bGUnKSxcclxuICAgICAgICAgICAgY2FyZEhvbGRlcjogdGhpcy5sYW5nLmdldCgnY2MucmVzZXJ2YXRpb24uYm9va2VyLmNhcmRob2xkZXInKSxcclxuICAgICAgICAgICAgY2FyZEhvbGRlclZhbGlkYXRpb246IHRoaXMubGFuZy5nZXQoJ3BheW1lbnQuY2xpZW50LnBjaS5wcm94eS5ob2xkZXIubm90VmFsaWQnKSxcclxuICAgICAgICAgICAgY2FyZE51bWJlcjogdGhpcy5sYW5nLmdldCgnYWNjb3VudHMuY2MucGF5bWVudC5jY051bWJlcicpLFxyXG4gICAgICAgICAgICBjY051bWJlclZhbGlkYXRpb246IHRoaXMubGFuZy5nZXQoJ2NvbW1vbi5jYy5udW1iZXIubm90VmFsaWQnKSxcclxuICAgICAgICAgICAgZXhwaXJ5RGF0ZTogdGhpcy5sYW5nLmdldCgnY3VwLmNvdXBvbi5jcmVhdGVDb3Vwb24ubGJsLmV4cGlyeURhdGUnKSxcclxuICAgICAgICAgICAgZXhwaXJ5RGF0ZVBsYWNlaG9sZGVyOiBgJHt0aGlzLmxhbmcuZ2V0KCdjb21tb24ubW9udGguYWJicmV2aWF0aW9uJyl9LyR7dGhpcy5sYW5nLmdldCgnY29tbW9uLnllYXIuYWJicmV2aWF0aW9uJyl9YCxcclxuICAgICAgICAgICAgZXhwaXJ5VmFsaWRhdGlvbk1zZzogdGhpcy5sYW5nLmdldCgncGF5bWVudC5pbnZhbGlkLmV4cGlyeScpLFxyXG4gICAgICAgICAgICBjdnY6IHRoaXMubGFuZy5nZXQoJ2FjY291bnRzLmNjLnBheW1lbnQuY3Z2JyksXHJcbiAgICAgICAgICAgIGNjQ3Z2VmFsaWRhdGlvbjogdGhpcy5sYW5nLmdldCgnY29tbW9uLmNjLmN2di5ub3RWYWxpZCcpLFxyXG4gICAgICAgICAgICBwYXk6IHRoaXMubGFuZy5nZXQoJ3BheW1lbnQuYnV0dG9uLnZhbGlkYXRlLmNjJyksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGdldFN1cHBvcnRlZENhcmRCcmFuZHMoKSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICBpZiAoISgoX2IgPSAoX2EgPSB0aGlzLnByb3ZpZGVyU2V0dGluZ3MpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hbGxvd2VkQ2NUeXBlQ29kZXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3ZpZGVyU2V0dGluZ3MuYWxsb3dlZENjVHlwZUNvZGVzXHJcbiAgICAgICAgICAgIC5tYXAoY29kZSA9PiBQY2lQcm94eVNlY3VyZUZpZWxkc0pTUHJvdmlkZXIuU0VFS0RBX1BDSV9QUk9YWV9CUkFORF9NQVAuaGFzKGNvZGUpXHJcbiAgICAgICAgICAgID8gUGNpUHJveHlTZWN1cmVGaWVsZHNKU1Byb3ZpZGVyLlNFRUtEQV9QQ0lfUFJPWFlfQlJBTkRfTUFQLmdldChjb2RlKVxyXG4gICAgICAgICAgICA6IGNvZGUpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEluaXRpYWxpemVzIHBjaXByb3h5IHNlY3VyZSBmaWVsZHMgcHJvdmlkZXIsIHdoaWNoIGNhdXNlcyByZW5kZXJpbmcgaXRzIFVJIGluIGh0bWwuXHJcbiAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZVBjaVByb3h5U2YoKSB7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICB0aGlzLnNlY3VyZUZpZWxkcyA9IG5ldyB3aW5kb3cuU2VjdXJlRmllbGRzKCk7XHJcbiAgICAgICAgY29uc3Qgc3R5bGVzID0ge1xyXG4gICAgICAgICAgICAnKic6IGBib3JkZXI6IDFweCBzb2xpZCAjRDlEOUQ5OyBwYWRkaW5nOiAxMnB4OyBwYWRkaW5nLWxlZnQ6IDE2cHg7IHBhZGRpbmctcmlnaHQ6IDE2cHg7IGJvcmRlci1yYWRpdXM6IDEwcHg7IGJhY2tncm91bmQtY29sb3I6IHdoaXRlO2AsXHJcbiAgICAgICAgICAgICdpbnB1dCc6ICdoZWlnaHQ6IDY0cHg7IGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmOyBsZXR0ZXItc3BhY2luZzogMC4wNWVtOydcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHBheW1lbnRNZXRob2RzID0gdGhpcy5nZXRTdXBwb3J0ZWRDYXJkQnJhbmRzKCk7XHJcbiAgICAgICAgdGhpcy5zZWN1cmVGaWVsZHMuaW5pdFRva2VuaXplKHRoaXMucHJvdmlkZXJTZXR0aW5ncy5tZXJjaGFudElkLCB7XHJcbiAgICAgICAgICAgIGNhcmROdW1iZXI6IHtcclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyRWxlbWVudElkOiAnY2FyZE51bWJlclBsYWNlaG9sZGVyJyxcclxuICAgICAgICAgICAgICAgIGlucHV0VHlwZTogJ3RlbCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGN2djoge1xyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXJFbGVtZW50SWQ6ICdjYXJkQ3Z2UGxhY2Vob2xkZXInLFxyXG4gICAgICAgICAgICAgICAgaW5wdXRUeXBlOiAndGVsJyxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgc3R5bGVzLFxyXG4gICAgICAgICAgICBwYXltZW50TWV0aG9kcyxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlY3VyZUZpZWxkcy5vbigncmVhZHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlucHV0U3R5bGUgPSBgZm9udC1zaXplOiAke2dldElucHV0Rm9udFNpemUoKX07IGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmOyBmb250LWhlaWdodDogNDAwOyBsaW5lLWhlaWdodDogMjBweDsgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTsgbWFyZ2luLWxlZnQ6IDJweDsgaGVpZ2h0OiA2MnB4OyBvdXRsaW5lOiBub25lOyB3aWR0aDogY2FsYygxMDAlIC0gM3B4KTtgO1xyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXRTdHlsZSA9IGBmb250LXNpemU6ICR7Z2V0SW5wdXRGb250U2l6ZSgpfTsgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7IGZvbnQtaGVpZ2h0OiA0MDA7IGxpbmUtaGVpZ2h0OiAyMHB4OyBsZXR0ZXItc3BhY2luZzogMC4wNWVtOyBtYXJnaW4tbGVmdDogMDsgaGVpZ2h0OiA2MnB4OyBvdXRsaW5lOiBub25lOyB3aWR0aDogY2FsYygxMDAlIC0gM3B4KTtgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWN1cmVGaWVsZHMuc2V0U3R5bGUoJ2NhcmROdW1iZXInLCBpbnB1dFN0eWxlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VjdXJlRmllbGRzLnNldFN0eWxlKCdjdnYnLCBgJHtpbnB1dFN0eWxlfSB3aWR0aDogOTklO2ApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TG9hZGluZ0JhcihmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VjdXJlRmllbGRzLnNldFN0eWxlKCdjYXJkTnVtYmVyJywgaW5wdXRTdHlsZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VjdXJlRmllbGRzLnNldFN0eWxlKCdjdnYnLCBgJHtpbnB1dFN0eWxlfSB3aWR0aDogOTklO2ApO1xyXG4gICAgICAgICAgICB0aGlzLnNlY3VyZUZpZWxkcy5zZXRQbGFjZWhvbGRlcignY2FyZE51bWJlcicsICdYWFhYIFhYWFggWFhYWCBYWFhYJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VjdXJlRmllbGRzLnNldFBsYWNlaG9sZGVyKCdjdnYnLCAnWFhYJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VjdXJlRmllbGRzLmZvY3VzKCdjYXJkTnVtYmVyJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycywgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgIHRoaXMuc2VjdXJlRmllbGRzLm9uKCdjaGFuZ2UnLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xyXG4gICAgICAgICAgICBjb25zdCBjYXJkSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcua29nbml0aXYtcGF5bWVudC1jYXJkLWltYWdlJyk7XHJcbiAgICAgICAgICAgIGlmICghKChfYiA9IChfYSA9IGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGF0YS5maWVsZHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYXJkTnVtYmVyKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucGF5bWVudE1ldGhvZCkpIHtcclxuICAgICAgICAgICAgICAgIGNhcmRJbWFnZS5zcmMgPSBgJHtlbnZpcm9ubWVudC5wYXltZW50VXJsfS9saWIvYXNzZXRzL2NhcmQtZW1wdHkuc3ZnYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNhcmRJbWFnZS5zcmMgPSBgJHtlbnZpcm9ubWVudC5wYXltZW50VXJsfS9saWIvYXNzZXRzL2JyYW5kcy9gICsgZGF0YS5maWVsZHMuY2FyZE51bWJlci5wYXltZW50TWV0aG9kICsgJy5zdmcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBbJ2NhcmROdW1iZXInLCAnY3Z2J107XHJcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkcyA9IChkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRhdGEuZmllbGRzKSB8fCB7fTtcclxuICAgICAgICAgICAgYXR0cmlidXRlcy5mb3JFYWNoKGF0dHIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBgLmtvZ25pdGl2LXBheW1lbnQtY2FyZC1wYW5lbC0ke2F0dHJ9YDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkRGVzY3JpcHRvciA9IGZpZWxkc1thdHRyXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzVmFsaWQgPSBmaWVsZERlc2NyaXB0b3IudmFsaWQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCAkZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAkZWxlbS5jbGFzc0xpc3QuYWRkKCdrb2duaXRpdi1pbnB1dC12YWxpZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgna29nbml0aXYtaW5wdXQtdmFsaWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICB0aGlzLnNlY3VyZUZpZWxkcy5vbignc3VjY2VzcycsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRhdGEudHJhbnNhY3Rpb25JZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2FyZEhvbGRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJkSG9sZGVySW5wdXQnKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGRhdGEuY2FyZEhvbGRlciA9IGNhcmRIb2xkZXI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeSgncGF5bWVudCcsICdzdWNjZXNzJywgZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeSgncGF5bWVudCcsICdlcnJvcicsIGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUxvYWRpbmdCYXIodHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VjdXJlRmllbGRzLmRlc3Ryb3koKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgIHRoaXMuc2VjdXJlRmllbGRzLm9uKCdlcnJvcicsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUxvYWRpbmdCYXIoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLm5vdGlmeSgncGF5bWVudCcsICdlcnJvcicsIGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgdGhpcy5zZWN1cmVGaWVsZHMub24oJ3ZhbGlkYXRlJywgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TG9hZGluZ0JhcihmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUNjRGF0YUVycm9ycyhkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVGVzdHMgd2hldGhlciBodG1sIGVsZW1lbnQgZm9yIFBjaSBQcm94eSBzZWN1cmUgZmllbGRzIHdhcyBjcmVhdGVkLlxyXG4gICAgICogQHJldHVybnMgdHJ1ZSwgaWYgZWxlbWVudCBmb3IgIFBjaSBQcm94eSBzZWN1cmUgZmllbGRzIHdhcyBhbHJlYWR5IGNyZWF0ZWQsIG90aGVyd2lzZSBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgaXNIdG1sRWxlbWVudHNDcmVhdGVkKCkge1xyXG4gICAgICAgIGNvbnN0IHBheW1lbnRGcmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwY2lwcm94eS1zZi1wYXltZW50Jyk7XHJcbiAgICAgICAgcmV0dXJuICEhcGF5bWVudEZyYW1lO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0cyB3aGV0aGVyIFBjaSBQcm94eSBzZWN1cmUgZmllbGRzIHNjcmlwdCB3YXMgYWxyZWFkeSBsb2FkZWQuXHJcbiAgICAgKiBAcmV0dXJucyB0cnVlLCBpZiBQY2kgUHJveHkgc2VjdXJlIGZpZWxkcyBzY3JpcHQgd2FzIGFscmVhZHkgbG9hZGVkLCBvdGhlcndpc2UgZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIGlzUGNpUHJveHlTZlNjcmlwdExvYWRlZCgpIHtcclxuICAgICAgICBjb25zdCBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xyXG4gICAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBzY3JpcHRzKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LnNyYyA9PT0gdGhpcy5wY2lQcm94eVNmU2NyaXB0VXJsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogVmFsaWRhdGVzIGNhcmRob2xkZXIgZmllbGQuXHJcbiAgICAqIEByZXR1cm5zIHRydWUsIGlmIGZpZWxkIGlzIHZhbGlkLCBvdGhlcndpc2UgZmFsc2UuXHJcbiAgICAqL1xyXG4gICAgdmFsaWRhdGVDYXJkSG9sZGVyKCkge1xyXG4gICAgICAgIGNvbnN0ICRwYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5rb2duaXRpdi1wYXltZW50LWNhcmRob2xkZXItcGFuZWwnKTtcclxuICAgICAgICBjb25zdCBjYXJkSG9sZGVyU3RyaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcmRIb2xkZXJJbnB1dCcpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGNhcmRIb2xkZXJWYWxpZGF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcmRIb2xkZXJWYWxpZGF0aW9uJyk7XHJcbiAgICAgICAgY2FyZEhvbGRlclZhbGlkYXRpb24uY2xhc3NMaXN0LmFkZCgna29nbml0aXYtcGF5bWVudC1uby1kaXNwbGF5Jyk7XHJcbiAgICAgICAgY29uc3QgaXNDYXJkSG9sZGVyVmFsaWQgPSAhIWNhcmRIb2xkZXJTdHJpbmc7XHJcbiAgICAgICAgaWYgKCFpc0NhcmRIb2xkZXJWYWxpZCkge1xyXG4gICAgICAgICAgICBjYXJkSG9sZGVyVmFsaWRhdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdrb2duaXRpdi1wYXltZW50LW5vLWRpc3BsYXknKTtcclxuICAgICAgICAgICAgJHBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2tvZ25pdGl2LWlucHV0LXZhbGlkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAkcGFuZWwuY2xhc3NMaXN0LmFkZCgna29nbml0aXYtaW5wdXQtdmFsaWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzQ2FyZEhvbGRlclZhbGlkO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBWYWxpZGF0ZXMgbW9udGggYW5kIHllYXIgZXhwaXJ5IGZpZWxkcy5cclxuICAgICAqIEByZXR1cm5zIHRydWUsIGlmIGJvdGggZmllbGRzIGFyZSB2YWxpZCwgb3RoZXJ3aXNlIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICB2YWxpZGF0ZUV4cGlyeSgpIHtcclxuICAgICAgICBjb25zdCAkcGFuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcua29nbml0aXYtcGF5bWVudC1leHBpcnktcGFuZWwnKTtcclxuICAgICAgICBjb25zdCBtb250aFllYXJTdHJpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FyZEV4cGlyeU1vbnRoWWVhcklucHV0JykudmFsdWU7XHJcbiAgICAgICAgY29uc3QgbW9udGhZZWFyVmFsaWRhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJkRXhwaXJ5TW9udGhZZWFyVmFsaWRhdGlvbicpO1xyXG4gICAgICAgIG1vbnRoWWVhclZhbGlkYXRpb24uY2xhc3NMaXN0LmFkZCgna29nbml0aXYtcGF5bWVudC1uby1kaXNwbGF5Jyk7XHJcbiAgICAgICAgbGV0IGlzTW9udGhWYWx1ZUNvcnJlY3QgPSBmYWxzZTtcclxuICAgICAgICBsZXQgaXNZZWFyVmFsdWVDb3JyZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKG1vbnRoWWVhclN0cmluZyAmJiBtb250aFllYXJTdHJpbmcubGVuZ3RoID4gMyAmJiBtb250aFllYXJTdHJpbmcubGVuZ3RoIDwgOCkge1xyXG4gICAgICAgICAgICBjb25zdCBtb250aFllYXJBcnJheSA9IG1vbnRoWWVhclN0cmluZy5zcGxpdCgnLycpO1xyXG4gICAgICAgICAgICBpZiAobW9udGhZZWFyQXJyYXkubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtb250aE51bWJlciA9IE51bWJlcihtb250aFllYXJBcnJheVswXSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB5ZWFyTnVtYmVyID0gTnVtYmVyKG1vbnRoWWVhckFycmF5WzFdKTtcclxuICAgICAgICAgICAgICAgIGlmIChtb250aE51bWJlciAmJiAhaXNOYU4obW9udGhOdW1iZXIpICYmIG1vbnRoTnVtYmVyID4gMCAmJiBtb250aE51bWJlciA8IDEzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNNb250aFZhbHVlQ29ycmVjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoeWVhck51bWJlciAmJiAhaXNOYU4oeWVhck51bWJlcikgJiYgeWVhck51bWJlciA+IDIyICYmIHllYXJOdW1iZXIgPCA1MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzWWVhclZhbHVlQ29ycmVjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpc01vbnRoVmFsdWVDb3JyZWN0IHx8ICFpc1llYXJWYWx1ZUNvcnJlY3QpIHtcclxuICAgICAgICAgICAgbW9udGhZZWFyVmFsaWRhdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdrb2duaXRpdi1wYXltZW50LW5vLWRpc3BsYXknKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzTW9udGhWYWx1ZUNvcnJlY3QgJiYgaXNZZWFyVmFsdWVDb3JyZWN0KSB7XHJcbiAgICAgICAgICAgICRwYW5lbC5jbGFzc0xpc3QuYWRkKCdrb2duaXRpdi1pbnB1dC12YWxpZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgJHBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2tvZ25pdGl2LWlucHV0LXZhbGlkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc01vbnRoVmFsdWVDb3JyZWN0ICYmIGlzWWVhclZhbHVlQ29ycmVjdDtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBkaXNwbGF5Q2NEYXRhRXJyb3JzKGRhdGEpIHtcclxuICAgICAgICBjb25zdCBjYXJkTnVtYmVyVmFsaWRhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJkTnVtYmVyVmFsaWRhdGlvbicpO1xyXG4gICAgICAgIGNvbnN0IGNhcmRDdnZWYWxpZGF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcmRDdnZWYWxpZGF0aW9uJyk7XHJcbiAgICAgICAgY2FyZE51bWJlclZhbGlkYXRpb24uY2xhc3NMaXN0LmFkZCgna29nbml0aXYtcGF5bWVudC1uby1kaXNwbGF5Jyk7XHJcbiAgICAgICAgY2FyZEN2dlZhbGlkYXRpb24uY2xhc3NMaXN0LmFkZCgna29nbml0aXYtcGF5bWVudC1uby1kaXNwbGF5Jyk7XHJcbiAgICAgICAgaWYgKCFkYXRhLmZpZWxkcy5jYXJkTnVtYmVyLnZhbGlkKSB7XHJcbiAgICAgICAgICAgIGNhcmROdW1iZXJWYWxpZGF0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2tvZ25pdGl2LXBheW1lbnQtbm8tZGlzcGxheScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWRhdGEuZmllbGRzLmN2di52YWxpZCkge1xyXG4gICAgICAgICAgICBjYXJkQ3Z2VmFsaWRhdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdrb2duaXRpdi1wYXltZW50LW5vLWRpc3BsYXknKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXRJbnB1dEZpbHRlcihjdnZJbnB1dEVsZW1lbnQsIGlucHV0RmlsdGVyKSB7XHJcbiAgICAgICAgWydpbnB1dCcsICdrZXlkb3duJywgJ2tleXVwJywgJ21vdXNlZG93bicsICdtb3VzZXVwJywgJ3NlbGVjdCcsICdjb250ZXh0bWVudScsICdkcm9wJ11cclxuICAgICAgICAgICAgLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgICAgICBjdnZJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihrZXksIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoL15cXGQrJC8udGVzdChlLmtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdnZJbnB1dEVsZW1lbnQudmFsdWUgPSB0aGlzLmZvcm1hdEV4cGlyeShjdnZJbnB1dEVsZW1lbnQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlucHV0RmlsdGVyKGN2dklucHV0RWxlbWVudC52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9sZFZhbHVlID0gY3Z2SW5wdXRFbGVtZW50LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2xkU2VsZWN0aW9uU3RhcnQgPSBjdnZJbnB1dEVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbGRTZWxlY3Rpb25FbmQgPSBjdnZJbnB1dEVsZW1lbnQuc2VsZWN0aW9uRW5kO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5vbGRWYWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3Z2SW5wdXRFbGVtZW50LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjdnZJbnB1dEVsZW1lbnQudmFsdWUgPSB0aGlzLm9sZFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGN2dklucHV0RWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSh0aGlzLm9sZFNlbGVjdGlvblN0YXJ0LCB0aGlzLm9sZFNlbGVjdGlvbkVuZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vbGRTZWxlY3Rpb25FbmQgPT09IDcgJiYga2V5ID09PSAna2V5dXAnICYmIGUua2V5Lm1hdGNoKC9eWzAtOV0kLykpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlY3VyZUZpZWxkcy5mb2N1cygnY3Z2Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZm9ybWF0RXhwaXJ5KHZhbCkge1xyXG4gICAgICAgIGNvbnN0IHAxID0gcGFyc2VJbnQodmFsWzBdLCAxMCk7XHJcbiAgICAgICAgY29uc3QgcDIgPSBwYXJzZUludCh2YWxbMV0sIDEwKTtcclxuICAgICAgICByZXR1cm4gL15cXGQkLy50ZXN0KHZhbCkgJiYgJzAnICE9PSB2YWwgJiYgJzEnICE9PSB2YWxcclxuICAgICAgICAgICAgPyBgMCR7dmFsfSAvIGBcclxuICAgICAgICAgICAgOiAvXlxcZFxcZCQvLnRlc3QodmFsKVxyXG4gICAgICAgICAgICAgICAgPyBwMiA+IDIgJiYgMCAhPT0gcDEgPyBgMCR7cDF9IC8gJHtwMn1gIDogYCR7dmFsfSAvIGBcclxuICAgICAgICAgICAgICAgIDogdmFsO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2Zvcm1zIHRoZSByZWNlaXZlZCByYXcgZGF0YSB0byBhIGNoZWNrb3V0IGNvbXBhdGlibGUgcmVxdWVzdC4gVGhpcyBvbmx5IHJldHVybnMgc29tZXRoaW5nIGVsc2UgdGhlbiByYXdEYXRhXHJcbiAgICAgKiBpbiBjYXNlIGl0J3MgYSBzdWNjZXNzZnVsIHBheW1lbnQgb3BlcmF0aW9uIGV2ZW50LlxyXG4gICAgICogQHBhcmFtIHJhd0RhdGFcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKi9cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICB0cmFuc2xhdGUocmF3RGF0YSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogcmF3RGF0YS50cmFuc2FjdGlvbklkLFxyXG4gICAgICAgICAgICAgICAgY2FyZEhvbGRlcjogcmF3RGF0YS5jYXJkSG9sZGVyLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuUGNpUHJveHlTZWN1cmVGaWVsZHNKU1Byb3ZpZGVyLlNFRUtEQV9QQ0lfUFJPWFlfQlJBTkRfTUFQID0gbmV3IE1hcChbXHJcbiAgICBbJ3Zpc2EnLCAnVklTJ10sXHJcbiAgICBbJ2FtZXgnLCAnQU1YJ10sXHJcbiAgICBbJ21hc3RlcmNhcmQnLCAnRUNBJ10sXHJcbiAgICBbJ2RpbmVycycsICdESU4nXSxcclxuICAgIFsnZGlzY292ZXInLCAnRElTJ10sXHJcbiAgICBbJ2pjYicsICdKQ0InXSxcclxuXSk7XHJcbiIsImltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcclxuaW1wb3J0IHsgS29nbml0aXZQcm92aWRlciB9IGZyb20gJy4uL2luZnJhc3RydWN0dXJlL3Byb3ZpZGVyLmNsYXNzJztcclxuLyoqXHJcbiAqIFNoaWZ0NCBLb2duaXRpdiBwcm92aWRlci5cclxuICogQGV4dGVuZHMgS29nbml0aXZQcm92aWRlclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNoaWZ0NFByb3ZpZGVyIGV4dGVuZHMgS29nbml0aXZQcm92aWRlciB7XHJcbiAgICAvKipcclxuICAgICAqIEluc3RhbnRpYXRlcyBTaGlmdDQgS29nbml0aXYgUHJvdmlkZXIgY2xhc3MuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zaGlmdDRTY3JpcHRVcmwgPSBlbnZpcm9ubWVudC5zaGlmdDRMaWJVcmw7XHJcbiAgICAgICAgdGhpcy5qUXVlcnlTY3JpcHRVcmwgPSBlbnZpcm9ubWVudC5zaGlmdDRKUXVlcnlVcmw7XHJcbiAgICAgICAgdGhpcy5rb2duaXRpdlBheW1lbnRFbGVtZW50TmFtZSA9ICdrb2duaXRpdi1wYXltZW50JztcclxuICAgICAgICB0aGlzLmZpbGxTY3JpcHRzVG9CZUxvYWRlZCgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBQcmVwYXJlcyBhbmQgaW5pdGlhbGl6ZXMgU2hpZnQ0IEtvZ25pdGl2IFByb3ZpZGVyLlxyXG4gICAgICogRHVyaW5nIGluaXRpYWxpemF0aW9uLCBIVE1MIGVsZW1lbnQgZm9yIGRpc3BsYXlpbmcgU0hpZnQ0IHVzZXIgaW50ZXJmYWNlIGlzIGNyZWF0ZWQsIGN1c3RvbSBwYXltZW50XHJcbiAgICAgKiBwcm92aWRlciBqYXZhc2NyaXB0IGZpbGVzIGFyZSBsb2FkZWQgKGpRdWVyeSBhbmQganF1ZXJ5Lmk0Z29UcnVlVG9rZW4uanMpXHJcbiAgICAgKiBAcGFyYW0gcHJvdmlkZXJTZXR0aW5ncyBjb25maWd1cmF0aW9uIGRhdGEgZm9yIHByb3ZpZGVyLlxyXG4gICAgICogQHBhcmFtIHNldHRpbmdzIGNvbmZpZ3VyYXRpb24gZGF0YSBmb3IgS29nbml0aXYgUGF5bWVudCBMaWJyYXJ5LlxyXG4gICAgICogQG92ZXJyaWRlXHJcbiAgICAgKi9cclxuICAgIGluaXQocHJvdmlkZXJTZXR0aW5ncywgc2V0dGluZ3MpIHtcclxuICAgICAgICB0aGlzLnByb3ZpZGVyU2V0dGluZ3MgPSBwcm92aWRlclNldHRpbmdzO1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB0aGlzLnNldERlZmF1bHRzKCk7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkoJ2luaXQnLCAnc3RhcnQnKTtcclxuICAgICAgICAvLyBjcmVhdGUgZWxlbWVudHMgbmVlZGVkIGJ5IFNoaWZ0NFxyXG4gICAgICAgIHRoaXMuY3JlYXRlSHRtbEVsZW1lbnRzKCk7XHJcbiAgICAgICAgLy8gbXVzdCBiZSBjYWxsZWQgYWZ0ZXIgY3JlYXRpbmcgaHRtbCBlbGVtZW50cywgYXMgaXQgd29ya3Mgd2l0aCBsb2FkaW5nIGJhclxyXG4gICAgICAgIHRoaXMuZGlzcGxheUxvYWRpbmdCYXIodHJ1ZSk7XHJcbiAgICAgICAgLy8gY2hlY2sgcmVxdWlyZWQgc2V0dGluZ3NcclxuICAgICAgICBjb25zdCBzZXR0aW5nRXJyb3JzID0gdGhpcy5jaGVja1NldHRpbmdzKHRoaXMucHJvdmlkZXJTZXR0aW5ncyk7XHJcbiAgICAgICAgaWYgKHNldHRpbmdFcnJvcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlMb2FkaW5nQmFyKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5ub3RpZnkoJ2luaXQnLCAnZXJyb3InLCBzZXR0aW5nRXJyb3JzKTtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGxvYWQgU2hpZnQ0IHNjcmlwdHNcclxuICAgICAgICB0aGlzLmxvYWRTY3JpcHRzKClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5jbGllbnRTY3JpcHRzTG9hZFN1Y2Nlc3MoKSwgKGVycm9yTWVzc2FnZSkgPT4gdGhpcy5jbGllbnRTY3JpcHRzTG9hZEZhaWwoZXJyb3JNZXNzYWdlKSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENsb3NlcyBtb2RhbCBkaWFsb2cgYnkgcmVtb3ZpbmcgcHJldmlvdXNseSBjcmVhdGVkIEhUTUwgZWxlbWVudHMuXHJcbiAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAqL1xyXG4gICAgY2xvc2VNb2RhbCgpIHtcclxuICAgICAgICB0aGlzLmRlbGV0ZUh0bWxFbGVtZW50cygpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFuZCByZXNldHMgc2V0dGluZ3MsIGNhbGxiYWNrLCBjcmVhdGVkIEh0bWwgZWxlbWVudHMgYW5kIGxvYWRlZCBzY3JpcHRzLlxyXG4gICAgICogQG92ZXJyaWRlXHJcbiAgICAgKi9cclxuICAgIHJlc2V0KCkge1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5wcm92aWRlclNldHRpbmdzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMudW5sb2FkU2NyaXB0cygpO1xyXG4gICAgICAgIHRoaXMuZGVsZXRlSHRtbEVsZW1lbnRzKCk7XHJcbiAgICAgICAgdGhpcy5zY3JpcHRzID0gW107XHJcbiAgICB9XHJcbiAgICAvLyAqKioqKioqKioqKioqKipcclxuICAgIC8vIFByb3RlY3RlZCAgbWV0aG9kc1xyXG4gICAgLy8gKioqKioqKioqKioqKioqXHJcbiAgICAvKipcclxuICAgICAqIFNldCBkZWZhdWx0IHZhbHVlIGZvciBjb25maWd1cmF0aW9uIGVudHJpZXMgd2hpY2ggd2VyZSBub3Qgc3BlY2lmaWVkLlxyXG4gICAgKi9cclxuICAgIHNldERlZmF1bHRzKCkge1xyXG4gICAgICAgIHN1cGVyLnNldERlZmF1bHRzKCk7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5sYW5ndWFnZSA9IHRoaXMuc2V0dGluZ3MubGFuZ3VhZ2UgfHwgJ2VuJztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogRGlzcGxheSBlcnJvciBpbiBjb25zb2xlIGFuZCBub3RpZmllcyBwYXJlbnQgYnkgY2FsbGJhY2sgbWV0aG9kLlxyXG4gICAgICogQHBhcmFtIG9wZXJhdGlvbiB0eXBlIG9mIG9wZXJhdGlvbiAoaW5pdCwgcGF5bWVudClcclxuICAgICAqIEBwYXJhbSBzdGF0dXMgc3RhdHVzIG9mIG9wZXJhdGlvbiAoc3RhcnQsIHN1Y2Nlc3MsIGVycm9yKVxyXG4gICAgICogQHBhcmFtIGRhdGEgc3RyaW5nIGFycmF5IHdpdGggYWRkaXRpb25hbCBpbmZvcm1hdGlvbi5cclxuICAgICAqL1xyXG4gICAgbm90aWZ5KG9wZXJhdGlvbiwgc3RhdHVzLCBkYXRhKSB7XHJcbiAgICAgICAgbGV0IHJhd0RhdGE7XHJcbiAgICAgICAgaWYgKG9wZXJhdGlvbiA9PT0gJ3BheW1lbnQnICYmIHN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIGRhdGEpIHtcclxuICAgICAgICAgICAgcmF3RGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLnRyYW5zbGF0ZShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIubm90aWZ5KG9wZXJhdGlvbiwgc3RhdHVzLCBkYXRhLCByYXdEYXRhKTtcclxuICAgIH1cclxuICAgIC8vICoqKioqKioqKioqKioqKlxyXG4gICAgLy8gUHJpdmF0ZSBtZXRob2RzXHJcbiAgICAvLyAqKioqKioqKioqKioqKipcclxuICAgIC8qKlxyXG4gICAgICogRGlzcGxheXMgbG9hZGluZyBiYXIgb3IgU2hpZnQ0IGZvcm0sIGJhc2VkIG9uIHBhcmFtZXRlci5cclxuICAgICAqIEBwYXJhbSBkaXNwbGF5IHdoZW4gdHJ1ZSwgbG9hZGluZyBiYXIgaXMgZGlzcGxheWVkLCBvdGhlcndpc2UgU2hpZnQ0IGZvcm0gaXMgZGlzcGxheWVkLlxyXG4gICAgICovXHJcbiAgICBkaXNwbGF5TG9hZGluZ0JhcihkaXNwbGF5KSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2tvZ25pdGl2LXBheW1lbnQtbG9hZGluZy1pbmRpY2F0b3InKS5zdHlsZS5kaXNwbGF5ID1cclxuICAgICAgICAgICAgZGlzcGxheSA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2k0Z29GcmFtZS1wYW5lbCcpLnN0eWxlLmRpc3BsYXkgPVxyXG4gICAgICAgICAgICBkaXNwbGF5ID8gJ25vbmUnIDogJ2Jsb2NrJztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgU2hpZnQ0IHByb3ZpZGVyLCB3aGljaCBjYXVzZXMgcmVuZGVyaW5nIGl0cyBVSSBpbiBodG1sLlxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplU2hpZnQ0KCkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgIGNvbnN0IGpRdWVyeUtvZ25pdGl2UGF5bWVudEVsZW1lbnQgPSAkKGAjJHt0aGlzLmtvZ25pdGl2UGF5bWVudEVsZW1lbnROYW1lfWApO1xyXG4gICAgICAgIGlmIChqUXVlcnlLb2duaXRpdlBheW1lbnRFbGVtZW50ID09PSBudWxsIHx8IGpRdWVyeUtvZ25pdGl2UGF5bWVudEVsZW1lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGpRdWVyeUtvZ25pdGl2UGF5bWVudEVsZW1lbnQuaTRnb1RydWVUb2tlbikge1xyXG4gICAgICAgICAgICBjb25zdCBzaGlmdDRTZXR0aW5nID0ge1xyXG4gICAgICAgICAgICAgICAgZGVidWc6IHRoaXMuc2V0dGluZ3MuZGVidWcsXHJcbiAgICAgICAgICAgICAgICByZW1vdGVEZWJ1ZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB1cmw6ICgoX2EgPSB0aGlzLnByb3ZpZGVyU2V0dGluZ3MudHJhbnNhY3Rpb24uZXh0cmFbJ2k0Z29VcmwnXSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5wcm92aWRlclNldHRpbmdzLmlzVGVzdE1vZGUpID8gJ2h0dHBzOi8vaTRtLnNoaWZ0NHRlc3QuY29tJyA6ICdodHRwczovL2k0bS5pNGdvLmNvbScsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXI6IHRoaXMucHJvdmlkZXJTZXR0aW5ncy50cmFuc2FjdGlvbi5leHRyYVsnaTRnb1NlcnZlciddLFxyXG4gICAgICAgICAgICAgICAgYWNjZXNzQmxvY2s6IHRoaXMucHJvdmlkZXJTZXR0aW5ncy50cmFuc2FjdGlvbi5leHRyYVsnaTRnb0FjY2Vzc2Jsb2NrJ10sXHJcbiAgICAgICAgICAgICAgICBzZWxmOiBkb2N1bWVudC5sb2NhdGlvbixcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnc2hpZnQ0c2hvcCcsXHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZTogdGhpcy5zZXR0aW5ncy5sYW5ndWFnZSxcclxuICAgICAgICAgICAgICAgIGZyYW1lQXV0b1Jlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVuY3J5cHRlZE9ubHlTd2lwZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpNGdvSW5mbzogeyBjbGFzc2VzOiAnJywgbGFiZWw6ICcnLCB2aXNpYmxlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICAgICAgICAgIG9uU3VjY2VzczogKF9mb3JtLCBkYXRhKSA9PiB0aGlzLm5vdGlmeSgncGF5bWVudCcsICdzdWNjZXNzJywgZGF0YSksXHJcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgICAgICAgICAgb25GYWlsdXJlOiAoX2Zvcm0sIGRhdGEpID0+IHRoaXMubm90aWZ5KCdwYXltZW50JywgJ2Vycm9yJywgZGF0YSksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIC8vIG1ha2UgY2FyZGhvbGRlciBuYW1lIHZpc2libGUgYW5kIHJlcXVpcmVkXHJcbiAgICAgICAgICAgIHNoaWZ0NFNldHRpbmcuY2FyZGhvbGRlck5hbWUgPSB7IHZpc2libGU6IHRydWUsIHJlcXVpcmVkOiB0cnVlIH07XHJcbiAgICAgICAgICAgIC8vIGNvbnZlcnQgS29nbml0aXYgY3JlZGl0IGNhcmRzIGNvZGVzIHRvIFNoaWZ0NFxyXG4gICAgICAgICAgICB0aGlzLnByZXBhcmVDcmVkaXRDYXJkcyhzaGlmdDRTZXR0aW5nKTtcclxuICAgICAgICAgICAgLy8gc3VwcGx5IHRyYW5zbGF0aW9ucywgaWYgbGFuZ3VhZ2UgaXMgbm90IHN1cHBvcnRlZCBieSBTaGlmdDRcclxuICAgICAgICAgICAgdGhpcy5wcmVwYXJlTGFuZ3VhZ2VGb3JTaGlmdDQoc2hpZnQ0U2V0dGluZyk7XHJcbiAgICAgICAgICAgIC8vIHByZXBhcmUgc3R5bGVzXHJcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZVN0eWxlcyhzaGlmdDRTZXR0aW5nKTtcclxuICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSBTaGlmdDQgcGx1Z2luXHJcbiAgICAgICAgICAgIGNvbnN0IGk0Z29UcnVlVG9rZW5PYmogPSBqUXVlcnlLb2duaXRpdlBheW1lbnRFbGVtZW50Lmk0Z29UcnVlVG9rZW4oc2hpZnQ0U2V0dGluZyk7XHJcbiAgICAgICAgICAgIC8vIGlGcmFtZSB1cmwgY2hhbmdlIGhhbmRsZXJcclxuICAgICAgICAgICAgY29uc3QgaUZyYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaTRnb1RydWVUb2tlbk9iai5mcmFtZU5hbWUpO1xyXG4gICAgICAgICAgICBpRnJhbWUub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5TG9hZGluZ0JhcihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeSgnaW5pdCcsICdzdWNjZXNzJyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlGcmFtZS5vbmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5TG9hZGluZ0JhcihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeSgnaW5pdCcsICdlcnJvcicsIFsnU2hpZnQ0IGlGcmFtZSBjb3VsZCBub3QgbG9hZCB0aGUgY29udGVudCddKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyB3aGV0aGVyIGFsbCByZXF1aXJlZCBzZXR0aW5nIHZhbHVlcyB3ZXJlIHN1cHBsaWVkXHJcbiAgICAgKiBAcGFyYW0gcHJvdmlkZXJTZXR0aW5ncyBzZXR0aW5nIHZhbHVlcy5cclxuICAgICAqIEByZXR1cm5zIHN0cmluZyBhcnJheSwgZmlsbGVkIGJ5IGVycm9yIG1lc3NhZ2VzIChvciBlbXB0eSBpZiBubyBlcnJvciB3YXMgZm91bmQpLlxyXG4gICAgICovXHJcbiAgICBjaGVja1NldHRpbmdzKHByb3ZpZGVyU2V0dGluZ3MpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gW107XHJcbiAgICAgICAgaWYgKCEoKF9hID0gcHJvdmlkZXJTZXR0aW5ncyA9PT0gbnVsbCB8fCBwcm92aWRlclNldHRpbmdzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcm92aWRlclNldHRpbmdzLnRyYW5zYWN0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZXh0cmEpKSB7XHJcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKCdObyBzZXR0aW5ncyBmb3IgU2hpZnQ0IHdlcmUgZm91bmQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghcHJvdmlkZXJTZXR0aW5ncy50cmFuc2FjdGlvbi5leHRyYVsnaTRnb0FjY2Vzc2Jsb2NrJ10pIHtcclxuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKCdBY2Nlc3NCbG9jayBtdXN0IGJlIHNwZWNpZmllZCBmb3IgU2hpZnQ0Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFwcm92aWRlclNldHRpbmdzLnRyYW5zYWN0aW9uLmV4dHJhWydpNGdvU2VydmVyJ10pIHtcclxuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKCdTZXJ2ZXIgbXVzdCBiZSBzcGVjaWZpZWQgZm9yIFNoaWZ0NCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlcnJvcnM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW5kIGluamVjdHMgaHRtbCBlbGVtZW50cyAoZXNwZWNpYWxseSBkaXYsIHdoZXJlIFNoaWZ0NCB3aWxsIHJlbmRlciBpdHMgVUkpLCBuZWVkZWQgZm9yXHJcbiAgICAgKiBTaGlmdDQgcHJvdmlkZXIsIGludG8gaHRtbCBkb2N1bWVudC5cclxuICAgICAqL1xyXG4gICAgY3JlYXRlSHRtbEVsZW1lbnRzKCkge1xyXG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2U7XHJcbiAgICAgICAgLy8gZ2V0IGRlZmF1bHQgc3R5bGUgdmFsdWVzXHJcbiAgICAgICAgY29uc3QgYmFja0Ryb3BDb2xvciA9IChfYSA9IHRoaXMuc2V0dGluZ3Muc3R5bGluZy5iYWNrZHJvcENvbG9yKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnIzMwMzAzOGIzJztcclxuICAgICAgICBjb25zdCBtb2RhbEJhY2tncm91bmRDb2xvciA9IChfYiA9IHRoaXMuc2V0dGluZ3Muc3R5bGluZy5tb2RhbEJhY2tncm91bmRDb2xvcikgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogJyNlZmVmZjEnO1xyXG4gICAgICAgIGNvbnN0IGJyYW5jaEJhY2tncm91bmRDb2xvciA9IChfYyA9IHRoaXMuc2V0dGluZ3Muc3R5bGluZy5icmFuY2hCYWNrZ3JvdW5kQ29sb3IpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6ICcjMDE2NjlmJztcclxuICAgICAgICBjb25zdCBicmFuY2hDb2xvciA9IChfZCA9IHRoaXMuc2V0dGluZ3Muc3R5bGluZy5icmFuY2hDb2xvcikgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogJyNmZmYnO1xyXG4gICAgICAgIGNvbnN0IGxvYWRpbmdJbmRpY2F0b3JDb2xvciA9IChfZSA9IHRoaXMuc2V0dGluZ3Muc3R5bGluZy5sb2FkaW5nSW5kaWNhdG9yQ29sb3IpICE9PSBudWxsICYmIF9lICE9PSB2b2lkIDAgPyBfZSA6ICdzaWx2ZXInO1xyXG4gICAgICAgIC8vIFRPRE8gLSBtb3ZlIHRoaXMgKGF0IGxlYXN0IGNvbW1vbiBwYXJ0IChiYWNrZ3JvdW5kLCBtb2RhbC4uLikgYWxzbyB0byBiYXNlIGNsYXNzLCBlc3BlY2lhbGx5IGlmIG90aGVyXHJcbiAgICAgICAgLy8gS29nbml0aXYgUHJvdmlkZXIgd2lsbCBuZWVkIHRvIGJlIHJlbmRlcmVkIGluIG1vZGFsXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzSHRtbEVsZW1lbnRzQ3JlYXRlZCgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgICAgICAgICAgLy8gbWFpbiBvdmVybGF5XHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCA9IGAua29nbml0aXYtcGF5bWVudC1tYWluLW92ZXJsYXkgeyBwb3NpdGlvbjogZml4ZWQ7IHRvcDogMDsgYm90dG9tOiAwOyBsZWZ0OiAwOyByaWdodDogMDsgYmFja2dyb3VuZDogJHtiYWNrRHJvcENvbG9yfTsgei1pbmRleDogMTAwMDsgfWA7XHJcbiAgICAgICAgICAgIC8vIHBvcHVwXHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSBgLmtvZ25pdGl2LXBheW1lbnQtbWFpbi1wb3B1cCB7IG1hcmdpbjogNzBweCBhdXRvOyBiYWNrZ3JvdW5kOiAke21vZGFsQmFja2dyb3VuZENvbG9yfTsgYm9yZGVyLXJhZGl1czogNnB4OyBgO1xyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gYHdpZHRoOiA1MDBweDsgbWluLWhlaWdodDogNDIwcHg7IHBvc2l0aW9uOiByZWxhdGl2ZTsgfWA7XHJcbiAgICAgICAgICAgIC8vIGhlYWRlciBwYW5lbFxyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gYC5rb2duaXRpdi1wYXltZW50LWhlYWRlci1wYW5lbCB7IGJvcmRlci1yYWRpdXM6IDZweCA2cHggMXB4IDFweDsgcGFkZGluZy10b3A6IDRweDsgYDtcclxuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MICs9IGBtYXJnaW4tYm90dG9tOiAxMHB4OyBoZWlnaHQ6NjRweDsgYmFja2dyb3VuZC1jb2xvcjogJHticmFuY2hCYWNrZ3JvdW5kQ29sb3J9OyBjb2xvcjogJHticmFuY2hDb2xvcn07IH1gO1xyXG4gICAgICAgICAgICAvLyBoZWFkZXJcclxuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MICs9IGAua29nbml0aXYtcGF5bWVudC1oZWFkZXItcGFuZWwgaDIgeyBtYXJnaW4tdG9wOiAxOHB4OyBtYXJnaW4tbGVmdDogMjRweDsgZm9udC1zaXplOiAxNnB4OyBgO1xyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gYGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgc2Fucy1zZXJpZiwgc2VyaWY7IGxldHRlci1zcGFjaW5nOiAwLjFweDsgZm9udC13ZWlnaHQ6IDcwMDsgfWA7XHJcbiAgICAgICAgICAgIC8vIGhlYWRlciBjbG9zZSBidXR0b25cclxuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MICs9IGAua29nbml0aXYtcGF5bWVudC1oZWFkZXItcGFuZWwgLmtvZ25pdGl2LXBheW1lbnQtaGVhZGVyLWNsb3NlLWJ1dHRvbiB7IGZsb2F0OiByaWdodDsgbWFyZ2luLXRvcDogMTBweDsgbWFyZ2luLXJpZ2h0OiAyMHB4OyBgO1xyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gYGZvbnQtc2l6ZTogMzBweDsgY3Vyc29yOiBwb2ludGVyOyB9YDtcclxuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MICs9IGAua29nbml0aXYtcGF5bWVudC1oZWFkZXItcGFuZWwgLmtvZ25pdGl2LXBheW1lbnQtaGVhZGVyLWNsb3NlLWJ1dHRvbjpob3ZlciB7IGZvbnQtd2VpZ2h0OiBib2xkOyB9IGA7XHJcbiAgICAgICAgICAgIC8vIGxvYWRpbmcgaW5kaWNhdG9yXHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSBgLmtvZ25pdGl2LXBheW1lbnQtbG9hZGluZy1pbmRpY2F0b3IgeyB3aWR0aDogNDhweDsgaGVpZ2h0OiA0OHB4OyBib3JkZXItcmFkaXVzOiA1MCU7IHBvc2l0aW9uOiByZWxhdGl2ZTsgYDtcclxuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MICs9IGBhbmltYXRpb246IHJvdGF0ZSAxcyBsaW5lYXIgaW5maW5pdGU7IG1hcmdpbjogMzBweCBhdXRvO3otaW5kZXg6IDE7IH1gO1xyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gYC5rb2duaXRpdi1wYXltZW50LWxvYWRpbmctaW5kaWNhdG9yOjpiZWZvcmUgeyBjb250ZW50OiBcIlwiOyBib3gtc2l6aW5nOiBib3JkZXItYm94OyBwb3NpdGlvbjogYWJzb2x1dGU7IGluc2V0OiAwcHg7IGA7XHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSBgYm9yZGVyLXJhZGl1czogNTAlOyBib3JkZXI6IDVweCBzb2xpZCAke2xvYWRpbmdJbmRpY2F0b3JDb2xvcn07IGFuaW1hdGlvbjogcHJpeENsaXBGaXggMnMgbGluZWFyIGluZmluaXRlOyB9YDtcclxuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MICs9IGBAa2V5ZnJhbWVzIHJvdGF0ZSB7IDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9fWA7XHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSBgQGtleWZyYW1lcyBwcml4Q2xpcEZpeCB7IGA7XHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSBgMCUgeyBjbGlwLXBhdGg6IHBvbHlnb24oNTAlIDUwJSwgMCAwLCAwIDAsIDAgMCwgMCAwLCAwIDApIH0gYDtcclxuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MICs9IGAyNSUgeyBjbGlwLXBhdGg6IHBvbHlnb24oNTAlIDUwJSwgMCAwLCAxMDAlIDAsIDEwMCUgMCwgMTAwJSAwLCAxMDAlIDApIH0gYDtcclxuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MICs9IGA1MCUgeyBjbGlwLXBhdGg6IHBvbHlnb24oNTAlIDUwJSwgMCAwLCAxMDAlIDAsIDEwMCUgMTAwJSwgMTAwJSAxMDAlLCAxMDAlIDEwMCUpIH0gYDtcclxuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MICs9IGA3NSUgeyBjbGlwLXBhdGg6IHBvbHlnb24oNTAlIDUwJSwgMCAwLCAxMDAlIDAsIDEwMCUgMTAwJSwgMCAxMDAlLCAwIDEwMCUpIH0gYDtcclxuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MICs9IGAxMDAlIHsgY2xpcC1wYXRoOiBwb2x5Z29uKDUwJSA1MCUsIDAgMCwgMTAwJSAwLCAxMDAlIDEwMCUsIDAgMTAwJSwgMCAwKSB9fSBgO1xyXG4gICAgICAgICAgICAvLyBwYW5lbCBmb3IgU2hpZnQ0IGZyYW1lIFxyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gYC5pNGdvRnJhbWUtcGFuZWx7IHotaW5kZXg6IDEwMDA7IHBvc2l0aW9uOiByZWxhdGl2ZTsgZGlzcGxheTogbm9uZTsgcGFkZGluZzogMjBweDsgb3ZlcmZsb3c6IGF1dG87IH1gO1xyXG4gICAgICAgICAgICAvLyBTaGlmdDQgZnJhbWUgXHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSBgLmk0Z29GcmFtZXsgfWA7XHJcbiAgICAgICAgICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgnaWQnLCAnc2hpZnQ0U3R5bGVzJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG4gICAgICAgICAgICAvLyBoZWFkZXJcclxuICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcclxuICAgICAgICAgICAgaGVhZGVyLnNldEF0dHJpYnV0ZSgnaWQnLCAna29nbml0aXYtcGF5bWVudC1oZWFkZXInKTtcclxuICAgICAgICAgICAgaGVhZGVyLmlubmVyVGV4dCA9ICdTaGlmdCA0JztcclxuICAgICAgICAgICAgLy8gY2xvc2UgYnV0dG9uXHJcbiAgICAgICAgICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgICAgICBjbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2tvZ25pdGl2LXBheW1lbnQtaGVhZGVyLWNsb3NlLWJ1dHRvbicpO1xyXG4gICAgICAgICAgICBjbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2tvZ25pdGl2LXBheW1lbnQtaGVhZGVyLWNsb3NlLWJ1dHRvbicpO1xyXG4gICAgICAgICAgICBjbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSAnJnRpbWVzOyc7XHJcbiAgICAgICAgICAgIGNsb3NlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna29nbml0aXYtcGF5bWVudC1tYWluLW92ZXJsYXknKS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeSgncG9wdXAnLCAnY2xvc2VkJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIC8vIGhlYWRlciBwYW5lbFxyXG4gICAgICAgICAgICBjb25zdCBoZWFkZXJQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBoZWFkZXJQYW5lbC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2tvZ25pdGl2LXBheW1lbnQtaGVhZGVyLXBhbmVsJyk7XHJcbiAgICAgICAgICAgIGhlYWRlclBhbmVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAna29nbml0aXYtcGF5bWVudC1oZWFkZXItcGFuZWwnKTtcclxuICAgICAgICAgICAgaGVhZGVyUGFuZWwuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xyXG4gICAgICAgICAgICBoZWFkZXJQYW5lbC5hcHBlbmRDaGlsZChoZWFkZXIpO1xyXG4gICAgICAgICAgICAvLyBsb2FkaW5nIGJhclxyXG4gICAgICAgICAgICBjb25zdCBsb2FkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICBsb2FkaW5nLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAna29nbml0aXYtcGF5bWVudC1sb2FkaW5nLWluZGljYXRvcicpO1xyXG4gICAgICAgICAgICBsb2FkaW5nLnNldEF0dHJpYnV0ZSgnaWQnLCAna29nbml0aXYtcGF5bWVudC1sb2FkaW5nLWluZGljYXRvcicpO1xyXG4gICAgICAgICAgICAvLyBmcmFtZSBmb3IgU2hpZnQ0XHJcbiAgICAgICAgICAgIGNvbnN0IGk0Z29GcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBpNGdvRnJhbWUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdpNGdvRnJhbWUnKTtcclxuICAgICAgICAgICAgaTRnb0ZyYW1lLnNldEF0dHJpYnV0ZSgnaWQnLCAnaTRnb0ZyYW1lJyk7XHJcbiAgICAgICAgICAgIC8vIHBhbmVsIGZvciBTaGlmdDQgZnJhbWVcclxuICAgICAgICAgICAgY29uc3QgaTRnb0ZyYW1lUGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgaTRnb0ZyYW1lUGFuZWwuc2V0QXR0cmlidXRlKCdpZCcsICdpNGdvRnJhbWUtcGFuZWwnKTtcclxuICAgICAgICAgICAgaTRnb0ZyYW1lUGFuZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsICdpNGdvRnJhbWUtcGFuZWwnKTtcclxuICAgICAgICAgICAgaTRnb0ZyYW1lUGFuZWwuYXBwZW5kQ2hpbGQoaTRnb0ZyYW1lKTtcclxuICAgICAgICAgICAgLy8gcG9wdXBcclxuICAgICAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgbW9kYWwuc2V0QXR0cmlidXRlKCdpZCcsICdrb2duaXRpdi1wYXltZW50LW1haW4tcG9wdXAnKTtcclxuICAgICAgICAgICAgbW9kYWwuc2V0QXR0cmlidXRlKCdjbGFzcycsICdrb2duaXRpdi1wYXltZW50LW1haW4tcG9wdXAnKTtcclxuICAgICAgICAgICAgbW9kYWwuYXBwZW5kQ2hpbGQoaGVhZGVyUGFuZWwpO1xyXG4gICAgICAgICAgICBtb2RhbC5hcHBlbmRDaGlsZChsb2FkaW5nKTtcclxuICAgICAgICAgICAgbW9kYWwuYXBwZW5kQ2hpbGQoaTRnb0ZyYW1lUGFuZWwpO1xyXG4gICAgICAgICAgICAvLyBtYWluIHBhZ2Ugb3ZlcmxheVxyXG4gICAgICAgICAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIG92ZXJsYXkuc2V0QXR0cmlidXRlKCdpZCcsICdrb2duaXRpdi1wYXltZW50LW1haW4tb3ZlcmxheScpO1xyXG4gICAgICAgICAgICBvdmVybGF5LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAna29nbml0aXYtcGF5bWVudC1tYWluLW92ZXJsYXknKTtcclxuICAgICAgICAgICAgb3ZlcmxheS5hcHBlbmRDaGlsZChtb2RhbCk7XHJcbiAgICAgICAgICAgIC8vIG1haW4gZGl2XHJcbiAgICAgICAgICAgIHRoaXMua29nbml0aXZQYXltZW50RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICB0aGlzLmtvZ25pdGl2UGF5bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICdrb2duaXRpdi1wYXltZW50Jyk7XHJcbiAgICAgICAgICAgIHRoaXMua29nbml0aXZQYXltZW50RWxlbWVudC5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmtvZ25pdGl2UGF5bWVudEVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbGwgaHRtbCBlbGVtZW50cyB3aGljaCB3ZXJlIGNyZWF0ZWQgYnkgU2hpZnQ0IHByb3ZpZGVyLlxyXG4gICAgICovXHJcbiAgICBkZWxldGVIdG1sRWxlbWVudHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMua29nbml0aXZQYXltZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMua29nbml0aXZQYXltZW50RWxlbWVudCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGxpbmtzLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5pZCA9PT0gJ3NoaWZ0NFN0eWxlcycpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5rb2duaXRpdlBheW1lbnRFbGVtZW50ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIFNoaWZ0NCwgYWZ0ZXIgc2NyaXB0cyB3ZXJlIHN1Y2Nlc3NmdWxseSBsb2FkZWQuXHJcbiAgICAgKi9cclxuICAgIGNsaWVudFNjcmlwdHNMb2FkU3VjY2VzcygpIHtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVTaGlmdDQoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogRGlzcGxheXMgZXJyb3IsIHdoaWNoIG9jY3VycmVkIGR1cmluZyBzY3JpcHQgbG9hZGluZy5cclxuICAgICAqIEBwYXJhbSBlcnIgZXJyb3IgbWVzc2FnZS5cclxuICAgICAqL1xyXG4gICAgY2xpZW50U2NyaXB0c0xvYWRGYWlsKGVycikge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUxvYWRpbmdCYXIoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubm90aWZ5KCdpbml0JywgJ2Vycm9yJywgW2Vycl0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBQcmVwYXJlcyBhcnJheSBvZiBzY3JpcHRzLCB3aGljaCBuZWVkcyB0byBiZSBsb2FkZWQuXHJcbiAgICAgKi9cclxuICAgIGZpbGxTY3JpcHRzVG9CZUxvYWRlZCgpIHtcclxuICAgICAgICB0aGlzLnNjcmlwdHMgPSBbXTtcclxuICAgICAgICBpZiAodHlwZW9mICQgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JpcHRzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgc3JjOiB0aGlzLmpRdWVyeVNjcmlwdFVybCxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ2Nyb3Nzb3JpZ2luJywgdmFsdWU6ICdhbm9ueW1vdXMnIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5pc1NoaWZ0NFNjcmlwdExvYWRlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NyaXB0cy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHNyYzogdGhpcy5zaGlmdDRTY3JpcHRVcmwsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVGVzdHMgd2hldGhlciBodG1sIGVsZW1lbnQgZm9yIFNoaWZ0NCB3YXMgY3JlYXRlZC5cclxuICAgICAqIEByZXR1cm5zIHRydWUsIGlmIGVsZW1lbnQgZm9yIFNoaWZ0NCB3YXMgYWxyZWFkeSBjcmVhdGVkLCBvdGhlcndpc2UgZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIGlzSHRtbEVsZW1lbnRzQ3JlYXRlZCgpIHtcclxuICAgICAgICBjb25zdCBwYXltZW50RnJhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna29nbml0aXYtcGF5bWVudCcpO1xyXG4gICAgICAgIHJldHVybiAhIXBheW1lbnRGcmFtZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVGVzdHMgd2hldGhlciBTaGlmdDQgc2NyaXB0IHdhcyBhbHJlYWR5IGxvYWRlZC5cclxuICAgICAqIEByZXR1cm5zIHRydWUsIGlmIFNoaWZ0NCBzY3JpcHQgd2FzIGFscmVhZHkgbG9hZGVkLCBvdGhlcndpc2UgZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIGlzU2hpZnQ0U2NyaXB0TG9hZGVkKCkge1xyXG4gICAgICAgIGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XHJcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHNjcmlwdHMpIHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuc3JjID09PSB0aGlzLnNoaWZ0NFNjcmlwdFVybCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhbGwgYWxsb3dlZCBjcmVkaXQgY2FyZHMgZnJvbSBLb2duaXRpdiBmb3JtYXQgYW5kIGFzc2lnbnMgaXQgdG9cclxuICAgICAqIFNoaWZ0NCBjb25maWd1cmF0aW9uLlxyXG4gICAgICogQHBhcmFtIHNoaWZ0NFNldHRpbmcgU2hpZnQ0IHNldHRpbmcgdmFsdWVzLlxyXG4gICAgICovXHJcbiAgICBwcmVwYXJlQ3JlZGl0Q2FyZHMoc2hpZnQ0U2V0dGluZykge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICAvLyBUT0RPIC0gZ2V0IGFsbCBLb2duaXRpdiBjYyBjb2Rlc1xyXG4gICAgICAgIC8vIFRPRE8gLSBpZiBrb2duaXRpdiBjYyBhcnJheSBpcyBmYWxzeSwgYWxsb3cgYWxsIENDP1xyXG4gICAgICAgIGNvbnN0IGtvZ25pdGl2Q2NUb1NoaWZ0NE1hcCA9IHtcclxuICAgICAgICAgICAgZGlzY292ZXI6ICdOUycsXHJcbiAgICAgICAgICAgIGFtZXg6ICdBWCcsXHJcbiAgICAgICAgICAgIHZpc2E6ICdWUycsXHJcbiAgICAgICAgICAgIG1hc3RlcmNhcmQ6ICdNQycsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBhY2NlcHRlZFBheW1lbnRzID0gW107XHJcbiAgICAgICAgKF9hID0gdGhpcy5wcm92aWRlclNldHRpbmdzLmFsbG93ZWRDY1R5cGVDb2RlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmZvckVhY2goa29nbml0aXZDb2RlID0+IHtcclxuICAgICAgICAgICAgaWYgKGtvZ25pdGl2Q2NUb1NoaWZ0NE1hcFtrb2duaXRpdkNvZGVdKSB7XHJcbiAgICAgICAgICAgICAgICBhY2NlcHRlZFBheW1lbnRzLnB1c2goa29nbml0aXZDY1RvU2hpZnQ0TWFwW2tvZ25pdGl2Q29kZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGFjY2VwdGVkUGF5bWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBzaGlmdDRTZXR0aW5nLmFjY2VwdGVkUGF5bWVudHMgPSBhY2NlcHRlZFBheW1lbnRzLmpvaW4oJywnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zbGF0ZXMgc3RyaW5ncyBmb3IgbGFuZ3VhZ2VzIG5vbiBzdXBwb3J0ZWQgbmF0aXZlbHkgYnkgU2hpZnQ0LlxyXG4gICAgICogQHBhcmFtIHNoaWZ0NFNldHRpbmcgU2hpZnQ0IHNldHRpbmcgdmFsdWVzLlxyXG4gICAgICovXHJcbiAgICBwcmVwYXJlTGFuZ3VhZ2VGb3JTaGlmdDQoc2hpZnQ0U2V0dGluZykge1xyXG4gICAgICAgIGlmIChbJ2VuJywgJ2VzJywgJ2ZyJywgJ3B0JywgJ2x0J10uc29tZShjb2RlID0+IGNvZGUgPT09IHNoaWZ0NFNldHRpbmcubGFuZ3VhZ2UpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc3VwcG9ydCBmb3Igb3RoZXIgbGFuZ3VhZ2VzXHJcbiAgICAgICAgaWYgKHNoaWZ0NFNldHRpbmcubGFuZ3VhZ2UgPT09ICdkZScpIHtcclxuICAgICAgICAgICAgc2hpZnQ0U2V0dGluZy5jYXJkaG9sZGVyTmFtZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgc2hpZnQ0U2V0dGluZy5jYXJkaG9sZGVyTmFtZSksIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnTmFtZSBkZXMgS2FydGVuaW5oYWJlcnMnLCBwbGFjZWhvbGRlcjogJ05hbWUgZGVzIEthcnRlbmluaGFiZXJzJyxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdEZXIgTmFtZSBkZXMgS2FydGVuaW5oYWJlcnMgaXN0IGVyZm9yZGVybGljaC4nXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzaGlmdDRTZXR0aW5nLmNhcmRUeXBlID0geyBsYWJlbDogJ0thcnRlIGF1c3fDpGhsZW4nLCBwbGFjZWhvbGRlcjogJ0thcnRlIGF1c3fDpGhsZW4nLCBtZXNzYWdlOiAnRGVyIEthcnRlbnR5cCBpc3QgZXJmb3JkZXJsaWNoLicgfTtcclxuICAgICAgICAgICAgc2hpZnQ0U2V0dGluZy5jYXJkTnVtYmVyID0geyBsYWJlbDogJ0thcnRlbm51bW1lcicsIHBsYWNlaG9sZGVyOiAnS2FydGVubnVtbWVyJywgbWVzc2FnZTogJ0RpZSBLYXJ0ZW5udW1tZXIgaXN0IGVyZm9yZGVybGljaC4nIH07XHJcbiAgICAgICAgICAgIHNoaWZ0NFNldHRpbmcuZXhwaXJhdGlvbk1vbnRoID0geyBsYWJlbDogJ01NJywgcGxhY2Vob2xkZXI6ICdNTScsIG1lc3NhZ2U6ICdEYXMgVmVyZmFsbHNkYXR1bSBpc3QgZXJmb3JkZXJsaWNoLicgfTtcclxuICAgICAgICAgICAgc2hpZnQ0U2V0dGluZy5leHBpcmF0aW9uWWVhciA9IHsgbGFiZWw6ICdZWVlZJywgcGxhY2Vob2xkZXI6ICdZWVlZJywgbWVzc2FnZTogJ0RhcyBWZXJmYWxsc2RhdHVtIGlzdCBlcmZvcmRlcmxpY2guJyB9O1xyXG4gICAgICAgICAgICBzaGlmdDRTZXR0aW5nLmN2djJDb2RlID0geyBsYWJlbDogJ0NWVicsIHBsYWNlaG9sZGVyOiAnQ1ZWJywgbWVzc2FnZTogJ0RlciBTaWNoZXJoZWl0c2NvZGUgZGVyIEthcnRlIGlzdCBlcmZvcmRlcmxpY2guJywgcmVxdWlyZWQ6IHRydWUgfTtcclxuICAgICAgICAgICAgc2hpZnQ0U2V0dGluZy5zdWJtaXRCdXR0b24gPSB7IGxhYmVsOiAnTWVpbmUgWmFobHVuZ3NpbmZvcm1hdGlvbmVuIHNpY2hlcm4nIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGZhbGxiYWNrIHRvIGVuZ2xpc2gsIGluIGNhc2Ugc29tZSBzdHJpbmdzIHdlcmUgbm90IHRyYW5zbGF0ZWRcclxuICAgICAgICBzaGlmdDRTZXR0aW5nLmxhbmd1YWdlID0gJ2VuJztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUHJlcGFyZXMgc3R5bGVzLCBlaXRoZXIgZGVmYXVsdCBvciBvdmVycmlkZGVuLlxyXG4gICAgICogQHBhcmFtIHNoaWZ0NFNldHRpbmcgU2hpZnQ0IHNldHRpbmcgdmFsdWVzLlxyXG4gICAgICovXHJcbiAgICBwcmVwYXJlU3R5bGVzKHNoaWZ0NFNldHRpbmcpIHtcclxuICAgICAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgICAgICBjb25zdCBtb2RhbEJhY2tncm91bmRDb2xvciA9IChfYSA9IHRoaXMuc2V0dGluZ3Muc3R5bGluZy5tb2RhbEJhY2tncm91bmRDb2xvcikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJyNlZmVmZjEnO1xyXG4gICAgICAgIGNvbnN0IGJyYW5jaENvbG9yID0gKF9iID0gdGhpcy5zZXR0aW5ncy5zdHlsaW5nLmJyYW5jaENvbG9yKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnI2ZmZic7XHJcbiAgICAgICAgY29uc3QgYnJhbmNoQmFja2dyb3VuZENvbG9yID0gKF9jID0gdGhpcy5zZXR0aW5ncy5zdHlsaW5nLmJyYW5jaEJhY2tncm91bmRDb2xvcikgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogJyMwMTY2OWYnO1xyXG4gICAgICAgIHNoaWZ0NFNldHRpbmcuY3NzUnVsZXMgPSBbXHJcbiAgICAgICAgICAgIGBib2R5eyBiYWNrZ3JvdW5kLWNvbG9yOiAke21vZGFsQmFja2dyb3VuZENvbG9yfSB9YCxcclxuICAgICAgICAgICAgYCNpNGdvX3N1Ym1pdHtiYWNrZ3JvdW5kLWNvbG9yOiAke2JyYW5jaEJhY2tncm91bmRDb2xvcn07fWAsXHJcbiAgICAgICAgICAgIGAjaTRnb19zdWJtaXR7Y29sb3I6ICR7YnJhbmNoQ29sb3J9O31gLFxyXG4gICAgICAgICAgICBgLmN2djJpbmZvIHtmb250LXNpemU6IDEycHg7IGxpbmUtaGVpZ2h0OiAxLjI7fWAsXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNmb3JtcyB0aGUgcmVjZWl2ZWQgcmF3IGRhdGEgdG8gYSBjaGVja291dCBjb21wYXRpYmxlIHJlcXVlc3QuIFRoaXMgb25seSByZXR1cm5zIHNvbWV0aGluZyBlbHNlIHRoZW4gcmF3RGF0YVxyXG4gICAgICogaW4gY2FzZSBpdCdzIGEgc3VjY2Vzc2Z1bCBwYXltZW50IG9wZXJhdGlvbiBldmVudC5cclxuICAgICAqIEBwYXJhbSByYXdEYXRhXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICovXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgdHJhbnNsYXRlKHJhd0RhdGEpIHtcclxuICAgICAgICBjb25zdCBleHBpcnlNb250aCA9IChyYXdEYXRhLmk0Z29fZXhwaXJhdGlvbm1vbnRoIHx8ICcnKS5sZW5ndGggPT09IDFcclxuICAgICAgICAgICAgPyBgMCR7cmF3RGF0YS5pNGdvX2V4cGlyYXRpb25tb250aH1gXHJcbiAgICAgICAgICAgIDogcmF3RGF0YS5pNGdvX2V4cGlyYXRpb25tb250aDtcclxuICAgICAgICBjb25zdCBleHBpcnlZZWFyID0gKHJhd0RhdGEuaTRnb19leHBpcmF0aW9ueWVhciB8fCAnJykubGVuZ3RoID09PSAyXHJcbiAgICAgICAgICAgID8gYDIwJHtyYXdEYXRhLmk0Z29fZXhwaXJhdGlvbnllYXJ9YFxyXG4gICAgICAgICAgICA6IHJhd0RhdGEuaTRnb19leHBpcmF0aW9ueWVhcjtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0cmFuc2FjdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMucHJvdmlkZXJTZXR0aW5ncy50cmFuc2FjdGlvbi5pZCxcclxuICAgICAgICAgICAgICAgIGFjY291bnQ6IHJhd0RhdGEuaTRnb191bmlxdWVpZCxcclxuICAgICAgICAgICAgICAgIGNhcmRFeHBpcmF0aW9uOiBgJHtleHBpcnlZZWFyfS0ke2V4cGlyeU1vbnRofWAsXHJcbiAgICAgICAgICAgICAgICBjYXJkSG9sZGVyOiByYXdEYXRhLmk0Z29fY2FyZGhvbGRlcm5hbWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwidmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKG9iaikgPT4gKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSA6IChvYmopID0+IChvYmouX19wcm90b19fKTtcbnZhciBsZWFmUHJvdG90eXBlcztcbi8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLy8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLy8gbW9kZSAmIDE2OiByZXR1cm4gdmFsdWUgd2hlbiBpdCdzIFByb21pc2UtbGlrZVxuLy8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuX193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcblx0aWYobW9kZSAmIDEpIHZhbHVlID0gdGhpcyh2YWx1ZSk7XG5cdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG5cdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcblx0XHRpZigobW9kZSAmIDQpICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcblx0XHRpZigobW9kZSAmIDE2KSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG5cdHZhciBkZWYgPSB7fTtcblx0bGVhZlByb3RvdHlwZXMgPSBsZWFmUHJvdG90eXBlcyB8fCBbbnVsbCwgZ2V0UHJvdG8oe30pLCBnZXRQcm90byhbXSksIGdldFByb3RvKGdldFByb3RvKV07XG5cdGZvcih2YXIgY3VycmVudCA9IG1vZGUgJiAyICYmIHZhbHVlOyB0eXBlb2YgY3VycmVudCA9PSAnb2JqZWN0JyAmJiAhfmxlYWZQcm90b3R5cGVzLmluZGV4T2YoY3VycmVudCk7IGN1cnJlbnQgPSBnZXRQcm90byhjdXJyZW50KSkge1xuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbnQpLmZvckVhY2goKGtleSkgPT4gKGRlZltrZXldID0gKCkgPT4gKHZhbHVlW2tleV0pKSk7XG5cdH1cblx0ZGVmWydkZWZhdWx0J10gPSAoKSA9PiAodmFsdWUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGRlZik7XG5cdHJldHVybiBucztcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IExhbmdTZXJ2aWNlIH0gZnJvbSAnLi9sYW5nLXNlcnZpY2UvbGFuZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4vcHJvdmlkZXJzL2luZnJhc3RydWN0dXJlL2hlbHBlci5jbGFzcyc7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4vcHJvdmlkZXJzL2luZnJhc3RydWN0dXJlL2xvZ2dlci5jbGFzcyc7XHJcbmltcG9ydCB7IFByb3ZpZGVyRmFjdG9yeSB9IGZyb20gJy4vcHJvdmlkZXJzL2luZnJhc3RydWN0dXJlL3Byb3ZpZGVyLmZhY3RvcnknO1xyXG4vKipcclxuICogS29nbml0aXYgUGF5bWVudCBMaWJyYXJ5LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEtvZ25pdGl2UGF5bWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIEtvZ25pdGl2UGF5bWVudCBmb3IgdXNpbmcgZ2l2ZW4gcHJvdmlkZXIuXHJcbiAgICAgKiBAcGFyYW0gcHJvdmlkZXJTZXR0aW5ncyBjb25maWd1cmF0aW9uIGRhdGEgZm9yIHByb3ZpZGVyLlxyXG4gICAgICogQHBhcmFtIHNldHRpbmdzIGNvbmZpZ3VyYXRpb24gZGF0YSBmb3IgS29nbml0aXYgUGF5bWVudCBMaWJyYXJ5LlxyXG4gICAgICovXHJcbiAgICBpbml0KHByb3ZpZGVyU2V0dGluZ3MsIHNldHRpbmdzKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIExhbmdTZXJ2aWNlLmdldEluc3RhbmNlKCkuY2hhbmdlTGFuZ3VhZ2UoKF9hID0gc2V0dGluZ3MubGFuZ3VhZ2UpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICdFTicpO1xyXG4gICAgICAgIHByb3ZpZGVyU2V0dGluZ3MgPSBIZWxwZXJzLnNuYWtlUHJvcGVydGllc1RvQ2FtZWwocHJvdmlkZXJTZXR0aW5ncyk7XHJcbiAgICAgICAgdGhpcy5wcm92aWRlciA9IFByb3ZpZGVyRmFjdG9yeS5jcmVhdGVQcm92aWRlcihwcm92aWRlclNldHRpbmdzKTtcclxuICAgICAgICBMb2dnZXIuaXNEZWJ1Z01vZGUgPSAhIXNldHRpbmdzLmRlYnVnO1xyXG4gICAgICAgIGlmICh0aGlzLnByb3ZpZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBNZXNzYWdlTGlzdGVuZXIoc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICB0aGlzLnByb3ZpZGVyLmluaXQocHJvdmlkZXJTZXR0aW5ncywgc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSAnTWlzc2luZyBvciB1bnN1cHBvcnRlZCBwcm92aWRlciBjb2RlJztcclxuICAgICAgICBpZiAoc2V0dGluZ3MuZGVidWcpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2V0dGluZ3MgPT09IG51bGwgfHwgc2V0dGluZ3MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNldHRpbmdzLmNhbGxiYWNrTWV0aG9kKSB7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLmNhbGxiYWNrTWV0aG9kKHtcclxuICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ2luaXQnLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnZXJyb3InLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogbWVzc2FnZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9zZXMgbW9kYWwgYm94LCBpZiBpdCBleGlzdHMuXHJcbiAgICAgKi9cclxuICAgIGNsb3NlTW9kYWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvdmlkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm92aWRlci5jbG9zZU1vZGFsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFuZCByZXNldHMgYWxsIGRlcGVuZGVuY2llcywgd2hpY2ggd2VyZSBjcmVhdGVkIGJ5IHRoZSBwcm92aWRlci5cclxuICAgICAqL1xyXG4gICAgcmVzZXQob3JpZykge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3ZpZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvdmlkZXIucmVzZXQob3JpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJvdmlkZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKHRoaXMubWVzc2FnZUxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5tZXNzYWdlTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gKioqKioqKioqKioqKioqXHJcbiAgICAvLyBQcml2YXRlIG1ldGhvZHNcclxuICAgIC8vICoqKioqKioqKioqKioqKlxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25maWd1cmVzIG1lc3NhZ2UgbGlzdGVuZXIgZm9yIGdldHRpbmcgaW5mb3JtYXRpb24gZnJvbSBpRnJhbWUuIFVzZWQganVzdCBmb3Igc29tZVxyXG4gICAgICogcHJvdmlkZXJzIChEYXRhdHJhbnMpLiBUaGlzIGluZm9ybWF0aW9uIGlzIHNlbnQgdG8gaG9zdGluZyBhcHBsaWNhdGlvbiB0aHJvdWdoIGNhbGxiYWNrIG1ldGhvZC5cclxuICAgICAqIEBwYXJhbSBzZXR0aW5ncyBjb25maWd1cmF0aW9uIGRhdGEgZm9yIEtvZ25pdGl2IFBheW1lbnQgTGlicmFyeS5cclxuICAgICAqL1xyXG4gICAgc2V0dXBNZXNzYWdlTGlzdGVuZXIoc2V0dGluZ3MpIHtcclxuICAgICAgICBpZiAoIShzZXR0aW5ncyA9PT0gbnVsbCB8fCBzZXR0aW5ncyA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2V0dGluZ3MubWVzc2FnaW5nTWlkZGxld2FyZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB7IGRvbWFpbiB9ID0gc2V0dGluZ3MubWVzc2FnaW5nTWlkZGxld2FyZTtcclxuICAgICAgICB0aGlzLm1lc3NhZ2VMaXN0ZW5lciA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBMb2dnZXIuaW5mbyhgUmVjZWl2ZWQgbWVzc2FnZSBmcm9tICR7ZXZlbnQgPT09IG51bGwgfHwgZXZlbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGV2ZW50Lm9yaWdpbn0gZnJhbWVgLCBldmVudCk7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5vcmlnaW4gIT09IGRvbWFpbiAmJiBkb21haW4gIT09ICcqJykge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmluZm8oYElnbm9yaW5nIG1lc3NhZ2UuIENvbnRpbnVlIHRvIHdhaXQgZm9yIG1lc3NhZ2UgZnJvbSAke2RvbWFpbn0uYCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBldmVudDtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAoc2V0dGluZ3MgPT09IG51bGwgfHwgc2V0dGluZ3MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNldHRpbmdzLmNhbGxiYWNrTWV0aG9kKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3BlcmF0aW9uID0gKGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGF0YS5ldmVudFR5cGUpID09PSAnY2FuY2VsJyA/ICdwb3B1cCcgOiAncGF5bWVudCc7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXMgPSBvcGVyYXRpb24gPT09ICdwb3B1cCdcclxuICAgICAgICAgICAgICAgICAgICA/ICdjbG9zZWQnXHJcbiAgICAgICAgICAgICAgICAgICAgOiAoKGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGF0YS5zdWNjZXNzKSA/ICdzdWNjZXNzJyA6ICdlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3MuY2FsbGJhY2tNZXRob2Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogeyB0cmFuc2FjdGlvbjogeyBpZDogZGF0YSA9PT0gbnVsbCB8fCBkYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkYXRhLnR4SWQsIH0gfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMubWVzc2FnZUxpc3RlbmVyKTtcclxuICAgIH1cclxufVxyXG53aW5kb3cuS29nbml0aXZQYXltZW50ID0gS29nbml0aXZQYXltZW50O1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=