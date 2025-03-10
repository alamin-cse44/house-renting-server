import { Router } from 'express';
import { UserRouters } from '../modules/user/user.route';
import { AdminRouters } from '../modules/admin/admin.route';
import { AuthRouters } from '../modules/auth/auth.route';
import { PaymentRouters } from '../modules/payment/payment.route';
import { ListingRouters } from '../modules/listing/listing.route';
import { RequestRouters } from '../modules/tenant/tenant.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouters,
  },
  {
    path: '/auth',
    route: AuthRouters,
  },
  {
    path: '/admin',
    route: AdminRouters,
  },
  {
    path: '/landlords',
    route: ListingRouters,
  },
  {
    path: '/tenants',
    route: RequestRouters,
  },
  {
    path: '/payments',
    route: PaymentRouters,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
