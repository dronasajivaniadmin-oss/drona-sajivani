import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';
const key = () => { const secret = process.env.JWT_SECRET; if (!secret || secret.length < 32) throw new Error('JWT_SECRET must be at least 32 characters'); return new TextEncoder().encode(secret); };
export async function makeToken(id:string, role:string) { return new SignJWT({role}).setProtectedHeader({alg:'HS256'}).setSubject(id).setIssuedAt().setExpirationTime('12h').sign(key()); }
export async function currentUser(req:NextRequest) { const token = req.cookies.get('drona_session')?.value; if(!token) return null; try { const {payload} = await jwtVerify(token,key()); return {id:payload.sub as string,role:payload.role as string}; } catch { return null; } }
