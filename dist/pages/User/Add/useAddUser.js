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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAddUser = void 0;
const react_hook_form_1 = require("react-hook-form");
const useAddUserApi_1 = __importDefault(require("../api/useAddUserApi"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
// this is logic part for add user form
// logic and ui has been separated
function useAddUser() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { register, handleSubmit, reset, formState: { isValid, isDirty, errors }, } = (0, react_hook_form_1.useForm)({
        mode: "onChange",
        criteriaMode: "all"
    });
    const { addUserToApi, loading, res, called } = (0, useAddUserApi_1.default)();
    const onSubmit = (data) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield addUserToApi(data);
        }
        catch (error) {
            console.error('Error submitting user data:', error);
        }
    });
    (0, react_1.useEffect)(() => {
        if (res && called) {
            reset();
            navigate("/");
        }
    }, [res]);
    return {
        register,
        handleSubmit,
        onSubmit,
        res,
        loading,
        isValid,
        isDirty,
        errors
    };
}
exports.useAddUser = useAddUser;
