"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
// use this component for sub-title for all pages
const SubTitle = ({ subtitle }) => {
    return (<react_1.Text fontSize={'1rem'} mb={'0.5rem'} mt={'0.5rem'} fontWeight={'500'}>
            {subtitle}
        </react_1.Text>);
};
exports.default = SubTitle;
