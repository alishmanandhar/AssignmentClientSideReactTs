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
const useGetUserByIDApi_1 = require("../api/useGetUserByIDApi");
const useEditUser_1 = require("./useEditUser");
const EditUser = () => {
    var _a, _b, _c, _d;
    const params = (0, react_router_dom_1.useParams)();
    const { data, loading } = (0, useGetUserByIDApi_1.useGetUserByIDApi)(params.id || "");
    const { register, handleSubmit, onSubmit, res, loading: progress, isValid, isDirty, errors } = (0, useEditUser_1.useEditUser)();
    console.log("data", data);
    return (<>
            <react_1.Flex alignItems={'center'} gap={'0.5rem'}>
                <react_router_dom_1.Link to={"/"}><fi_1.FiArrowLeft fontSize={'1.5rem'}/></react_router_dom_1.Link>
                <Title_1.default title={"Edit User"}/>
            </react_1.Flex>

            <react_1.Divider />

            {loading ? <react_1.Spinner /> :
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* User Add Form starts here */}
                    <input type="hidden" {...register('id')} value={(_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.id}/>
                    {/* created global input for consistant input design or style */}
                    <LeftSideLabelInput_1.default errors={errors} minLength={8} register={register} defaultValue={(_b = data === null || data === void 0 ? void 0 : data.user) === null || _b === void 0 ? void 0 : _b.name} name="name" label={"Full Name"} placeholder={"John Doe"} inputType={"text"} required={true}/>
                    {/* <LeftSideLabelInput errors={errors} minLength={1} register={register} defaultValue={data?.user?.age} name="age" label={"Age"} placeholder={"30"} inputType={"number"} required={true}/> */}
                    <LeftSideLabelInput_1.default errors={errors} register={register} defaultValue={(_c = data === null || data === void 0 ? void 0 : data.user) === null || _c === void 0 ? void 0 : _c.bio} name="bio" label={"Bio"} placeholder={"Something about yourself!"} inputType={"textarea"}/>
                    <LeftSideLabelInput_1.default errors={errors} register={register} defaultValue={(_d = data === null || data === void 0 ? void 0 : data.user) === null || _d === void 0 ? void 0 : _d.createdAt} name="createdAt" label={"Created At"} inputType={"Date"} required={true}/>
                    <react_1.Button w={'10rem'} type="submit" isDisabled={!isValid || !isDirty || progress}>
                        Update
                        {progress ? <react_1.Spinner /> : ""}
                    </react_1.Button>
                </form>}
        
        </>);
};
exports.default = EditUser;
