import liff from '@line/liff';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useInnerSize } from '@/app/hook/useInnerSize';

interface FormValues {
  username: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const { isReady } = useInnerSize();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values: FormValues) => {
      console.log(values);
      liff.closeWindow();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  if (!isReady) return null;

  return (
    <div className="flex justify-center items-center w-[var(--inner-width)] h-[var(--inner-height)]">
      <div className="flex justify-center w-full h-fit">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-[300px] gap-5 md:w-1/3 p-5 bg-gray-50 rounded-xl"
        >
          <div className="flex flex-col text-center text-lg">
            MOL(DOE) Login
          </div>
          <div className="flex flex-col gap-2">
            <div className="">Username :</div>
            {formik.touched.username && formik.errors.username && (
              <span className="text-red-600 text-xs font-normal">
                User is required
              </span>
            )}
            <input
              type="text"
              name="username"
              className="bg-slate-50 p-2 rounded-xl border"
              onChange={(e) => formik.handleChange(e)}
              value={formik.values.username}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="">Password :</div>
            {formik.touched.password && formik.errors.password && (
              <span className="text-red-600 text-xs font-normal">
                Password is required
              </span>
            )}
            <input
              type="password"
              name="password"
              className="bg-slate-50 p-2 rounded-xl border"
              onChange={(e) => formik.handleChange(e)}
              value={formik.values.password}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-3 mt-5 rounded-xl text-white w-full text-base font-bold bg-[#9230F9]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
