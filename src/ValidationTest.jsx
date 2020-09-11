import React, { Component } from 'react';

import {Formik, Field} from 'formik'
import * as Yup from 'yup'
import Select from 'react-select';
import Switch from "react-switch";
// import { TextField, Radio } from '@material-ui/core';


class ValidationTest extends Component {
    render() {
        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' },
        ];
        const formSchema = Yup.object({
            username : Yup.string().required().min(3),
            email : Yup.string().required().email(),
            password : Yup.string().required().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Must Contain 8 Characters, One Number and one special case Character'),
            re_password : Yup.string().required('masukan ulang Kata sandi').oneOf([Yup.ref('password'), null], 'Kata sandi tidak sama'),
            flavour : Yup.string().nullable().required(),
            term : Yup.bool().required().oneOf([true], "The terms and conditions must be accepted."),
            drink : Yup.array().max(2, 'maksimal 2').min(1, 'minimal 1'),
            gender : Yup.string().required('gender harus di isi'),
            basicSelect : Yup.string().required()

        })
        const initialValues = {
            username : 'kemal',
            email : '',
            password : '',
            re_password: '',
            flavour : null,
            term : false,
            drink : [],
            gender : '',
            basicSelect : ''
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
                        {({handleChange, handleBlur, handleSubmit, values, touched, errors, setFieldValue, isSubmitting})=>(
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

                                <p>BASIC SELECT</p>
                                <select value={values.basicSelect} name='basicSelect' onChange={handleChange}>
                                    <option value="grapefruit">Grapefruit</option>
                                    <option value="lime">Lime</option>
                                    <option value="coconut">Coconut</option>
                                    <option value="mango">Mango</option>
                                </select>


                                <p>SELECT WITH OBJECT</p>

                                <Select
                                    value={values.flavour}
                                    onChange={val => setFieldValue('flavour', val)}
                                    options={options}
                                    placeholder='pilih rasa'
                                />
                                 <p className='error'>
                                    {touched.flavour && errors.flavour}
                                </p>

                                <label>
                                    Beer
                                    <input
                                        name="drink"
                                        type="checkbox"
                                        value='beer'
                                        onChange={handleChange} 
                                    />
                                </label>

                                <label>Juice
                                <input
                                    name="drink"
                                    type="checkbox"
                                    value='juice'
                                    onChange={handleChange} 
                                />
                                </label>

                                <label>Soda
                                <input
                                    name="drink"
                                    type="checkbox"
                                    value='soda'
                                    onChange={handleChange} 
                                />
                                </label>
                                <p className='error'>
                                    {touched.drink && errors.drink}
                                </p>
                                

                                <p>GENDER</p>
                                <div className='radios' onChange={handleChange}>
                                    <input type="radio" value="Male" name="gender" /> Male
                                    <input type="radio" value="Female" name="gender" /> Female
                                    <input type="radio" value="Other" name="gender" /> Other
                                </div>

                                  {/* using field no need handle change and value*/}
                                  {/* <Field as={Radio} type="radio" value="Male" name="gender" /> Male
                                    <Field as={Radio} type="radio" value="Female" name="gender" /> Female
                                    <Field as={Radio} type="radio" value="Other" name="gender" /> Other */}

                                <p className='error'>
                                    {touched.gender && errors.gender}
                                </p>

                                <p>TERM AND CONDITION</p>
                                <Switch 
                                onChange={val => setFieldValue('term', val)} 
                                checked={values.term} />
                                <p className='error'>
                                    {touched.term && errors.term}
                                </p>


                                <button type='submit'>SUBMIT</button>
                                <pre>
                                    {JSON.stringify(values, null, 2)}
                                </pre>

                                <pre>
                                    errors : 
                                    {JSON.stringify(errors, null, 2)}
                                </pre>

                            </form>
                        )}

                    </Formik>
            </div>
        );
    }
}

export default ValidationTest;