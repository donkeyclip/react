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
import React, { Component } from "react";
var DonkeyClip = /** @class */ (function (_super) {
    __extends(DonkeyClip, _super);
    function DonkeyClip(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            definition: {},
            dataset: [
                "controls",
                "autoplay",
                "loop",
                "muted",
                "volume",
                "scaletofit",
                "backgroundcolor",
                "mcversion",
                "bundlerversion",
                "pointerevents",
            ],
        };
        return _this;
    }
    DonkeyClip.prototype.componentDidMount = function () {
        var _this = this;
        fetch("https://staging-api.donkeyclip.com/v1/clips/".concat(this.props.id), {
            credentials: "include",
        })
            .then(function (response) { return response.json(); })
            .then(function (_a) {
            var _b, _c, _d, _e;
            var data = _a.data;
            if (!_this.iframe)
                return;
            if (_this.props.initParams) {
                data.definition.props.initParams = _this.props.initParams;
            }
            _this.iframe.contentWindow.document.head.innerHTML = "\n        <head>\n            <link rel=\"preconnect\" href=\"https://cdn.jsdelivr.net\" crossorigin />\n            <style>\n              html,body {\n                width: 100%;\n                height: 100%;\n                position: relative;\n                margin: 0px;\n                padding: 0px;\n                background-color: black;\n              }\n            </style>\n        </head>";
            _this.iframe.contentWindow.document.body.innerHTML = "<body></body>";
            var donkeyClipScript = document.createElement("script");
            donkeyClipScript.innerHTML = "window.DonkeyClip = {Definition: ".concat(JSON.stringify(data.definition), "}; console.log(JSON.stringify(window.DonkeyClip))");
            (_c = (_b = _this.iframe) === null || _b === void 0 ? void 0 : _b.contentWindow) === null || _c === void 0 ? void 0 : _c.document.head.appendChild(donkeyClipScript);
            var bundlerScript = _this.makeScript();
            (_e = (_d = _this.iframe) === null || _d === void 0 ? void 0 : _d.contentWindow) === null || _e === void 0 ? void 0 : _e.document.body.appendChild(bundlerScript);
        });
    };
    DonkeyClip.prototype.makeScript = function () {
        var _this = this;
        var _a = this.props.bundlerversion, bundlerversion = _a === void 0 ? "latest" : _a;
        var bundlerScript = document.createElement("script");
        bundlerScript.src = "https://cdn.jsdelivr.net/npm/@donkeyclip/bundler@".concat(bundlerversion);
        bundlerScript.async = true;
        bundlerScript.dataset.id = this.props.id;
        this.state.dataset.forEach(function (parameter) {
            if (typeof _this.props[parameter] !== "undefined")
                bundlerScript.dataset[parameter] = String(_this.props[parameter]);
        });
        return bundlerScript;
    };
    DonkeyClip.prototype.render = function () {
        var _this = this;
        return (React.createElement("iframe", { ref: function (elem) { return (_this.iframe = elem); }, width: this.props.width, height: this.props.height, title: "current clip", style: {
                border: "none",
                width: this.props.width || "100%",
                height: this.props.height || "100%",
            } }));
    };
    return DonkeyClip;
}(Component));
export default DonkeyClip;
