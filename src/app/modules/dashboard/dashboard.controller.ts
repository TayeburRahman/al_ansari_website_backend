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

const getAllPeopleController = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardService.getAllPeople(req as any);
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

// ===========================
const createUpdatesController = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardService.createUpdates(req as any);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Updates created successfully.',
        data: result,
    });
});

const getAllUpdatesController = catchAsync(async (_req: Request, res: Response) => {
    const result = await DashboardService.getAllUpdates();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Updates retrieved successfully.',
        data: result,
    });
});
const getUpdatesByIdController = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardService.getUpdatesById(req.params.id);
    sendResponse(res, {
        statusCode: result ? 200 : 404,
        success: !!result,
        message: result ? 'Updates retrieved successfully.' : 'Updates not found.',
        data: result,
    });
});

const updateUpdatesController = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardService.updateUpdates(req.params.id, req as any);
    sendResponse(res, {
        statusCode: result ? 200 : 404,
        success: !!result,
        message: result ? 'Updates updated successfully.' : 'Updates not found or update failed.',
        data: result,
    });
});

const deleteUpdatesController = catchAsync(async (req: Request, res: Response) => {
    const deleted = await DashboardService.deleteUpdates(req.params.id);
    sendResponse(res, {
        statusCode: deleted ? 200 : 404,
        success: deleted,
        message: deleted ? 'Updates deleted successfully.' : 'Updates not found.',
        data: null,
    });
});

// ===========================
const createEventsController = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardService.createEvents(req as any);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Events created successfully.',
        data: result,
    });
});

const getAllEventsController = catchAsync(async (_req: Request, res: Response) => {
    const result = await DashboardService.getAllEvents();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Events retrieved successfully.',
        data: result,
    });
});
const getEventsByIdController = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardService.getEventsById(req.params.id);
    sendResponse(res, {
        statusCode: result ? 200 : 404,
        success: !!result,
        message: result ? 'Events retrieved successfully.' : 'Events not found.',
        data: result,
    });
});

const updateEventsController = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardService.updateEvents(req.params.id, req as any);
    sendResponse(res, {
        statusCode: result ? 200 : 404,
        success: !!result,
        message: result ? 'Events updated successfully.' : 'Events not found or update failed.',
        data: result,
    });
});

const deleteEventsController = catchAsync(async (req: Request, res: Response) => {
    const deleted = await DashboardService.deleteEvents(req.params.id);
    sendResponse(res, {
        statusCode: deleted ? 200 : 404,
        success: deleted,
        message: deleted ? 'Events deleted successfully.' : 'Events not found.',
        data: null,
    });
});
// =============================
// ===========================
const createNewslettersController = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardService.createNewsletters(req as any);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Newsletters created successfully.',
        data: result,
    });
});

const getAllNewslettersController = catchAsync(async (_req: Request, res: Response) => {
    const result = await DashboardService.getAllNewsletters();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Newsletters retrieved successfully.',
        data: result,
    });
});
const getNewslettersByIdController = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardService.getNewslettersById(req.params.id);
    sendResponse(res, {
        statusCode: result ? 200 : 404,
        success: !!result,
        message: result ? 'Newsletters retrieved successfully.' : 'Newsletters not found.',
        data: result,
    });
});

const updateNewslettersController = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardService.updateNewsletters(req.params.id, req as any);
    sendResponse(res, {
        statusCode: result ? 200 : 404,
        success: !!result,
        message: result ? 'Newsletters updated successfully.' : 'Newsletters not found or update failed.',
        data: result,
    });
});

const deleteNewslettersController = catchAsync(async (req: Request, res: Response) => {
    const deleted = await DashboardService.deleteNewsletters(req.params.id);
    sendResponse(res, {
        statusCode: deleted ? 200 : 404,
        success: deleted,
        message: deleted ? 'Newsletters deleted successfully.' : 'Newsletters not found.',
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
    createUpdatesController,
    getAllUpdatesController,
    getUpdatesByIdController,
    updateUpdatesController,
    deleteUpdatesController,
    getPrivacyController,
    upsertPrivacyController,
    getTermsController,
    upsertTermsController,
    createSectorController,
    deleteSectorController,
    updateSectorController,
    getSectorByIdController,
    getAllSectorsController,
    updateEventsController,
    deleteEventsController,
    getAllEventsController,
    getEventsByIdController,
    createEventsController,
    deleteNewslettersController,
    getAllNewslettersController,
    updateNewslettersController,
    createNewslettersController,
    getNewslettersByIdController
};
