import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { DashboardService } from './dashboard.service';


const createPersonController = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardService.createPerson(req as any);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Person created successfully.',
        data: result,
    });
});


const updatePersonController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DashboardService.updatePerson(id, req as any);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Person updated successfully.',
        data: result,
    });
});

const getPersonByIdController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DashboardService.getPersonById(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Person retrieved successfully.',
        data: result,
    });
});

const getAllPeopleController = catchAsync(async (_req: Request, res: Response) => {
    const result = await DashboardService.getAllPeople();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'All people retrieved successfully.',
        data: result,
    });
});
const deletePersonController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = await DashboardService.deletePerson(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Person deleted successfully.',
        data: deleted,
    });
});
// ===========================
const createSectorController = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardService.createSector(req as any);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Sector created successfully.',
        data: result,
    });
});

const getAllSectorsController = catchAsync(async (_req: Request, res: Response) => {
    const result = await DashboardService.getAllSectors();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Sectors retrieved successfully.',
        data: result,
    });
});
const getSectorByIdController = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardService.getSectorById(req.params.id);
    sendResponse(res, {
        statusCode: result ? 200 : 404,
        success: !!result,
        message: result ? 'Sector retrieved successfully.' : 'Sector not found.',
        data: result,
    });
});

const updateSectorController = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardService.updateSector(req.params.id, req as any);
    sendResponse(res, {
        statusCode: result ? 200 : 404,
        success: !!result,
        message: result ? 'Sector updated successfully.' : 'Sector not found or update failed.',
        data: result,
    });
});

const deleteSectorController = catchAsync(async (req: Request, res: Response) => {
    const deleted = await DashboardService.deleteSector(req.params.id);
    sendResponse(res, {
        statusCode: deleted ? 200 : 404,
        success: deleted,
        message: deleted ? 'Sector deleted successfully.' : 'Sector not found.',
        data: null,
    });
});

// ================================
const upsertTermsController = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardService.addTermsConditions(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Terms & Conditions updated successfully.',
        data: result,
    });
});

const getTermsController = catchAsync(async (_req: Request, res: Response) => {
    const result = await DashboardService.getTermsConditions();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Terms & Conditions retrieved successfully.',
        data: result,
    });
});

const upsertPrivacyController = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardService.addPrivacyPolicy(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Privacy Policy updated successfully.',
        data: result,
    });
});

const getPrivacyController = catchAsync(async (_req: Request, res: Response) => {
    const result = await DashboardService.getPrivacyPolicy();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Privacy Policy retrieved successfully.',
        data: result,
    });
});

const upsertDisclaimerController = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardService.addDisclaimerPolicy(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Disclaimer updated successfully.',
        data: result,
    });
});
const getDisclaimerController = catchAsync(async (_req: Request, res: Response) => {
    const result = await DashboardService.getDisclaimerPolicy();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Disclaimer retrieved successfully.',
        data: result,
    });
});
export const DashboardController = {
    getAllPeopleController,
    getPersonByIdController,
    updatePersonController,
    createPersonController,
    deletePersonController,
    getDisclaimerController,
    upsertDisclaimerController,
    getPrivacyController,
    upsertPrivacyController,
    getTermsController,
    upsertTermsController,
    createSectorController,
    deleteSectorController,
    updateSectorController,
    getSectorByIdController,
    getAllSectorsController
};
