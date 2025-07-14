import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { uploadFile } from '../../middlewares/fileUploader';
import { DashboardController } from './dashboard.controller';

const router = express.Router();

// -------------------- Protected Routes -------------------- //
// All routes require ADMIN or SUPER_ADMIN roles

router.post(
    '/person',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    uploadFile(),
    DashboardController.createPersonController
);

router.get(
    '/person',
    DashboardController.getAllPeopleController
);

router.get(
    '/person/:id',
    DashboardController.getPersonByIdController
);

router.put(
    '/person/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    uploadFile(),
    DashboardController.updatePersonController
);

router.delete(
    '/person/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    DashboardController.deletePersonController
);
// ======================
router.post(
    '/sector',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    uploadFile(),
    DashboardController.createSectorController
);

router.put(
    '/sector/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    uploadFile(),
    DashboardController.updateSectorController
);

router.delete(
    '/sector/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    DashboardController.deleteSectorController
);

router.get('/sector', DashboardController.getAllSectorsController);
router.get('/sector/:id', DashboardController.getSectorByIdController);
// ==============================
router.post(
    '/updates',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    uploadFile(),
    DashboardController.createUpdatesController
);

router.put(
    '/updates/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    uploadFile(),
    DashboardController.updateUpdatesController
);

router.delete(
    '/updates/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    DashboardController.deleteUpdatesController
);

router.get('/updates', DashboardController.getAllUpdatesController);
router.get('/updates/:id', DashboardController.getUpdatesByIdController);

// ==============================
router.post(
    '/events',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    uploadFile(),
    DashboardController.createEventsController
);

router.put(
    '/events/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    uploadFile(),
    DashboardController.updateEventsController
);

router.delete(
    '/events/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    DashboardController.deleteEventsController
);

router.get('/events', DashboardController.getAllEventsController);
router.get('/events/:id', DashboardController.getEventsByIdController);

// ==============================
router.post(
    '/newsletters',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    uploadFile(),
    DashboardController.createNewslettersController
);

router.put(
    '/newsletters/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    uploadFile(),
    DashboardController.updateNewslettersController
);

router.delete(
    '/newsletters/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    DashboardController.deleteNewslettersController
);

router.get('/newsletters', DashboardController.getAllNewslettersController);
router.get('/newsletters/:id', DashboardController.getNewslettersByIdController);

// ============================
router.put('/terms', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN), DashboardController.upsertTermsController);
router.get('/terms', DashboardController.getTermsController);

// --- Privacy Policy ---
router.put('/privacy', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN), DashboardController.upsertPrivacyController);
router.get('/privacy', DashboardController.getPrivacyController);

// --- Disclaimer ---
router.put('/disclaimer', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN), DashboardController.upsertDisclaimerController);
router.get('/disclaimer', DashboardController.getDisclaimerController);

export const DashboardRoutes = router;
