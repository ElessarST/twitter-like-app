import { Types } from 'mongoose'
import { Identifier } from '../database/Identifier'

export const toObjectId = (id: Identifier): Types.ObjectId => new Types.ObjectId(id)
