"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Table_1 = __importDefault(require("../../../components/Table"));
const Constants_1 = require("../../../constants/Constants");
const react_1 = require("@chakra-ui/react");
const useGetUserListApi_1 = require("../api/useGetUserListApi");
const fi_1 = require("react-icons/fi");
const Title_1 = __importDefault(require("../../../components/Title"));
const SubTitle_1 = __importDefault(require("../../../components/SubTitle"));
const react_router_dom_1 = require("react-router-dom");
const DeleteUser_1 = __importDefault(require("../Delete/DeleteUser"));
const react_2 = require("react");
// main component
const UserList = () => {
    var _a;
    const [search, setSearch] = (0, react_2.useState)("");
    const [sort, setSort] = (0, react_2.useState)("desc");
    const [pageNumber, setPageNumber] = (0, react_2.useState)(1);
    const { data, loading, refetch } = (0, useGetUserListApi_1.useGetUserListApi)(15, search, sort, pageNumber);
    const [userData, setUserData] = (0, react_2.useState)([]);
    const [prevScrollY, setPrevScrollY] = (0, react_2.useState)(0);
    const [searchingMode, setSearchingMode] = (0, react_2.useState)(true);
    const [headerSort, setHeaderSort] = (0, react_2.useState)(Constants_1.USER_FIELDS);
    (0, react_2.useEffect)(() => {
        refetch();
    }, [search, sort, pageNumber]);
    (0, react_2.useEffect)(() => {
        var _a;
        const item = headerSort.find(item => item.label === 'Created At');
        setPageNumber(1);
        setSearchingMode(true);
        setSort((_a = item === null || item === void 0 ? void 0 : item.sortType) !== null && _a !== void 0 ? _a : "desc");
    }, [headerSort]);
    (0, react_2.useEffect)(() => {
        // If user is not searching append to the list
        if (!searchingMode && (data === null || data === void 0 ? void 0 : data.getUsers)) {
            setUserData(prevData => [...prevData, ...data === null || data === void 0 ? void 0 : data.getUsers]);
            window.scrollTo(0, prevScrollY);
        }
        // if user is searching then replace data
        if (searchingMode && (data === null || data === void 0 ? void 0 : data.getUsers)) {
            setUserData(data === null || data === void 0 ? void 0 : data.getUsers);
            window.scrollTo(0, prevScrollY);
        }
    }, [data]);
    // Define a variable for the percentage of page height to trigger pagination
    const threshold = 0.9; // 90% of the page height
    // pagination starts here
    function handleScroll() {
        // to keep track of last scroll y axis
        setPrevScrollY(window.scrollY);
        // Calculate the scroll position
        const scrollPosition = window.innerHeight + window.pageYOffset;
        // Calculate the threshold position
        const thresholdPosition = document.documentElement.offsetHeight * threshold;
        if (scrollPosition >= thresholdPosition) {
            // go to next page
            setPageNumber(prevPage => prevPage + 1);
            // user has left the searching mode and began going through the list
            setSearchingMode(false);
        }
    }
    (0, react_2.useEffect)(() => {
        const debouncedHandleScroll = debounce(handleScroll, 500);
        window.addEventListener('scroll', debouncedHandleScroll);
        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll);
        };
    }, []);
    return (<>
            <react_1.Flex justifyContent={'space-between'}>
                <react_1.Flex alignItems={'center'} gap={'2rem'}>
                    <Title_1.default title={"USER LIST"}/>

                    {/* Search user by name */}
                    <react_1.InputGroup minW={"15rem"}>
                        <react_1.InputLeftElement pointerEvents='none'>
                            <fi_1.FiSearch />
                        </react_1.InputLeftElement>
                        <react_1.Input type='text' placeholder='Username' onChange={(e) => {
            // defined set timeout to limit refetch
            const timeoutId = setTimeout(() => {
                setPageNumber(1);
                setSearchingMode(true);
                setSearch(e.target.value);
            }, 500); // Adjust delay time as needed
            return () => {
                clearTimeout(timeoutId);
            };
        }}/>
                    </react_1.InputGroup>

                </react_1.Flex>

                {/* add user route */}
                <react_router_dom_1.Link to={'/add-user'}>
                    <react_1.Flex alignItems={'center'} gap={'0.5rem'} cursor={'pointer'}>
                        <SubTitle_1.default subtitle={'Add User'}/>
                        <fi_1.FiPlusSquare fontSize={'1.5rem'}/>
                    </react_1.Flex>
                </react_router_dom_1.Link>

            </react_1.Flex>

            <react_1.Divider />
            
            {/* Table component */}
            <Table_1.default headerSort={headerSort} setHeaderSort={setHeaderSort} row={<UserListRow data={userData} setUserData={setUserData} loading={loading} refetch={refetch}/>}/>
            <react_1.Text textAlign={"center"}>
                {((_a = data === null || data === void 0 ? void 0 : data.getUsers) === null || _a === void 0 ? void 0 : _a.length) === 0 ? "Reached End" : ""}
            </react_1.Text>
            
        </>);
};
// table list row
const UserListRow = ({ data, setUserData, loading, refetch }) => {
    (0, react_2.useEffect)(() => {
        refetch();
    }, []);
    // map user data
    return (<>
            {data === null || data === void 0 ? void 0 : data.map((item) => {
            var _a;
            return (<react_1.Tr key={item.id}>    
                        <react_1.Td>{item.name}</react_1.Td> 
                        <react_1.Td>{item.age}</react_1.Td> 
                        <react_1.Td>{item.bio}</react_1.Td> 
                        <react_1.Td>{(_a = item === null || item === void 0 ? void 0 : item.createdAt) === null || _a === void 0 ? void 0 : _a.split('T')[0]}</react_1.Td> 
                        <react_1.Td>
                            {/* update and delete user account */}
                            <react_1.Flex gap={2}>
                                <react_router_dom_1.Link to={`/edit-user/${item.id}`}>
                                    <fi_1.FiEdit3 color="blue"/>
                                </react_router_dom_1.Link>
                                
                                <DeleteUser_1.default username={item.name} id={item.id} refetch={refetch} data={data} setUserData={setUserData}/>
                            </react_1.Flex>
                        </react_1.Td> 
                    </react_1.Tr>);
        })}
            {loading &&
            <>
                        <Shimmer />
                        <Shimmer />
                        <Shimmer />
                    </>}
        </>);
};
// adding shimmer effect on data loading
const Shimmer = () => {
    return (<react_1.Tr>
            <react_1.Td><react_1.Skeleton height='20px'/></react_1.Td>
            <react_1.Td><react_1.Skeleton height='20px'/></react_1.Td>
            <react_1.Td><react_1.Skeleton height='20px'/></react_1.Td>
            <react_1.Td><react_1.Skeleton height='20px'/></react_1.Td>
            <react_1.Td><react_1.Skeleton height='20px'/></react_1.Td>
        </react_1.Tr>);
};
// Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
exports.default = UserList;
