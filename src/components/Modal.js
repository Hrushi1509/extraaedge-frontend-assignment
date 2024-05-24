import React, { useEffect, useState } from 'react';
import './customModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../features/modalSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateUserData } from '../features/usersSlice';

const addProtocol = (url) => {
    if (!/^(http|https):\/\//i.test(url)) {
        return `http://${url}`;
    }
    return url;
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    website: Yup.string()
        .transform((value, originalValue) => addProtocol(originalValue))
        .url('Invalid URL format')
        .required('Website is required')
});

const CustomModal = () => {
    const { id } = useSelector((state) => state.modal);
    const allUsers = useSelector((state) => state.app.users);
    const dispatch = useDispatch();

    const [initialValues, setInitialValues] = useState({
        name: '',
        email: '',
        phone: '',
        website: ''
    });

    const singleUser = allUsers.find((user) => user.id === id);

    useEffect(() => {
        if (singleUser) {
            setInitialValues({
                name: singleUser.name,
                email: singleUser.email,
                phone: singleUser.phone,
                website: singleUser.website
            });
        }
    }, [singleUser]);

    const handleSubmit = (values) => {
        dispatch(updateUserData({ userData: values, id }));
        dispatch(closeModal());
    };

    return (
        <div className='modalBackground'>
            <div className='modalContainer'>
                <h3>Update User</h3>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div>
                                <label htmlFor='name'>* Name</label>
                                <Field type='text' name='name' className='border m-2 rounded-md' />
                                <ErrorMessage name='name' component='div' className='error' />
                            </div>
                            <div>
                                <label htmlFor='email'>* Email</label>
                                <Field type='text' name='email' className='border m-2 rounded-md' />
                                <ErrorMessage name='email' component='div' className='error' />
                            </div>
                            <div>
                                <label htmlFor='phone'>* Phone</label>
                                <Field type='text' name='phone' className='border m-2 rounded-md' />
                                <ErrorMessage name='phone' component='div' className='error' />
                            </div>
                            <div>
                                <label htmlFor='website'>* Website</label>
                                <Field type='text' name='website' className='border m-2 rounded-md' />
                                <ErrorMessage name='website' component='div' className='error' />
                            </div>
                            <button type='submit' disabled={isSubmitting}>Save</button>
                        </Form>
                    )}
                </Formik>
                <button onClick={() => dispatch(closeModal())}>Close</button>
            </div>
        </div>
    );
}

export default CustomModal;
