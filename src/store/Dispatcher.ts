import { Dispatcher } from 'flux';
import { Action } from './types';

const dispatcher = new Dispatcher<Action>();
export default dispatcher;
