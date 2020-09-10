import React, { Component } from 'react';

import {Formik} from 'formik'
import * as Yup from 'yup'
// import { TextField } from '@material-ui/core';


class ValidationTest extends Component {
    render() {
        const formSchema = Yup.object({
            username : Yup.string().required().min(3),
            email : Yup.string().required().email(),
            password : Yup.string().required().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Must Contain 8 Characters, One Number and one special case Character'),
            re_password : Yup.string().required('masukan ulang Kata sandi').oneOf([Yup.ref('password'), null], 'Kata sandi tidak sama'),
        })
        const initialValues = {
            username : 'kemal',
            email : '',
            password : '',
            re_password: ''
        }
        return (
            <div>
                <h1>validation</h1>
                    <Formik 
                    initialValues={initialValues}
                    validationSchema={formSchema}
                    onSubmit={ (data)=>{
                        console.log(data)
                    }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, touched, errors})=>(
                            <form onSubmit={handleSubmit}>
                                <input 
                                type="text" 
                                name="username"
                                placeholder='Masukan Username'
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                                <p className='error'>
                                    {touched.username && errors.username}
                                </p>

                                <input 
                                type="email" 
                                name="email"
                                placeholder='Masukan Email'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                                <p className='error'>
                                    {touched.email && errors.email}
                                </p>

                                <input 
                                type="password" 
                                name="password"
                                placeholder='Masukan password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                                <p className='error'>
                                    {touched.password && errors.password}
                                </p>

                                <input 
                                type="password" 
                                name="re_password"
                                placeholder='Masukan ulang password'
                                value={values.re_password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                                <p className='error'>
                                    {touched.re_password && errors.re_password}
                                </p>

                                
                                <button type='submit'>SUBMIT</button>

                                <pre>
                                    {JSON.stringify(values, null, 2)}
                                </pre>
                                
                            </form>
                        )}

                    </Formik>
            </div>
        );
    }
}

export default ValidationTest;