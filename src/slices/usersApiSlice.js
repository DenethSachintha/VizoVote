/*
import { apiSlice } from "./apiSlice";
const USERS_URL = "user"
export const usersApiSLice = apiSlice.injectEndpoints({
  endpoints : (builder) => ({
    login : builder.mutation({
      query: (data) => ({
        url : `${USERS_URL}/login`,
        method : 'POST',
        body: data
      })
    }),
    register : builder.mutation({
      query : (data) => ({
        url : `${USERS_URL}/signup`,
        method : 'POST',
        body: data
      })
    }),
    updateUser : builder.mutation({
      query : (data)=> ({
        url : `${USERS_URL}/profile`,
        method : 'PUT',
        body : data
      })
    }),
    getUser : builder.query({
      query : () => ({
        url : `${USERS_URL}/profile`,
      }),
      keepUnusedDataFor : 5,
    }),
    logout : builder.mutation({
      query : () => ({
        url :  `${USERS_URL}/logout`,
        method : 'POST'
      })
    })
  })
})

export const {useLoginMutation, useRegisterMutation, useLogoutMutation,  useUpdateUserMutation} = usersApiSLice
*/
