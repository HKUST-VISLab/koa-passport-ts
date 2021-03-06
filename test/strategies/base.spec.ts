import test from 'ava';
import * as Koa from 'koa';
import {
    ActionType,
    BaseStrategy,
} from '../../src';
import { MockReq, MockRes } from '../testUtils';

test('BaseStrategy#authenticate', async (t) => {
    const app = new Koa();
    const ctx = app.createContext(new MockReq(), new MockRes());
    const strategy = new BaseStrategy();
    const res = await strategy.authenticate(ctx);
    t.deepEqual(res.type, ActionType.PASS, 'should be pass action');
});
