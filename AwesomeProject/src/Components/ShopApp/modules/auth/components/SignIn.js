import React from 'react';
import {TextInput, Button, Text, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

const Schema = Yup.object().shape({
  username: Yup.string()
    .email('Gmail không đúng định dạng')
    .required('Địa chỉ gmail không được để trống'),
  password: Yup.string()
    .min(6, 'mật khẩu phải lớn hơn 6 kí tự')
    .required('Mật khẩu không được để trống'),
});

export default function SignIn() {
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
