import Image from 'next/image';

import ErrorIcon from '../../public/icons/ErrorIcon.svg';

const Dialog = () => {
  return (
    <div className="mt-2 flex flex-row items-start gap-2 w-full px-4 py-2 bg-[#FFEBEA] text-[#FF3B30] rounded-lg">
      <Image src={ErrorIcon} alt="Error Icon" width={24} height={24} />
      <div className="flex flex-col gap-1">
        <div>
          <p className="text-sm">E-mail or password is incorrect.</p>
          <p className="text-sm">Please try again</p>
        </div>
        <p className="text-xs">
          (อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง)
        </p>
      </div>
    </div>
  );
};

export default Dialog;
