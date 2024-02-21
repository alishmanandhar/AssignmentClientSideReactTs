// user interface
export interface UserInterface {
    id?: string;
    name: string;
    age: number;
    bio?: string;
    createdAt?: string;
  }
  
// Define a type for the structure of USER_FIELDS
export type UserField = {
    label: string;
    sort: boolean;
    sortType?:string;
  };

export const USER_FIELDS = [{label:"Name",sort:false}, {label:"Age",sort:false}, {label:"Bio",sort:false}, {label:"Created At",sort:true}, {label:"Actions",sort:false}];

export const BASE_URL = "http://localhost:8000"
