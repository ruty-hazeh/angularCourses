import { LessonCountPipe } from './lesson-count.pipe';

describe('LessonCountPipe', () => {
  it('create an instance', () => {
    const pipe = new LessonCountPipe();
    expect(pipe).toBeTruthy();
  });
});
