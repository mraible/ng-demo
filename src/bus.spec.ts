import { Bus } from './bus';

describe('super basic test', () => {
  it('true is true', () => {
    expect(true).toEqual(true);
  });
});

describe('Test getters and setters.', () => {
  it('The bus name should be Hefe', () => {
    let bus = new Bus();
    bus.name = 'Hefe';
    let busName = bus.name;
    expect(busName).toBe('Hefe');
  });
});
