import { Handler } from "express";
import { HttpStatusCode } from "@/common/HttpStatusCode";
import { HttpStatusMessage } from "@/common/HttpStatusMessage";
import ruralProducerRepository, {
  RuralProducerPayload,
} from "@/repositories/ruralProducerRepositories";
import RuralProducerValidation from "@/validation/ruralProducerValidation";

const create: Handler = async (req, res) => {
  try {
    const payload: RuralProducerPayload = req.body;

    if (payload.CPF)
      payload.CPF = RuralProducerValidation.validateCpf(payload.CPF);

    if (payload.CNPJ)
      payload.CNPJ = RuralProducerValidation.validateCnpj(payload.CNPJ);

    RuralProducerValidation.valiodateTotalArea(
      payload.total_area,
      payload.total_area_cultivated,
      payload.total_area_forest
    );

    const response = await ruralProducerRepository.create(payload);

    res.success(HttpStatusCode.CREATED, response);
  } catch (error: any) {
    res.error(HttpStatusCode.BAD_REQUEST, {
      code: HttpStatusMessage.BAD_REQUEST,
      details: error.message,
    });
  }
};

const get: Handler = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await ruralProducerRepository.get(id);

    if (response === null) {
      res.error(HttpStatusCode.NOT_FOUND, {
        code: HttpStatusMessage.NOT_FOUND,
        details: HttpStatusMessage.NOT_FOUND,
      });
      return;
    }

    res.success(HttpStatusCode.OK, response);
  } catch (error: any) {
    res.error(HttpStatusCode.BAD_REQUEST, {
      code: HttpStatusMessage.BAD_REQUEST,
      details: error.message,
    });
  }
};

const update: Handler = async (req, res) => {
  try {
    const id = req.params.id;
    const payload: RuralProducerPayload = req.body;

    if (payload.CPF)
      payload.CPF = RuralProducerValidation.validateCpf(payload.CPF);

    if (payload.CNPJ)
      payload.CNPJ = RuralProducerValidation.validateCnpj(payload.CNPJ);

    RuralProducerValidation.valiodateTotalArea(
      payload.total_area,
      payload.total_area_cultivated,
      payload.total_area_forest
    );

    const response = await ruralProducerRepository.update(id, payload);

    if (response[0] === 0) {
      res.error(HttpStatusCode.NOT_FOUND, {
        code: HttpStatusMessage.NOT_FOUND,
        details: HttpStatusMessage.NOT_FOUND,
      });
      return;
    }

    res.success(HttpStatusCode.OK, response);
  } catch (error: any) {
    res.error(HttpStatusCode.BAD_REQUEST, {
      code: HttpStatusMessage.BAD_REQUEST,
      details: error.message,
    });
  }
};

const remove: Handler = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await ruralProducerRepository.remove(id);

    if (response === 0) {
      res.error(HttpStatusCode.NOT_FOUND, {
        code: HttpStatusMessage.NOT_FOUND,
        details: HttpStatusMessage.NOT_FOUND,
      });
      return;
    }

    res.success(HttpStatusCode.OK, response);
  } catch (error: any) {
    res.error(HttpStatusCode.BAD_REQUEST, {
      code: HttpStatusMessage.BAD_REQUEST,
      details: error.message,
    });
  }
};

export default {
  create,
  get,
  update,
  remove,
};
