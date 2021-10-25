import React from 'react';
import {TextInput, Button, Text, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

const Schema = Yup.object().shape({
  username: Yup.string().required('This field is required'),
  password: Yup.string().required('This field is required'),
});

export default function App() {
  return (
    <View>
      <Formik
        initialValues={{username: '', password: ''}}
        validationSchema={Schema}
        onSubmit={(values) => console.log(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          validateForm,
        }) => {
          return (
            <>
              <View>
                <TextInput
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  placeholder="Username"
                />
                {errors.username && touched.username && (
                  <Text>{errors.username}</Text>
                )}
              </View>

              <View>
                <TextInput
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Password"
                />
                {errors.password && touched.password && (
                  <Text>{errors.password}</Text>
                )}
              </View>

              <View>
                <Button
                  onPress={handleSubmit}
                  // If I explicitly call validateForm(), the test will pass
                  // onPress={async () => {
                  //   await validateForm();
                  //   handleSubmit();
                  // }}
                  title="Submit"
                />
              </View>
            </>
          );
        }}
      </Formik>
    </View>
  );
}
