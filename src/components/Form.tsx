'use client';

import liff from '@line/liff';
import axios from 'axios';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useState } from 'react';
import * as Yup from 'yup';

import HideIcon from '../../public/icons/HideIcon.svg';
import VisibilityIcon from '../../public/icons/VisibilityIcon.svg';

import Dialog from './Dialog';

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

interface UserIdProp {
  liffUID: string;
}

const Form = ({ liffUID }: UserIdProp) => {
  const [showPassword, setShowPassword] = useState(false);

  const sendMessage = async (userId: string, message: string) => {
    try {
      const data = {
        userId,
        message,
      };
      const response = await axios.post('/apis/login', data);
      console.log('response', response);
    } catch (error) {
      console.log('error', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values: FormValues) => {
      console.log(values);
      console.log('userId', liffUID);

      sendMessage(liffUID, 'ยืนยันตัวตนสำเร็จ');

      liff.closeWindow();
    },
  });

  return (
    <div className="p-6">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
        <div className="">
          <p className="text-[#11111F] text-2xl font-bold">Login</p>
          <p className="text-[#6F6F85] text-base">
            เข้าสู่ระบบเพื่อเริ่มต้นใช้งาน
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[#6F6F85] text-xs font-semibold">E-mail (อีเมล)</p>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Input E-mail"
            className="text-sm rounded-md h-[48px] border px-3 placeholder:text-[#BCBCC7] placeholder:text-sm outline-none"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[#6F6F85] text-xs font-semibold">
            Password (รหัสผ่าน)
          </p>
          <div className="flex flex-row justify-between text-sm rounded-md h-[48px] border px-3 ">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Input Password"
              className="placeholder:text-[#BCBCC7] placeholder:text-sm outline-none w-full"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <Image
              src={showPassword ? HideIcon : VisibilityIcon}
              alt="Visibility Icon"
              width={20}
              height={20}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
        {(formik.errors.email || formik.errors.password) && <Dialog />}
        <button
          type="submit"
          className="text-white bg-[#9230F9] rounded-md py-2 px-3 mt-2 flex flex-col justify-center items-center"
        >
          <p className="text-base font-semibold">Login</p>
          <p className="text-xs font-normal">เข้าสู่ระบบ</p>
        </button>
      </form>
    </div>
  );
};

export default Form;
