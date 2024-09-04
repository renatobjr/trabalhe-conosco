const RuralProducerHelper = {
  verifyCpf: (cpf: string): boolean => {
    let sum: number = 0;
    let rest: number;

    if (cpf === "00000000000") return false;

    for (let i = 1; i <= 9; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.substring(10, 11))) return false;
    return true;
  },
  verifyCnpj: (cnpj: string): boolean => {
    if (cnpj === "00000000000000") return false;

    if (cnpj.length !== 14) return false;

    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    const digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;

    return true;
  },
  verifyTotalArea: (
    total_area: number,
    total_area_cultivated: number,
    total_area_forest: number
  ): boolean => {
    if (total_area_cultivated + total_area_forest > total_area) return false;
    return true;
  },
  clearCpfOrCnpj: (value: string): string => {
    return value.replace(/[^\d]/g, "");
  },
};

export default RuralProducerHelper;
