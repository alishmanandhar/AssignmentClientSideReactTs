"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const react_2 = __importStar(require("react"));
const ai_1 = require("react-icons/ai");
// Table global component
const TableCompoenent = ({ headerSort, setHeaderSort, row }) => {
    (0, react_2.useEffect)(() => {
        setHeaderSort(prevHeaderSort => (prevHeaderSort.map(item => (Object.assign(Object.assign({}, item), { sortType: 'desc' // Set sortType to 'Desc' for each object
         })))));
    }, []);
    const handleSortClick = (index, sortTyp) => {
        setHeaderSort(prevHeaderSort => {
            const updatedHeader = prevHeaderSort.map((item, i) => {
                if (i === index && item.sort) {
                    return Object.assign(Object.assign({}, item), { sortType: sortTyp // Set sortType to ASC for the clicked item
                     });
                }
                return item;
            });
            return updatedHeader;
        });
    };
    return (<react_1.TableContainer>
            <react_1.Table variant='simple'>
                <react_1.Thead>
                <react_1.Tr>
                    {headerSort === null || headerSort === void 0 ? void 0 : headerSort.map((item, index) => (<react_1.Th key={index}>
                                <react_1.Flex alignItems={"center"} gap={'0.5rem'}>
                                    {item.label}
                                    {item.sort && <>
                                            {(item === null || item === void 0 ? void 0 : item.sortType) == "desc" ?
                    <ai_1.AiOutlineArrowDown cursor={"pointer"} fontSize={"1rem"} onClick={() => handleSortClick(index, "asc")}/>
                    :
                        <ai_1.AiOutlineArrowUp cursor={"pointer"} fontSize={"1rem"} onClick={() => handleSortClick(index, "desc")}/>}
                                        </>}

                                </react_1.Flex>
                            </react_1.Th>))}

                </react_1.Tr>
                </react_1.Thead>
                <react_1.Tbody>
                    {row}
                </react_1.Tbody>
            </react_1.Table>
        </react_1.TableContainer>);
};
exports.default = TableCompoenent;
