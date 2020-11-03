import React from 'react';
import {Form, Formik} from 'formik';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from 'next/router';
interface registerProps {

}

export const Register: React.FC<registerProps> = ({}) => {
    
    const router = useRouter()
    const [, register] = useRegisterMutation();
    return (
        <Wrapper variant="small">
       <Formik initialValues={{username: "", password: ""}}
        onSubmit={async (values, {setErrors}) => {
            console.log(values);
            const response = await register(values);
            if(response.data?.register.errors){
                setErrors(toErrorMap(response.data.register.errors))
            }else if(response.data?.register.user){
                console.log(response);
                //worked
                router.push('/');
            }
        }}
       >
           {({isSubmitting}) => (
               <Form>
                  <InputField
                  name="username"
                  placeholder="username"
                  label="Username"
                  />
                  <Box mt={4}>
                      <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  />
                  </Box>
                  <Button mt={4} variantColor='teal' type='submit' isLoading={isSubmitting}>Register</Button>
               </Form>
           )}
       </Formik>
     </Wrapper>
    );
}

export default Register