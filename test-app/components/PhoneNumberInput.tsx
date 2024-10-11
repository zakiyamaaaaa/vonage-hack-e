import { SetStateAction } from 'react';
import { Input } from '@/components/ui/input';

interface PhoneNumberInputProps {
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<SetStateAction<string>>;
  setHasError: React.Dispatch<SetStateAction<boolean>>;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  phoneNumber,
  setPhoneNumber,
  setHasError
}) => {
  // 電話番号のバリデーション関数
  const validatePhoneNumber = (number: string) => {
    const phonePattern = /^\d{11}$/;
    return phonePattern.test(number);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);

    // バリデーションを実行
    if (validatePhoneNumber(value)) {
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  return (
    <div>
      <Input
        type="tel"
        id="phoneNumber"
        value={phoneNumber}
        onChange={handleChange}
        placeholder="電話番号ハイフンなしで入力してください"
        className="border p-2 rounded"
      />
    </div>
  );
}

export default PhoneNumberInput;
