import type { Comment } from '../types';
import { buildSummary } from './buildSummary';

export const buildComment = (comment?: Comment) => (comment ? buildSummary(comment.summary).split('\n') : []);
