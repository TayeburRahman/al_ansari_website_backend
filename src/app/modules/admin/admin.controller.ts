import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { AdminService } from './admin.service';

const myProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.myProfile(req as any);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successful!",
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.updateProfile(req as any);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

const deleteMyAccount = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email
  const result = await AdminService.deleteMyAccount(email as any);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Your admin account deleted successfully",
    data: result,
  });
});


export const AdminController = {
  myProfile,
  updateProfile,
  deleteMyAccount,
};