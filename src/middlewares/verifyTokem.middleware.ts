import jwt, { JwtPayload } from 'jsonwebtoken';
import { AdminDB } from '../config/sequelize.conf';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || '';

export const verifyToken = async (req: any, res: any, next: any) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  const [bearer, token] = authorizationHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  try {
      const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
      const { id } = decoded;
  
      const user = await AdminDB.findOne({ where: { id: id } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      next();
      
    } catch (error) {
      console.error(`Error verifying token: ${error}`);
      return res.status(401).json({ message: 'Unauthorized' });
    }
};
