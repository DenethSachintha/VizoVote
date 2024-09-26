import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({baseUrl: 'http://34.239.89.57:4000'})


//Parent for any other API Slices
export const apiSlice = createApi({
  baseQuery, 
  tagTypes : ["User"],
  endpoints: (builder)=> ({})
})