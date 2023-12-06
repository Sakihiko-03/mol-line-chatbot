import Image from 'next/image';

import LogoDOE from '../../public/icons/LogoDOE.svg';

const Topbar = () => {
  return (
    <div className="h-[64px] p-4 w-full flex flex-row gap-2 border border-r-0 border-l-0 border-[#EAEAED]">
      <Image src={LogoDOE} alt="Logo DOE" width={40} height={40} />
      <div className="flex flex-col justify-center">
        <p className="text-[#11111F] text-[8px]">
          e-Workpermit : ระบบอนุญาตทำงานของคนต่างด้าวทางอิเล็กทรอนิกส์
        </p>
        <p className="text-[#6F6F85] text-[6px]">
          สำนักบริหารแรงงานต่างด้าว กรมการจัดหาแรงงาน กระทรวงแรงงาน
        </p>
      </div>
    </div>
  );
};

export default Topbar;
