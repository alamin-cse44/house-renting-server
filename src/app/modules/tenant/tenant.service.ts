import { StatusCodes } from 'http-status-codes';
import QeryBuilder from '../../builder/QeryBuilder';
import AppError from '../../errors/AppError';
import { Request } from './tenant.model';
import { IRequest } from './tenant.interface';
import { requestSearchableFields } from './tanant.constant';

const createRequestIntoDB = async (payload: IRequest) => {
  const result = await Request.create(payload);

  return result;
};

const getAllRequestsFromDB = async (
  id: string,
  query: Record<string, unknown>,
) => {
  // TODO: Populate
  const requestQuery = new QeryBuilder(
    Request.find({ tenant: id })
      .populate('listing')
      .populate('tenant')
      .populate('landlord'),
    query,
  )
    .search(requestSearchableFields)
    .filter()
    .sort()
    .sortByAscOrDesc()
    .paginate()
    .fields();

  const result = await requestQuery.modelQuery;

  return result;
};


export const RequestServices = {
  createRequestIntoDB,
  getAllRequestsFromDB,
};
