import RuralProducerHelper from "@/helpers/ruralProducerHelper";

const RuralProducerValidation = {
  validateCpf: (cpf: string) => {
    const formatedCpf: string = RuralProducerHelper.clearCpfOrCnpj(cpf);
    console.log(formatedCpf);
    if (!RuralProducerHelper.verifyCpf(formatedCpf)) {
      throw new Error("Invalid CPF");
    }

    return formatedCpf;
  },
  validateCnpj: (cnpj: string) => {
    const formatedCnpj: string = RuralProducerHelper.clearCpfOrCnpj(cnpj);
    if (!RuralProducerHelper.verifyCnpj(formatedCnpj)) {
      throw new Error("Invalid CNPJ");
    }

    return formatedCnpj;
  },
  valiodateTotalArea: (
    total_area: number,
    total_area_cultivated: number,
    total_area_forest: number
  ) => {
    if (total_area_cultivated + total_area_forest > total_area) {
      throw new Error(
        "Total Area must be greater than Cultivated Area and Forest Area"
      );
    }
  },
};

export default RuralProducerValidation;
