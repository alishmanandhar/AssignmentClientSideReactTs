"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const Title_1 = __importDefault(require("../../../components/Title"));
const fi_1 = require("react-icons/fi");
const react_router_dom_1 = require("react-router-dom");
const LeftSideLabelInput_1 = __importDefault(require("../../../components/LeftSideLabelInput"));
const useAddUser_1 = require("./useAddUser");
const AddUser = () => {
    const { register, handleSubmit, onSubmit, res, loading, isValid, isDirty, errors } = (0, useAddUser_1.useAddUser)();
    return (<form onSubmit={handleSubmit(onSubmit)}>
            <react_1.Flex alignItems={'center'} gap={'0.5rem'}>
                <react_router_dom_1.Link to={"/"}><fi_1.FiArrowLeft fontSize={'1.5rem'}/></react_router_dom_1.Link>
                <Title_1.default title={"Add User"}/>
            </react_1.Flex>
            <react_1.Divider />
        {/* User Add Form starts here */}
            <LeftSideLabelInput_1.default errors={errors} minLength={8} register={register} name="name" label={"Full Name"} placeholder={"John Doe"} inputType={"text"} required={true}/>
            <LeftSideLabelInput_1.default errors={errors} minLength={1} register={register} name="age" label={"Age"} placeholder={"30"} inputType={"number"} required={true}/>
            <LeftSideLabelInput_1.default errors={errors} register={register} name="bio" label={"Bio"} placeholder={"Something about yourself!"} inputType={"textarea"}/>
            <react_1.Button w={'10rem'} type="submit" isDisabled={!isValid}>
                Save
                {loading ? <react_1.Spinner /> : ""}
            </react_1.Button>
        </form>);
};
exports.default = AddUser;
