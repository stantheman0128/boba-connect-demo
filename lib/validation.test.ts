import test from 'node:test';
import assert from 'node:assert/strict';
import { validateDecisions, rankCandidates } from './engine.ts';
test('a quotation must belong to the claimed candidate and field', () => {
  const people = [{id:'p1',name:'Example',role:'Builder',intro:'I build workflow tools.',needs:'I want investors.',focus:'Operations'}];
  assert.throws(()=>validateDecisions([{id:'p1',fit:'strong',relation:'peer',why:'A peer',talk:'Workflows',gap:'Unknown',score:80,refs:[{field:'intro',quote:'I invest in startups.'}]}], people));
});
test('none cannot be promoted by ranking and duplicate IDs fail validation', () => {
  assert.equal(rankCandidates([{id:'p1',fit:'none',score:100},{id:'p2',fit:'possible',score:40}]).length,1);
  const d={id:'p1',fit:'none' as const,relation:'',why:'',talk:'',gap:'',score:0,refs:[]};
  assert.throws(()=>validateDecisions([d,d], [{id:'p1',name:'',role:'',focus:'',intro:'',needs:''}]));
});
