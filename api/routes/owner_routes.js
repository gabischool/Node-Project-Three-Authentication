import express from 'express';
import { delete_owner, get_owner, get_owners, login_owner, register_owner, update_owner } from '../controller/controller_owner.js';
import { authenticate_owner } from '../middleware/authenticate_owner.js';
import { ownervalidation } from '../validations/owner_validation.js';
export const owner_routes = express.Router();
owner_routes.post('/owner/register', ownervalidation, register_owner)
owner_routes.post('/owner/login', login_owner)
owner_routes.get('/owners', get_owners)
owner_routes.get('/current/owner', authenticate_owner, get_owner)
owner_routes.delete('/owner/:id', delete_owner)
owner_routes.put('/owner/:id', update_owner)