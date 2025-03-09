import axios from 'axios';
import { IPaymentData } from './payment.interface';
import { Request } from '../tenant/tenant.model';

const createPaymentService = async (payload: IPaymentData) => {
  const response = await axios({
    method: 'POST',
    url: 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
    data: payload,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const res = await Request.findByIdAndUpdate(
    payload.orderID,
    { transactionId: payload.tran_id },
    {
      new: true,
      runValidators: true,
    },
  );

  return response;
};

export const PaymentServices = {
  createPaymentService,
};
