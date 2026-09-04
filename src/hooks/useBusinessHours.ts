import { useState, useEffect } from 'react';

export interface BusinessStatus {
  isOpen: boolean;
  statusLabel: string; // 'เปิด' or 'ปิด'
  fullStatus: string;  // 'เปิดทำการ' or 'ปิดทำการ'
  hoursLabel: string;  // '06:00 - 00:00 น.'
  formattedTime: string; // '12:45 น.'
  hint: string;
}

export function getBusinessStatus(): BusinessStatus {
  const now = new Date();

  // Format to Asia/Bangkok time (UTC+7)
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Bangkok',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const parts = formatter.formatToParts(now);
  const hour = parseInt(parts.find((p) => p.type === 'hour')?.value ?? '0', 10);
  const minute = parseInt(parts.find((p) => p.type === 'minute')?.value ?? '0', 10);

  const totalMinutes = hour * 60 + minute;
  const openMinutes = 6 * 60; // 06:00 AM (360 mins)
  const closeMinutes = 24 * 60; // 24:00 (00:00 midnight) (1440 mins)

  // Open if between 06:00 and 24:00 (i.e. 06:00:00 - 23:59:59)
  const isOpen = totalMinutes >= openMinutes && totalMinutes < closeMinutes;

  const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} น.`;

  return {
    isOpen,
    statusLabel: isOpen ? 'เปิด' : 'ปิด',
    fullStatus: isOpen ? 'เปิดทำการ' : 'ปิดทำการ',
    hoursLabel: '06:00 - 00:00 น.',
    formattedTime,
    hint: isOpen
      ? 'พร้อมรับงานและตอบแชทตามปกติ'
      : 'เปิดทำการอีกครั้ง 06:00 น. สามารถทิ้งข้อความไว้ได้ตลอด 24 ชม.'
  };
}

export function useBusinessHours(): BusinessStatus {
  const [status, setStatus] = useState<BusinessStatus>(() => getBusinessStatus());

  useEffect(() => {
    const update = () => setStatus(getBusinessStatus());
    update();
    const interval = setInterval(update, 15000);
    return () => clearInterval(interval);
  }, []);

  return status;
}
