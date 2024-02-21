import TableCompoenent from "../../../components/Table";
import {USER_FIELDS, UserField, UserInterface} from "../../../constants/Constants";
import {
    Tr,
    Td,
    Flex,
    Skeleton,
    Divider,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Text,
  } from '@chakra-ui/react'
import { UserFields, useGetUserListApi } from "../api/useGetUserListApi";
import { FiEdit3, FiPlusSquare, FiSearch } from "react-icons/fi";
import Title from "../../../components/Title";
import SubTitle from "../../../components/SubTitle";
import { Link } from "react-router-dom";
import DeleteUser from "../Delete/DeleteUser";
import { useEffect, useState } from "react";
import { ApolloQueryResult } from "@apollo/client";

// main component
const UserList = () => {

    const [search,setSearch] = useState<string>("");
    const [sort, setSort] = useState<string>("desc");
    const [pageNumber, setPageNumber] = useState<number>(1);
    const {data, loading,refetch} = useGetUserListApi(15,search,sort,pageNumber);
    const [userData, setUserData] = useState<UserInterface[]>([]);
    const [prevScrollY, setPrevScrollY] = useState<number>(0);
    const [searchingMode, setSearchingMode] = useState<boolean>(true);
    const [headerSort, setHeaderSort] = useState<UserField[]>(USER_FIELDS);

    useEffect(()=>{
        refetch();
    },[search, sort,pageNumber])

    useEffect(()=>{
        const item = headerSort.find(item => item.label === 'Created At');
        setPageNumber(1);
        setSearchingMode(true);
        setSort(item?.sortType ?? "desc");
    },[headerSort])

    useEffect(()=>{
        // If user is not searching append to the list
        if(!searchingMode && data?.getUsers){
            setUserData(prevData => [...prevData, ...data?.getUsers])
            window.scrollTo(0, prevScrollY);
        }
        
        // if user is searching then replace data
        if(searchingMode && data?.getUsers){
            setUserData(data?.getUsers)
            window.scrollTo(0, prevScrollY);
        }
    },[data])


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

    useEffect(()=>{
        const debouncedHandleScroll = debounce(handleScroll, 500)
      
        window.addEventListener('scroll', debouncedHandleScroll);
      
          return () => {
            window.removeEventListener('scroll', debouncedHandleScroll);
          }
    },[])

    return (
        <>
            <Flex justifyContent={'space-between'}>
                <Flex alignItems={'center'} gap={'2rem'}>
                    <Title title={"USER LIST"} />

                    {/* Search user by name */}
                    <InputGroup minW={"15rem"}>
                        <InputLeftElement pointerEvents='none'>
                            <FiSearch />
                        </InputLeftElement>
                        <Input type='text' placeholder='Username' onChange={(e)=>{
                            // defined set timeout to limit refetch
                            const timeoutId = setTimeout(() => {
                                setPageNumber(1); setSearchingMode(true); setSearch(e.target.value);
                            }, 500); // Adjust delay time as needed
                        
                            return () => {
                                clearTimeout(timeoutId);
                            };
                        }} />
                    </InputGroup>

                </Flex>

                {/* add user route */}
                <Link to={'/add-user'}>
                    <Flex alignItems={'center'} gap={'0.5rem'} cursor={'pointer'}>
                        <SubTitle subtitle={'Add User'}/>
                        <FiPlusSquare fontSize={'1.5rem'} />
                    </Flex>
                </Link>

            </Flex>

            <Divider/>
            
            {/* Table component */}
            <TableCompoenent headerSort={headerSort} setHeaderSort={setHeaderSort} row={<UserListRow data={userData} setUserData={setUserData} loading={loading} refetch={refetch} />} />
            <Text textAlign={"center"}>
                {
                    data?.getUsers?.length  === 0 ? "Reached End" : ""
                }
            </Text>
            
        </>
    )
}

type SetUserDataFunction = React.Dispatch<React.SetStateAction<UserInterface[]>>;
type refetchFunction = (variables?: Partial<UserFields>) => Promise<ApolloQueryResult<UserInterface[]>>;

interface UserRowParams {
    data:UserInterface[];
    setUserData:SetUserDataFunction;
    loading:boolean;
    refetch:refetchFunction;
}
// table list row
const UserListRow: React.FC<UserRowParams> = ({data,setUserData, loading,refetch}) => {

    useEffect(()=>{
        refetch();
    },[])

    // map user data
    return (
        <>
            {
                data?.map((item:UserInterface)=>(
                    <Tr key={item.id}>    
                        <Td>{item.name}</Td> 
                        <Td>{item.age}</Td> 
                        <Td>{item.bio}</Td> 
                        <Td>{item?.createdAt?.split('T')[0]}</Td> 
                        <Td>
                            {/* update and delete user account */}
                            <Flex gap={2}>
                                <Link to={`/edit-user/${item.id}`}>
                                    <FiEdit3 color="blue" />
                                </Link>
                                
                                <DeleteUser username={item.name} id={item.id} refetch={refetch} data={data} setUserData={setUserData}/>
                            </Flex>
                        </Td> 
                    </Tr>
                    
                ))
            }
            {
                loading &&
                    <>
                        <Shimmer />
                        <Shimmer />
                        <Shimmer />
                    </>
            }
        </>
    )
}

// adding shimmer effect on data loading
const Shimmer = () => {
    return (
        <Tr>
            <Td><Skeleton height='20px' /></Td>
            <Td><Skeleton height='20px' /></Td>
            <Td><Skeleton height='20px' /></Td>
            <Td><Skeleton height='20px' /></Td>
            <Td><Skeleton height='20px' /></Td>
        </Tr>
    )
}

// Debounce function
function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    return function(this: any, ...args: Parameters<T>) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

export default UserList;