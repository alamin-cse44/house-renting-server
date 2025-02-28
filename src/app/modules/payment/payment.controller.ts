import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import mongoose from 'mongoose';
import { PaymentServices } from './payment.service';
import { Order } from '../order/order.model';

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const { totalPrice, _id } = req.body;
  const trxId =
    new mongoose.Types.ObjectId() + Math.random().toString(36).substring(2, 5);
  let initiateData = {
    store_id: 'pndse66bf93623f146',
    store_passwd: 'pndse66bf93623f146@ssl',
    orderID: _id,
    total_amount: totalPrice,
    currency: 'BDT',
    tran_id: trxId,
    success_url:
      'https://a4-bike-shop-server.vercel.app/api/v1/payments/success',
    fail_url: 'https://a4-bike-shop-server.vercel.app/api/v1/payments/fail',
    cancel_url: 'https://a4-bike-shop-server.vercel.app/api/v1/payments/cancel',
    cus_name: 'Customer Name',
    cus_email: 'cust@yahoo.com',
    shipping_method: 'NO',
    product_category: 'jwellery',
    product_name: 'jhumka',
    product_profile: 'general',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: '1000',
    ship_country: 'Bangladesh',
    multi_card_name: 'mastercard,visacard,amexcard',
    value_a: 'ref001_A',
    value_b: 'ref002_B',
    value_c: 'ref003_C',
    value_d: 'ref004_D',
  };

  const result = await PaymentServices.createPaymentService(initiateData);

  console.log('result', result);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment created successfully',
    data: result.data.GatewayPageURL,
  });
});

const succesPayment = catchAsync(async (req: Request, res: Response) => {
  const successData = req.body;
  console.log('success data : ', successData);
  if (successData.status !== 'VALID') {
    throw new Error('Unathorized payment');
  }
  const updateData = {
    paymentMethod: successData.card_type,
    paymentStatus: 'success',
  };

  const update = await Order.findOneAndUpdate(
    { transactionId: successData.tran_id },
    updateData,
    { new: true, runValidators: true },
  );

  res.redirect('https://a4-bike-shop-client.vercel.app/dashboard/my-orders');
});

const failPayment = catchAsync(async (req: Request, res: Response) => {
  res.redirect('https://a4-bike-shop-client.vercel.app/payment-error');
});

const cancelPayment = catchAsync(async (req: Request, res: Response) => {
  res.redirect('https://a4-bike-shop-client.vercel.app/payment-error');
});

export const PaymentControllers = {
  createPayment,
  succesPayment,
  failPayment,
  cancelPayment,
};
